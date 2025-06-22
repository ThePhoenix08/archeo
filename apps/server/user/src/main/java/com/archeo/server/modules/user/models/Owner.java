

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
    @GeneratedValue(strategy = GenerationType.IDENTITY) // SERIAL in PostgreSQL
    private Long id;


    @Column(name="full_name" , nullable = false, length = 300)
    private String fullName;


    @Column(name = "dob")
    private LocalDate dob;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersCommon user;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
}
