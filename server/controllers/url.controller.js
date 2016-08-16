const mongoose = require('mongoose');
const Url = mongoose.model('Url');

export async function create(ctx) {
  try {
    let url = ctx.request.body.url;
    ctx.request.body.url = url.substr(0, url.indexOf('?'));

    await Url.findOneAndUpdate({url: ctx.request.body.url}, ctx.request.body, {upsert: true});
    ctx.body = {code: 200, msg: '', data: true};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message, data: false}
  }
}
