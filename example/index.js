const Koa = require('koa');
const config = require('./config');
const log = require('../src/utils/log');
const getIPAddress = require('../src/utils/myIp');
const WeChatAPI = require('../build/bundle');

const { PORT } = config;
const myIp = getIPAddress(); // 获取本机ip
const app = new Koa();

app.use(async ctx => {
  ctx.body = WeChatAPI();
});

app.listen(PORT);

log.info(`
  App running at:
  - Local:   http://localhost:${PORT}/
  - Network: http://${myIp}:${PORT}/
`);


