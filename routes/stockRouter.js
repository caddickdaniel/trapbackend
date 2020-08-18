const stockRouter = require('express').Router();
const {
  sendStock,
  sendStockByName,
  sendStockByBrewer,
  sendStockByPlace,
  sendStockByType,
  sendNewStock,
  sendDeletedStock,
} = require('../controllers/stock');
const { handle405 } = require('../errors');

stockRouter
  .route('/')
  .get(sendStock)
  .post(sendNewStock)
  .all(handle405);

stockRouter
  .route('/:product_name')
  .get(sendStockByName)
  .delete(sendDeletedStock)
  .all(handle405);

stockRouter
  .route('/:brewery_name')
  .get(sendStockByBrewer)
  .all(handle405);

stockRouter
  .route('/:place')
  .get(sendStockByPlace)
  .all(handle405);

stockRouter
  .route('/:type')
  .get(sendStockByType)
  .all(handle405);

articleRouter
  .route('/:article_id/comments')
  .get(sendCommentsByID)
  .post(sendNewCommentByID)
  .all(handle405);

module.exports = articleRouter;
