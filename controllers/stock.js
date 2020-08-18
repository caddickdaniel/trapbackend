const {
  getStock,
  getStockByBrewer,
  getStockByPlace,
  getStockByType,
  addStock,
  deleteStockByName
} = require('../models/stock');

exports.sendStock = (req, res, next) => {
  const { sort_by, order } = req.query;
  Promise.all([getStock(sort_by, order)])
    .then(([stock]) => {
      res.status(200).send({ stock });
    })
    .catch(err => next(err));
};

exports.sendStockByName = (req, res, next) => {
  const productName = req.params.product_name;
  getStockByName(productName)
    .then(([stock]) => {
      if (!stock) {
        return Promise.reject({
          status: 404,
          message: `That stock doesn't exist`
        });
      }
      res.status(200).send({ stock });
    })
    .catch(err => next(err));
};

exports.sendStockByBrewer = (req, res, next) => {
  const brewerName = req.params.brewer_name;
  getStockByBrewer(brewerName)
    .then(([stock]) => {
      if (!stock) {
        return Promise.reject({
          status: 404,
          message: `That brewer doesn't exist`
        });
      }
      res.status(200).send({ stock });
    })
    .catch(err => next(err));
};

exports.sendStockByPlace = (req, res, next) => {
  const placeName = req.params.place;
  getStockByPlace(placeName)
    .then(([stock]) => {
      if (!stock) {
        return Promise.reject({
          status: 404,
          message: `That container doesn't exist`
        });
      }
      res.status(200).send({ stock });
    })
    .catch(err => next(err));
};

exports.sendStockByType = (req, res, next) => {
  const typeName = req.params.type;
  getStockByType(typeName)
    .then(([stock]) => {
      if (!stock) {
        return Promise.reject({
          status: 404,
          message: `That type of drink doesn't exist`
        });
      }
      res.status(200).send({ stock });
    })
    .catch(err => next(err));
};

exports.sendNewStock = (req, res, next) => {
  const stockToAdd = req.body;

  addStock(stockToAdd)
    .then(([stock]) => res.status(201).send({ stock }))
    .catch(err => next(err));
};

exports.sendDeletedStock = (req, res, next) => {
  const { product_name } = req.params;

  deleteStockByName(product_name)
    .then(() => {
      if (!product_name) {
        return Promise.reject({
          status: 404,
          message: `The product doesn't exist`
        });
      }
      res.sendStatus(204);
    })
    .catch(err => next(err));
};
