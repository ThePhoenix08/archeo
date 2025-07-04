package com.archeo.server.modules.user.models;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.enums.NotificationType;
import com.archeo.server.modules.user.enums.ThemePreference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;


@Entity
@Table(name = "user_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Settings {
    @Id
    @GeneratedValue
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersCommon user;

    @Column(length = 10)
    private String language = "English";

    @Enumerated(EnumType.STRING)
    @Column(name = "theme_preference", length = 10)
    private ThemePreference themePreference = ThemePreference.SYSTEM;

    @Column(name = "notifications_enabled")
    private boolean notificationsEnabled = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", length = 10)
    private NotificationType notificationType = NotificationType.IN_APP;
}
