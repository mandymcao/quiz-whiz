const mongoose = require('mongoose');

var quizSchema = new mongoose.Schema({ 
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }, 
  name: {
    type: String,
    required: true
  }, 
  showId: mongoose.Schema.Types.ObjectId,
  genre: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: false
  }
});
var Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;