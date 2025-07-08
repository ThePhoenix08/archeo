package com.archeo.server.modules.user.dtos;

import lombok.Data;

@Data
public class OtpVerifyRequest {
    private String username;
    private String email;
    private String otp;
    private String purpose;
}
