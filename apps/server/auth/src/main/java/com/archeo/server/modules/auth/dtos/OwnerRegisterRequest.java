package com.archeo.server.modules.auth.dtos;

import com.archeo.server.modules.common.enums.AGENT_ROLE;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerRegisterRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 300, message = "Full name cannot exceed 300 characters")
    private String fullName;

    @NotNull(message = "User role must be specified")
    private List<AGENT_ROLE> agentRole;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9\\-\\+]{9,15}$", message = "Invalid phone number format")
    private String phoneNumber;


}
