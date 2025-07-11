package com.archeo.server.modules.auth.dtos;

import com.archeo.server.modules.common.enums.AgentRole;
import com.archeo.server.modules.common.enums.ProofDocumentType;
import com.archeo.server.modules.user.enums.ApprovalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationInfo {

    private UUID orgId;
    private String username;
    private String email;
    private String organizationName;
    private String organizationType;
    private String organizationIdNumber;
    private String purpose;
    private String description;
    private String logo;
    private String website;
    private List<String> officeAddress;
    private String contactPersonName;
    private String contactPhone;
    private String contactDesignation;
    private ApprovalStatus approvalStatus;
    private Instant approvalDate;
    private ProofDocumentType proofDocType;
    private String proofFileName;
    private String proofFileUrl;
    private List<AgentRole> roles;
    private boolean mfaRequired;
    private boolean registerIncomplete;
    private Instant lastLoginAt;
    private Timestamp createdAt;
}
