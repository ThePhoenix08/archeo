package com.archeo.server.modules.auth.models;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class LinkPreviewResponse {

    @Id
    private UUID id;

    private String title;
    private String description;
    private String image;
    private String favicon;
    private String url;
}
