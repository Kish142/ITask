const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  subject: String,

  category: String,

  description: String,

  eventDateTime: Date,

  location: String,

  notifyTo: [String],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
