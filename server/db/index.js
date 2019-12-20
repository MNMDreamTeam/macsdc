const { Pool } = require('pg');
const { user, host, db, port, qt } = require('../../config.js');

const pool = new Pool({
  user: user,
  host: host,
  database: db,
  port: port
})

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// }

// promise connect
pool.connect()
.then(client => {
  return client
  .query(`SELECT * FROM ${qt} WHERE id = $1`, [1])
  .then(res => {
    client.release();
    console.log(res.rows[0]);
  })
  .catch(err => {
    client.release();
    console.log(err);
  })
})

