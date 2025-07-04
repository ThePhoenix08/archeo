package com.archeo.server.modules.user.dtos;

import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.enums.USER_ROLE;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class OrganizationRegisterRequest {

    @NotBlank
    @Size(max = 100)
    private String organizationName;

    @Size(max = 50)
    private String organizationType;

    @NotNull(message = "User role must be specified")
    private List<USER_ROLE> userRole;

    private String organizationIdentificationNumber;

    private List<String> organizationDomains;

    @NotBlank
    @Size(max = 100)
    private String contactName;

    @Size(max = 20)
    private String contactPhone;

    private String contactDesignation;

    private String identityProof;

    private String webUrl;

    private String address;

    private String logo;

    private String description;

    private String purpose;

    private List<Permission> permissions;

    private boolean isOwner;
    private boolean isIssuer;
    private boolean isVerifier;
    private boolean isApiAccessEnabled;
}
