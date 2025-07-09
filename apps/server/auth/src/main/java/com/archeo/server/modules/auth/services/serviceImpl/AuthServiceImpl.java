package com.archeo.server.modules.auth.services.serviceImpl;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.*;
import com.archeo.server.modules.auth.mapper.LoginMapper;
import com.archeo.server.modules.auth.mapper.OrganizationMapper;
import com.archeo.server.modules.auth.mapper.OwnerMapper;
import com.archeo.server.modules.auth.repositories.AuthLogsRepo;
import com.archeo.server.modules.auth.services.AuthLogsService;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.auth.services.IdentityProofStorageService;
import com.archeo.server.modules.common.enums.AGENT_ROLE;
import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.common.exceptions.InvalidTokenException;
import com.archeo.server.modules.common.exceptions.UserNotFoundException;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.common.repositories.AgentRepository;
import com.archeo.server.modules.user.models.Organization;
import com.archeo.server.modules.user.models.Owner;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import com.archeo.server.modules.user.repositories.OwnerRepo;
import com.archeo.server.modules.auth.dtos.OrganizationRegisterResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtProvider jwtProvider;
    private final AuthLogsService authLogsService;
    private final AgentRepository agentRepository;
    private final OwnerRepo ownerRepo;
    private final OrganizationRepo organizationRepo;
    private final OwnerMapper ownerMapper;
    private final OrganizationMapper organizationMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final IdentityProofStorageService identityProofStorageService;
    private final LoginMapper loginMapper;
    private final AuthLogsRepo authLogsRepo;


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
    @Transactional
    public OwnerRegisterResponse registerOwner(OwnerRegisterRequest request, Agent agent) {

        Owner owner = new Owner();
        ownerMapper.mapOwnerRegisterRequestToOwner(request, owner);
        owner.setAgentRole(request.getAgentRole());
        owner.setAgent(agent);

        Owner savedOwner=ownerRepo.save(owner);
        OwnerRegisterResponse registerResponse=ownerMapper.mapOwnerToResponse(savedOwner);

        return registerResponse;
    }





    @Override
    public Optional<AuthResponse> login(LoginRequest loginRequest,
                                        HttpServletRequest servletRequest,
                                        HttpServletResponse response) {

        if ((loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) &&
                (loginRequest.getUsername() == null || loginRequest.getUsername().isBlank())) {
            throw new InvalidCredentialsException("Email or username must be provided");
        }

        Agent agent = agentRepository.findByEmail(loginRequest.getEmail())
                .or(() -> agentRepository.findByUsername(loginRequest.getUsername()))
                .orElseThrow(() -> new UserNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), agent.getPassword())) {
            throw new InvalidCredentialsException("Incorrect password");
        }

        List<String> roles = determineAgentRoles(agent);
        Map<String, Object> claims = Map.of("authorities", roles);

        String accessToken = jwtProvider.generateAccessToken(claims, agent.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(agent.getEmail());

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);

//        sessionService.saveSession(user, refreshToken, servletRequest);
        authLogsService.log(agent, refreshToken, servletRequest);

        OwnerLoginResponse ownerDto = null;
        OrganizationLoginResponse orgDto = null;

        if (roles.contains("ROLE_OWNER")) {
            ownerDto = ownerRepo.findByUser(agent)
                    .map(loginMapper::toDto)
                    .orElse(null);
        }

        if (roles.contains("ROLE_ISSUER") || roles.contains("ROLE_VERIFIER")) {
            orgDto = organizationRepo.findByUser(agent)
                    .map(loginMapper::toDto)
                    .orElse(null);
        }

        AuthResponse authResponse = AuthResponse.builder()
                .accessToken(accessToken)
                .agentRole(roles)
                .owner(ownerDto)
                .organization(orgDto)
                .build();

        return Optional.of(authResponse);
    }



    @Override
    public OrganizationRegisterResponse registerOrganization(OrganizationRegisterRequest request,
                                                             MultipartFile file,
                                                             Agent agent) {


        String proofPath=identityProofStorageService.uploadProof(file);

        Organization organization = new Organization();
        organizationMapper.mapRequestToOrganization(organization, request);

        List<AGENT_ROLE> roles = new ArrayList<>(organization.getAgentRole());
        organization.setAgentRole(null);

        organization.setAgent(agent);
        organization.setIdentityProof(proofPath);

        Organization savedOrg = organizationRepo.save(organization);

        savedOrg.setAgentRole(roles);
        organizationRepo.save(savedOrg);  // second save to persist the roles

        return organizationMapper.mapToResponse(savedOrg);



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
        ownerRepo.findByUser(agent).ifPresent(owner -> {
            roles.addAll(owner.getAgentRole()
                    .stream()
                    .map(AGENT_ROLE::name)
                    .toList());
        });

        // From Organization table
        organizationRepo.findByUser(agent).ifPresent(org -> {
            if (org.isOwner()) roles.add(AGENT_ROLE.ROLE_OWNER.name());
            if (org.isIssuer()) roles.add(AGENT_ROLE.ROLE_ISSUER.name());
            if (org.isVerifier()) roles.add(AGENT_ROLE.ROLE_VERIFIER.name());
        });



        if (roles.isEmpty()) {
            roles.add("ROLE_PENDING");
        }

        return roles;
    }


}
