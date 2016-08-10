const mongoose = require('mongoose');
const Record = mongoose.model('Record');

export async function create(ctx) {
  const req = ctx.req;
  try {
    ctx.request.body.ip = ctx.ip;
    await Record.create(ctx.request.body);
    ctx.body = {code: 200, msg: '', data: true};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message, data: false}
  }
}