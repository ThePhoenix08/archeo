package com.archeo.server.modules.auth.models;


import com.archeo.server.modules.common.models.UsersCommon;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "auth_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthLogs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UsersCommon usersCommon;

    @Column(name = "refresh_token", nullable = false, length = 255)
    private String refreshTokenHash;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "user_agent", length = 255)
    private String userAgent;


    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;



}
