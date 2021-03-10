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

//Log
//get all logs
mediadb.getLogs = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM log ORDER BY log_id DESC`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

//insert log
mediadb.log = (message) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO log (message) VALUES (?)`, message, (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log("Log:");
      console.log(message);
      console.log("");

      return resolve(results);
    });
  });
};

//Media
//get all
mediadb.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT media.media_id, media.name, media.altname, media.altname, media.addition, media.year, media.created, 
      type.type_id, type.name AS type, 
      status.status_id, status.name AS status 
      FROM media 
      LEFT JOIN type ON media.type = type.type_id 
      LEFT JOIN status ON media.status = status.status_id `,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//get by type
mediadb.getAllByType = (type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT media.media_id, media.name, media.altname, media.altname, media.addition, media.year, media.created, 
        type.type_id, type.name AS type, 
        status.status_id, status.name AS status 
        FROM media 
        LEFT JOIN type ON media.type = type.type_id 
        LEFT JOIN status ON media.status = status.status_id  
        WHERE media.type = ?`,
      type,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//get one
mediadb.getOne = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT media.media_id, media.name, media.altname, media.altname, media.addition, media.year, media.created, 
        type.type_id, type.name AS type, 
        status.status_id, status.name AS status 
        FROM media 
        LEFT JOIN type ON media.type = type.type_id 
        LEFT JOIN status ON media.status = status.status_id 
        WHERE media.media_id = ?`,
      id,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

//delete
mediadb.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM media WHERE media_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      mediadb.log("Delete media: " + id + " " + JSON.stringify(results));
      return resolve(results);
    });
  });
};

//insert
mediadb.insert = (media) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO media (name, altname, addition, year, type, status) VALUES (?, ?, ?, ?, ?, ?)`, media, (err, results) => {
      if (err) {
        return reject(err);
      }
      mediadb.log("Insert media: " + media + " " + JSON.stringify(results));
      return resolve(results.insertId);
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
      mediadb.log("Update status of media: " + id + "  to: " + status + " " + JSON.stringify(results));
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
      mediadb.log("Update type of media: " + id + "  to: " + status + " " + JSON.stringify(results));
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

//History
//get all histories for media
mediadb.getAllHist = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM history WHERE media_id = ? ORDER BY created DESC`, id, (err, results) => {
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
      mediadb.log("Delete history: " + id + " " + JSON.stringify(results));
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
      mediadb.log("Insert history: " + history + " " + JSON.stringify(results));
      return resolve(results);
    });
  });
};

//Property Type
//get all propTypes for media
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

//insert propType
mediadb.insertPropType = (proptype) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO proptype (name, rank) VALUES (?, ?)`, proptype, (err, results) => {
      if (err) {
        return reject(err);
      }
      mediadb.log("Insert prop type: " + proptype + " " + JSON.stringify(results));
      return resolve(results);
    });
  });
};

//Property
//get all props for media
mediadb.getAllProps = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT proptype.name, prop.value, prop.prop_id FROM prop INNER JOIN proptype ON prop.proptype_id = proptype.proptype_id WHERE media_id = ?`,
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

//insert prop
mediadb.insertProp = (prop) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO prop (media_id, proptype_id, value) VALUES (?, ?, ?)`, prop, (err, results) => {
      if (err) {
        return reject(err);
      }
      mediadb.log("Insert prop: " + prop + " " + JSON.stringify(results));
      return resolve(results);
    });
  });
};

//delete prop
mediadb.deleteProp = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM prop WHERE prop_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      mediadb.log("Delete prop: " + id + " " + JSON.stringify(results));
      return resolve(results);
    });
  });
};

module.exports = mediadb;
