const baseController =  require("./baseController")
const productModel  =  require("../model/productModel")
const product_categoriesModel  = require("../model/ProductCategoriesModel")  
const joi  =  require("joi")


const Category =  joi.object().keys({
    id : joi.number().integer().required()
})

const product_create =  joi.object().keys({
    productName : joi.string().required(),
    productDesc :  joi.string().required(),
    price :  joi.number().integer(),
    categories :  joi.array().min(0).items(Category)
})

const product_categories = joi.object().keys({
    product_id : joi.number().integer().required(),
    category_id : joi.number().integer().required()
}) 

const product_update =  joi.object().keys({
    productName : joi.string(),
    productDesc :  joi.string(),
    price :  joi.number().integer(),
})

module.exports  =  new class  ProductControler extends baseController {
    constructor(){
        super(productModel,product_create,product_update)
    }

    async get(req,res){
        let filter  = req.query
        let result  =  await this.model.get(filter)
        result =  await Promise.all(result.map(async(data)=>{
            let list_category = await product_categoriesModel.getjoinwithCategories(data.id)
            data.categories = list_category
            return data
        }))

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
    }

    async create(req,res){
        let body  =  req.body
        let Categories =  []
        
        //handle if send json stringify or json object
        try {
          Categories =  JSON.parse(body.categories)    
        } catch (error) {
          Categories =  body.categories
        } 
         
        delete body.categories

        let validation_schema = this.validation
        let validationdata  = joi.validate( body,validation_schema)
        if(validationdata.error == null){

          /**
           * insert to product and get id 
           */
          let result =  await this.model.create(body).returning('id')
         
          let _categories =  Categories.map((data)=>{
              data.product_id  = result[0] 
              data.category_id = data.id
              delete data.id 
              return data
          })
         
          let product_categories =  []
          try {
            product_categories =  await product_categoriesModel.create(_categories)  
          } catch (error) {
              res.status(400)
              res.json({
                  statusCode:400,
                  message : "categories id false"
              })
              res.end()
          }
          
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

    async createrelation(req,res){
        let body  =  req.body 
        let validationdata =  joi.validate(body,product_categories)
        if(validationdata.error ==  null){
             let result =  {}
             try {
             result =    await  product_categoriesModel.create(body)
             } catch (error) {
                res.status(400)
                res.json({
                    statusCode:400,
                    message : "categories id false"
                })
                res.end()
             }
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

    async deleterelation(req,res){
       let id =  parseInt(req.query.id)
       let result  =  await product_categoriesModel.delete(id)
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