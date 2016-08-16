const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AddressSchema = new Schema({
  nickname: String,
  mobile: String,
  address: String
})

let UserSchema = new Schema({
  platform: {type: String, required: true},//平台名称,如yhd,jd
  userId: {type: String, required: true},//平台用户名
  addresses: [AddressSchema]
})

mongoose.model('User', UserSchema);