package com.archeo.auth.services;

import com.archeo.auth.dtos.AuthResponse;
import com.archeo.auth.dtos.SigninRequest;
import com.archeo.auth.dtos.SignupRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    AuthResponse register(SignupRequest request, HttpServletRequest servletRequest);

    AuthResponse login(SigninRequest signinRequest, HttpServletRequest servletRequest);

    String logout(String token);
}