package com.archeo.server.modules.user.models;


import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.enums.NotificationType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Table(name="user_notification")
public class UserNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
