const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "aidem",
  user: "media",
  database: "mediaDB",
  host: "192.168.0.100",
  port: "3306",
});

let mediadb = {};

//Media
//get all
mediadb.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM media`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

//get one
mediadb.getOne = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM media WHERE media_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

//set status
mediadb.setStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE media SET status = ? WHERE media_id = ?`, [status, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

//Types
//get all types
mediadb.getTypes = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM type`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

//get one type
mediadb.getType = (type) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM type WHERE type_id = ?`, type, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

//Status
//get all statuses
mediadb.getStatuses = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM status`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

//get one status
mediadb.getStatus = (type) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM status WHERE status_id = ?`, type, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

module.exports = mediadb;
