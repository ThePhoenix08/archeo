package com.archeo.server.modules.user.services;


import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.dtos.ForgotPasswordRequest;
import com.archeo.server.modules.user.dtos.ResetPasswordRequest;
import com.archeo.server.modules.user.enums.OtpPurpose;
import com.archeo.server.modules.user.repositories.AgentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final AgentRepository agentRepository;
    private final OtpService otpService;
    private final PasswordEncoder passwordEncoder;

    public String initiateOtp(ForgotPasswordRequest request) {
        String email = request.getEmail();
        String purpose="";

        if (email == null && request.getUsername() != null) {
            Agent agentUser = agentRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            email = agentUser.getEmail();
        }

        if (email == null) throw new RuntimeException("Email is required");

        otpService.sendOtp(email, OtpPurpose.valueOf(purpose));
        return "OTP sent to registered email.";
    }

//    public boolean verifyOtp(OtpVerifyRequest request) {
//        String email = request.getEmail();
//
//        if (email == null && request.getUsername() != null) {
//            Agent agent = agentRepository.findByUsername(request.getUsername())
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//            email = agent.getEmail();
//        }
//
//        return otpService.verifyOtp(request.getOtp(), email).equals("Otp verified successfully");
//    }

    public String resetPassword(ResetPasswordRequest request) {
        Agent agent = null;

        if (request.getUsername() != null) {
            agent = agentRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else if (request.getEmail() != null) {
            agent = agentRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        if (agent == null) throw new RuntimeException("Invalid user");

        agent.setPassword(passwordEncoder.encode(request.getNewPassword()));
        agentRepository.save(agent);

        return "Password reset successfully.";
    }
}
