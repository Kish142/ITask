const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  subject: String,

  category: String,

  description: String,

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

module.exports = mongoose.model('Announcement', AnnouncementSchema);
