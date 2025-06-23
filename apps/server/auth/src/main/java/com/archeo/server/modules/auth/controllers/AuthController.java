package com.archeo.server.modules.auth.controllers;


import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.LoginRequest;
import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.auth.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;

    @PostMapping("/register-owner")
    public ResponseEntity<AuthResponse> register(@Valid  @RequestBody OwnerRegisterRequest registerRequest, HttpServletRequest request){
        AuthResponse response=authService.registerOwner(registerRequest, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest signinRequest, HttpServletRequest request){
        AuthResponse response=authService.login(signinRequest, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register-organization")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody OrganizationRegisterRequest registerRequest, HttpServletRequest servletRequest) {

        System.out.println("Registration started");
        AuthResponse response = authService.registerOrganization(registerRequest, servletRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader){
        String token=authHeader.replace("Bearer ", "");
        String response=authService.logout(token);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }



}