const Koa = require('koa');
const app = new Koa();

const jwt = require('koa-jwt');


/**
 * 请求体解析
 */
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const responseHandler = require('koa-response-handler')

app.use(responseHandler({ contentType: 'application/json' }));

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());








/**
 * !日志输出
 */
const logger = require('./middleware/logger.middleware');

app.use(logger)






/**
 * !跨域
 * @see https://github.com/koajs/cors
 */
const cors = require('@koa/cors');
app.use(cors());











/**
 * !静态资源，统一存放在publick目录下
 * @see https://github.com/koajs/static
 * @description 该目录下按业务需求区分bucket
 * 文件或文件夹命名规则：
 * 1. 图片文件：以“-”分隔，前面是业务类型，后面是具体的年月日时分秒毫秒
 * 2. 其他文件：以“_”分隔，前面是业务类型，后面是具体的名称
 */
app.use(require('koa-static')(__dirname + '/assets'));











/**
 * !本地缓存
 */

const cache = require('./middleware/cache.middleware')

app.use(async (ctx, next) => {
  ctx.cache = cache;
  await next();
})








/**
 * !路由
 */
const index = require('./routes/index');
const users = require('./routes/users');


app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());











// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  ctx.body = {
    message: 'server error',
  };
});

module.exports = app;
