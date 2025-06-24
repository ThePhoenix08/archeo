package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dtos.OwnerProfileDTO;
import com.archeo.server.modules.user.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {


    private final UsersCommonRepository usersCommonRepository;
    private final ProfileService profileService;

    @GetMapping ("/getOwner")
    public ResponseEntity<OwnerProfileDTO> getOwnerProfile() {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Email:"+email);

        UsersCommon user= usersCommonRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        OwnerProfileDTO profileDTO=profileService.getOwnerProfile(user);
        return new ResponseEntity<>(profileDTO, HttpStatus.FOUND);

    }
}

