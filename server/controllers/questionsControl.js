const questionsModel = require('../models/questionsModel');

const getQuestions = (id) => {
 return questionsModel.queryQuestions(id);
}

module.exports = { getQuestions };