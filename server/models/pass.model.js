const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PassSchema = new Schema({
  userId: {type: String, required: true},
  pass: {type: String, required: true},
  time: {type: Number, default: 0}
});

mongoose.model('Pass', PassSchema);