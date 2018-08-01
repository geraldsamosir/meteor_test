const knex = require("../config/db/db")
const Model  = require("./baseModel")

module.exports =  new class Products extends  Model{
    constructor(){
        super()
        this.tablename = "products"
    }

    getcostum(select ,filter){
        return knex.select(select).from(this.tablename)
                .where(filter)
    }
}