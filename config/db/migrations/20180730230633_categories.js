exports.up = function(knex, Promise) {
    let datetime_now = new Date()
    return knex.schema
        .createTable('categories', function(table) {
            table.increments('id').primary();
            table.string('categoyname').notNullable();
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))

        })
        .then(()=>{
            return knex("categories").insert(
                [
                    {
                        categoyname:"tas",
                        created_at : datetime_now,
                        updated_at : datetime_now
                    },
                    {
                        categoyname : "majalah",
                        created_at : datetime_now,
                        updated_at : datetime_now
                    },
                    {
                        categoyname : "sepatu",
                        created_at : datetime_now,
                        updated_at : datetime_now
                    }
                ]
            )
        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('categories')
};