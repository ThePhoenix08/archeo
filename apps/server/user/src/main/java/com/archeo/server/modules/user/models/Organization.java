
package com.archeo.server.modules.user.models;


import com.archeo.server.modules.common.enums.AgentRole;
import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.enums.ProofDocumentType;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.enums.ApprovalStatus;
import jakarta.persistence.*;
        import lombok.*;
        import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "organizations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organization {

    @Id
    @GeneratedValue
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id", nullable = false, unique = true)
    private Agent agent;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "organization_permissions", joinColumns = @JoinColumn(name = "organization_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "permission")
    private List<Permission> permissions;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "organization_roles", joinColumns = @JoinColumn(name = "organization_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "agent_role", nullable = false)
    private List<AgentRole> agentRole;

    @Column(name = "organization_name", nullable = false, length = 100)
    private String organizationName;

    @Column(name = "organization_type", length = 100)
    private String organizationType;

    @Column(name = "organization_id_number")
    private String organizationIdNumber;

    @ElementCollection
    @CollectionTable(name = "organization_domains", joinColumns = @JoinColumn(name = "organization_id"))
    @Column(name = "domain")
    private List<String> organizationDomains;

    @Column(name = "contact_name", length = 100)
    private String contactName;

    @Column(name = "contact_phone", length = 20)
    private String contactPhone;

    @Column(name = "contact_designation", length = 100)
    private String contactDesignation;

    @Enumerated(EnumType.STRING)
    @Column(name = "proof_doc_type", nullable = false)
    private ProofDocumentType proofDocType;

    @Column(name = "proof_file_name")
    private String proofFileName;

    @Column(name = "proof_file_url")
    private String proofFileUrl;

    @Column(name = "web_url")
    private String webUrl;

    @ElementCollection
    @CollectionTable(name = "organization_office_address", joinColumns = @JoinColumn(name = "organization_id"))
    @Column(name = "address_line")
    private List<String> officeAddress;

    @Column(name = "logo")
    private String logo;

    @Column(name = "description")
    private String description;

    @Column(name = "purpose")
    private String purpose;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status", nullable = false, length = 20)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @Column(name = "approval_date")
    private Instant approvalDate;

    @Column(name = "is_owner")
    private boolean isOwner = false;

    @Column(name = "is_issuer")
    private boolean isIssuer = false;

    @Column(name = "is_verifier")
    private boolean isVerifier = false;

    @Column(name = "is_api_access_enabled")
    private boolean isApiAccessEnabled = false;

    @Column(name = "mfa_required")
    private boolean mfaRequired = false;

    @Column(name = "register_incomplete")
    private boolean registerIncomplete = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}

