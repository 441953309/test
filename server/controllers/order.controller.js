const mongoose = require('mongoose');
const Order = mongoose.model('Order');

export async function createOrders(ctx) {
  const platform = ctx.request.body.platform;
  const ordersStr = ctx.request.body.orders;
  if (!platform || !ordersStr)return ctx.body = {code: 400, msg: "参数错误", data: false}

  const orders = JSON.parse(ordersStr);
  for (let order of orders) {
    order.platform = platform;
    order.userId = decodeURIComponent(order.userId);
    await Order.findOneAndUpdate({platform: platform, orderId: order.orderId}, order, {upsert: true});
  }
  ctx.body = {code: 200, msg: '', data: true};
}

export async function getOrders(ctx){
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  const match = {};
  if (ctx.query.platform) match['platform'] = ctx.query.platform;
  if (ctx.query.userId) match['userId'] = ctx.query.userId;
  if (ctx.query.orderId) match['orderId'] = ctx.query.orderId;

  try {
    const list = await Order.find(match).skip(startRow).limit(perPage).exec();
    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}
