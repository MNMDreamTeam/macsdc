const questionsModel = require('../models/questionsModel');

const getQuestions = (id, count) => {
 return questionsModel.queryQuestions(id, count);
}

module.exports = { getQuestions };