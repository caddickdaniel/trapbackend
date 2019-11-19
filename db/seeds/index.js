const { stockData } = require('../data');

exports.seed = function(connection, Promise) {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() =>
      connection('stock')
        .insert(stockData)
        .returning('*')
    );
};
