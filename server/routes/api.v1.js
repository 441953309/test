const router = require("koa-router")();

const channel = require('../controllers/channel.controller');
const record = require('../controllers/record.controller');

router.get('/channels', channel.getChannel);
router.post('/channels', channel.create);
router.post('/records', record.create);

export default router;
