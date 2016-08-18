export async function getUpgrade(ctx) {
  ctx.body = {
    code: 200, msg: '', data: {
      name: '新版本',
      note: '1.优化性能<br/>2.修复部分问题',
      url: 'http://sta.we2v.com:3000/download/tancai_2.1.apk',
      code: 4,
      force: true
    }
  };
}