exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('products_categories',function(table) {
            table.increments('id').primary();
            table.integer('product_id').unsigned().notNullable();
            table.integer("category_id").unsigned().notNullable();

            table.foreign('category_id')
            .references('categories.id')
            .onDelete('cascade')
            .onUpdate('cascade');

            table.foreign('product_id')
            .references('products.id')
            .onDelete('cascade')
            .onUpdate('cascade');

            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))

        })
};

exports.down = function(knex, Promise) {
    return knex.products
        .dropTable('products_categories')
};