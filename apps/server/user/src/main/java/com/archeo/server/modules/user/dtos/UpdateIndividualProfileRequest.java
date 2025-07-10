package com.archeo.server.modules.user.dtos;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateIndividualProfileRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name must be under 100 characters")
    private String fullName;

    @Pattern(regexp = "^[0-9\\-\\+]{9,15}$", message = "Phone number must be valid")
    private String phoneNumber;

    private LocalDate dob;

    @Size(max = 500, message = "Address must be under 500 characters")
    private String address;

    @Size(max = 255, message = "Avatar URL must be under 255 characters")
    private String avatarUrl;

    @Size(max = 500, message = "Bio must be under 500 characters")
    private String bio;
}
