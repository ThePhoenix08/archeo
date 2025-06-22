

package com.archeo.server.modules.common.models;

import com.archeo.server.modules.common.enums.USER_ROLE;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "users_common")
public class UsersCommon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // SERIAL in PostgreSQL
    private Long id;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private USER_ROLE userRole = USER_ROLE.ROLE_OWNER;



    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;


    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
}
