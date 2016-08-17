const mongoose = require('mongoose');
const Pass = mongoose.model('Pass');

export async function create(ctx) {
  try {
    const userId = ctx.request.body.userId;
    const pass = ctx.request.body.pass;

    const passObj = await Pass.findOne({userId, pass});
    if(passObj){
      passObj.time += 1;
      await passObj.save();
    }else{
      await Pass.create({userId, pass, time: 1});
    }
    ctx.body = {code: 200, msg: '', data: true};
  } catch (err) {
    ctx.body = {code: 400, msg: err.message, data: false}
  }
}
