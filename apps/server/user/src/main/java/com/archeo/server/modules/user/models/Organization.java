package com.archeo.server.modules.user.models;

import com.archeo.server.modules.common.enums.AGENT_ROLE;
import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.enums.VERIFICATION_STATUS;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "organization")
public class Organization {

    @Id
    @GeneratedValue
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id", nullable = false, unique = true)
    private Agent agent;


    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Permission> permissions;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "owner_roles", joinColumns = @JoinColumn(name = "organization_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "sgent_role", nullable = false)
    private List<AGENT_ROLE> agentRole;


    @Column(name = "organization_name", nullable = false, length = 100)
    private String organizationName;

    @Column(name = "organization_type", length = 50)
    private String organizationType;

//    @Column(name="org_identification_number")
//    private String organizationIdentificationNumber;

    @ElementCollection
    @CollectionTable(name = "organization_domains", joinColumns = @JoinColumn(name = "organization_id"))
    @Column(name = "domain")
    private List<String> organizationDomains;

    @Column(name = "contact_name", length = 100)
    private String contactName;

//    @Column(name = "contact_email", length = 100)
//    private String contactEmail;

    @Column(name = "contact_phone", length = 20)
    private String contactPhone;

    @Column(name = "contact_designation")
    private String contactDesignation;

    @Column(name = "identity_proof")
    private String identityProof;

    @Column(name = "web_url")
    private String webUrl;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 20)
    private VERIFICATION_STATUS verificationStatus = VERIFICATION_STATUS.PENDING;

    @Column(name = "logo")
    private String logo;

    @Column(name="description")
    private String description;


    @Column(name="purpose")
    private String purpose;

    @Column(name = "is_owner")
    private boolean isOwner = false;

    @Column(name = "is_issuer")
    private boolean isIssuer = false;

    @Column(name = "is_verifier")
    private boolean isVerifier = false;


    @Column(name = "is_api_access_enabled")
    private boolean isApiAccessEnabled = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
