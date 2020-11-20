const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({ 
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }, 
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    default: []
  },
});
var Question = mongoose.model('Question', questionSchema);

module.exports = Question;