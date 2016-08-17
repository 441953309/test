export async function getUpgrade(ctx) {
  ctx.body = {
    code: 200, msg: '', data: {
      name: '新版本',
      note: '1.优化性能\n2.修复部分问题',
      url: '',
      code: 3
    }
  };
}