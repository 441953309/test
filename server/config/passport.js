const LocalStrategy = require('passport-local').Strategy;

const Admin = require('mongoose').model('Admin');

const serialize = function (admin, done) {
  done(null, admin._id);
}

var deserialize = function (id, done) {
  Admin.findById(id, done);
};

export default (passport, config) => {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
}