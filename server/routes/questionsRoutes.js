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
    .then(data => (res.send(data)))
    .catch(err => (console.log(err)))
});

questionsRoutes.post('/:id/', (req, res) => {
  questionsControl.addQuestion(req.params.id, req.body.body, req.body.name, req.body.email)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log(err);
  })
});

questionsRoutes.put('/:id/helpful', (req, res) => {
  questionsControl.addHelpful(req.params.id)
  .then(() => {
    res.status(204).end()
  })
  .catch((err) => {
    console.log(err);
  })
})

questionsRoutes.put('/:id/report', (req, res) => {
  questionsControl.report(req.params.id)
  .then(() => {
    res.status(204).end();
  })
  .catch((err) => {
    console.log(err);
  })
})

module.exports = questionsRoutes;