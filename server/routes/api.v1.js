const router = require("koa-router")();

const auth = require('../controllers/auth.controller');
const admin = require('../controllers/admin.controller');
const channel = require('../controllers/channel.controller');
const record = require('../controllers/record.controller');
const url = require('../controllers/url.controller');
const order = require('../controllers/order.controller');
const user = require('../controllers/user.controller');
const upgrade = require('../controllers/upgrade.controller')

router.get('/upgrades', upgrade.getUpgrade);

router.post('/channels', channel.create);//创建一个渠道
router.delete('/channels', channel.remove);//删除一个渠道
router.get('/channels', channel.getChannel); //获取某一个渠道
router.get('/channels/list', channel.getChannels);//获取渠道列表

router.post('/records', record.create); //插入一条记录
router.get('/records/list', record.getRecords)
router.get('/records/imei', record.getImeis)
router.get('/records/userid', record.getUserIds)
router.put('/records/title', record.updateTitle)

router.post('/urls', url.create);
router.post('/orders/list', order.createOrders);
router.post('/users', user.create);

router.get('/orders/list', order.getOrders);
router.get('/users/list', user.getUsers);

//登录先不做
// router.post('/login', auth.login);

export default router;