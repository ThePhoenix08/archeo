package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    AuthResponse registerOwner(OwnerRegisterRequest request, HttpServletRequest servletRequest);

    AuthResponse login(LoginRequest loginRequest, HttpServletRequest servletRequest);

    AuthResponse registerOrganization(OrganizationRegisterRequest registerRequest, HttpServletRequest servletRequest);

    String logout(String token);
}