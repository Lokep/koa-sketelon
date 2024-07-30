const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  console.log('This is the index page');

  ctx.response.ok({
    title: 'Hello Koa 2!',
  })
  next();
});

router.get('/string', async (ctx, next) => {
  ctx.response.ok({
    title: 'Hello Koa 2 string!',
  })
});

router.get('/json', async (ctx, next) => {
  ctx.response.ok({
    title: 'koa2 json',
  });
});

module.exports = router;
