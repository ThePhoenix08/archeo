package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.repositories.AgentRepository;
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
    private AgentRepository agentRepository;

    private Agent getCurrentAgent() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return agentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Settings getUserSettings() {
        Agent agent=getCurrentAgent();

        return settingsRepository.findByAgent(agent)
                .orElseThrow(() -> new RuntimeException("Settings not found for user"));
    }

    public Settings updateUserSettings(SettingsDTO dto) {
        Agent agent = getCurrentAgent();

        Settings settings = settingsRepository.findByAgent(agent)
                .orElseGet(() -> {
                    Settings s = new Settings();
                    s.setAgent(agent);
                    return s;
                });

        if (dto.getLanguage() != null) settings.setLanguage(dto.getLanguage());
        if (dto.getThemePreference() != null) settings.setThemePreference(dto.getThemePreference());
        settings.setNotificationsEnabled(dto.isNotificationsEnabled());
        if (dto.getNotificationType() != null) settings.setNotificationType(dto.getNotificationType());

        return settingsRepository.save(settings);
    }
}
