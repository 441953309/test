const path = require('path');
const logger = require('koa-logger');
const convert = require('koa-convert')
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');
const passport = require('koa-passport');
const views = require('koa-views');

export default (app, config) => {
  app.keys = config.app.keys;

  if (app.env === 'development') {
    app.use(logger());
  }

  app.use(convert(cors()));
  app.use(bodyparser());
  app.use(json());
  app.use(convert(session(app)));
  app.use(passport.initialize());

  app.use(require('koa-static')(path.join(__dirname, '../public')));
  app.use(views(path.join(__dirname, '../views'), {extension: 'jade'}));
}