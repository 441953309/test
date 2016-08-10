const mongoose = require('mongoose');
const Channel = mongoose.model('Channel');

export async function getChannel(ctx) {
  if (!ctx.query.channel || !ctx.query.username) {
    return ctx.body = {code: 2, msg: '参数错误'}
  }

  const channel = await Channel.findOne({channel: ctx.query.channel, username: ctx.query.username});
  if (channel) {
    ctx.body = {code: 200, msg: '', data: channel};
  } else {
    ctx.body = {code: 400, msg: '没有这个用户', data: ''};
  }
}

export async function getChannels(ctx){
  if(!ctx.query.page)ctx.query.page = 1;

  Channel.find()
}

export async function create(ctx) {
  try {
    await Channel.create(ctx.request.body);
    ctx.body = {code: 200, msg: '创建成功'};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}