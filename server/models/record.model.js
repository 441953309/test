const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecordSchema = new Schema({
  url: {type: String, required: true},
  title: {type: String, required: true},
  recentOrderNum: {type: Number, default: -2},
  historyOrderNum: {type: Number, default: -2},
  ip: {type: String, required: true},
  imei: {type: String, required: true},
  channel: {type: String, required: true},
  username: {type: String, required: true},
  src: {type: String, required: true},
  osver: {type: String, required: true},
  mac: {type: String},
  uptime: {type: String, required: true},
  created: {type: Date, default: Date.now},
})

mongoose.model('Record', RecordSchema);