const router = require("koa-router")();


router.get('/', ctx => {
  ctx.body = [
    {
      img: "http://sta.we2v.com:3000/images/img1.jpg",
      url: "http://www.baidu.com"
    },
    {
      img: "http://sta.we2v.com:3000/images/img2.png",
      url: "http://www.sina.com.cn/"
    }
  ]
});

export default router;