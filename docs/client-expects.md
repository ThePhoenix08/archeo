# Client Expects / API Contract

## Overview

This document outlines the expected requests and responses from the client to the server. This is a living document and will be updated as the project evolves.

## Requests

dummy request base example

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
  "errors": [{}, {}] // array of error objects: DEV ONLY
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
### [🔗 Schema in Client](../apps/client/src/features/auth/validators/authApi.validator.js)

### Login: `POST /auth/login`

#### Request
```json
{
  "identifier": "john.doe@example.com", // or johndoe123
  "type": "email", // or username
  "password": "password",
  "rememberMe": true, // auto login (optional)
  "loginMethod": "password" // Manual or Google (optional)
}
```

#### Response

#### Individual
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": "e7a9859a-489c-4f92-927c-fc0097aa9a2e",
      "username": "vighnesh123",
      "email": "vighnesh@example.com",
      "fullName": "Vighnesh Brahme",
      "dateOfBirth": "2000-01-01",
      "gender": "male",
      "address": "Pune, Maharashtra",
      "phone": "+919999999999",
      "avatar": "https://cdn.domain.com/avatars/e7a9859a.png",
      "profession": "Software Engineer",
      "bio": "Building systems that scale",
      "roles": ["owner", "user"],
      "mfaRequired": false,
      "registerIncomplete": false,
      "lastLoginAt": "2025-07-07T10:30:00Z",
      "createdAt": "2025-07-06T14:00:00Z"
    },
    "agent": {
      "agentId": "6b93fe49-47b6-46c0-8d16-78b20bcb231a",
      "agentType": "individual"
    }
  }
}
```

#### Organization
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "orgId": "3f2f2602-2681-43ef-9370-1cf27c204df4",
      "username": "gov_pune",
      "email": "admin@gov.in",
      "organizationName": "Pune Municipal Corporation",
      "organizationType": "government",
      "organizationIdNumber": "PMC12345",
      "purpose": "Issue birth & death certificates",
      "description": "City civic body managing public services",
      "logo": "https://cdn.domain.com/logos/pmc.png",
      "website": "https://pmc.gov.in",
      "officeAddress": [
        "PMC Building",
        "Shivajinagar",
        "Pune, Maharashtra"
      ],
      "contactPersonName": "Rajesh Patil",
      "contactPhone": "+912022020202",
      "contactDesignation": "IT Head",
      "approvalStatus": "approved",
      "approvalDate": "2025-07-06T12:00:00Z",
      "proofDocType": "GST Certificate",
      "proofFileName": "gst_pmc.pdf",
      "proofFileUrl": "https://cdn.domain.com/proofs/gst_pmc.pdf",
      "roles": ["issuer", "admin"],
      "mfaRequired": true,
      "registerIncomplete": false,
      "lastLoginAt": "2025-07-07T08:20:00Z",
      "createdAt": "2025-07-05T10:00:00Z"
    },
    "agent": {
      "agentId": "baf9aa4d-f29c-4cf2-9492-f2cb71e3474b",
      "agentType": "individual"
    }
  }
}
```

### Register

#### Agent Registration: `POST /auth/register`

##### Request
```json
{
  "username": "vighnesh123",
  "email": "vighnesh@example.com",
  "password": "password123"
}
```

##### Response
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Agent registered successfully",
  "data": {
    "agentId": "6b93fe49-47b6-46c0-8d16-78b20bcb231a"
  }
}
```

#### Individual Registration: `POST /auth/register/individual`

##### Request
```json
{
  "agentId": "6b93fe49-47b6-46c0-8d16-78b20bcb231a",
  "agentType": "individual",
  "fullName": "Vighnesh Brahme",
  "dateOfBirth": "2000-01-01",
  "roles": ["owner", "user"]
}
```

##### Response
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Individual registration completed successfully",
  "data": {
    "user": {
      "userId": "cb7a59f6-c8c1-4dcd-ae71-7f2015b2f6ab",
      "username": "vighnesh123",
      "email": "vighnesh@example.com",
      "fullName": "Vighnesh Brahme",
      "dateOfBirth": "2000-01-01",
      "gender": "male",
      "address": "Pune, Maharashtra",
      "phone": "+919999999999",
      "avatar": "https://cdn.domain.com/avatars/cb7a59f6.png",
      "profession": "Software Engineer",
      "bio": "Building systems that scale",
      "roles": ["owner", "user"],
      "mfaRequired": false,
      "registerIncomplete": false,
      "lastLoginAt": "2025-07-07T09:00:00Z",
      "createdAt": "2025-07-07T09:00:00Z"
    },
    "agent": {
      "agentId": "6b93fe49-47b6-46c0-8d16-78b20bcb231a",
      "agentType": "individual"
    }
  }
}
```

#### Organization Registration: `POST /auth/register/organization`

##### Request
```json
{
  "agentId": "41f8d50c-3497-47aa-a59a-ff8be84a3a9e",
  "agentType": "organization",
  "organizationName": "Mumbai Central HealthLab",
  "organizationType": "accredited lab / testing facility",
  "website": "https://healthlab.org",
  "officeAddress": [
    "HealthLab Building",
    "Central Mumbai",
    "Mumbai, Maharashtra"
  ],
  "contactPersonName": "Dr. Priya Sharma",
  "contactPhone": "+912233445566",
  "contactDesignation": "Lab Director",
  "proofDocType": "Operational License",
  "roles": ["issuer", "agent"]
}
```

##### Response
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Organization registration completed successfully",
  "data": {
    "user": {
      "orgId": "d142f338-cc58-4a52-8a7d-778fb0d7a0b4",
      "username": "healthlab_mumbai",
      "email": "admin@healthlab.org",
      "organizationName": "Mumbai Central HealthLab",
      "organizationType": "accredited lab / testing facility",
      "organizationIdNumber": "HL12345",
      "purpose": "Medical testing and diagnostics",
      "description": "Accredited laboratory providing comprehensive medical testing services",
      "logo": "https://cdn.domain.com/logos/healthlab.png",
      "website": "https://healthlab.org",
      "officeAddress": [
        "HealthLab Building",
        "Central Mumbai",
        "Mumbai, Maharashtra"
      ],
      "contactPersonName": "Dr. Priya Sharma",
      "contactPhone": "+912233445566",
      "contactDesignation": "Lab Director",
      "approvalStatus": "pending",
      "approvalDate": "2025-07-07T09:15:00Z",
      "proofDocType": "Operational License",
      "proofFileName": "operational_license.pdf",
      "proofFileUrl": "https://cdn.domain.com/proofs/operational_license.pdf",
      "roles": ["issuer", "agent"],
      "mfaRequired": false,
      "registerIncomplete": true,
      "lastLoginAt": "2025-07-07T09:15:00Z",
      "createdAt": "2025-07-07T09:15:00Z"
    },
    "agent": {
      "agentId": "41f8d50c-3497-47aa-a59a-ff8be84a3a9e",
      "agentType": "individual"
    }
  }
}
```