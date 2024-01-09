const mongoose = require('mongoose');

const resetRequestSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ResetRequest = mongoose.model('ResetRequest', resetRequestSchema);

module.exports = ResetRequest;