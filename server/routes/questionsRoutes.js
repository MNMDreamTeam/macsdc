const questionsRoutes = require('express').Router();
const questionsControl = require('../controllers/questionsControl')

questionsRoutes.get('/:id/', (req, res) => {
  let count = 5;
  let page = 1;

  if (req.query.hasOwnProperty('count')) {
    count = req.query.count;
  }

  if (req.query.hasOwnProperty('page')) {
    page = req.query.page;
  }

  questionsControl.getQuestions(req.params.id, page, count)
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = questionsRoutes;