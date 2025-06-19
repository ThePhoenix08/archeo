package com.archeo.server.modules.auth.services.serviceImpl;

import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.SigninRequest;
import com.archeo.server.modules.auth.dtos.SignupRequest;
import com.archeo.server.modules.auth.repositories.UserRepository;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.user.models.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;


    @Override
    public AuthResponse signup(SignupRequest request) {

        Users user=userRepository.findByEmail(request.getEmail());
        if(user!=null){
            throw new RuntimeException("User already exists");
        }

        Users newUser=new Users();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());

        userRepository.save(newUser);

        return AuthResponse.builder()
                .username(newUser.getUsername())
                .build();


    }

    @Override
    public AuthResponse signin(SigninRequest signinRequest) {

        Users user=userRepository.findByEmail(signinRequest.getEmail());

        if(user==null){
            throw new RuntimeException("User not found");
        }

        if(!signinRequest.getPassword().equals(user.getPassword())){
            throw new RuntimeException("Password in invalid");
        }

        return AuthResponse.builder()
                .username(user.getUsername())
                .build();

    }
}
