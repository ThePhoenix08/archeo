package com.archeo.server.modules.user.dtos;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String username;
    private String email;
}
