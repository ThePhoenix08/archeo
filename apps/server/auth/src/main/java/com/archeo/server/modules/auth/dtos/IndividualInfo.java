package com.archeo.server.modules.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IndividualInfo {
    private String userId;
    private String username;
    private String email;
    private String fullName;
    private String dateOfBirth;
    private String gender;
    private String address;
    private String phone;
    private String avatar;
    private String profession;
    private String bio;
    private String[] roles;
    private boolean mfaRequired;
    private boolean registerIncomplete;
    private String lastLoginAt;
    private String createdAt;
}
