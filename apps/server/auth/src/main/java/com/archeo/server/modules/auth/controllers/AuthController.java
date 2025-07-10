package com.archeo.server.modules.auth.controllers;


import com.archeo.server.modules.auth.config.CustomUserDetails;
import com.archeo.server.modules.auth.dtos.*;
import com.archeo.server.modules.auth.requests.AgentRegisterRequest;
import com.archeo.server.modules.auth.requests.IndividualRegisterRequest;
import com.archeo.server.modules.auth.requests.LoginRequest;
import com.archeo.server.modules.auth.requests.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.responses.AuthResponse;
import com.archeo.server.modules.auth.responses.IndividualRegisterResponse;
import com.archeo.server.modules.auth.responses.LoginResponse;
import com.archeo.server.modules.auth.responses.OrganizationRegisterResponse;
import com.archeo.server.modules.auth.services.*;
import com.archeo.server.modules.common.dto.ApiSuccessResponse;
import com.archeo.server.modules.common.exceptions.UserAlreadyExistsException;
import com.archeo.server.modules.common.exceptions.UserNotFoundException;
import com.archeo.server.modules.common.models.Agent;


import com.archeo.server.modules.user.repositories.AgentRepository;
import com.archeo.server.modules.user.repositories.IndividualRepo;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;
    private final IdentityProofStorageService proofStorageService;
    private final AgentRepository agentRepository;
    private final SessionService sessionService;
    private final OAuth2UserService oAuth2UserService;
    private final IndividualRepo individualRepo;
    private final OrganizationRepo organizationRepo;
    private final LogoutService logoutService;

    @PostMapping("/register/agent")
    public ResponseEntity<ApiSuccessResponse<AuthResponse>> registerUserCommon(
            @Valid @RequestBody AgentRegisterRequest registerRequest,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse
            )
    {
        if (agentRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException("Email already registered.");
        }
        AuthResponse authResponse=authService.registerAgent(registerRequest, servletRequest, servletResponse);
        ApiSuccessResponse<AuthResponse> response = ApiSuccessResponse.<AuthResponse>builder()
                .success(true)
                .statusCode(HttpStatus.CREATED.value())
                .message("Agent registered successfully")
                .data(authResponse)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);


    }


    @PostMapping("/register/individual")
    public ResponseEntity<ApiSuccessResponse<IndividualRegisterResponse>> registerIndividual(
            @Valid @ModelAttribute IndividualRegisterRequest registerRequest,
            @AuthenticationPrincipal CustomUserDetails principal
            )

    {

        String email = principal.getUsername();

        Agent agent = agentRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        if (individualRepo.existsByAgent(agent)) {
            throw new UserAlreadyExistsException("Owner already registered");
        }


        IndividualRegisterResponse registerResponse=authService.registerIndividual(registerRequest, agent);
        ApiSuccessResponse<IndividualRegisterResponse> response = ApiSuccessResponse.<IndividualRegisterResponse>builder()
                .success(true)
                .statusCode(HttpStatus.CREATED.value())
                .message("Owner Registration successful.")
                .data(registerResponse)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<ApiSuccessResponse<LoginResponse.LoginData<?>>> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request,
            HttpServletResponse response) {

        ApiSuccessResponse<LoginResponse.LoginData<?>> loginResponse =
                authService.login(loginRequest, request, response);

        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping(value = "/register/organization", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiSuccessResponse<OrganizationRegisterResponse>> registerOrganization(
            @RequestPart("data") @Valid OrganizationRegisterRequest registerRequest,
            @RequestPart("proofDocFile") MultipartFile identityProofFile,
            @AuthenticationPrincipal User principal

    ) {

        System.out.println("file:"+ identityProofFile);
        String email = principal.getUsername();

        Agent agent = agentRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        if (organizationRepo.existsByAgent(agent)) {
            throw new UserAlreadyExistsException("Organization already registered");
        }


        OrganizationRegisterResponse registerResponse=authService.registerOrganization(registerRequest, identityProofFile, agent);
        ApiSuccessResponse<OrganizationRegisterResponse> response = ApiSuccessResponse.<OrganizationRegisterResponse>builder()
                .success(true)
                .statusCode(HttpStatus.CREATED.value())
                .message("Organization Registration successful.")
                .data(registerResponse)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }


    @PostMapping("/logout")
    public ResponseEntity<ApiSuccessResponse<String>> logout(HttpServletRequest request, HttpServletResponse response) {
        return logoutService.logout(request, response);
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest servletRequest){
        if(servletRequest.getCookies()==null) return null;

        for(Cookie cookie: servletRequest.getCookies()){
            if("refreshToken".equals(cookie.getName())){
                return cookie.getValue();
            }
        }

        return null;
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<ApiSuccessResponse<AuthResponse>> oauth2LoginSuccess(HttpServletRequest request,
                                                                               HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof OAuth2AuthenticationToken token)) {
            throw new RuntimeException("OAuth2AuthenticationToken not found in security context");
        }

        AuthResponse authResponse = oAuth2UserService.processOAuthLogin(token, request, response);

        ApiSuccessResponse<AuthResponse> apiResponse = ApiSuccessResponse.<AuthResponse>builder()
                .statusCode(200)
                .message("OAuth2 login successful")
//                .slug("oauth2_login_success")
                .data(authResponse)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refresh(HttpServletRequest servletRequest, HttpServletResponse servletResponse){
        authService.refreshAccessTokenFromCookie(servletRequest, servletResponse);
        return ResponseEntity.ok(Map.of("message", "Access token refreshed successfully"));
    }

    @GetMapping("/verify/username")
    public ResponseEntity<ApiSuccessResponse<UsernameAvailable>> verifyUsername(@RequestParam String username){
        Optional<Agent> user=agentRepository.findByUsername(username);

        if(user.isPresent()){
            throw new UserAlreadyExistsException("Username already exists");
        }

        ApiSuccessResponse<UsernameAvailable> successResponse = ApiSuccessResponse.<UsernameAvailable>builder()
                .success(true)
                .statusCode(HttpStatus.OK.value())
                .message("Valid username.")
                .data(UsernameAvailable.builder().available(true).build())
                .build();

        return new ResponseEntity<>(successResponse, HttpStatus.OK);
    }



}