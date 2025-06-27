package com.archeo.server.modules.common.enums;

public enum ErrorType {

    // Authentication-related errors
    INVALID_CREDENTIALS,
    UNAUTHORIZED,
    TOKEN_EXPIRED,
    ACCESS_DENIED,

    // User-related errors
    USER_NOT_FOUND,
    USER_ALREADY_EXISTS,
    INVALID_USER_DETAILS,

    // Organization-related errors
    ORG_NOT_FOUND,
    ORG_ALREADY_REGISTERED,

    // Validation
    BAD_REQUEST,
    VALIDATION_ERROR,

    // Server-side issues
    INTERNAL_SERVER_ERROR,
    SERVICE_UNAVAILABLE,
    DATABASE_ERROR,

    // Profile update
    PROFILE_UPDATE_FAILED,

    // Default fallback
    UNKNOWN_ERROR
}
