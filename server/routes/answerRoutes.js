const answerRoutes = require('express').Router();
const answerControl = require('../controllers/answerControl');

answerRoutes.get('/:id/answers/', (req, res) => {
  let count = 5;
  let page = 1;

  if (req.query.hasOwnProperty('count')) {
    count = req.query.count;
  }

  if (req.query.hasOwnProperty('page')) {
    page = req.query.page;
  }

  answerControl.getAnswers(req.params.id, page, count)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err)
  })
});

module.exports = answerRoutes;