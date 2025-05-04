const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');

// Create a new activity
router.post('/', async (req, res) => {
  try {
    const { userId, activityType } = req.body;
    
    if (!userId || !activityType) {
      return res.status(400).json({ error: 'userId and activityType are required' });
    }
    
    const activity = await Activity.create(userId, activityType);
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all activities for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit } = req.query;
    
    const activities = await Activity.getByUserId(userId, limit ? parseInt(limit) : undefined);
    res.json(activities);
  } catch (error) {
    console.error('Error getting activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent activities for a user
router.get('/:userId/recent', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit } = req.query;
    
    const activities = await Activity.getRecent(userId, limit ? parseInt(limit) : undefined);
    res.json(activities);
  } catch (error) {
    console.error('Error getting recent activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get activities within a time range
router.get('/:userId/range', async (req, res) => {
  try {
    const { userId } = req.params;
    const { startTime, endTime } = req.query;
    
    if (!startTime || !endTime) {
      return res.status(400).json({ error: 'startTime and endTime are required' });
    }
    
    const activities = await Activity.getByTimeRange(
      userId,
      new Date(startTime),
      new Date(endTime)
    );
    
    res.json(activities);
  } catch (error) {
    console.error('Error getting activities by time range:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 