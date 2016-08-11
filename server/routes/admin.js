var router = require('koa-router')();

router.get('/login', async function (ctx, next) {
  ctx.body = 'this a users response!';
});

module.exports = router;
