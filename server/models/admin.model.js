const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true}
});

mongoose.model('Admin', AdminSchema);
