package com.archeo.server.modules.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiErrorResponse {

    private boolean success;
    private int statusCode;
    private String message;
    private String errorType;
    private String slug;
    private List<Map<String, String>> errors;
}
