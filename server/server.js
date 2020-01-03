const express = require('express');
const bodyParser = require('body-parser');

const questionsRoutes = require('./routes/questionsRoutes.js');
const answerRoutes = require('./routes/answerRoutes.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/qa', questionsRoutes, answerRoutes);
app.use('/qa/question', questionsRoutes);

app.listen('3000', () => {
  console.log('Port 3000 is go');
})