package com.archeo.server.modules.auth.services.serviceImpl;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.auth.mapper.OrganizationMapper;
import com.archeo.server.modules.auth.mapper.OwnerMapper;
import com.archeo.server.modules.auth.mapper.UsersCommonMapper;
import com.archeo.server.modules.auth.repositories.SessionRepo;
import com.archeo.server.modules.auth.services.AuthLogsService;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.auth.services.SessionService;
import com.archeo.server.modules.common.exceptions.ResourceNotFoundException;
import com.archeo.server.modules.common.exceptions.UserAlreadyExistsException;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.models.Organization;
import com.archeo.server.modules.user.models.Owner;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import com.archeo.server.modules.user.repositories.OwnerRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsersCommonRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final SessionRepo sessionRepo;
    private final AuthLogsService authLogsService;
    private final SessionService sessionService;
    private final UsersCommonRepository usersCommonRepository;
    private final OwnerRepo ownerRepo;
    private final OrganizationRepo organizationRepo;
    private final OwnerMapper ownerMapper;
    private final OrganizationMapper organizationMapper;
    private final UsersCommonMapper usersCommonMapper;


    @Override
    @Transactional
    public AuthResponse registerOwner(OwnerRegisterRequest request, HttpServletRequest servletRequest) {

        Optional<UsersCommon> existingUser=userRepository.findByEmail(request.getEmail());
        if(existingUser.isPresent()){
            throw new UserAlreadyExistsException("User already exists");
        }


        UsersCommon newUser=new UsersCommon();
        usersCommonMapper.ownerToUsersCommon(request, newUser);

        UsersCommon savedUser=usersCommonRepository.save(newUser);

        Owner newOwner=new Owner();
        ownerMapper.mapOwnerRegisterRequestToOwner(request, newOwner);

        newOwner.setUser(savedUser);
        ownerRepo.save(newOwner);

        Map<String, Object> claims = Map.of("authorities", savedUser.getUserRole().name());
        String accessToken = jwtProvider.generateAccessToken(claims, savedUser.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(savedUser.getEmail());

        sessionService.saveSession(savedUser, refreshToken, servletRequest);
        authLogsService.log(savedUser, refreshToken, servletRequest);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userRole(newUser.getUserRole().name())
                .build();


    }

    @Override
    public AuthResponse login(LoginRequest loginRequest, HttpServletRequest servletRequest) {

        UsersCommon user=userRepository.findByEmail(loginRequest.getEmail())
                .or(()-> userRepository.findByUsername(loginRequest.getUsername()))
                .orElseThrow(()->new ResourceNotFoundException("Invalid credentials"));

        if(!loginRequest.getPassword().equals(passwordEncoder.encode(user.getPassword())));

        Map<String, Object> claims = Map.of("authorities", user.getUserRole().name());

        String accessToken = jwtProvider.generateAccessToken(claims, user.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(user.getEmail());

        sessionService.saveSession(user, refreshToken, servletRequest);
        authLogsService.log(user, refreshToken, servletRequest);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userRole(user.getUserRole().name())
                .build();
    }


    public AuthResponse registerOrganization(OrganizationRegisterRequest request, HttpServletRequest servletRequest) {

        Optional<UsersCommon> existingUser = usersCommonRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }

        UsersCommon user = new UsersCommon();

        usersCommonMapper.organizationToUsersCommon(request, user);

        UsersCommon savedUser = usersCommonRepository.save(user);

        Organization organization = new Organization();

        organizationMapper.mapOrganizationRegisterRequestToOrganization(request, organization);
        organization.setUser(savedUser);
        organizationRepo.save(organization);

        Map<String, Object> claims = Map.of("role", savedUser.getUserRole().name());
        String accessToken = jwtProvider.generateAccessToken(claims, savedUser.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(savedUser.getEmail());

        sessionService.saveSession(savedUser, refreshToken, servletRequest);
        authLogsService.log(savedUser, refreshToken, servletRequest);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userRole(savedUser.getUserRole().name())
                .build();
    }

    @Override
    public String logout(String token) {
        return "Logout successful";
    }





}
