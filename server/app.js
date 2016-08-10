const Koa = require('koa');
const mongoose = require('mongoose');
const passport = require("koa-passport");

const config =  require('./config/config');

// 连接数据库.
mongoose.connect(config.mongo.url, config.mongo.options);
require('./models');

const app = new Koa();
require('./config/koa')(app, config, passport);
require('./config/routes')(app);

export default app;