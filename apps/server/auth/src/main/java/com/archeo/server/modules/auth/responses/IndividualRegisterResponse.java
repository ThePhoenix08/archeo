package com.archeo.server.modules.auth.responses;

import com.archeo.server.modules.auth.dtos.IndividualInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IndividualRegisterResponse {


    private String agentType;
    private IndividualInfo user;
}
