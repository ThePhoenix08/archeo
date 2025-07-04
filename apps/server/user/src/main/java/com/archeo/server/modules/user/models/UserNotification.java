package com.archeo.server.modules.user.models;


import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.enums.NotificationType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Data
@Table(name="user_notification")
public class UserNotification {

    @Id
    @GeneratedValue
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UsersCommon user;

    private String title;

    private String message;

    private boolean isRead;

    private NotificationType notificationType=NotificationType.IN_APP;

    @CreationTimestamp
    private Timestamp createdAt;
}
