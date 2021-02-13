const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "aidem",
  user: "media",
  database: "media",
  host: "192.168.0.100",
  port: "3306",
});

let mediadb = {};

mediadb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM medien`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

mediadb.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM medien WHERE medien_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

module.exports = mediadb;
