const apiRouter = require('express').Router();
const stockRouter = require('./stockRouter');
const { endpoints } = require('../endpoints');

apiRouter.use('/stock', stockRouter);

apiRouter.get('/', (req, res, next) => {
  res.status(200).send(endpoints);
});

module.exports = apiRouter;
