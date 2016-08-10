const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChannelSchema = new Schema({
  channel: {type: String, required: true},
  username: {type: String, required: true},
  url: {type: String, required: true},
  created: {type: Date, default: Date.now}
})

mongoose.model('Channel', ChannelSchema);