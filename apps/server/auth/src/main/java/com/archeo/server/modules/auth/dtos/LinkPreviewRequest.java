package com.archeo.server.modules.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LinkPreviewRequest {
    @NotBlank(message = "URL must not be blank")
    private String url;
}
