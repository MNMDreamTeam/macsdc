const { Pool } = require('pg');

const pool = new Pool({
  user: 'mcolligan',
  host: 'localhost',
  database: 'postgres',
  port: 5432
})

pool.query('', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successsssssssssssss');
  }
})

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

