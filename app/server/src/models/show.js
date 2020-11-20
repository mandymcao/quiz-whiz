const mongoose = require('mongoose');

var showSchema = new mongoose.Schema({ 
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }, 
  name: {
    type: String,
    required: true
  }, 
  genre: String
});
var Show = mongoose.model('Show', showSchema);

module.exports = Show;