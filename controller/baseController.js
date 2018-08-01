const Joi =  require("joi")

module.exports  =  class  baseController {
    constructor(model, validation , validationUpdate){
       this.model  = model
       this.validation  = validation
       this.validationUpdate =  validationUpdate
       this.get = this.get.bind(this)
       this.create =  this.create.bind(this)
       this.update =  this.update.bind(this)
       this.delete = this.delete.bind(this) 
    }

    async get(req,res){
        let filter  = req.query
        let result  =  await this.model.get(filter)
        if(result.length > 0){
            res.status(200)
            res.json({
                statusCode:200,
                result :result
            })
        }
        else{
            res.status(404)
            res.json({
                statusCode:404,
                message :"not found"
            })
        }
        
        res.end()
    }

    async getbyid(req,res){
       let id  =  req.query.id
       let result  =  await this.model.get({id:id})
       res.status((result.length > 0)?200:404)
       res.json({
           statusCode:(result.length > 0)?200:404,
           result : result
       })
       res.end()  
    }

    async create(req,res){
      let body  =  req.body
      let validation_schema = this.validation
      let validationdata  = Joi.validate( body,validation_schema)
      if(validationdata.error == null){
        let result =  await this.model.create(body)
        res.status((result[0]>0)?201:500)
        res.json({
            statusCode :(result[0]>0)?201:500,
            message: "data created"
        })
      }
      else{
          res.status(400)
          res.json({
              statusCode:400,
              message : "validation err",
              validation  : validationdata
          })
      }
      res.end()
    }
    
    async update(req,res){
        let body  =  req.body
        let filter =  req.query
        let result =  await this.model.update(body,filter)
        res.status((result >0)?200:500)
        res.json({
            statusCode :(result > 0)?200:500,
            result : {
                message: "data updated"
            }
        })
        res.end()
    }
    
    async delete(req,res){
      let id  = req.query.id
      let result = await  this.model.delete(id)
      res.status((result > 0)?200:500)
      res.json({
          statusCode:(result > 0)?200:500,
          result:{
              message : "data deleted"
          }
      })
      res.end()
    }
}