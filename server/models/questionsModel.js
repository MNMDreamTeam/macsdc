const qdb = require('../db/index.js');
const { qt } = require('../../config.js');

const queryQuestions = (product_id, count) => {
  let q = `SELECT * FROM ${qt} WHERE product_id = $1 AND reported = $2 ORDER BY id LIMIT $3`;
  let p = [product_id, 0, count];
  return qdb.query(q, p);
}

module.exports = { queryQuestions };