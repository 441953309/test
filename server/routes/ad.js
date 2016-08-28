const router = require("koa-router")();


router.get('/', ctx => {
  ctx.body = {
    type: "demo",//demo显示, online隐藏
    items: [
      {
        img: "http://sta.we2v.com:3000/images/img1.jpg",
        url: "http://www.baidu.com",
      },
      {
        img: "http://sta.we2v.com:3000/images/img2.png",
        url: "http://www.sina.com.cn/"
      }
    ]
  }
});

export default router;