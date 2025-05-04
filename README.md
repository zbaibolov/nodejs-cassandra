# User Activity Log System

A simple User Activity Log System built with Node.js and Cassandra that stores and retrieves user activity logs.

## Features

- Store user activity logs with TTL (Time-to-Live)
- Retrieve recent activities for a specific user
- Query activities within a time range
- Automatic expiration of old logs

## Prerequisites

- Node.js (v14 or higher)
- Cassandra (v4.0 or higher) - for local setup
- Docker and Docker Compose - for Docker setup
- npm or yarn

## Setup and Running

### Option 1: Local Setup (Without Docker)

1. Install dependencies:
```bash
npm install
```

2. Create a .env file in the root directory with the following variables:
```
CASSANDRA_HOSTS=localhost
CASSANDRA_PORT=9042
CASSANDRA_KEYSPACE=activity_log
CASSANDRA_USERNAME=
CASSANDRA_PASSWORD=
ACTIVITY_LOG_TTL=2592000
```

3. Start Cassandra locally and create the keyspace:
```sql
CREATE KEYSPACE activity_log WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
```

4. Start the application:
```bash
npm start
```

### Option 2: Docker Setup

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the containers:
```bash
docker-compose up --build
```

This will:
- Start a Cassandra container
- Initialize the database with the required keyspace and table
- Start the Node.js application

3. To stop the application:
```bash
docker-compose down
```

4. To stop and remove all data (including the Cassandra volume):
```bash
docker-compose down -v
```

## API Endpoints

- POST /api/activities - Create a new activity log
- GET /api/activities/:userId - Get all activities for a user
- GET /api/activities/:userId/recent - Get recent activities for a user
- GET /api/activities/:userId/range - Get activities within a time range

## Data Model

The system uses the following Cassandra schema:

```sql
CREATE TABLE activity_log.user_activities (
    user_id text,
    activity_id uuid,
    activity_type text,
    timestamp timestamp,
    PRIMARY KEY ((user_id), timestamp, activity_id)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```

## Consistency and Fault Tolerance

- Replication Strategy: SimpleStrategy with replication_factor=1 (can be adjusted based on production needs)
- Consistency Level: LOCAL_QUORUM for writes and LOCAL_ONE for reads
- TTL: 30 days for automatic data expiration

## Testing the API

You can use the provided Postman collection in the `postman` directory to test the API endpoints. See the Postman README for detailed instructions.

## Troubleshooting

### Local Setup Issues
- Ensure Cassandra is running and accessible
- Check if the keyspace is created correctly
- Verify environment variables in .env file

### Docker Setup Issues
- If containers fail to start, try `docker-compose down -v` and rebuild
- Check container logs with `docker-compose logs`
- Ensure ports 3000 and 9042 are not in use by other applications 