const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  showIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  showsToReviewIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  admin: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: null
  }
});
var User = mongoose.model('User', userSchema);

module.exports = User;