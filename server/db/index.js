const { Pool } = require('pg');

const pool = new Pool({
  user: 'mcolligan',
  host: 'localhost',
  database: 'postgres',
  port: 5432
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}

// promise connect
pool.connect()
.then(client => {
  return client
  .query('SELECT * FROM qa.questions WHERE id = $1', [33333])
  .then(res => {
    client.release();
    console.log(res.rows[0]);
  })
  .catch(err => {
    client.release();
    console.log(err);
  })
})

