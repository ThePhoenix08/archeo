# Client Expects / API Contract

## Overview

This document outlines the expected requests and responses from the client to the server. This is a living document and will be updated as the project evolves.

## Responses

### Success
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

### Error

[Schema in Client](../apps/client/src/shared/validators/apiResponse.validator.js)

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error Message specifies the error of the request",
  "errorType": "Error Type specifies the type of error",
  "slug": "Error Slug specifies the slug of the error",
  "errors": [
    "Error 1",
    "Error 2"
  ]
}
```

## Authentication