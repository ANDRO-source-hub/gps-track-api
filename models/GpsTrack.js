const mongoose = require('mongoose');

const gpsTrackSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('GpsTrack', gpsTrackSchema);
