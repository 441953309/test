const router = require("koa-router")();

const auth = require('../controllers/auth.controller');
const admin = require('../controllers/admin.controller');
const channel = require('../controllers/channel.controller');
const record = require('../controllers/record.controller');

router.post('/channels', channel.create);//创建一个渠道
router.get('/channels', channel.getChannel); //获取某一个渠道
router.get('/channels/list', channel.getChannels);//获取渠道列表

router.post('/records', record.create); //插入一条记录
router.get('/records/list', record.getRecords)

//登录先不做
// router.post('/login', auth.login);

export default router;