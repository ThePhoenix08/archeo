package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.common.dto.ApiSuccessResponse;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.dtos.IndividualProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateIndividualProfileRequest;
import com.archeo.server.modules.user.models.Individual;
import com.archeo.server.modules.user.repositories.AgentRepository;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
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

    private final AgentRepository agentRepository;
    private final ProfileService profileService;

    @GetMapping("/getOwner")
    public ResponseEntity<ApiSuccessResponse<IndividualProfileDTO>> getOwnerProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Agent agent = agentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        IndividualProfileDTO profileDTO = profileService.getIndividualProfile(agent);
        return ResponseEntity.ok(
                ApiSuccessResponse.<IndividualProfileDTO>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Owner profile fetched successfully")
                        .data(profileDTO)
                        .build()
        );
    }

    @PutMapping("/updateOwner")
    public ResponseEntity<ApiSuccessResponse<String>> updateOwnerProfile(
            @Valid @RequestBody UpdateIndividualProfileRequest updateOwnerProfile,
            Principal principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    ApiSuccessResponse.<String>builder()
                            .statusCode(HttpStatus.UNAUTHORIZED.value())
                            .message("Unauthorized")
//                            .errorType("AUTH_ERROR")
                            .build()
            );
        }

        String userEmail = principal.getName();
        profileService.updateIndividualProfile(userEmail, updateOwnerProfile);

        return ResponseEntity.ok(
                ApiSuccessResponse.<String>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Owner profile updated successfully")
                        .data("Updated profile for: " + userEmail)
                        .build()
        );
    }

    @GetMapping("/getOrganization")
    public ResponseEntity<ApiSuccessResponse<OrganizationProfileDTO>> getOrganizationProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    ApiSuccessResponse.<OrganizationProfileDTO>builder()
                            .statusCode(HttpStatus.UNAUTHORIZED.value())
                            .message("Unauthorized")
//                            .errorType("AUTH_ERROR")
                            .build()
            );
        }

        String orgEmail = principal.getName();
        OrganizationProfileDTO profileDTO = profileService.getOrganizationProfile(orgEmail);

        return ResponseEntity.ok(
                ApiSuccessResponse.<OrganizationProfileDTO>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Organization profile fetched successfully")
                        .data(profileDTO)
                        .build()
        );
    }

    @PutMapping("/updateOrganization")
    public ResponseEntity<ApiSuccessResponse<String>> updateOrganizationProfile(
            @Valid @RequestBody UpdateOrganizationProfileRequest updateRequest,
            Principal principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    ApiSuccessResponse.<String>builder()
                            .statusCode(HttpStatus.UNAUTHORIZED.value())
                            .message("Unauthorized")
//                            .errorType("AUTH_ERROR")
                            .build()
            );
        }

        String orgEmail = principal.getName();
        profileService.updateOrganizationProfile(updateRequest, orgEmail);

        return ResponseEntity.ok(
                ApiSuccessResponse.<String>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Organization profile updated successfully")
                        .data("Updated profile for: " + orgEmail)
                        .build()
        );
    }
}
