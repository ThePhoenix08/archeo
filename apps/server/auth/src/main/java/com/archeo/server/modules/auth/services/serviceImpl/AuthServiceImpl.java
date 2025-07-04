package com.archeo.server.modules.auth.services.serviceImpl;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterResponse;
import com.archeo.server.modules.auth.dtos.UserCommonRegisterRequest;
import com.archeo.server.modules.auth.mapper.OrganizationMapper;
import com.archeo.server.modules.auth.mapper.OwnerMapper;
import com.archeo.server.modules.auth.services.AuthLogsService;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.auth.services.IdentityProofStorageService;
import com.archeo.server.modules.auth.services.SessionService;
import com.archeo.server.modules.common.enums.USER_ROLE;
import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.common.exceptions.InvalidTokenException;
import com.archeo.server.modules.common.exceptions.UserNotFoundException;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.user.dtos.OrganizationRegisterResponse;
import com.archeo.server.modules.user.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.user.models.Organization;
import com.archeo.server.modules.user.models.Owner;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import com.archeo.server.modules.user.repositories.OwnerRepo;
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

    private final UsersCommonRepository userRepository;
    private final JwtProvider jwtProvider;
    private final AuthLogsService authLogsService;
    private final SessionService sessionService;
    private final UsersCommonRepository usersCommonRepository;
    private final OwnerRepo ownerRepo;
    private final OrganizationRepo organizationRepo;
    private final OwnerMapper ownerMapper;
    private final OrganizationMapper organizationMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final IdentityProofStorageService identityProofStorageService;


    @Override
    public AuthResponse registerUserCommon(UserCommonRegisterRequest registerRequest, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {

        UsersCommon newUser = new UsersCommon();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        UsersCommon savedUser = usersCommonRepository.save(newUser);

        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", Collections.emptyList());

        String accessToken = jwtProvider.generateAccessToken(claims, savedUser.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(savedUser.getEmail());


        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);

        servletResponse.addCookie(refreshTokenCookie);

        sessionService.saveSession(savedUser, refreshToken, servletRequest);
        authLogsService.log(savedUser, refreshToken, servletRequest);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .build();

    }

    @Override
    @Transactional
    public OwnerRegisterResponse registerOwner(OwnerRegisterRequest request, UsersCommon user) {

        Owner owner = new Owner();
        ownerMapper.mapOwnerRegisterRequestToOwner(request, owner);
        owner.setUserRole(request.getUserRole());
        owner.setUser(user);

        Owner savedOwner=ownerRepo.save(owner);
        OwnerRegisterResponse registerResponse=ownerMapper.mapOwnerToResponse(savedOwner);

        return registerResponse;
    }





    @Override
    public AuthResponse login(LoginRequest loginRequest,
                              HttpServletRequest servletRequest,
                              HttpServletResponse response) {

        if ((loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) &&
                (loginRequest.getUsername() == null || loginRequest.getUsername().isBlank())) {
            throw new InvalidCredentialsException("Email or username must be provided");
        }

        UsersCommon user=userRepository.findByEmail(loginRequest.getEmail())
                .or(()-> userRepository.findByUsername(loginRequest.getUsername()))
                .orElseThrow(()->new UserNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Incorrect password");
        }

        List<String> roles=determineUserRoles(user);

        Map<String, Object> claims = Map.of("authorities", roles);

        String accessToken = jwtProvider.generateAccessToken(claims, user.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(user.getEmail());



        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);


        response.addCookie(refreshTokenCookie);


        sessionService.saveSession(user, refreshToken, servletRequest);
        authLogsService.log(user, refreshToken, servletRequest);


        return AuthResponse.builder()
                .accessToken(accessToken)
                .userRole(roles)
                .build();
    }


    public OrganizationRegisterResponse registerOrganization(OrganizationRegisterRequest request,
                                                             MultipartFile file,
                                                             UsersCommon user) {


        String proofPath=identityProofStorageService.uploadProof(file);

        Organization organization = new Organization();

        organizationMapper.mapRequestToOrganization(organization, request);
        organization.setUser(user);
        organization.setIdentityProof(proofPath);
        Organization savedOrg = organizationRepo.save(organization);

        OrganizationRegisterResponse registerOrgResponse = organizationMapper.mapToResponse(savedOrg);

        return registerOrgResponse;


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

        UsersCommon user=userRepository.findByEmail(email)
                .orElseThrow(()->new UserNotFoundException("User not found"));

        List<String> roles=determineUserRoles(user);

        Map<String , Object> claims=Map.of("authorities",roles);
        String newAccessToken= jwtProvider.generateAccessToken(claims, email);

        Cookie accessTokenCookie=new Cookie("accessToken", newAccessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(15*60);
        servletResponse.addCookie(accessTokenCookie);

    }




    public List<String> determineUserRoles(UsersCommon user) {
        List<String> roles = new ArrayList<>();

        // From Owner table
        ownerRepo.findByUser(user).ifPresent(owner -> {
            roles.addAll(owner.getUserRole()
                    .stream()
                    .map(USER_ROLE::name)
                    .toList());
        });

        // From Organization table
        organizationRepo.findByUser(user).ifPresent(org -> {
            if (org.isOwner()) roles.add(USER_ROLE.ROLE_OWNER.name());
            if (org.isIssuer()) roles.add(USER_ROLE.ROLE_ISSUER.name());
            if (org.isVerifier()) roles.add(USER_ROLE.ROLE_VERIFIER.name());
        });



        if (roles.isEmpty()) {
            roles.add("ROLE_PENDING");
        }

        return roles;
    }


}
