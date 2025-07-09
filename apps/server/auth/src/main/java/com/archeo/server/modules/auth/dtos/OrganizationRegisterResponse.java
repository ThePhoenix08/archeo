package com.archeo.server.modules.auth.dtos;

import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.enums.VERIFICATION_STATUS;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class OrganizationRegisterResponse {

    private UUID id;

    private Agent agent;

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


    private boolean isOwner;
    private boolean isIssuer;
    private boolean isVerifier;
    private boolean isApiAccessEnabled;

    private VERIFICATION_STATUS verificationStatus;

    private String email; // From UsersCommon
}
