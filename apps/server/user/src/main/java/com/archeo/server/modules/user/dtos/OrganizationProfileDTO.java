package com.archeo.server.modules.user.dtos;

import com.archeo.server.modules.user.enums.VERIFICATION_STATUS;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationProfileDTO {


    private String organizationName;
    private String organizationType;
    private List<String> organizationDomains;

    private String contactName;
    private String contactEmail;
    private String contactPhone;

    private String identityProof;
    private String webUrl;
    private String address;

    private VERIFICATION_STATUS verificationStatus;

    private String avatarUrl;
    private String bio;



}
