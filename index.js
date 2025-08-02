require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const GpsTrack = require('./models/GpsTrack');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gpstrack';

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.post('/api/gps', async (req, res) => {
  try {
    const { timestamp, lat, long } = req.body;
    const gpsData = new GpsTrack({ timestamp, lat, long });
    await gpsData.save();
    res.status(201).json({ message: 'GPS data saved', data: gpsData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/gps', async (req, res) => {
  try {
    const data = await GpsTrack.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
