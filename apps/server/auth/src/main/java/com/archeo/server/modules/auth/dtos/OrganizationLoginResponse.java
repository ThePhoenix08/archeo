package com.archeo.server.modules.auth.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class OrganizationLoginResponse {

    private UUID id;
    private String username;
    private String email;
    private String organizationName;
    private String organizationType;
    private List<String> organizationDomains;
    private String logo;

}
