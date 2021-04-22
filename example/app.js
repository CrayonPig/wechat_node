import Route, {
  post,
  put,
  del,
  get,
  controller,
  convert,
  required
} from 'koa-decorator-router';
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { PORT } from './config'
const log = require('../src/utils/log');
const getIPAddress = require('../src/utils/myIp');
const easyWechat =  require ('../build/bundle');


const app = new Koa();
const router = new Router();
const route = new Route()

const  { offiaccount } = easyWechat;
const myIp = getIPAddress(); // 获取本机ip
const weChatOffiaccount = new offiaccount({
  appid: config.APP_ID,
  appsecret: config.APP_SECRET
});


app.use(bodyParser())

const middleware1 = convert(async (ctx, next) => {
  console.log("middleware1")
  await next()
})

@controller('/article')
class Article {

  @get('/init')
  addArticle(ctx) {
    let token =  '';
    weChatOffiaccount.initAccessToken((data) => {
      token = data
      log.info(data);
    });
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

route.init(router)
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT);

log.info(`
  App running at:
  - Local:   http://localhost:${PORT}/
  - Network: http://${myIp}:${PORT}/
`);


