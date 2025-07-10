package com.archeo.server.modules.auth.responses;

import com.archeo.server.modules.auth.dtos.OrganizationInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationRegisterResponse {

    private String agentType;
    private OrganizationInfo user;
}