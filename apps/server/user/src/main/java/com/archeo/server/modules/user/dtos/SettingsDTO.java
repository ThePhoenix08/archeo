package com.archeo.server.modules.user.dtos;

import com.archeo.server.modules.user.enums.NotificationType;
import com.archeo.server.modules.user.enums.ThemePreference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SettingsDTO {
    private String language;
    private ThemePreference themePreference;
    private boolean notificationsEnabled;
    private NotificationType notificationType;
}
