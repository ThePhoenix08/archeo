package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    AuthResponse registerOwner(OwnerRegisterRequest request, HttpServletRequest servletRequest, HttpServletResponse response);

    AuthResponse login(LoginRequest loginRequest, HttpServletRequest servletRequest,HttpServletResponse response);

    AuthResponse registerOrganization(OrganizationRegisterRequest registerRequest, HttpServletRequest servletRequest,HttpServletResponse response);

    void logout(String token);

    void refreshAccessTokenFromCookie(HttpServletRequest servletRequest, HttpServletResponse servletResponse);
}