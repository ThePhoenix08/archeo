

package com.archeo.server.modules.user.models;

import com.archeo.server.modules.common.models.UsersCommon;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "owner")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name="full_name" , nullable = false, length = 300)
    private String fullName;


    @Column(name = "dob")
    private LocalDate dob;

    @Column(name="phone_number")
    private String phoneNumber;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersCommon user;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name="bio")
    private String bio;

    @Column(name="address")
    private String address;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
