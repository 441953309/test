const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const ccap = require('ccap')();

/**
 *获取验证码
 */
export async function getCaptcha(ctx) {
  const ary = ccap.get();
  const txt = ary[0];
  const buf = ary[1];
  ctx.session.captcha = txt;
  ctx.status = 200;
  ctx.body = buf;
}

export async function register(ctx) {
  const username = ctx.body.username ? ctx.body.username.replace(/(^\s+)|(\s+$)/g, '') : '';
  const password = ctx.body.password;
  let error_msg;
  if (ctx.body.captcha !== ctx.session.captcha) {
    error_msg = '验证码错误';
  }

  if (error_msg) {
    ctx.status = 422;
    return ctx.body = {code: 2, msg: error_msg};
  }

  try {
    let newAdmin = new Admin(this.request.body);
    const admin = await newAdmin.save();
    ctx.body = {code: 1, data: admin._id};
  } catch (e) {
    ctx.throw(err);
  }
}