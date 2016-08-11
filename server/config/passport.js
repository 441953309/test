const LocalStrategy = require('passport-local').Strategy;
const Admin = require('mongoose').model('Admin');

const serialize = function (admin, done) {
  done(null, admin.id);
}

var deserialize = function (id, done) {
  Admin.findById(id, done);
};

export default (passport) => {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(async function (username, password, done) {
    try {
      const admin = await Admin.findOne({username: username.toLowerCase()});
      if (!admin) {
        return done(null, false, {error_msg: '用户名或密码错误.'});
      }
      if (!admin.authenticate(password)) {
        return done(null, false, {error_msg: '用户名或密码错误.'});
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
}