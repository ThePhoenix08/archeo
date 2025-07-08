package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.user.dtos.ForgotPasswordRequest;
import com.archeo.server.modules.user.dtos.OtpVerifyRequest;
import com.archeo.server.modules.user.dtos.ResetPasswordRequest;
import com.archeo.server.modules.user.services.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(forgotPasswordService.initiateOtp(request));
    }

    @PostMapping("/emailOptVerify")
    public ResponseEntity<?> emailVerify(@RequestBody OtpVerifyRequest request) {
        boolean verified = forgotPasswordService.verifyOtp(request);
        if (verified) {
            return ResponseEntity.ok("OTP verified. Reset allowed.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP.");
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(forgotPasswordService.resetPassword(request));
    }
}
