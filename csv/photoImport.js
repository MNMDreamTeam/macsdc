const fs = require('fs');
const fastcsv = require('fast-csv');

let photos = fs.createReadStream('/Users/mcolligan/FEC/projectGreenfieldII/csvData/answers_photos.csv');
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

  const answerPhoto = 'INSERT INTO answer_photos (id, answer_id, url) VALUES ($1, $2, $3)';

  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      parseData.forEach(el => {
        client.query(answerPhoto, el, (err, res) => {
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

photos.pipe(csvStream);

