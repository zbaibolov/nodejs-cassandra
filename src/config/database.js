const cassandra = require('cassandra-driver');
require('dotenv').config();

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_HOSTS || 'cassandra'],
  port: process.env.CASSANDRA_PORT || 9042,
  localDataCenter: 'datacenter1',
  keyspace: 'activity_logs',
  credentials: {
    username: process.env.CASSANDRA_USERNAME || '',
    password: process.env.CASSANDRA_PASSWORD || ''
  },
  queryOptions: {
    consistency: cassandra.types.consistencies.localQuorum
  }
});

// Initialize the database
async function initializeDatabase() {
  try {
    await client.connect();
    console.log('Connected to Cassandra');
    
    // Execute initialization script
    const fs = require('fs');
    const path = require('path');
    const initScript = fs.readFileSync(path.join(__dirname, '../../init-cassandra.cql'), 'utf8');
    
    // Split the script into individual statements
    const statements = initScript.split(';').filter(statement => statement.trim());
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        await client.execute(statement);
      }
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

module.exports = {
  client,
  initializeDatabase
}; 