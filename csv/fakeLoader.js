const faker = require('faker');
const { Pool } = require('pg');
const Client = require('pg-native');
const { host, user, db, port, qt } = require('../config.js');

/*
  run test on test table first yo
*/

let client = new Client({
  host: host,
  user: user,
  database: db,
  port: port
});

const q = `INSERT INTO qa.questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
let v;

client.connectSync();

  let count = 0
  for (let i = 10000000; i < 13521634; ++i) {
    ++count;
    v = [i, faker.random.number(), faker.lorem.paragraph(), faker.date.past(25).toISOString().slice(0, 10), faker.name.findName(), faker.internet.email(),faker.random.number(1), faker.random.number(5)];
    client.querySync(q, v, (err, res) => {
      if (err) {
        console.log(err.stack);
      }
    })
    if (count === 500000) {
      console.log('working');
      count = 0;
    }
  }
  console.log('done');
