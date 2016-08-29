const router = require("koa-router")();

router.get('/', ctx => {
  ctx.body = {
    type: "online",//demo显示, online隐藏
    items: [
      {
        img: "http://sta.we2v.com:3000/images/img1.jpg",
        url: "https://lnk0.com/dQ1sQd?idfa=[IDFA]&PRG_ID=[PRG_ID]&CLICKIDN=[CLICKIDN]&PUB=[PUB_ID]&SUB=[DP2]",
      }
    ]
  }
});

export default router;