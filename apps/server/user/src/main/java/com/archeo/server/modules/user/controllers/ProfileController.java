package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dtos.OwnerProfileDTO;
import com.archeo.server.modules.user.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class OwnerProfileController {


    private final UsersCommonRepository usersCommonRepository;
    private final ProfileService profileService;

    @PostMapping("/getOwner")
    public ResponseEntity<OwnerProfileDTO> getOwnerProfile() {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UsersCommon> user= Optional.ofNullable(usersCommonRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found")));

        OwnerProfileDTO profileDTO=profileService.getOwnerProfile(user.get());
        return new ResponseEntity<>(profileDTO, HttpStatus.FOUND);

    }
}

