package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dtos.ForgotPasswordRequest;
import com.archeo.server.modules.user.dtos.OtpVerifyRequest;
import com.archeo.server.modules.user.dtos.ResetPasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UsersCommonRepository usersCommonRepository;
    private final OtpService otpService;
    private final PasswordEncoder passwordEncoder;

    public String initiateOtp(ForgotPasswordRequest request) {
        String email = request.getEmail();

        if (email == null && request.getUsername() != null) {
            UsersCommon user = usersCommonRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            email = user.getEmail();
        }

        if (email == null) throw new RuntimeException("Email is required");

        otpService.sendOtp(email);
        return "OTP sent to registered email.";
    }

    public boolean verifyOtp(OtpVerifyRequest request) {
        String email = request.getEmail();

        if (email == null && request.getUsername() != null) {
            UsersCommon user = usersCommonRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            email = user.getEmail();
        }

        return otpService.verifyOtp(request.getOtp(), email).equals("Otp verified successfully");
    }

    public String resetPassword(ResetPasswordRequest request) {
        UsersCommon user = null;

        if (request.getUsername() != null) {
            user = usersCommonRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else if (request.getEmail() != null) {
            user = usersCommonRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        if (user == null) throw new RuntimeException("Invalid user");

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        usersCommonRepository.save(user);

        return "Password reset successfully.";
    }
}
