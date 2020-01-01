const questionsModel = require('../models/questionsModel');

const getQuestions = (id, page, count) => {
 return questionsModel.queryQuestions(id, page, count);
}

module.exports = { getQuestions };