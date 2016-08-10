const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');

export async function addShop(ctx, next) {
  const title = ctx.request.body.title;

  let error_msg;
  if (!title) {
    error_msg = '标题不能为空.';
  }

  if (error_msg) {
    ctx.status = 422;
    return ctx.body = {error_msg};
  }

  try {
    const result = await Shop.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = {success: true, shop_id: result._id};
  } catch (err) {
    ctx.throw(err);
  }
}
