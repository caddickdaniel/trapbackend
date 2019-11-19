exports.up = function (connection, Promise) {
  return connection.schema.createTable('stock', (stockTable) => {
    stockTable.increments('stock_id').primary();
    stockTable.string('product_name').notNullable();
    stockTable.string('brewery_name').notNullable();
    stockTable.integer('abv').notNullable();
    stockTable.string('type').notNullable();
    stockTable.string('place').notNullable();
    stockTable.text('desc');
    stockTable.integer('price');
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('stock');
};
