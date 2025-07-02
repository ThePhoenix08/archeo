package com.archeo.server.modules.user.controllers;

import com.archeo.server.modules.common.dto.ApiResponse;
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

    @GetMapping("/getOwner")
    public ResponseEntity<ApiResponse<OwnerProfileDTO>> getOwnerProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UsersCommon user = usersCommonRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        OwnerProfileDTO profileDTO = profileService.getOwnerProfile(user);
        return ResponseEntity.ok(
                ApiResponse.<OwnerProfileDTO>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Owner profile fetched successfully")
                        .data(profileDTO)
                        .build()
        );
    }

    @PutMapping("/updateOwner")
    public ResponseEntity<ApiResponse<String>> updateOwnerProfile(
            @Valid @RequestBody UpdateOwnerProfileRequest updateOwnerProfile,
            Principal principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    ApiResponse.<String>builder()
                            .statusCode(HttpStatus.UNAUTHORIZED.value())
                            .message("Unauthorized")
                            .errorType("AUTH_ERROR")
                            .build()
            );
        }

        String userEmail = principal.getName();
        profileService.updateOwnerProfile(userEmail, updateOwnerProfile);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Owner profile updated successfully")
                        .data("Updated profile for: " + userEmail)
                        .build()
        );
    }

    @GetMapping("/getOrganization")
    public ResponseEntity<ApiResponse<OrganizationProfileDTO>> getOrganizationProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    ApiResponse.<OrganizationProfileDTO>builder()
                            .statusCode(HttpStatus.UNAUTHORIZED.value())
                            .message("Unauthorized")
                            .errorType("AUTH_ERROR")
                            .build()
            );
        }

        String orgEmail = principal.getName();
        OrganizationProfileDTO profileDTO = profileService.getOrganizationProfile(orgEmail);

        return ResponseEntity.ok(
                ApiResponse.<OrganizationProfileDTO>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Organization profile fetched successfully")
                        .data(profileDTO)
                        .build()
        );
    }

    @PutMapping("/updateOrganization")
    public ResponseEntity<ApiResponse<String>> updateOrganizationProfile(
            @Valid @RequestBody UpdateOrganizationProfileRequest updateRequest,
            Principal principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    ApiResponse.<String>builder()
                            .statusCode(HttpStatus.UNAUTHORIZED.value())
                            .message("Unauthorized")
                            .errorType("AUTH_ERROR")
                            .build()
            );
        }

        String orgEmail = principal.getName();
        profileService.updateOrganizationProfile(updateRequest, orgEmail);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Organization profile updated successfully")
                        .data("Updated profile for: " + orgEmail)
                        .build()
        );
    }
}
