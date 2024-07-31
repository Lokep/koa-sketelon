const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const verifyToken = async (ctx, next) => {
  // console.log(
  //   jwt.sign(
  //     {
  //       data: 'XYZ',
  //     },
  //     jwtConfig.secret,
  //     {
  //       expiresIn: 60 * 5, // 过期时间
  //     },
  //   ),
  // );

  try {
    const url = ctx.request.url.split('?')[0];

    // 检测接口是否在不校验接口列表中
    const inWhiteList = jwtConfig.unlessPath.some((item) => item === url);

    console.log(url, inWhiteList);

    if (inWhiteList) {
      await next();
    } else {
      const authorization = ctx.request.headers['authorization'];
      const token = authorization.replace('Bearer ', '');

      console.log(token);

      if (token) {
        try {
          const playload = await jwt.verify(token, jwtConfig.secret);

          console.log(playload);
          await next();
        } catch (verifyError) {
          ctx.response.unauthorized(Error(-1, verifyError.message));
        }
      } else {
        ctx.response.unauthorized(Error(-1, '登录信息已过期'));
      }
    }
  } catch (error) {
    errorHandler(error, ctx);
  }
};

function errorHandler(err, ctx) {
  if (err.name == 'TokenExpiredError') {
    ctx.response.unauthorized(Error(-1, 'token已过期'));
  } else if (err.name == 'JsonWebTokenError') {
    ctx.response.unauthorized(Error(-1, '无效的token'));
  } else {
    ctx.response.unauthorized(Error(-1, 'token出现未知异常'));
  }
}

module.exports = {
  verifyToken,
};
