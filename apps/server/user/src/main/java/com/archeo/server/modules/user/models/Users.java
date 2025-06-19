package com.archeo.server.modules.user.models;

import com.archeo.common.enums.USER_ROLE;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.TypeDef;



import java.sql.Timestamp;
import java.util.Map;

@Entity
@Data
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
@Table(name = "users")
public class Users {

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

    @Type(type = "jsonb") // Requires Hibernate Types library
    @Column(columnDefinition = "jsonb", nullable = false)
    private Map<String, Object> attributes = Map.of(); // Java 11+ immutable empty map

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
}
