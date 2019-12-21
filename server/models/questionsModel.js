const qdb = require('../db/index.js');
const { qt } = require('../../config.js');

const queryQuestions = (product_id) => {
  let q = `SELECT * FROM ${qt} WHERE product_id = $1 AND reported = $2`;
  let p = [product_id, 0];
  return qdb.query(q, p);
}

module.exports = { queryQuestions };