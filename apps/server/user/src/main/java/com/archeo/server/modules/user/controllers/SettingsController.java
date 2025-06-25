package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.user.dtos.SettingsDTO;
import com.archeo.server.modules.user.services.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile/settings")
public class SettingsController {
    @Autowired
    private SettingsService settingsService;

    @GetMapping
    public ResponseEntity<?> getUserSettings() {
        try {
            return ResponseEntity.ok(settingsService.getUserSettings());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> updateUserSettings(@RequestBody SettingsDTO dto) {
        return ResponseEntity.ok(settingsService.updateUserSettings(dto));
    }
}
