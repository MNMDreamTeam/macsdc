const questionsModel = require('../models/questionsModel');

const getQuestions = (id) => {
  questionsModel.queryQuestions(id)
}

module.exports = { getQuestions };