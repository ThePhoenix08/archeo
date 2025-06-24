package com.archeo.server.modules.auth.services;


import com.archeo.server.modules.auth.dtos.LinkPreviewRequest;
import com.archeo.server.modules.auth.models.LinkPreviewResponse;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URL;

@Service
@Slf4j
public class LinkPreviewService {

    public LinkPreviewResponse fetchPreview(LinkPreviewRequest request) {
        try {
            Document doc = Jsoup.connect(request.getUrl())
                    .userAgent("Mozilla/5.0")
                    .timeout(5000)
                    .followRedirects(true)
                    .get();

            String title = getMetaTag(doc, "og:title", "title");
            String description = getMetaTag(doc, "og:description", "description");
            String image = getMetaTag(doc, "og:image", null);
            String favicon = getFavicon(doc, request.getUrl());

            return LinkPreviewResponse.builder()
                    .title(title)
                    .description(description)
                    .image(image)
                    .favicon(favicon)
                    .url(request.getUrl())
                    .build();

        } catch (Exception e) {
            log.error("Failed to fetch preview for URL: " + request.getUrl(), e);
            throw new RuntimeException("Unable to fetch metadata. URL might be invalid or unreachable.");
        }
    }

    private String getMetaTag(Document doc, String ogTag, String fallbackName) {
        Element tag = doc.selectFirst("meta[property=" + ogTag + "]");
        if (tag != null) return tag.attr("content");

        if (fallbackName != null) {
            Element fallback = doc.selectFirst("meta[name=" + fallbackName + "]");
            if (fallback != null) return fallback.attr("content");
        }

        if (ogTag.equals("og:title") && doc.title() != null) return doc.title();

        return null;
    }

    private String getFavicon(Document doc, String baseUrl) {
        Element icon = doc.selectFirst("link[rel~=(?i)^(shortcut|icon|shortcut icon)]");
        if (icon != null) return resolveUrl(baseUrl, icon.attr("href"));
        try {
            URI uri = new URI(baseUrl);
            return uri.getScheme() + "://" + uri.getHost() + "/favicon.ico";
        } catch (Exception e) {
            return null;
        }
    }

    private String resolveUrl(String baseUrl, String relativePath) {
        try {
            URL base = new URL(baseUrl);
            return new URL(base, relativePath).toString();
        } catch (Exception e) {
            return null;
        }
    }
}
