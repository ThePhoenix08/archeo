package com.archeo.server.modules.common.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiSuccessResponse<T> {

    private boolean success;
    private int statusCode;
    private String message;
    private T data;
}
