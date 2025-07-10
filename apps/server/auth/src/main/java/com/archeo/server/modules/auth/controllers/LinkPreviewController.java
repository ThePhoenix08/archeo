package com.archeo.server.modules.auth.controllers;

import com.archeo.server.modules.auth.models.LinkPreviewResponse;
import com.archeo.server.modules.auth.requests.LinkPreviewRequest;
import com.archeo.server.modules.auth.services.LinkPreviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/link-preview")
@RequiredArgsConstructor
public class LinkPreviewController {

    private final LinkPreviewService linkPreviewService;

    @PostMapping
    public ResponseEntity<LinkPreviewResponse> preview(@Valid @RequestBody LinkPreviewRequest request) {
        LinkPreviewResponse response = linkPreviewService.fetchPreview(request);
        return ResponseEntity.ok(response);
    }
}
