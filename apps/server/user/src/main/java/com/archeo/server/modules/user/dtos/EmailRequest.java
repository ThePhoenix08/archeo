package com.archeo.server.modules.user.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmailRequest {

    @NotBlank(message = "Email must not be empty")
    @Email(message = "Invalid email format")
    private String email;
}
