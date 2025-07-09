# Client Expects / API Contract

## Overview

This document outlines the expected requests and responses from the client to the server. This is a living document and will be updated as the project evolves.

## Global Response Format

### Validators
API RESPONSE FORMAT: `../apps/client/src/shared/validators/apiResponse.validator.js`
ENTITIES: `../apps/client/src/shared/validators/object.validator.js`
AUTH: `../apps/client/src/features/auth/validators/authApi.validator.js`

### Success Response

```json
{
  "success": true,
  "statusCode": 200, // 100-399
  "message": "Success Message specifies the success of the request",
  "data": {
    // data requested (varies by endpoint)
  }
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400, // 400-599
  "message": "Error Message specifies the error of the request",
  "errorType": "Error Type specifies the type of error",
  "slug": "Error Slug specifies the slug of the error",
  "errors": [{}, {}] // optional array of errors
}
```

## Authentication

### Login: `POST /auth/login`

#### Request

```json
{
  "identifier": "john.doe@example.com", // required, min 1 char
  "type": "email", // required, enum: ["email", "username"]
  "password": "password123", // required, min 6 chars
  "rememberMe": false, // optional, boolean, default: false
  "loginMethod": "password" // optional, enum: ["password", "google"]
}
```

#### Response (Individual)

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
    "agentType": "individual",
    "user": {
      "userId": "e7a9859a-489c-4f92-927c-fc0097aa9a2e", // UUID
      "username": "vighnesh123", // min 2 chars
      "email": "vighnesh@example.com", // valid email
      "fullName": "Vighnesh Brahme", // min 2 chars
      "dateOfBirth": "2000-01-01", // optional, ISO date
      "gender": "male", // optional, enum: ["male", "female", "other"]
      "address": "Pune, Maharashtra", // optional, min 1 char
      "phone": "+919999999999", // optional, min 10, max 15 chars
      "avatar": "https://cdn.domain.com/avatars/e7a9859a.png", // optional, URL
      "profession": "Software Engineer", // optional, min 1 char
      "bio": "Building systems that scale", // optional, min 1 char
      "roles": ["owner", "user"], // required, non-empty array of enums
      "mfaRequired": false, // boolean, default: false
      "registerIncomplete": false, // boolean, default: false
      "lastLoginAt": "2025-07-07T10:30:00Z", // optional, datetime
      "createdAt": "2025-07-06T14:00:00Z" // optional, datetime
    }
  }
}
```

**Roles Enum:** `["agent", "user", "owner", "issuer", "verifier", "verifier api consumer", "admin"]`

### Agent Registration: `POST /auth/register/agent`

#### Request

```json
{
  "username": "vighnesh123", // required, min 1 char
  "email": "vighnesh@example.com", // required, valid email
  "password": "password123" // required, min 6 chars
}
```

#### Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Agent registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
  }
}
```

### Individual Registration: `POST /auth/register/individual`

#### Request

```json
{
  "agentType": "individual", // required, literal: "individual"
  "fullName": "Vighnesh Brahme", // required, min 1 char
  "dateOfBirth": "2000-01-01", // required, ISO date
  "roles": ["owner", "user"] // required, non-empty array of role enums
}
```

#### Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Individual registration completed successfully",
  "data": {
    "agentType": "individual",
    "user": {
      // Same structure as individual login response user object
    }
  }
}
```

### Organization Registration: `POST /auth/register/organization`

#### Request

```json
{
  "agentType": "organization", // required, literal: "organization"
  "organizationName": "Mumbai Central HealthLab", // required, min 1 char
  "organizationType": "accredited lab / testing facility", // required, enum (see below)
  "website": "https://healthlab.org", // optional, valid URL
  "officeAddress": ["HealthLab Building", "Central Mumbai", "Mumbai, Maharashtra"], // required, array of 3 strings, each min 1 char
  "contactPersonName": "Dr. Priya Sharma", // optional, min 1 char
  "contactPhone": "+912233445566", // optional, min 10, max 15 chars
  "contactDesignation": "Lab Director", // optional, min 1 char
  "proofDocType": "Operational License", // required, enum (see below)
  "proofDocFile": file // required
  "roles": ["issuer", "agent"] // required, non-empty array of role enums
}
```

**Organization Type Enum:**
- `"government"`
- `"educational institution"`
- `"commercial entity"`
- `"non-governmental organization"`
- `"hospital / medical institution"`
- `"financial institution"`
- `"legal / judicial authority"`
- `"research & development body"`
- `"regulatory authority"`
- `"military / defense"`
- `"embassy / diplomatic mission"`
- `"accredited lab / testing facility"`
- `"utility / infrastructure provider"`
- `"training & certification body"`

**Proof Document Type Enum:**
- `"GST Certificate"`
- `"Company Incorporation Certificate"`
- `"Organization PAN Card"`
- `"Udyam / MSME Certificate"`
- `"NGO Registration Certificate"`
- `"Government Issuance Letter"`
- `"Operational License"`
- `"Tax Registration Document"`
- `"MOU with Government Body"`
- `"Regulatory Registration Certificate"`
- `"Insurance Certificate"`
- `"Letter of Consent / Authorization"`
- `"Identity Proof of Authorized Signatory"`
- `"Address Proof (Utility Bill, Rent Agreement)"`
- `"Business Registration Number Proof"`

#### Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Organization registration completed successfully",
  "data": {
    "agentType": "organization",
    "user": {
      "orgId": "d142f338-cc58-4a52-8a7d-778fb0d7a0b4", // UUID
      "username": "healthlab_mumbai", // min 2 chars
      "email": "admin@healthlab.org", // valid email
      "organizationName": "Mumbai Central HealthLab", // min 1 char
      "organizationType": "accredited lab / testing facility", // enum
      "organizationIdNumber": "HL12345", // optional, min 1 char
      "purpose": "Medical testing and diagnostics", // optional, min 1 char
      "description": "Accredited laboratory providing comprehensive medical testing services", // optional, min 1 char
      "logo": "https://cdn.domain.com/logos/healthlab.png", // optional, URL
      "website": "https://healthlab.org", // optional, URL
      "officeAddress": ["HealthLab Building", "Central Mumbai", "Mumbai, Maharashtra"], // array of 3 strings
      "contactPersonName": "Dr. Priya Sharma", // optional, min 1 char
      "contactPhone": "+912233445566", // optional, min 10, max 15 chars
      "contactDesignation": "Lab Director", // optional, min 1 char
      "approvalStatus": "pending", // enum: ["approved", "pending", "rejected"]
      "approvalDate": "2025-07-07T09:15:00Z", // optional, datetime
      "proofDocType": "Operational License", // enum
      "proofFileName": "operational_license.pdf", // optional, min 1 char
      "proofFileUrl": "https://cdn.domain.com/proofs/operational_license.pdf", // optional, URL
      "roles": ["issuer", "agent"], // required, non-empty array of role enums
      "mfaRequired": false, // boolean, default: false
      "registerIncomplete": true, // boolean, default: false
      "lastLoginAt": "2025-07-07T09:15:00Z", // optional, datetime
      "createdAt": "2025-07-07T09:15:00Z" // optional, datetime
    }
  }
}
```

### Refresh Token: `POST /auth/refresh`

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
  }
}
```

### Request OTP: `POST /auth/otp/send`

#### Request

```json
{
  "identifier": "vighnesh@example.com", // required, min 1 char
  "purpose": "emailVerification" // required, enum: ["emailVerification", "passwordReset", "multiFactor"]
}
```

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "OTP sent successfully",
  "data": {
    "verifyToken": "temp_verify_token_123" // min 1 char
  }
}
```

### Verify OTP: `POST /auth/otp/verify`

#### Request

```json
{
  "verifyToken": "temp_verify_token_123", // required, min 1 char
  "code": "123456" // required, exactly 6 chars
}
```

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "OTP verified successfully",
  "data": {
    "verifyToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
  }
}
```

### Username Availability: `GET /auth/verify/username`

#### Query Parameters

- `username` (required, min 1 char)

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Username availability checked",
  "data": {
    "available": true // boolean
  }
}
```

## Global

### Health Check: `GET /health`

#### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Server is healthy",
  "data": {
    "status": "UP", // or "DOWN"
    "details": {
      "diskSpace": {
        "status": "UP",
        "details": {}
      },
      "db": {
        "status": "UP",
        "details": {}
      }
    }
  }
}
```
