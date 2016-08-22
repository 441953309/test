const crypto = require('crypto');
const moment = require('moment');
const mongoose = require('mongoose');
const Record = mongoose.model('Record');
const Url = mongoose.model('Url');
const Order = mongoose.model('Order');
const User = mongoose.model('User');
const Pass = mongoose.model('Pass');

function getQueryString(url, name) {
  var reg = new RegExp("(^|[&\?])" + name + "=([^&]*)(&|$)");
  var r = url.match(reg);
  if (r != null)return r[2];
  return null;
}

export async function create(ctx) {
  ctx.request.body.ip = ctx.ip.replace('::ffff:', '');

  let url = ctx.request.body.url;
  ctx.request.body.url = url.indexOf('?') != -1 ? url.substr(0, url.indexOf('?')) : url;
  ctx.request.body.query = url.replace(ctx.request.body.url, '');
  ctx.request.body.orderId = getQueryString(url, 'orderCode') || getQueryString(url, 'orderId')
  if (ctx.request.body.userId)ctx.request.body.userId = decodeURIComponent(ctx.request.body.userId);

  await Record.create(ctx.request.body);
  ctx.body = {code: 200, msg: '', data: true};
}

export async function getRecords(ctx) {
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  const match = {};
  if (ctx.query.platform)match['platform'] = ctx.query.platform;
  if (ctx.query.userId)match['userId'] = ctx.query.userId;
  if (ctx.query.username)match['username'] = ctx.query.username;
  if (ctx.query.imei)match['imei'] = ctx.query.imei;
  if (ctx.query.ip)match['ip'] = ctx.query.ip;
  if (ctx.query.src)match['src'] = ctx.query.src;
  if (ctx.query.title)match['title'] = ctx.query.title;

  if(ctx.query.date){
    const date = moment(ctx.query.date);
    if (date.isValid()) {
      const startTime = date.utc().format();
      const endTime = date.add(1, 'd').utc().format();
      match['created'] = {
        '$gte': new Date(startTime),
        '$lt': new Date(endTime)
      }
    }
  }

  if (ctx.query.url) {
    match['url'] = {$regex: ctx.query.url};
  }

  if (ctx.query.query) {
    match['query'] = {$regex: ctx.query.query};
  }

  let sortName = ctx.query.sortName || '-created';

  try {
    const count = await Record.count(match);
    const list = await Record.find(match).skip(startRow).limit(perPage).sort(sortName).exec();
    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage, count}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}

export async function getImeis(ctx) {
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  const username = ctx.query.username;
  const imei = ctx.query.imei;
  const ip = ctx.query.ip;
  const src = ctx.query.src;
  const title = ctx.query.title;
  const startTime = ctx.query.startTime;
  const endTime = ctx.query.endTime;

  const match = {};
  if (username)match['username'] = username;
  if (imei)match['imei'] = imei;
  if (ip)match['ip'] = ip;
  if (src)match['src'] = src;
  if (title)match['title'] = title;
  if (startTime && endTime) {
    match['created'] = {
      "$gte": new Date(startTime),
      '$lt': new Date(endTime)
    }
  }

  try {
    const list = await Record.aggregate()
      .match(match)
      .group({
        _id: {username: '$username', imei: '$imei'},
        count: {$sum: 1},
        lastTime: {$max: "$created"},
        firstTime: {$min: "$created"},
        ip: {$addToSet: '$ip'},
        src: {$addToSet: '$src'},
        title: {$addToSet: '$title'}
      })
      .skip(startRow)
      .limit(perPage)
      .sort({lastTime: -1});

    for (let record of list) {
      record.success = record.title.indexOf('支付成功') != -1;
      delete record.title;
    }
    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err};
  }
}

export async function getUserIds(ctx) {
  const page = parseInt(ctx.query.page) > 0 ? parseInt(ctx.query.page) : 1;
  const perPage = parseInt(ctx.query.perPage) > 0 ? parseInt(ctx.query.perPage) : 20;
  const startRow = (page - 1) * perPage;

  const match = {};
  if (ctx.query.platform) {
    match['platform'] = ctx.query.platform;
  } else {
    match['platform'] = {'$exists': true, '$ne': ''}
  }

  if (ctx.query.userId) {
    match['userId'] = ctx.query.userId;
  } else {
    match['userId'] = {'$exists': true, '$ne': ''}
  }

  if (ctx.query.username)match['username'] = ctx.query.username;
  if (ctx.query.imei)match['imei'] = ctx.query.imei;
  if (ctx.query.ip)match['ip'] = ctx.query.ip;
  if (ctx.query.src)match['src'] = ctx.query.src;
  if (ctx.query.url)match['url'] = ctx.query.url;


  if(ctx.query.date){
    const date = moment(ctx.query.date);
    if (date.isValid()) {
      const startTime = date.utc().format();
      const endTime = date.add(1, 'd').utc().format();
      console.log(startTime)
      console.log(endTime)
      match['created'] = {
        '$gte': new Date(startTime),
        '$lt': new Date(endTime)
      }
    }
  }

  console.log(match);
  try {
    const list = await Record.aggregate()
      .match(match)
      .group({
        _id: {username: '$username', platform: '$platform', userId: '$userId'},
        count: {$sum: 1},
        orderId: {$addToSet: '$orderId'},
        unionKey: {$addToSet: '$unionKey'},
        ip: {$addToSet: '$ip'},
        imei: {$addToSet: '$imei'},
        src: {$addToSet: '$src'},
        lastTime: {$max: "$created"},
        firstTime: {$min: "$created"},
        url: {$addToSet: '$url'}
      })
      .skip(startRow)
      .limit(perPage)
      .sort({lastTime: -1});

    for (let record of list) {
      //检测是否有支付成功页面
      record.success = record.url.indexOf('http://my.m.yhd.com/myH5/h5Order/h5OrderFinishPay.do') != -1;
      delete record.url;

      const user = await User.findOne({platform: record._id.platform, userId: record._id.userId});
      if (user) {
        record.addresses = user.addresses;
      }

      let orders = await Order.find({platform: record._id.platform, userId: record._id.userId});
      if (orders) {
        orders = JSON.parse(JSON.stringify(orders));
        for (let order of orders) {
          order.success = ['待发货', '已发货', '已完成'].indexOf(order.state) != -1
        }
        record.userOrders = orders;
      }

      //获取检测到的订单详情
      record.order = [];
      for (let oId of record.orderId) {
        if (oId) {
          let order = await Order.findOne({platform: record._id.platform, orderId: oId});
          if (order) {
            order = JSON.parse(JSON.stringify(order));
            order.success = ['待发货', '已发货', '已完成'].indexOf(order.state) != -1
            record.order.push(order)

            if (order.success) record.success = true;
          } else {
            record.order.push({orderId: oId})
          }
        }
      }
      delete record.orderId;
    }

    const t = ctx.query.t;
    const sign = ctx.query.sign;
    if (t && sign) {
      const md5 = crypto.createHash('md5');
      md5.update('mimawang169' + '&' + page + '&' + perPage + '&' + t + '&' + 'hnadS37ukQwbLIdkMqiEJVkhS3Us3Biw');
      if (sign == md5.digest('hex')) {
        for (let record of list) {
          let platform = record._id.platform;
          let userId = record._id.userId;
          if(userId.endsWith('@phone')) userId = userId.replace('@phone', '');
          const passes = await Pass.find({platform, userId}).sort('-time');
          record.passes = [];
          if (passes) {
            for (let pass of passes) {
              record.passes.push({pass: pass.pass, time: pass.time})
            }
          }
        }
      }
    }

    ctx.body = {code: 200, msg: '', data: {items: list, _meta: {page, perPage}}};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message};
  }
}

export async function updateTitle(ctx) {
  try {
    const records = await Record.find({title: {'$exists': false}}).limit(100);
    for (let record of records) {
      const url = await Url.findOne({url: record.url});
      if (url) {
        record.title = url.title;
        await record.save();
      }
    }
    ctx.body = {code: 200, msg: '', data: {items: records}};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message};
  }
}