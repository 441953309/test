const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const AdminSchema = new Schema({
  username: {type: String, required: true, lowercase: true},
  hashedPassword: {type: String, required: true},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

AdminSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  })

AdminSchema
  .path('username')
  .validate(async function (value, respond) {
    const admin = await this.constructor.findOne({username: value});
    if (admin) {
      if (this.id === admin.id) return respond(true);
      return respond(false);
    }
    respond(true);
  }, '这个用户名已经被使用');

AdminSchema.methods = {
  //验证用户密码
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  //生成盐
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  //生成密码
  encryptPassword: function (password) {
    if (!password || !this.salt) return '';
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
}

mongoose.model('Admin', AdminSchema);
