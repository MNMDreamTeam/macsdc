const answerModel = require('../models/answerModel');

const getAnswers = (question_id, page, count) => {
  return answerModel.queryAnswers(question_id, page, count);
}

const addAnswer = (id, a, n, e, p) => {
  return answerModel.insertA(id, a, n, e, p);
}

module.exports = { getAnswers, addAnswer };