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
  quizzesOwnedIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  attemptsTakenIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
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
  }
});
var User = mongoose.model('User', userSchema);

module.exports = User;