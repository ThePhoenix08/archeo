package com.archeo.server.modules.common.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {
    private int statusCode;
    private String message;
    private String errorType;
    private String slug;
    private T data;
}
