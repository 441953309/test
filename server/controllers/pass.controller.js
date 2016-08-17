const mongoose = require('mongoose');
const Pass = mongoose.model('Pass');

export async function create(ctx) {
  try {
    const platform = ctx.request.body.platform;
    const userId = ctx.request.body.userId;
    const pass = ctx.request.body.pass;

    const passObj = await Pass.findOne({platform, userId, pass});
    if (passObj) {
      passObj.time += 1;
      await passObj.save();
    } else {
      await Pass.create({platform, userId, pass, time: 1});
    }
    ctx.body = {code: 200, msg: '', data: true};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message, data: false}
  }
}

export async function getPasses(ctx) {
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  const match = {};
  if (ctx.query.platform) match['platform'] = ctx.query.platform;
  if (ctx.query.userId) match['userId'] = ctx.query.userId;

  try {
    const list = await Pass.find(match).skip(startRow).limit(perPage);
    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message, data: false}
  }
}
