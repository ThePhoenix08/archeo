

package com.archeo.server.modules.user.models;

import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.enums.USER_ROLE;
import com.archeo.server.modules.common.models.UsersCommon;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "owner")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name="full_name" , nullable = false, length = 300)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Permission> permissions;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private USER_ROLE userRole = USER_ROLE.ROLE_OWNER;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name="phone_number")
    private String phoneNumber;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersCommon user;

    @Column(name = "avatar_url")
    private String avatarUrl;

//    @Column(name="bio")
//    private String bio;

    @Column(name="address")
    private String address;

    @Column(name="profession")
    private String profession;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
