package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.dtos.*;
import com.archeo.server.modules.common.models.Agent;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public interface AuthService {

    OwnerRegisterResponse registerOwner(OwnerRegisterRequest request, Agent agent);

    Optional<AuthResponse> login(LoginRequest loginRequest, HttpServletRequest servletRequest, HttpServletResponse response);

    OrganizationRegisterResponse registerOrganization(OrganizationRegisterRequest registerRequest, MultipartFile file,  Agent agent);

    void refreshAccessTokenFromCookie(HttpServletRequest servletRequest, HttpServletResponse servletResponse);

    AuthResponse registerAgent(AgentRegisterRequest registerRequest, HttpServletRequest servletRequest, HttpServletResponse servletResponse);

}