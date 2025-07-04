package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterResponse;
import com.archeo.server.modules.auth.dtos.UserCommonRegisterRequest;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.user.dtos.OrganizationRegisterResponse;
import com.archeo.server.modules.user.dtos.OwnerRegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface AuthService {

    OwnerRegisterResponse registerOwner(OwnerRegisterRequest request, UsersCommon user);

    AuthResponse login(LoginRequest loginRequest, HttpServletRequest servletRequest, HttpServletResponse response);

    OrganizationRegisterResponse registerOrganization(OrganizationRegisterRequest registerRequest, MultipartFile file,  UsersCommon user);

    void refreshAccessTokenFromCookie(HttpServletRequest servletRequest, HttpServletResponse servletResponse);

    AuthResponse registerUserCommon(UserCommonRegisterRequest registerRequest, HttpServletRequest servletRequest, HttpServletResponse servletResponse);
}