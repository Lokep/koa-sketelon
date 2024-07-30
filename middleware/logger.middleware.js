const Chalk = require('chalk');

module.exports = async function (ctx, next) {
  const timeStamp = new Date().getTime();

  await next();

  const { method, url } = ctx.request;
  const { status, message } = ctx.response;

  console.log(ctx.response);

  const successTagstyle = {
    backgroundColor: Chalk.bgGreen,
    color: Chalk.white,
    bold: true,
  };

  const succesTextStyle = {
    color: Chalk.green,
  };

  const errorTagstyle = {
    backgroundColor: Chalk.bgRed,
    color: Chalk.white,
    bold: true,
  };

  const errorTextStyle = {
    color: Chalk.red,
  };

  const tagStyle = status === 200 ? successTagstyle : errorTagstyle;
  const textStyle = status === 200 ? succesTextStyle : errorTextStyle;

  const delta = new Date().getTime() - timeStamp;

  const timeStyle = delta < 300 ? succesTextStyle : errorTextStyle;

  console.log(`${tagStyle.backgroundColor('「' + method + '」')} ${textStyle.color(url)} ${textStyle.color('-')} ${textStyle.color(status)} ${textStyle.color('-')} ${timeStyle.color(delta + 'ms')} ${textStyle.color(message)}`);
};
