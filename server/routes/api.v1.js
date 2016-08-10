const router = require("koa-router")();

const channel = require('../controllers/channel.controller');
const record = require('../controllers/record.controller');

router.get('/channels', channel.getChannel);//获取某一个渠道
router.post('/channels', channel.create);//创建一个渠道

router.get('/channels/list', channel.getChannels);//获取渠道列表

router.post('/records', record.create);
router.get('/records', record.getRecords)

export default router;
