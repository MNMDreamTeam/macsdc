const questionsModel = require('../models/questionsModel');

const getQuestions = (question_id, page, count) => {
 return questionsModel.queryQuestions(question_id, page, count);
}

const addQuestion = (product_id, q, name, email) => {
  return questionsModel.insertQ(product_id, q, name, email);
}

const addHelpful = (question_id) => {
  return questionsModel.helpful(question_id);
}

const report = (question_id) => {
  return questionsModel.reported(question_id);
}

module.exports = { getQuestions, addQuestion, addHelpful, report };