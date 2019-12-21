const questionsRoutes = require('express').Router();
const questionsControl = require('../controllers/questionsControl')

questionsRoutes.get('/:id/', (req, res) => {
  questionsControl.getQuestions(req.params.id)
  .then(data => {
    res.send(data);
  })
  .catch( (err) => {
    console.log(err);
  })
});

module.exports = questionsRoutes;