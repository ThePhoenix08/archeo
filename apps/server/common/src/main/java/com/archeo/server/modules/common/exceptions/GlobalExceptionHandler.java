package com.archeo.server.modules.common.exceptions;

import com.archeo.server.modules.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return buildResponse(HttpStatus.CONFLICT, "USER_ALREADY_EXISTS", "user_exists", ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidCredentials(InvalidCredentialsException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "invalid_login", ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserNotFound(UserNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "user_not_found", ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ApiResponse<Object>> handleUnauthorized(UnauthorizedAccessException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "unauthorized", ex.getMessage());
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidToken(Exception ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "expired_token", ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "server_error", ex.getMessage());
    }



    private ResponseEntity<ApiResponse<Object>> buildResponse(HttpStatus status, String errorType, String slug, String message) {
        ApiResponse<Object> response = ApiResponse.builder()
                .statusCode(status.value())
                .message(message)
                .errorType(errorType)
                .slug(slug)
                .data(null)
                .build();
        return new ResponseEntity<>(response, status);
    }
}
