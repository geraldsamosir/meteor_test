const knex = require("../config/db/db")
const Model  = require("./baseModel")

module.exports =  new class  Products_categories extends  Model{
    constructor(){
        super()
        this.tablename = "products_categories"
    }

    getcostum(select ,filter){
        return knex.select(select).from(this.tablename)
                .where(filter)
    }

    getjoinwithCategories(product_id){
        return knex.select([
            "*",
            "products_categories.id as id",
            "categories.id as categories_id ",
 
            ]
            )
            .from(this.tablename)
            .innerJoin('categories','categories.id',this.tablename+'.category_id')
            .where({product_id:product_id})   
    }
}