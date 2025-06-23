package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dto.OwnerProfileRequestDTO;
import com.archeo.server.modules.user.models.OwnerProfile;
import com.archeo.server.modules.user.repositories.OwnerProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OwnerProfileService {

    @Autowired
    private OwnerProfileRepo ownerProfileRepository;

    @Autowired
    private UsersCommonRepository usersCommonRepository;

    public OwnerProfile createProfileOnFirstLogin(OwnerProfileRequestDTO dto) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        UsersCommon user = usersCommonRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<OwnerProfile> existing = ownerProfileRepository.findByUser(user);
        if (existing.isPresent()) {
            throw new RuntimeException("Profile already exists");
        }

        OwnerProfile profile = new OwnerProfile();
        profile.setUser(user);
        profile.setUsername(user.getUsername());
        profile.setEmail(user.getEmail());
        profile.setFullName(dto.getFullName());
        profile.setPhoneNumber(dto.getPhoneNumber());
        profile.setDob(dto.getDob());
        profile.setAddress(dto.getAddress());
        profile.setAvatarUrl(dto.getAvatarUrl());
        profile.setBio(dto.getBio());
        profile.setUpdatedAt(LocalDateTime.now());

        return ownerProfileRepository.save(profile);
    }
}

