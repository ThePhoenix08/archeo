package com.archeo.server.modules.auth.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LinkPreviewResponse {
    private String title;
    private String description;
    private String image;
    private String favicon;
    private String url;
}
