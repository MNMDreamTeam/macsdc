const qdb = require('../db/index.js');
const { user, host, db, port, qt } = require('../../config.js');

const queryQuestions = (product_id) => {
  let q = 'SELECT * FROM qa.questions WHERE product_id = $1';
  let p = [product_id];
  qdb.query(q, p)
}

module.exports = { queryQuestions };