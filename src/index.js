const express = require('express');
const { initializeDatabase } = require('./config/database');
const activityRoutes = require('./routes/activities');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/activities', activityRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 