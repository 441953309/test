const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
  platform: {type: String, required: true},//平台名称,如yhd,jd
  userId: String,
  orderId: {type: String, required: true},
  price: {type: Number, required: true},
  date: {type: String, required: true},
  state: {type: String, required: true},
  goods: {type: String, required: true}
})

mongoose.model('Order', OrderSchema);