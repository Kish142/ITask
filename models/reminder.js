const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  subject: String,

  category: String,

  description: String,

  eventDateTime: Date,

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

module.exports = mongoose.model('Reminder', ReminderSchema);
