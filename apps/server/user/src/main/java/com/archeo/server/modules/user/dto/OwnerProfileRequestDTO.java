package com.archeo.server.modules.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class OwnerProfileRequestDTO {

    @NotBlank
    private String fullName;

    @NotBlank
    @Size(max = 20)
    private String phoneNumber;

    private LocalDate dob;

    private String address;

    private String avatarUrl;

    private String bio;
}
