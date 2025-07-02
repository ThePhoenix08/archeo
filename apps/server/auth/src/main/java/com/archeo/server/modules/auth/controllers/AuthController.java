package com.archeo.server.modules.auth.controllers;


import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.auth.services.IdentityProofStorageService;
import com.archeo.server.modules.auth.services.SessionService;
import com.archeo.server.modules.auth.services.serviceImpl.OAuth2UserService;
import com.archeo.server.modules.common.dto.ApiResponse;
import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.common.exceptions.UserAlreadyExistsException;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;
    private final IdentityProofStorageService proofStorageService;
    private final UsersCommonRepository usersCommonRepository;
    private final SessionService sessionService;
    private final OAuth2UserService oAuth2UserService;

    @PostMapping("/register-owner")
    public ResponseEntity<ApiResponse<AuthResponse>> registerOwner(@Valid @RequestBody  OwnerRegisterRequest registerRequest,
                                                 HttpServletRequest servletRequest,
                                                 HttpServletResponse servletResponse){
        if (usersCommonRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException("Email already registered.");
        }

        AuthResponse authResponse=authService.registerOwner(registerRequest, servletRequest, servletResponse);
        ApiResponse<AuthResponse> response = ApiResponse.<AuthResponse>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Registration successful.")
                .slug("registration_success")
                .data(authResponse)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest loginRequest,
                                              HttpServletRequest servletRequest,
                                              HttpServletResponse servletResponse){

        if(!usersCommonRepository.existsByEmail(loginRequest.getEmail())
                && !usersCommonRepository.existsByUsername(loginRequest.getUsername())){
                throw new InvalidCredentialsException("Invalid email or username");
        }

        AuthResponse authResponse=authService.login(loginRequest, servletRequest,servletResponse);





        ApiResponse<AuthResponse> response = ApiResponse.<AuthResponse>builder()
                .statusCode(HttpStatus.FOUND.value())
                .message("Login successful.")
                .slug("login_success")
                .data(authResponse)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);


    }

    @PostMapping(value = "/register-organization", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<AuthResponse>> registerOrganization(
            @RequestPart("data") @Valid OrganizationRegisterRequest registerRequest,
            @RequestPart("identityProofFile") MultipartFile identityProofFile,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse) {

        if (usersCommonRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException("Email already registered.");
        }

        AuthResponse authResponse=authService.registerOrganization(registerRequest, servletRequest, servletResponse);
        ApiResponse<AuthResponse> response = ApiResponse.<AuthResponse>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Registration successful.")
                .slug("registration_success")
                .data(authResponse)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }


    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest servletRequest){

        String sessionIdStr=sessionService.extractSessionId(servletRequest);

        if(sessionIdStr==null){
            ApiResponse<String> errorResponse=ApiResponse.<String>builder()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .message("Session id is missing")
                    .slug("session_error")
                    .data(null)
                    .build();

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        UUID sessionId= UUID.fromString(sessionIdStr);
        sessionService.deleteSession(sessionId);

        ApiResponse<String> successResponse = ApiResponse.<String>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Logged out successfully.")
                .slug("logout_success")
                .data(null)
                .build();

        return new ResponseEntity<>(successResponse, HttpStatus.OK);
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<ApiResponse<AuthResponse>> oauth2LoginSuccess(HttpServletRequest request,
                                                                        HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof OAuth2AuthenticationToken token)) {
            throw new RuntimeException("OAuth2AuthenticationToken not found in security context");
        }

        AuthResponse authResponse = oAuth2UserService.processOAuthLogin(token, request, response);

        ApiResponse<AuthResponse> apiResponse = ApiResponse.<AuthResponse>builder()
                .statusCode(200)
                .message("OAuth2 login successful")
                .slug("oauth2_login_success")
                .data(authResponse)
                .build();

        return ResponseEntity.ok(apiResponse);
    }
    
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refresh(HttpServletRequest servletRequest, HttpServletResponse servletResponse){
        authService.refreshAccessTokenFromCookie(servletRequest, servletResponse);
        return ResponseEntity.ok(Map.of("message", "Access token refreshed successfully"));
    }



}