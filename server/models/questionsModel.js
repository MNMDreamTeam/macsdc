const qdb = require('../db/index.js');
const { qt, at } = require('../../config.js');

const getAnswers = (id) => {
  let a = `SELECT * FROM ${at} WHERE question_id = $1`;
  let parm = [id];
  Promise.all([qdb.query(a, parm)])
  .then((data) => {
    data.forEach(el => {
      // Build answer obj
    })
  })
}

const queryQuestions = (product_id, count) => {
  let q = `SELECT * FROM ${qt} WHERE product_id = $1 AND reported = $2 ORDER BY question_id LIMIT $3`;
  let p = [product_id, 0, count];

  let output = {
    product_id: product_id,
    results: []
  }

  return Promise.all([qdb.query(q, p)])
  .then((data) => {
    data[0].forEach(el => {
      output.results.push({
        question_id: el.question_id,
        question_body: el.question_body,
        question_date: el.question_date,
        asker_name: el.asker_name,
        question_helpfulness: el.question_helpfulness,
        reported: el.reported,
        answers: getAnswers(el.question_id)
      })
    })
    return output;
  })
}

module.exports = { queryQuestions };