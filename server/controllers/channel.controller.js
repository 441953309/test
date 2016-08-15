const mongoose = require('mongoose');
const Channel = mongoose.model('Channel');

export async function create(ctx) {
  try {
    const username = ctx.request.body.username;
    if (!username) {
      return ctx.body = {code: 400, msg: '请输入用户名'};
    } else {
      if ('self' == username) {
        ctx.request.body.channel = 'self';
      } else {
        ctx.request.body.channel = 'brush';
      }
    }

    await Channel.create(ctx.request.body);
    ctx.body = {code: 200, msg: '创建成功'};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}

export async function remove(ctx){
  try {
    const id = ctx.request.body.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return ctx.body = {code: 400, msg: '请输入正确的id'};
    }

    const channel = await Channel.findByIdAndRemove(id);
    if(channel){
      ctx.body = {code: 200, msg: '删除成功'};
    }else{
      ctx.body = {code: 400, msg: '删除失败'};
    }
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}

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

export async function getChannels(ctx) {
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  let sortName = ctx.query.sortName || 'created';

  try {
    const count = await Channel.count();
    const list = await Channel.find({}).skip(startRow).limit(perPage).sort(sortName).exec();
    ctx.body = {code: 200, msg: '', data: {items: list, _meta:{page, perPage, count}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}

