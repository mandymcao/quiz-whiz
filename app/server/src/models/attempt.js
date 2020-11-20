const mongoose = require('mongoose');
const score = require('./score')

var attemptSchema = new mongoose.Schema({ 
  attemptId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }, 
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  score,
  message: {
    type: String,
    enum: ['FAIL', 'MARGINAL', 'SATISFACTORY', 'GOOD', 'VERYGOOD', 'PERFECT']
  },
});
var Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;