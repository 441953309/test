const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChannelSchema = new Schema({
  channel: {type: String, required: true},
  username: {type: String, required: true},
  url: {type: String, required: true},
  remark: String,
  created: {type: Date, default: Date.now}
});

ChannelSchema
  .path('username')
  .validate(async function(value, respond){
    const channel = await this.constructor.findOne({username: value});
    if(channel){
      if(this.id === channel.id) return respond(true);
      return respond(false);
    }
    respond(true);
  }, '这个用户名已经被使用');

mongoose.model('Channel', ChannelSchema);