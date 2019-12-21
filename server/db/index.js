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
}

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// }

// promise connect
// Test
// pool.connect()
// .then(client => {
//   return client
//   .query(`SELECT * FROM qa.questions WHERE product_id = $1`, [1])
//   .then(res => {
//     client.release();
//     console.log(res.rows);
//   })
//   .catch(err => {
//     client.release();
//     console.log(err);
//   })
// })

// {
//   user: 'mcolligan',
//   host: 'localhost',
//   database: 'postgres',
//   port: 5432
// }

module.exports = { query };