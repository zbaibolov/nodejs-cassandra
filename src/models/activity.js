const { v4: uuidv4 } = require('uuid');
const { client } = require('../config/database');

class Activity {
  static async create(userId, activityType, description = '', metadata = {}) {
    const activityId = uuidv4();
    const timestamp = new Date();
    
    const query = `
      INSERT INTO user_activities (user_id, activity_id, activity_type, description, timestamp, metadata)
      VALUES (?, ?, ?, ?, ?, ?)
      USING TTL ?;
    `;
    
    try {
      await client.execute(query, [
        userId,
        activityId,
        activityType,
        description,
        timestamp,
        metadata,
        process.env.ACTIVITY_LOG_TTL
      ], { prepare: true });
      
      return { userId, activityId, activityType, description, timestamp, metadata };
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

  static async getByUserId(userId, limit = 10) {
    const query = `
      SELECT * FROM user_activities
      WHERE user_id = ?
      LIMIT ?;
    `;
    
    try {
      const result = await client.execute(query, [userId, limit], { prepare: true });
      return result.rows;
    } catch (error) {
      console.error('Error getting activities:', error);
      throw error;
    }
  }

  static async getByTimeRange(userId, startTime, endTime) {
    const query = `
      SELECT * FROM user_activities
      WHERE user_id = ?
      AND timestamp >= ?
      AND timestamp <= ?
      ALLOW FILTERING;
    `;
    
    try {
      const result = await client.execute(query, [userId, startTime, endTime], { prepare: true });
      return result.rows;
    } catch (error) {
      console.error('Error getting activities by time range:', error);
      throw error;
    }
  }

  static async getRecent(userId, limit = 10) {
    const query = `
      SELECT * FROM user_activities
      WHERE user_id = ?
      LIMIT ?;
    `;
    
    try {
      const result = await client.execute(query, [userId, limit], { prepare: true });
      return result.rows;
    } catch (error) {
      console.error('Error getting recent activities:', error);
      throw error;
    }
  }

  static async getByActivityType(activityType, limit = 10) {
    const query = `
      SELECT * FROM user_activities
      WHERE activity_type = ?
      LIMIT ?
      ALLOW FILTERING;
    `;
    
    try {
      const result = await client.execute(query, [activityType, limit], { prepare: true });
      return result.rows;
    } catch (error) {
      console.error('Error getting activities by type:', error);
      throw error;
    }
  }
}

module.exports = Activity; 