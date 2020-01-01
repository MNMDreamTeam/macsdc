const { Pool } = require('pg');
const { user, host, db, port } = require('../../config.js');

const pool = new Pool({
  user: user,
  host: host,
  database: db,
  port: port
});

const query = (queryString, params) => {
  return pool.query(queryString, params)
    .then(res => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    })
}

module.exports = { query };