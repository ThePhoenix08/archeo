package com.archeo.server.modules.auth.dtos;

import com.archeo.server.modules.common.enums.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {


    private USER_ROLE userRole;

}
