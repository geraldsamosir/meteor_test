const knex = require("../config/db/db")

module.exports  =  class Model  {
    constructor(){
        this.tablename  = ""
    }

    get(filter,_select){
        const limit = (filter.limit != undefined) ?parseInt(filter.limit):1
        const skip = (filter.skip != undefined) ?parseInt(filter.skip):0
        delete filter.limit
        delete filter.skip
        
        return knex.select(_select).from(this.tablename)
                .where(filter)
                .limit(limit)
                .offset(skip)
    }

    create(data){
        return knex(this.tablename).insert(data)
    }

    update(data,filter){
        data.updated_at  =  new Date()
        return knex(this.tablename).where(filter).update(data)
    }

    delete(id){
        return knex(this.tablename).where({id:id}).del()
    }
}