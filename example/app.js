import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { PORT } from './config';
const log = require('../src/utils/log');
const getIPAddress = require('../src/utils/myIp');
// const easyWechat =  require ('../build/bundle');

function addCountry (target) {
  target.country = 'Chinese';
}

const app = new Koa();
const router = new Router();

// const  { offiaccount } = easyWechat;
const myIp = getIPAddress(); // 获取本机ip
// const weChatOffiaccount = new offiaccount({
//   appid: config.APP_ID,
//   appsecret: config.APP_SECRET
// });


app.use(bodyParser());

// @controller('/article')
@addCountry
class Article {

  // @get('/init')
  addArticle (ctx) {
    let token =  '123';
    // weChatOffiaccount.initAccessToken((data) => {
    //   token = data
    //   log.info(data);
    // });
    ctx.body = token;
  }

}
// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
app.use(router.routes());

router.get('/init', async (ctx, next) => {
  // const token = await weChatOffiaccount.initAccessToken();
  // log.info(token);
  ctx.body = Article.country;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);

log.info(`
  App running at:
  - Local:   http://localhost:${PORT}/
  - Network: http://${myIp}:${PORT}/
`);


