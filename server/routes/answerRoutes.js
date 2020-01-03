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
    console.log(err);
  })
});

answerRoutes.post('/:id/answers', (req, res) => {
  answerControl.addAnswer(req.params.id, req.body.body, req.body.name, req.body.email, req.body.photos)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log(err);
  })
});

answerRoutes.put('/:id/helpful', (req, res) => {
  answerControl.addHelpful(req.params.id)
  .then(() => {
    res.status(204).end();
  })
  .catch((err) => {
    console.log(err);
  })
});

answerRoutes.put('/:id/report', (req, res) => {
  answerControl.report(req.params.id)
  .then(() => {
    res.status(204).end()
  })
  .catch((err) => {
    console.log(err);
  })
})

module.exports = answerRoutes;