const mongoose = require('mongoose');
const Url = mongoose.model('Url');

export async function create(ctx) {
  let url = ctx.request.body.url;
  ctx.request.body.url = url.indexOf('?') != -1 ? url.substr(0, url.indexOf('?')) : url;

  await Url.findOneAndUpdate({url: ctx.request.body.url}, ctx.request.body, {upsert: true});
  ctx.body = {code: 200, msg: '', data: true};
}
