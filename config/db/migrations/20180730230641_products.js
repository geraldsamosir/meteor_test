exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('products', function(table) {
            table.increments('id').primary();
            table.string('productName').notNullable();
            table.string("productDesc").notNullable();
            table.integer("price").notNullable().default(0);
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))

        })
};

exports.down = function(knex, Promise) {
    return knex.products
        .dropTable('products')
};