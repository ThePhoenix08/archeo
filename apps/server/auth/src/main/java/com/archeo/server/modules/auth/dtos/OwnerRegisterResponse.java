package com.archeo.server.modules.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerRegisterResponse {

    private UUID id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private List<String> agentRole;


}
