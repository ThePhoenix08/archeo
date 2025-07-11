package com.archeo.server.modules.auth.controllers;

import com.archeo.server.modules.auth.requests.OtpSendRequest;
import com.archeo.server.modules.auth.requests.OtpVerifyRequest;
import com.archeo.server.modules.auth.responses.OtpResponse;
import com.archeo.server.modules.common.dto.ApiSuccessResponse;
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
    public ResponseEntity<ApiSuccessResponse<OtpResponse>> sendOtp(@RequestBody @Valid OtpSendRequest otpSendRequest) {
        System.out.println("Sending otp");
        String verifyToken = otpService.sendOtp(otpSendRequest.getIdentifier(), otpSendRequest.getPurpose());

        return ResponseEntity.ok(
                ApiSuccessResponse.<OtpResponse>builder()
                        .success(true)
                        .statusCode(HttpStatus.OK.value())
                        .message("OTP sent successfully")
                        .data(OtpResponse.builder().verifyToken(verifyToken).build())
                        .build()
        );
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<ApiSuccessResponse<OtpResponse>> verifyOtp(@RequestBody @Valid OtpVerifyRequest otpVerifyRequest) {

        String verifyToken = otpService.verifyOtp(otpVerifyRequest.getVerifyToken(), otpVerifyRequest.getCode());

        return ResponseEntity.ok(
                ApiSuccessResponse.<OtpResponse>builder()
                        .success(true)
                        .statusCode(HttpStatus.OK.value())
                        .message("OTP verified successfully")
                        .data(OtpResponse.builder().verifyToken(verifyToken).build())
                        .build()
        );
    }
}
