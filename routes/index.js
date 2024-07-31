const { OK, Error } = require('../constant/result');
const { query } = require('../utils/mysql');

const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  console.log('This is the index page');

  ctx.response.ok({
    title: 'Hello Koa 2!',
  });
  next();
});

router.get('/string', async (ctx, next) => {
  ctx.response.ok({
    title: 'Hello Koa 2 string!',
  });
});

router.get('/json', async (ctx, next) => {
  try {
    const result = await query(`select * from user`);

    ctx.response.ok(
      OK({
        title: 'koa2 json',
        result,
      }),
    );
  } catch (error) {
     ctx.response.ok(Error(-1, error.message));
  }
});

module.exports = router;
