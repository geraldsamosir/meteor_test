require('dotenv').config({path:"../../.env"})

const db ={
    client: 'mysql',
    connection: {
          host: process.env.databaseserver,
          user: process.env.databaseuser,
          password: process.env.databasepassword,
          database: process.env.databasename
      }
}

module.exports = {

  development: db
};