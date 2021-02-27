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

//get by type
mediadb.getAllByType = (type) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM media WHERE type = ?`, type, (err, results) => {
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

//delete
mediadb.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM media WHERE media_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log("Delete Media:");
      console.log(id);
      console.log("");

      return resolve(results);
    });
  });
};

//insert
mediadb.insert = (media) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO media (name, altname, addition, year, type, status, image) VALUES (?, ?, ?, ?, ?, ?, ?)`, media, (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log("Insert Media:");
      console.log(media);
      console.log("");

      return resolve(results);
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

//set status
mediadb.setType = (id, status) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE media SET type = ? WHERE media_id = ?`, [status, id], (err, results) => {
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

//History
//get all histories for media
mediadb.getAllHist = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM history WHERE media_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

//delete history
mediadb.deleteHist = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM history WHERE history_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log("Delete History:");
      console.log(id);
      console.log("");

      return resolve(results);
    });
  });
};

//insert history
mediadb.insertHist = (history) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO history (media_id, description, date) VALUES (?, ?, ?)`, history, (err, results) => {
      if (err) {
        return reject(err);
      }

      console.log("Insert History:");
      console.log(history);
      console.log("");

      return resolve(results);
    });
  });
};

//Property Type
//get all properties for media
mediadb.getAllPropTypes = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM proptype`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

mediadb.getPropType = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM proptype WHERE proptype_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

//insert property
mediadb.insertPropType = (proptype) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO proptype (name, rank) VALUES (?, ?)`, proptype, (err, results) => {
      if (err) {
        return reject(err);
      }

      console.log("Insert PropType:");
      console.log(proptype);
      console.log("");

      return resolve(results);
    });
  });
};

//Property
//get all properties for media
mediadb.getAllProps = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT proptype.name, prop.value FROM prop INNER JOIN proptype ON prop.proptype_id = proptype.proptype_id WHERE media_id = ?`,
      id,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//insert property
mediadb.insertProp = (prop) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO prop (media_id, proptype_id, value) VALUES (?, ?, ?)`, prop, (err, results) => {
      if (err) {
        return reject(err);
      }

      console.log("Insert Prop:");
      console.log(prop);
      console.log("");

      return resolve(results);
    });
  });
};

module.exports = mediadb;
