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

  let sortName = ctx.query.sortName || 'created';
  if (ctx.query.sortOrder === 'false') {
    sortName = '-' + sortName;
  }

  try {
    const count = await Record.count();
    const list = await Record.find({}).skip(startRow).limit(perPage).sort(sortName).exec();
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

  try {
    const match = {};
    if (username)match['username'] = username;

    const imeis = await Record.distinct("imei", match);
    const count = imeis.length;

    const list = await Record.aggregate()
      .match(match)
      .group({
        _id: {imei: "$imei"},
        count: {$sum: 1},
        lastTime: {$max: "$created"},
        firstTime: {$min: "$created"},
        usernameSet: {$addToSet: "$username"}
      })
      .skip(startRow)
      .limit(perPage)
      .sort({lastTime: -1});

    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage, count}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}