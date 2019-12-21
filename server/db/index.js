const { Pool } = require('pg');

const pool = new Pool({
  user: 'mcolligan',
  host: 'localhost',
  database: 'postgres',
  port: 5432
});

const query = (queryString, params) => {
  pool.query('SELECT * FROM qa.questions WHERE product_id = $1', [2])
  .then(res => {
    console.log(res.rows);
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

module.exports = { query };