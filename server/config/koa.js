const path = require('path');
const logger = require('koa-logger');
const convert = require('koa-convert')
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-generic-session');

export default (app, passport, config) => {
  app.keys = config.app.keys;

  if (app.env !== 'production') {
    app.use(logger());
  }

  app.use(convert(cors()));
  app.use(bodyparser());
  app.use(json());
  app.use(convert(session()));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(require('koa-static')(path.join(__dirname, '../public')));
}