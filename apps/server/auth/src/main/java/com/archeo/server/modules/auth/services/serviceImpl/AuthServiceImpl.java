package com.archeo.server.modules.auth.services.serviceImpl;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.SigninRequest;
import com.archeo.server.modules.auth.dtos.SignupRequest;
import com.archeo.server.modules.auth.repositories.UserRepository;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.user.models.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;


    @Override
    public AuthResponse register(SignupRequest request) {

        Optional<Users> user=userRepository.findByEmail(request.getEmail());
        if(user!=null){
            throw new RuntimeException("User already exists");
        }

        Users newUser=new Users();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());

        userRepository.save(newUser);

        Map<String, Object> claims = Map.of("role", newUser.getUserRole().name());
        String accessToken = jwtProvider.generateAccessToken(claims, newUser.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(newUser.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userRole(newUser.getUserRole().name())
                .build();


    }

    @Override
    public AuthResponse login(SigninRequest signinRequest) {

        Users user=userRepository.findByEmail(signinRequest.getEmail())
                .orElseThrow(()-> new RuntimeException("User not found"));

        if(!signinRequest.getPassword().equals(user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        return AuthResponse.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .userRole(newUser.getUserRole().name())
                .build();
    }
}
