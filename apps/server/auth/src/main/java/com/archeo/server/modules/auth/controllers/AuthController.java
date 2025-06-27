package com.archeo.server.modules.auth.controllers;


import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.auth.services.AuthService;
import com.archeo.server.modules.auth.services.IdentityProofStorageService;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;
    private final IdentityProofStorageService proofStorageService;
    private final UsersCommonRepository usersCommonRepository;

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

        return new ResponseEntity<>(response, HttpStatus.FOUND);


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

//    @PostMapping("/logout")
//    public ResponseEntity<ApiResponse<String>> logout(@RequestHeader("Authorization") String authHeader){
//        String token=authHeader.replace("Bearer ", "");
//        String response=authService.logout(token);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//
//    }



}