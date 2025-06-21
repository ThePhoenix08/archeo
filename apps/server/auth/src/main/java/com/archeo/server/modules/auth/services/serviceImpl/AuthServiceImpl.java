package com.archeo.server.modules.auth.services.serviceImpl;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.SigninRequest;
import com.archeo.server.modules.auth.dtos.SignupRequest;
import com.archeo.server.modules.auth.models.Session;
import com.archeo.server.modules.auth.repositories.SessionRepo;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.user.models.Users;
import com.archeo.server.modules.user.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final SessionRepo sessionRepo;


    @Override
    public AuthResponse register(SignupRequest request, HttpServletRequest servletRequest) {

        Optional<Users> user=userRepository.findByEmail(request.getEmail());
        if(user==null){
            throw new RuntimeException("User already exists");
        }

        Users newUser=new Users();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(newUser);

        Map<String, Object> claims = Map.of("role", newUser.getUserRole().name());
        String accessToken = jwtProvider.generateAccessToken(claims, newUser.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(newUser.getEmail());

        saveSession(newUser, refreshToken, servletRequest);
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userRole(newUser.getUserRole().name())
                .build();


    }

    @Override
    public AuthResponse login(SigninRequest signinRequest, HttpServletRequest servletRequest) {

        Users user=userRepository.findByEmail(signinRequest.getEmail())
                .or(()-> userRepository.findByUsername(signinRequest.getUsername()))
                .orElseThrow(()->new RuntimeException("Invalid credentials"));

        if(!signinRequest.getPassword().equals(passwordEncoder.encode(user.getPassword())));

        Map<String, Object> claims = Map.of("role", user.getUserRole().name());

        String accessToken = jwtProvider.generateAccessToken(claims, user.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(user.getEmail());

        saveSession(user, refreshToken, servletRequest);
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

    private void saveSession(Users user, String refreshToken, HttpServletRequest request){
        Session session=new Session();
        session.setUser(user);
        session.setRefreshTokenHash(passwordEncoder.encode(refreshToken));
        session.setIpAddress(request.getRemoteAddr());
        session.setUserAgent(request.getHeader("User-Agent"));
        session.setExpiresAt(Timestamp.from(Instant.now().plus(30, ChronoUnit.DAYS)));
        sessionRepo.save(session);

    }

}
