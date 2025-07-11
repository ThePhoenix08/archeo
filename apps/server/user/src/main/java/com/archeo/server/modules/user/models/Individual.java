

package com.archeo.server.modules.user.models;


import com.archeo.server.modules.common.enums.AgentRole;
import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.models.Agent;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Getter
@Setter
@Table(name = "individuals")
public class Individual {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "full_name", length = 300)
    private String fullName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "profession")
    private String profession;

    @Column(name = "bio", length = 1000)
    private String bio;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "individual_roles", joinColumns = @JoinColumn(name = "individual_id"))
    @Column(name = "agent_role", nullable = false)
    private List<AgentRole> agentRole;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "individual_permissions", joinColumns = @JoinColumn(name = "individual_id"))
    @Column(name = "permission")
    private List<Permission> permissions;

    @Column(name = "mfa_required")
    private boolean mfaRequired = false;

    @Column(name = "register_incomplete")
    private boolean registerIncomplete = true;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id",  unique = true)
    private Agent agent;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}