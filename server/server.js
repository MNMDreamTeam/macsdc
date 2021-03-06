const express = require('express');
const bodyParser = require('body-parser');

const questionsRoutes = require('./routes/questionsRoutes.js');
const answerRoutes = require('./routes/answerRoutes.js');
// require('newrelic'); - for metrics

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/qa', questionsRoutes, answerRoutes);
app.use('/qa/question', questionsRoutes);
app.use('/qa/answer', answerRoutes);

app.listen('3000', () => {
  console.log('Port 3000 is go');
})