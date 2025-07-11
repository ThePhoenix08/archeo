package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.dtos.*;
import com.archeo.server.modules.auth.requests.AgentRegisterRequest;
import com.archeo.server.modules.auth.requests.IndividualRegisterRequest;
import com.archeo.server.modules.auth.requests.LoginRequest;
import com.archeo.server.modules.auth.requests.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.responses.AuthResponse;
import com.archeo.server.modules.auth.responses.IndividualRegisterResponse;
import com.archeo.server.modules.auth.responses.LoginResponse;
import com.archeo.server.modules.auth.responses.OrganizationRegisterResponse;
import com.archeo.server.modules.common.dto.ApiSuccessResponse;
import com.archeo.server.modules.common.models.Agent;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public interface AuthService {



    OrganizationRegisterResponse registerOrganization(OrganizationRegisterRequest registerRequest, MultipartFile file, Agent agent);

    void refreshAccessTokenFromCookie(HttpServletRequest servletRequest, HttpServletResponse servletResponse);

    AuthResponse registerAgent(AgentRegisterRequest registerRequest, HttpServletRequest servletRequest, HttpServletResponse servletResponse);

    ApiSuccessResponse<LoginResponse.LoginData<?>> login(LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response);

    IndividualRegisterResponse registerIndividual(IndividualRegisterRequest registerRequest, Agent agent);
}