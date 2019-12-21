const questionsRoutes = require('express').Router();
const questionsControl = require('../controllers/questionsControl')

questionsRoutes.get('/:id/', (req, res) => {
  let count = 5;
  if (req.query.hasOwnProperty('count')) {
    count = req.query.count;
  }
  questionsControl.getQuestions(req.params.id, count)
  .then(data => {
    res.send(data);
  })
  .catch( (err) => {
    console.log(err);
  })
});

module.exports = questionsRoutes;