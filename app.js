const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');

app.use(cors());

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
  res.status(404).send({
    message:
      'Sorry, this page was not found! Go to /api to see a list of endpoints'
  });
});

module.exports = app;
