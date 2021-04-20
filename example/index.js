const http = require('http');
const config = require('../config');
const log = require('../src/utils/log');
const getIPAddress = require('../src/utils/myIp');
const WeChatAPI = require('../build/bundle');

const { PORT } = config;
const myIp = getIPAddress(); // 获取本机ip
function weChatApiExample () {
  log.info(WeChatAPI);
  http.createServer(function (req, res) {
    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    res.write(WeChatAPI());
    res.end();
  }).listen(PORT);

  log.info(`
    App running at:
    - Local:   http://localhost:${PORT}/ 
    - Network: http://${myIp}:${PORT}/
  `);
}

export default weChatApiExample;
