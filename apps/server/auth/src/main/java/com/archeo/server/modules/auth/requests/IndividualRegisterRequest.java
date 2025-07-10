package com.archeo.server.modules.auth.requests;

import com.archeo.server.modules.common.enums.AgentRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class IndividualRegisterRequest {

    @NotBlank(message = "Agent type is required")
    private String agentType; // Should be "individual"

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth; // ISO format e.g. "2000-01-01"

    @NotEmpty(message = "At least one role must be specified")
    private List<AgentRole> agentRole;
}
