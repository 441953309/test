const passport = require('koa-passport');

export async function login(ctx, next){
  return passport.authenticate('local', function(user, info, status) {
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
  })(ctx, next)
}

export async function secured(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next;
  } else {
    ctx.body = {code:401, msg:'未登录'};
  }
};
