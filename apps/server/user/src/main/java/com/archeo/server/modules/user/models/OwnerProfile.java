package com.archeo.server.modules.user.models;

import com.archeo.server.modules.common.models.UsersCommon;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "owner_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersCommon user;

    @Column(nullable = false, length = 50)
    private String username;

    @Email
    @Column(nullable = false, length = 100)
    private String email;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    private LocalDate dob;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private String bio; 

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
