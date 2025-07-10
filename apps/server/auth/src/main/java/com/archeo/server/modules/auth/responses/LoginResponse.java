package com.archeo.server.modules.auth.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse<T> {
    private boolean success;
    private int statusCode;
    private String message;
    private LoginData<T> data;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginData<T> {
        private String token;
        private String agentType;
        private T user;
    }
}
