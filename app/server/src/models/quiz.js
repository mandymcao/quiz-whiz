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
  questionIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
});
var Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;