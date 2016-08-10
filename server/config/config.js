import path from 'path';

const env = process.env.NODE_ENV || 'development';

var base = {
  app: {
    env: env,
    root: path.normalize(path.join(__dirname, "/..")),
  },
  //mongodb配置
  mongo: {
    options: {db: {safe: true}},
  },
  //redis 配置
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
}

var specific = {
  development: {
    app: {
      port: 3000,
      name: "QiXiuTong-Koa-Mongoose - Dev",
      keys: ["super-secret-hurr-durr"],
    },
    mongo: {
      url: "mongodb://localhost/we2v_yhd_dev"
    },

  },
  test: {
    app: {
      port: 3001,
      name: "QiXiuTong-Koa-Mongoose - Test",
      keys: ["super-secret-hurr-durr"],
    },
    mongo: {
      url: "mongodb://localhost/qixiut_test"
    },
  },
  production: {
    app: {
      port: process.env.PORT || 3000,
      name: "QiXiuTong-Koa-Mongoose",
    },
    mongo: {
      url: "mongodb://localhost/we2v_yhd",
    },
  },
};

export default Object.assign(base, specific[env]);
