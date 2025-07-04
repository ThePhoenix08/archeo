package com.archeo.server.modules.user.dtos;

import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.enums.VERIFICATION_STATUS;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class OrganizationRegisterResponse {

    private UUID id;

    private UsersCommon user;

    private String organizationName;

    private String organizationType;

    private String organizationIdentificationNumber;

    private List<String> organizationDomains;

    private String contactName;

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

    private VERIFICATION_STATUS verificationStatus;

    private String email; // From UsersCommon
}
