const mongoose = require('mongoose');
const Record = mongoose.model('Record');

export async function create(ctx) {
  try {
    ctx.request.body.ip = ctx.ip;
    await Record.create(ctx.request.body);
    ctx.body = {code: 200, msg: '', data: true};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message, data: false}
  }
}

export async function getRecords(ctx) {
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  const username = ctx.query.username;
  const imei = ctx.query.imei;
  const match = {};
  if (username)match['username'] = username;
  if (imei)match['imei'] = imei;

  let sortName = ctx.query.sortName || '-created';

  try {
    const count = await Record.count();
    const list = await Record.find(match).skip(startRow).limit(perPage).sort(sortName).exec();
    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage, count}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}

export async function getImeis(ctx) {
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;
  const username = ctx.query.username;
  const match = {};
  if (username)match['username'] = username;

  try {
    const list = await Record.aggregate()
      .match(match)
      .group({
        _id: {username: '$username', imei: '$imei'},
        count: {$sum: 1},
        lastTime: {$max: "$created"},
        firstTime: {$min: "$created"},
        ip: {$addToSet: '$ip'}
      })
      .skip(startRow)
      .limit(perPage)
      .sort({lastTime: -1});
    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}