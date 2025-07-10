package com.archeo.server.modules.auth.services.serviceImpl;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.IndividualInfo;
import com.archeo.server.modules.auth.mapper.IndividualMapper;
import com.archeo.server.modules.auth.mapper.LoginMapper;
import com.archeo.server.modules.auth.mapper.OrganizationMapper;
import com.archeo.server.modules.auth.repositories.AuthLogsRepo;
import com.archeo.server.modules.auth.requests.AgentRegisterRequest;
import com.archeo.server.modules.auth.requests.IndividualRegisterRequest;
import com.archeo.server.modules.auth.requests.LoginRequest;
import com.archeo.server.modules.auth.requests.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.responses.AuthResponse;
import com.archeo.server.modules.auth.responses.IndividualRegisterResponse;
import com.archeo.server.modules.auth.responses.LoginResponse;
import com.archeo.server.modules.auth.responses.OrganizationRegisterResponse;
import com.archeo.server.modules.auth.services.AuthLogsService;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.auth.services.IdentityProofStorageService;
import com.archeo.server.modules.common.dto.ApiSuccessResponse;
import com.archeo.server.modules.common.enums.AgentRole;
import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.common.exceptions.InvalidTokenException;
import com.archeo.server.modules.common.exceptions.UserNotFoundException;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.models.Individual;
import com.archeo.server.modules.user.repositories.AgentRepository;
import com.archeo.server.modules.user.models.Organization;
import com.archeo.server.modules.user.repositories.IndividualRepo;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtProvider jwtProvider;
    private final AuthLogsService authLogsService;
    private final AgentRepository agentRepository;
    private final OrganizationRepo organizationRepo;
    private final IndividualMapper individualMapper;
    private final OrganizationMapper organizationMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final IdentityProofStorageService identityProofStorageService;
    private final LoginMapper loginMapper;
    private final AuthLogsRepo authLogsRepo;
    private final IndividualRepo individualRepo;


    @Override
    public AuthResponse registerAgent(AgentRegisterRequest registerRequest, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {

        Agent newAgent = new Agent();
        newAgent.setUsername(registerRequest.getUsername());
        newAgent.setEmail(registerRequest.getEmail());
        newAgent.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        Agent savedAgent = agentRepository.save(newAgent);

        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", Collections.emptyList());

        String accessToken = jwtProvider.generateAccessToken(claims, savedAgent.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(savedAgent.getEmail());


        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);

        servletResponse.addCookie(refreshTokenCookie);

//        sessionService.saveSession(savedUser, refreshToken, servletRequest);
        authLogsService.log(savedAgent, refreshToken, servletRequest);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .build();

    }

    @Override
    public ApiSuccessResponse<LoginResponse.LoginData<?>> login(
            LoginRequest loginRequest,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse) {

        String identifier = loginRequest.getIdentifier();
        Agent agent = (loginRequest.getType() == LoginRequest.LoginType.EMAIL)
                ? agentRepository.findByEmail(identifier).orElseThrow(() -> new UserNotFoundException("Agent not found"))
                : agentRepository.findByUsername(identifier).orElseThrow(() -> new UserNotFoundException("Agent not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), agent.getPassword())) {
            throw new InvalidCredentialsException("Incorrect password");
        }

        List<String> roles = determineRoles(agent);
        Map<String, Object> claims = Map.of("authorities", roles);

        String accessToken = jwtProvider.generateAccessToken(claims, agent.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(agent.getEmail());

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(3 * 24 * 60 * 60);
        servletResponse.addCookie(refreshCookie);

        authLogsService.log(agent, refreshToken, servletRequest);

        Optional<Individual> individualOpt = individualRepo.findByAgent(agent);
        Optional<Organization> orgOpt = organizationRepo.findByAgent(agent);

        LoginResponse.LoginData<?> loginData;

        if (individualOpt.isPresent()) {
            loginData = LoginResponse.LoginData.builder()
                    .token(accessToken)
                    .agentType("individual")
                    .user(loginMapper.toIndividualInfo(individualOpt.get()))
                    .build();
        } else if (orgOpt.isPresent()) {
            loginData = LoginResponse.LoginData.builder()
                    .token(accessToken)
                    .agentType("organization")
                    .user(loginMapper.toOrganizationInfo(orgOpt.get()))
                    .build();
        } else {
            throw new InvalidCredentialsException("User has no valid role assigned.");
        }

        return ApiSuccessResponse.<LoginResponse.LoginData<?>>builder()
                .success(true)
                .statusCode(HttpStatus.OK.value())
                .message("Login successful")
                .data(loginData)
                .build();
    }


    private List<String> determineRoles(Agent agent) {
        List<String> roles = new ArrayList<>();

        individualRepo.findByAgent(agent).ifPresent(owner -> {
            if (owner.getAgentRole() != null) {
                roles.addAll(
                        owner.getAgentRole()
                                .stream()
                                .map(AgentRole::name)
                                .toList()
                );
            }
        });

        organizationRepo.findByAgent(agent).ifPresent(org -> {
            if (org.isOwner()) roles.add(AgentRole.OWNER.name());
            if (org.isIssuer()) roles.add(AgentRole.ISSUER.name());
            if (org.isVerifier()) roles.add(AgentRole.VERIFIER.name());
        });

        if (roles.isEmpty()) roles.add("PENDING");

        return roles;
    }



    @Override
    @Transactional
    public IndividualRegisterResponse registerIndividual(IndividualRegisterRequest request, Agent agent) {

        Individual newIndividual=new Individual();
        individualMapper.mapIndividualRegisterRequestToIndividual(request, newIndividual);

        newIndividual.setAgentRole(request.getAgentRole());
        newIndividual.setAgent(agent);
        newIndividual.setRegisterIncomplete(false);
        Individual savedIndividual=individualRepo.save(newIndividual);

        IndividualInfo individualInfo = individualMapper.toIndividualInfo(savedIndividual);

        return IndividualRegisterResponse.builder()
                .agentType("individual")
                .user(individualInfo)
                .build();
    }





    @Override
    public OrganizationRegisterResponse registerOrganization(OrganizationRegisterRequest request,
                                                             MultipartFile file,
                                                             Agent agent) {


        String proofPath = identityProofStorageService.uploadProof(file);

        Organization organization = new Organization();
        organizationMapper.mapRequestToOrganization(organization, request);

        organization.setAgent(agent);
        organization.setProofFileUrl(proofPath);


        System.out.println("roles: "+ organization.getAgentRole());

        Organization savedOrg = organizationRepo.save(organization);

        return organizationMapper.toOrganizationRegisterResponse(savedOrg);



    }



    @Override
    public void refreshAccessTokenFromCookie(HttpServletRequest servletRequest, HttpServletResponse servletResponse) {

        Cookie[] cookies= servletRequest.getCookies();
        String refreshToken=null;

        if(cookies!=null){
            for(Cookie cookie:cookies){
                if("refreshToken".equals(cookie.getName())){
                    refreshToken= cookie.getValue();
                    break;
                }
            }
        }

        if(refreshToken==null){
            throw new InvalidTokenException("Refresh token is not found in cookies");
        }

        String email= jwtProvider.extractUsername(refreshToken);

        Agent agent=agentRepository.findByEmail(email)
                .orElseThrow(()->new UserNotFoundException("User not found"));

        List<String> roles=determineAgentRoles(agent);

        Map<String , Object> claims=Map.of("authorities",roles);
        String newAccessToken= jwtProvider.generateAccessToken(claims, email);

        Cookie accessTokenCookie=new Cookie("accessToken", newAccessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(15*60);
        servletResponse.addCookie(accessTokenCookie);

    }




    public List<String> determineAgentRoles(Agent agent) {
        List<String> roles = new ArrayList<>();

        // From Owner table
        individualRepo.findByAgent(agent).ifPresent(individual -> {
            if (individual.getAgentRole() != null) {
                roles.addAll(
                        individual.getAgentRole()
                                .stream()
                                .map(AgentRole::name)
                                .toList()
                );
            }
        });

        // From Organization table
        organizationRepo.findByAgent(agent).ifPresent(org -> {
            if (org.getAgentRole() != null) {
                roles.addAll(
                        org.getAgentRole()
                                .stream()
                                .map(AgentRole::name)
                                .toList()
                );
            }
        });

        if (roles.isEmpty()) roles.add("PENDING");

        return roles;
    }


}
