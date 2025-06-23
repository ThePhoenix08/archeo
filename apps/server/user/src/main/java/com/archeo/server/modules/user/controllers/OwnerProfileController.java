package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.user.dto.OwnerProfileRequestDTO;
import com.archeo.server.modules.user.models.OwnerProfile;
import com.archeo.server.modules.user.services.OwnerProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/owner")
public class OwnerProfileController {

    @Autowired
    private OwnerProfileService ownerProfileService;

    @PostMapping("/profile")
    public ResponseEntity<?> createProfile(@Valid @RequestBody OwnerProfileRequestDTO dto) {
        OwnerProfile profile = ownerProfileService.createProfileOnFirstLogin(dto);
        return ResponseEntity.ok(profile);
    }
}

