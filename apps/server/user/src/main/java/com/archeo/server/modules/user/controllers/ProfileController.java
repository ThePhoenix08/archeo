package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.OwnerProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
import com.archeo.server.modules.user.dtos.UpdateOwnerProfileRequest;
import com.archeo.server.modules.user.services.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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

    @PutMapping("/updateOwner")
    public ResponseEntity<String> updateOwnerProfile(
            @Valid @RequestBody UpdateOwnerProfileRequest updateOwnerProfile,
            Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        String userEmail = principal.getName();
        profileService.updateOwnerProfile(userEmail, updateOwnerProfile);
        return new ResponseEntity<>("Owner Profile updated successfully", HttpStatus.OK);
    }

    @GetMapping ("/getOrganization")
    public ResponseEntity<OrganizationProfileDTO> getOrganizationProfile(Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);
        }

        String orgEmail = principal.getName();


        OrganizationProfileDTO profileDTO=profileService.getOrganizationProfile(orgEmail);
        return new ResponseEntity<>(profileDTO, HttpStatus.FOUND);

    }

    @PutMapping ("/updateOrganization")
    public ResponseEntity<String> updateOrganizationProfile(
            @Valid @RequestBody UpdateOrganizationProfileRequest updateOrganizationProfileRequest,
            Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);
        }

        String orgEmail = principal.getName();


        profileService.updateOrganizationProfile(updateOrganizationProfileRequest,orgEmail);
        return new ResponseEntity<>("Organization Profile updated successfully", HttpStatus.OK);

    }



}

