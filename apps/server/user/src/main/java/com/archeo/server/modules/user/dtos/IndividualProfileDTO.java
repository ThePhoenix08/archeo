package com.archeo.server.modules.user.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IndividualProfileDTO {

//    private String username;

//    private String email;

    private String fullName;

    private String phoneNumber;

    private LocalDate dob;

    private String address;

    private String avatarUrl;

    private String bio;

    private LocalDate updatedAt;
}
