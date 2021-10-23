const mongoose = require('mongoose');

const CompanyDetailSchema = new mongoose.Schema({
  companyName: String,

  location: String,

  employees: Number,

  domainName: String,

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

  date: { 
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CompanyDetail', CompanyDetailSchema);
