const answerModel = require('../models/answerModel');

const getAnswers = (question_id, page, count) => {
  return answerModel.queryAnswers(question_id, page, count);
}

module.exports = { getAnswers };