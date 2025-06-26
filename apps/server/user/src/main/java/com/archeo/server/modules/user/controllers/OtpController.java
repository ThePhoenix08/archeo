package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.user.dtos.EmailRequest;
import com.archeo.server.modules.user.services.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/otp")
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestBody @Valid EmailRequest emailRequest){
        otpService.sendOtp(emailRequest.getEmail());
        return ResponseEntity.ok("OTP sent successfully to "+emailRequest.getEmail());
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam("otp") String otp,
                                            @RequestParam("email") String email){
        String message = otpService.verifyOtp(otp, email);

        if (message.equals("Otp verified successfully")) {
            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
    }

}
