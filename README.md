# User Activity Log System

A simple User Activity Log System built with Node.js and Cassandra that stores and retrieves user activity logs.

## Features

- Store user activity logs with TTL (Time-to-Live)
- Retrieve recent activities for a specific user
- Query activities within a time range
- Automatic expiration of old logs

## Prerequisites

- Node.js (v14 or higher)
- Apache Cassandra (v4.0 or higher)
- npm or yarn
- Homebrew (macOS package manager)

## Setup and Running

### 1. Install Cassandra

Using Homebrew:
```bash
brew install cassandra
```

### 2. Start Cassandra

```bash
brew services start cassandra
```

### 3. Verify Cassandra Installation
```bash
cqlsh
```

### 4. Create Keyspace and Table
Once in cqlsh, run:
```sql
CREATE KEYSPACE activity_logs WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE activity_logs;

CREATE TABLE user_activities (
    user_id text,
    activity_id uuid,
    activity_type text,
    description text,
    timestamp timestamp,
    metadata map<text, text>,
    PRIMARY KEY ((user_id), timestamp, activity_id)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```

### 5. Project Setup

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env  # or use your preferred text editor
```

The .env file should contain the following variables:
```
# Cassandra Configuration
CASSANDRA_HOSTS=localhost
CASSANDRA_PORT=9042
CASSANDRA_KEYSPACE=activity_log
CASSANDRA_USERNAME=
CASSANDRA_PASSWORD=

# Application Configuration
ACTIVITY_LOG_TTL=2592000  # 30 days in seconds
```

4. Start the application:
```bash
npm start
```

## API Endpoints

- POST /api/activities - Create a new activity log
- GET /api/activities/:userId - Get all activities for a user
- GET /api/activities/:userId/recent - Get recent activities for a user
- GET /api/activities/:userId/range - Get activities within a time range

## Data Model

The system uses the following Cassandra schema:

```sql
CREATE TABLE activity_logs.user_activities (
    user_id text,
    activity_id uuid,
    activity_type text,
    description text,
    timestamp timestamp,
    metadata map<text, text>,
    PRIMARY KEY ((user_id), timestamp, activity_id)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```

The table structure includes:
- `user_id`: The identifier of the user performing the activity
- `activity_id`: A unique identifier for each activity (UUID)
- `activity_type`: The type of activity (e.g., 'login', 'logout', 'view')
- `description`: A text description of the activity
- `timestamp`: When the activity occurred
- `metadata`: A map of key-value pairs for additional activity information

## Consistency and Fault Tolerance

- Replication Strategy: SimpleStrategy with replication_factor=1 (can be adjusted based on production needs)
- Consistency Level: LOCAL_QUORUM for writes and LOCAL_ONE for reads
- TTL: 30 days for automatic data expiration

## Testing the API

You can use the provided Postman collection in the `postman` directory to test the API endpoints. See the Postman README for detailed instructions.