const mongoose = require('mongoose');

var showSchema = new mongoose.Schema({ showId: 'string', name: 'string', genre: 'string'});
var Show = mongoose.model('Show', showSchema);

module.exports = Show;