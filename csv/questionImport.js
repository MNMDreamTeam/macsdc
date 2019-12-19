const fs = require('fs');
const fastcsv = require('fast-csv');

let questions = fs.createReadStream('/Users/mcolligan/FEC/projectGreenfieldII/csvData/questions.csv');
// let questions = fs.createReadStream('/Users/mcolligan/FEC/projectGreenfieldII/csvData/testFiles/questions_test.csv');
let parseData = [];

let csvStream = fastcsv.parse()
.on('data', (data) => {
  parseData.push(data);
})
.on('end', () => {
  const Pool = require('pg').Pool;

  parseData.shift();

  const pool = new Pool ({
    host: 'localhost',
    user: 'mcolligan',
    database: 'questionsapi',
    port: 5432
  });

  const questionInsert = 'INSERT INTO qa.questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      parseData.forEach(el => {
        client.query(questionInsert, el, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`inserted ${res} @ ${el}`);
          }
        })
      })
    } finally {
      done();
    }
  })
});

questions.pipe(csvStream);

