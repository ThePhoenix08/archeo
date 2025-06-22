package com.archeo.server.modules.auth.controllers;


import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.SigninRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.auth.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody OwnerRegisterRequest registerRequest, HttpServletRequest request){
        AuthResponse response=authService.register(registerRequest, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody SigninRequest signinRequest, HttpServletRequest request){
        AuthResponse response=authService.login(signinRequest, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader){
        String token=authHeader.replace("Bearer ", "");
        String response=authService.logout(token);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }



}