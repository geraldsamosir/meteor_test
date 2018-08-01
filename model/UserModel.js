const knex = require("../config/db/db")
const Model  = require("./baseModel")

module.exports =  new class Users extends  Model{
    constructor(){
        super()
        this.tablename = "users"
    }

    getcostum(select ,filter){
        return knex.select(select).from(this.tablename)
                .where(filter)
    }
}