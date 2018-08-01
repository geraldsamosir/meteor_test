const bycrypt =  require("bcrypt")
require('dotenv').config({path:"../../.env"})

exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(table) {
            table.increments('id').primary();
            table.string('email').unique().notNullable();
            table.string("password_salt").notNullable();
            table.string("password_hash").notNullable()
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))

        })
        .then(()=>{
            console.log(process.env.bycrypt_salt_round)
            let salt =   bycrypt.genSaltSync(parseInt(process.env.bycrypt_salt_round) )  
            return knex("users").insert(
                [{
                    email : "admin@mail.com",
                    password_salt : salt ,
                    password_hash :  bycrypt.hashSync("admin",salt)
                }]
            )
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('users')
};