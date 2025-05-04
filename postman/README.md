# User Activity Log - Postman Collection

This directory contains the Postman collection for testing the User Activity Log System API endpoints.

## Importing the Collection

1. Open Postman
2. Click on "Import" button
3. Select the `User Activity Log.postman_collection.json` file
4. The collection will be imported with all endpoints ready to use

## Available Endpoints

### 1. Create Activity
- **Method**: POST
- **URL**: `http://localhost:3000/api/activities`
- **Body**:
```json
{
    "userId": "user123",
    "activityType": "login"
}
```

### 2. Get User Activities
- **Method**: GET
- **URL**: `http://localhost:3000/api/activities/:userId`
- **Query Parameters**:
  - `limit` (optional): Number of activities to return (default: 10)

### 3. Get Recent Activities
- **Method**: GET
- **URL**: `http://localhost:3000/api/activities/:userId/recent`
- **Query Parameters**:
  - `limit` (optional): Number of recent activities to return (default: 10)

### 4. Get Activities by Time Range
- **Method**: GET
- **URL**: `http://localhost:3000/api/activities/:userId/range`
- **Query Parameters**:
  - `startTime`: Start of time range (ISO 8601 format)
  - `endTime`: End of time range (ISO 8601 format)

## Environment Variables

The collection uses a base URL variable that can be modified if needed:
- `baseUrl`: Default is `http://localhost:3000`

## Testing the API

1. Make sure the application is running (using Docker Compose)
2. Import the collection into Postman
3. Start testing the endpoints in the following order:
   - Create some activities using the POST endpoint
   - Retrieve activities using the GET endpoints
   - Try different query parameters to filter the results

## Example Responses

### Create Activity (POST)
```json
{
    "userId": "user123",
    "activityId": "550e8400-e29b-41d4-a716-446655440000",
    "activityType": "login",
    "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Get Activities (GET)
```json
[
    {
        "user_id": "user123",
        "activity_id": "550e8400-e29b-41d4-a716-446655440000",
        "activity_type": "login",
        "timestamp": "2024-01-01T12:00:00.000Z"
    }
]
``` 