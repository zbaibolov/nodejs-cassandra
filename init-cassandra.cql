-- Create keyspace for activity logs
CREATE KEYSPACE IF NOT EXISTS activity_logs
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

-- Use the keyspace
USE activity_logs;

-- Create table for user activities
CREATE TABLE IF NOT EXISTS user_activities (
    user_id UUID,
    activity_id UUID,
    activity_type TEXT,
    description TEXT,
    timestamp TIMESTAMP,
    metadata MAP<TEXT, TEXT>,
    PRIMARY KEY (user_id, timestamp, activity_id)
) WITH CLUSTERING ORDER BY (timestamp DESC);

-- Create index on activity type for faster queries
CREATE INDEX IF NOT EXISTS idx_activity_type ON user_activities (activity_type); 