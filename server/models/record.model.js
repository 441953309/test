const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecordSchema = new Schema({
  url: {type: String, required: true},
  platform: {type: String, required: true},//平台名称,如yhd,jd, 和userId共同唯一标识一个用户
  query: String,
  userId: String,   //对应平台的用户id
  unionKey: String, //不太清楚是干什么用的
  orderId: String,  //对应平台的订单id
  recentOrderNum: {type: Number, default: -2}, //最近已完成订单数
  historyOrderNum: {type: Number, default: -2},//历史已完成订单数
  title: String, //需要单独更新进来

  ip: {type: String, required: true},       //ip地址
  imei: {type: String, required: true},     //设备唯一识别
  channel: {type: String, required: true},  //渠道类型
  username: {type: String, required: true}, //渠道名
  src: {type: String, required: true},      //平台
  osver: {type: String, required: true},    //平台系统版本
  mac: {type: String},                      //mac地址
  uptime: {type: String, required: true},   //记录提交时间
  created: {type: Date, default: Date.now},
})

mongoose.model('Record', RecordSchema);