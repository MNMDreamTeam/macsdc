const fs = require('fs');
const fastcsv = require('fast-csv');

let questions = fs.createReadStream('csv/questions_test.csv');
let parseData = [];

let csvStream = fastcsv.parse()
.on('data', (data) => {
  parseData.push(data);
})
.on('end', () => {
  parseData.shift();
});

questions.pipe(csvStream);
