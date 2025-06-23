package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.dto.AuthResponse;
import com.archeo.server.modules.auth.dtos.SigninRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    AuthResponse register(OwnerRegisterRequest request, HttpServletRequest servletRequest);

    AuthResponse login(SigninRequest signinRequest, HttpServletRequest servletRequest);

    String logout(String token);
}