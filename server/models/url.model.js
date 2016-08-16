const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UrlSchema = new Schema({
  url: {type: String, required: true, unique: true},
  title: {type: String, required: true}
});

mongoose.model('Url', UrlSchema);