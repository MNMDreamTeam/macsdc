const questionsModel = require('../models/questionsModel');

const getQuestions = (question_id, page, count) => {
 return questionsModel.queryQuestions(question_id, page, count);
}

module.exports = { getQuestions };