# Client Expects / API Contract

## Overview

This document outlines the expected requests and responses from the client to the server. This is a living document and will be updated as the project evolves.

## Requests

dummy request example

```json
{
  "method": "GET",
  "url": "/api/v1/users",
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

## Responses

### Success Response

[Schema in Client](../apps/client/src/shared/validators/apiResponse.validator.js)

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success Message specifies the success of the request",
  "data": {
    // data requested
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

### Error Response

[Schema in Client](../apps/client/src/shared/validators/apiResponse.validator.js)

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error Message specifies the error of the request",
  "errorType": "Error Type specifies the type of error",
  "slug": "Error Slug specifies the slug of the error",
  "errors": ["Error 1", "Error 2"]
}
```

## Global

### Health Check

`GET /health`

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Server is healthy",
  "data": {
    // server status
    "status": "UP", // or DOWN

    // health status and details components
    "details": {
      "diskSpace": {
        "status": "UP",
        "details": {}
      },
      "db": {
        "status": "UP",
        "details": {}
      },
    }
  }
}
```

## Authentication

### Login

`POST /auth/login`

#### Request

[Schema in Client](../apps/client/src/features/auth/validators/authApi.validator.js)

```json
{
  "identifier": "john.doe@example.com", // or johndoe123
  "type": "email", // or username
  "password": "password",
  "rememberMe": true, // auto login (optional)
  "otpCode": "123456", // MFA (optional)
  "loginMethod": "password" // Manual or Google (optional)
}
```

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "id": "", // uuid, user id
    "name": "John Doe",
    "email": "john.doe@example.com",
    "roles": ["admin", "user"], // user roles,
    "token": "", // jwt token
    "mfaRequired": false, // MFA required
    "registerIncomplete": false // registration incomplete
  }
}
```

### Register

`POST /auth/register`

#### Request

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password"
}
```

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success Message specifies the success of the request",
  "data": {
    // data requested
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```