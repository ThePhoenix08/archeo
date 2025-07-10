package com.archeo.server.modules.auth.requests;

import com.archeo.server.modules.user.enums.OtpPurpose;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OtpSendRequest {

    @NotBlank(message = "Identifier is required")
    private String identifier;

    @NotNull(message = "Purpose is required")
    private OtpPurpose purpose;
}
