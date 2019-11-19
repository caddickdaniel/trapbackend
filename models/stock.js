const connection = require('../db/connection');

exports.getStock = (sort_by = 'place', order = 'desc') =>
  connection
    .select(
      'stock.product_name',
      'stock.brewery_name',
      'stock.abv',
      'stock.type',
      'stock.place',
      'stock.desc',
      'stock.price'
    )
    .from('stock')
    .orderBy(sort_by, order)
    .returning('*');

exports.getStockByBrewer = brewerName =>
  connection
    .select(
      'stock.product_name',
      'stock.brewery_name',
      'stock.abv',
      'stock.type',
      'stock.place',
      'stock.desc',
      'stock.price'
    )
    .groupBy('stock.brewery_name')
    .from('stock')
    .where('stock.brewery_name', '=', brewerName)
    .returning('*');

exports.getStockByPlace = placeName =>
  connection
    .select(
      'stock.product_name',
      'stock.brewery_name',
      'stock.abv',
      'stock.type',
      'stock.place',
      'stock.desc',
      'stock.price'
    )
    .groupBy('stock.place')
    .from('stock')
    .where('stock.place', '=', placeName)
    .returning('*');

exports.getStockByType = typeName =>
  connection
    .select(
      'stock.product_name',
      'stock.brewery_name',
      'stock.abv',
      'stock.type',
      'stock.place',
      'stock.desc',
      'stock.price'
    )
    .groupBy('stock.type')
    .from('stock')
    .where('stock.type', '=', typeName)
    .returning('*');

exports.addStock = newStock =>
  connection
    .insert(newStock)
    .into('stock')
    .returning('*');

exports.deleteStockByName = productName =>
  connection('stock')
    .where('stock.product_name', '=', productName)
    .del();
