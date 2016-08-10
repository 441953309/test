const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShopSchema = new Schema({
  title: String,
})

mongoose.model('Shop', ShopSchema);