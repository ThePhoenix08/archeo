package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.SigninRequest;
import com.archeo.server.modules.auth.dtos.SignupRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    AuthResponse register(SignupRequest request, HttpServletRequest servletRequest);

    AuthResponse login(SigninRequest signinRequest, HttpServletRequest servletRequest);

    String logout(String token);
}