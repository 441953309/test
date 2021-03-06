const mongoose = require('mongoose');
const User = mongoose.model('User');

export async function create(ctx) {
  const platform = ctx.request.body.platform;
  let userId = ctx.request.body.userId;
  if (!platform || !userId)return ctx.body = {code: 200, msg: "参数错误", data: false}

  userId = decodeURIComponent(userId);
  const addressesStr = ctx.request.body.addresses;
  const addresses = JSON.parse(addressesStr);

  await User.findOneAndUpdate(
    {platform: platform, userId: userId},
    {platform: platform, userId: userId, addresses: addresses},
    {upsert: true}
  );

  ctx.body = {code: 200, msg: '', data: true};
}

export async function getUsers(ctx){
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  const match = {};
  if (ctx.query.platform) match['platform'] = ctx.query.platform;
  if (ctx.query.userId) match['userId'] = ctx.query.userId;

  try {
    const list = await User.find(match).skip(startRow).limit(perPage).exec();
    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}