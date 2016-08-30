const Router = require("koa-router");

const api = require('../routes/api.v1');
const admin = require('../routes/admin');
const ad = require('../routes/ad')
const ads = require('../routes/ads')

export default (app) => {
  const router = new Router();
  router.use('/api/v1', api.routes());
  router.use('/admin', admin.routes());
  router.use('/ad', ad.routes());
  router.use('/ads', ads.routes());
  router.get('/', ctx => {
    ctx.body = 'This is a default response!'
  });
  app.use(router.routes());
}