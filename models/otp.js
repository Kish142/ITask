const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  expiresIn: Date,
});

module.exports = mongoose.model('Otp', OtpSchema);
