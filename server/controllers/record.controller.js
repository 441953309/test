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

export async function getRecords(ctx){
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
    ctx.body = {code: 200, msg: '', data: {items: list, count: count}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}