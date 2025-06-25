package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dtos.SettingsDTO;
import com.archeo.server.modules.user.models.Settings;
import com.archeo.server.modules.user.repositories.SettingsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {
    @Autowired
    private SettingsRepo settingsRepository;

    @Autowired
    private UsersCommonRepository usersCommonRepository;

    private UsersCommon getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return usersCommonRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Settings getUserSettings() {
        UsersCommon user = getCurrentUser();

        return settingsRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Settings not found for user"));
    }

    public Settings updateUserSettings(SettingsDTO dto) {
        UsersCommon user = getCurrentUser();

        Settings settings = settingsRepository.findByUser(user)
                .orElseGet(() -> {
                    Settings s = new Settings();
                    s.setUser(user);
                    return s;
                });

        if (dto.getLanguage() != null) settings.setLanguage(dto.getLanguage());
        if (dto.getThemePreference() != null) settings.setThemePreference(dto.getThemePreference());
        settings.setNotificationsEnabled(dto.isNotificationsEnabled());
        if (dto.getNotificationType() != null) settings.setNotificationType(dto.getNotificationType());

        return settingsRepository.save(settings);
    }
}
