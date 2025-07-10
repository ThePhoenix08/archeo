package com.archeo.server.modules.auth.responses;

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
public class OrganizationLoginResponse {

    private UUID id;
    private String username;
    private String email;
    private String organizationName;
    private String organizationType;
    private List<String> organizationDomains;
    private String logo;

}
