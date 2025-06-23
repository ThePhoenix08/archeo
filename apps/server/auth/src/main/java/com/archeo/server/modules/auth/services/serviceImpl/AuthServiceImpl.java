package com.archeo.server.modules.auth.services.serviceImpl.ServiceImpl;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.repositories.SessionRepo;
import com.archeo.server.modules.auth.services.AuthLogsService;
import com.archeo.server.modules.auth.services.SessionService;
import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.common.enums.USER_ROLE;
import com.archeo.server.modules.common.exceptions.ResourceNotFoundException;
import com.archeo.server.modules.common.exceptions.UserAlreadyExistsException;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.models.Owner;
import com.archeo.server.modules.user.repositories.OwnerRepo;
import com.archeo.server.modules.user.services.AuthService;
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


    @Override
    @Transactional
    public AuthResponse register(OwnerRegisterRequest request, HttpServletRequest servletRequest) {

        Optional<UsersCommon> existingUser=userRepository.findByEmail(request.getEmail());
        if(existingUser.isPresent()){
            throw new UserAlreadyExistsException("User already exists");
        }

        UsersCommon newUser=new UsersCommon();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setUserRole(USER_ROLE.ROLE_OWNER);
        UsersCommon savedUser=usersCommonRepository.save(newUser);

        Owner newOwner=new Owner();
        newOwner.setFullName(request.getFullName());
        newOwner.setDob(request.getDob());
        newOwner.setUser(savedUser);
        ownerRepo.save(newOwner);

        Map<String, Object> claims = Map.of("role", savedUser.getUserRole().name());
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
    public AuthResponse login(LoginRequest signinRequest, HttpServletRequest servletRequest) {

        UsersCommon user=userRepository.findByEmail(signinRequest.getEmail())
                .or(()-> userRepository.findByUsername(signinRequest.getUsername()))
                .orElseThrow(()->new ResourceNotFoundException("Invalid credentials"));

        if(!signinRequest.getPassword().equals(passwordEncoder.encode(user.getPassword())));

        Map<String, Object> claims = Map.of("role", user.getUserRole().name());

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

    @Override
    public String logout(String token) {
        return "Logout successful";
    }



}
