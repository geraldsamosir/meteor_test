const knex = require("../config/db/db")
const Model  = require("./baseModel")

module.exports =  new class Categories extends  Model{
    constructor(){
        super()
        this.tablename = "categories"
    }

    getcostum(select ,filter){
        return knex.select(select).from(this.tablename)
                .where(filter)
    }
}