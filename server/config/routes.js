const Router = require("koa-router");

const api = require('../routes/api.v1');
const admin = require('../routes/admin');

export default (app) => {
  const router = new Router();
  router.use('/api/v1', api.routes());
  router.use('/admin', admin.routes());
  router.get('/', ctx => {
    ctx.body = 'This is a default response!' + process.env.NODE_ENV
  });
  app.use(router.routes());
}