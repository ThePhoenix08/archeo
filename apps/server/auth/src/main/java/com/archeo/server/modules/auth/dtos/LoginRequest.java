package com.archeo.server.modules.auth.dtos;

import lombok.Data;

@Data

public class LoginRequest {

    private String email;
    private String username;
    private String password;
}
