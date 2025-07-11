package com.archeo.server.modules.auth.requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Identifier is required")
    @Size(min = 1, message = "Identifier must be at least 1 character")
    private String identifier;

    @NotNull(message = "Type is required")
    private LoginType type;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private boolean rememberMe = false;

    private LoginMethod loginMethod = LoginMethod.PASSWORD;

    public enum LoginType {
        EMAIL, USERNAME
    }

    public enum LoginMethod {
        PASSWORD, GOOGLE
    }
}