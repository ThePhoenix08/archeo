package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.models.AuthLogs;
import com.archeo.server.modules.auth.repositories.AuthLogsRepo;
import com.archeo.server.modules.common.dto.ApiSuccessResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogoutService {

    private final AuthLogsRepo authLogsRepository;

    public ResponseEntity<ApiSuccessResponse<String>> logout(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = extractRefreshTokenFromCookie(request);

        if (refreshToken == null || refreshToken.isBlank()) {
            ApiSuccessResponse<String> errorResponse = ApiSuccessResponse.<String>builder()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .message("Refresh token is missing")
                    .data(null)
                    .build();
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        Optional<AuthLogs> authLogOpt = authLogsRepository.findByRefreshToken(refreshToken);
        if (authLogOpt.isEmpty()) {
            ApiSuccessResponse<String> errorResponse = ApiSuccessResponse.<String>builder()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .message("No session found for the given refresh token")
                    .data(null)
                    .build();
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        authLogsRepository.delete(authLogOpt.get());

        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        ApiSuccessResponse<String> successResponse = ApiSuccessResponse.<String>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Logged out successfully.")
                .data(null)
                .build();

        return new ResponseEntity<>(successResponse, HttpStatus.OK);
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if ("refreshToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
