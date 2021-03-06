const Koa = require('koa');
const mongoose = require('mongoose');
const passport = require("koa-passport");

const config =  require('./config/config');

// 连接数据库.
mongoose.connect(config.mongo.url, config.mongo.options);
require('./models');
mongoose.Promise = global.Promise;

const app = new Koa();
require('./config/passport')(passport);
require('./config/koa')(app, passport, config);
require('./config/routes')(app);

export default app;