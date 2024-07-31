const mysql = require('mysql');
const config = require('../config/mysql.config');

//创建连接池
const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  port: config.PORT,
});

function query(sql) {
  return new Promise((res, rej) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        rej(err);
      } else {
        connection.query(sql, (err, rows) => {
          if (err) {
            rej(err);
          } else {
            res(rows);
          }
          connection.release();
        });
      }
    });
  });
}

module.exports = { query };
