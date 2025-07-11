package com.archeo.server.modules.auth.responses;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class OwnerLoginResponse {

    private UUID id;
    private String username;
    private String email;
    private String fullName;
    private LocalDate dob;
    private String phoneNumber;
}
