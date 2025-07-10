package com.archeo.server.modules.auth.requests;

import com.archeo.server.modules.common.enums.AgentRole;
import com.archeo.server.modules.common.enums.OrganizationType;
import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.enums.ProofDocumentType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationRegisterRequest {

    @NotBlank(message = "Agent type is required")
    private String agentType; // Should be "organization"

    @NotBlank(message = "Organization name is required")
    private String organizationName;

    @NotNull(message = "Organization type is required")
    private OrganizationType organizationType;

    @Pattern(regexp = "^(http(s)?://)?([\\w.-]+)(:[0-9]+)?(/.*)?$", message = "Invalid website URL")
    private String website;

    @Size(min = 3, max = 3, message = "Office address must contain exactly 3 address lines")
    @NotNull(message = "Office address is required")
    private List<@NotBlank(message = "Each address line must be non-empty") String> officeAddress;

    @NotBlank(message = "Contact person name is required")
    private String contactPersonName;

    @Size(min = 10, max = 15, message = "Contact phone must be between 10 and 15 characters")
    private String contactPhone;

    @NotBlank(message = "Contact designation is required")
    private String contactDesignation;

    @NotNull(message = "Proof document type is required")
    private ProofDocumentType proofDocType;



    @NotEmpty(message = "Roles are required")
    private List<AgentRole> roles;
}
