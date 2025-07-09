package com.archeo.server.modules.auth.controllers;

import com.archeo.server.modules.common.dto.ApiResponse;
import com.archeo.server.modules.user.dtos.EmailRequest;
import com.archeo.server.modules.user.services.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/otp/send")
    public ResponseEntity<ApiResponse<String>> sendOtp(@RequestBody @Valid EmailRequest emailRequest) {
        otpService.sendOtp(emailRequest.getEmail());

        ApiResponse<String> response = ApiResponse.<String>builder()
                .statusCode(HttpStatus.OK.value())
                .message("OTP sent successfully")
                .data("OTP sent to: " + emailRequest.getEmail())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<ApiResponse<String>> verifyOtp(@RequestParam("otp") String otp,
                                                         @RequestParam("email") String email) {

        String message = otpService.verifyOtp(otp, email);

        if ("Otp verified successfully".equals(message)) {
            ApiResponse<String> response = ApiResponse.<String>builder()
                    .statusCode(HttpStatus.OK.value())
                    .message(message)
                    .data("Verified email: " + email)
                    .build();
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<String> errorResponse = ApiResponse.<String>builder()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .message("OTP verification failed")
                    .errorType("INVALID_OTP")
                    .data(message)
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
