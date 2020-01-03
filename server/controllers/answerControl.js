const answerModel = require('../models/answerModel');

const getAnswers = (question_id, page, count) => {
  return answerModel.queryAnswers(question_id, page, count);
}

const addAnswer = (id, a, n, e, p) => {
  return answerModel.insertA(id, a, n, e, p);
}

const addHelpful = (aId) => {
  return answerModel.helpful(aId);
}

const report = (aId) => {
  return answerModel.reported(aId);
}

module.exports = { getAnswers, addAnswer, addHelpful, report };