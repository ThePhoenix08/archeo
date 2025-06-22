package com.archeo.server.modules.user.models;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.enums.VERIFICATION_STATUS;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "organization")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersCommon user;

    @Column(name = "organization_name", nullable = false, length = 100)
    private String organizationName;

    @Column(name = "organization_type", length = 50)
    private String organizationType;

    // If you want multiple domains
    @ElementCollection
    @CollectionTable(name = "organization_domains", joinColumns = @JoinColumn(name = "organization_id"))
    @Column(name = "domain")
    private List<String> organizationDomains;

    @Column(name = "contact_name", length = 100)
    private String contactName;

    @Column(name = "contact_email", length = 100)
    private String contactEmail;

    @Column(name = "contact_phone", length = 20)
    private String contactPhone;

    @Column(name = "identity_proof")
    private String identityProof;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 20)
    private VERIFICATION_STATUS verificationStatus = VERIFICATION_STATUS.PENDING;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
}
