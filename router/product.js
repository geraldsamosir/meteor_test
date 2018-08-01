/**
   * @swagger
   * tags:
   *   name: Product
   *   description: Product rest api
*/
const express =  require("express")
const product = require("../controller/productController")
const userMidleware =  require("../midleware/usersMidleware")
const router = express.Router()

router.use(userMidleware.checkisauth)

/**
   * @swagger
   * /product:
   *   get:
   *     description: Returns the homepage
   *     tags: [Product]
   *     consumes:
   *     - application/json 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: query
   *       name: id
   *       type: integer
   *     - in: header
   *       name: token
   *       type: string
   *       required: true
   *     - in: query
   *       name: productName
   *       type: string
   *     - in: query
   *       name: skip
   *       type: integer  
   *     - in: query
   *       name: limit
   *       type: integer  
   *     responses:
   *       200:
   *         description: success
   *         schema:
   *          type: object
   *          properties:
   *            statuscode:
   *               type: integer
   *            result:
   *               schema:
   *               type: array
   *               items:
   *                   properties:
   *                     id:
   *                      type: string
   *                     productName:
   *                      type: string
   *                     productDesc:
   *                      type: string
   *                     created_date:
   *                      type: string
   *                     categories:
   *                      type: array
   *                      items:
   *                       type: object
   *                     updated_at:
   *                       type: string
   *                     created_at:
   *                       type: string 
   *       404:
   *         description: notfound
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   */
router.get("/" ,product.get)

/**
   * @swagger
   * /product:
   *   post:
   *     description: Returns the homepage
   *     tags: [Product]
   *     consumes:
   *     - application/x-www-form-urlencoded 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: header
   *       name: token
   *       type: string
   *       required: true 
   *     - in: formData
   *       name: productName
   *       type: string
   *       required: true
   *     - in: formData
   *       name: productDesc
   *       type: string
   *       required: true    
   *     - in: formData
   *       name: categories
   *       type: string
   *       required: true   
   *       description : send id category in json stringfy example [{"id":2}] 
   *                    if not have category just send empty array  
   *     responses:
   *       201:
   *         description: success
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   *       400:
   *         description: request error
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string
   *            validation:
   *             type: object   
   *       404:
   *         description: notfound
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   */
router.post("/", product.create)

/**
   * @swagger
   * /product/relation/categories:
   *   post:
   *     description: Returns the homepage
   *     tags: [Product]
   *     consumes:
   *     - application/x-www-form-urlencoded 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: header
   *       name: token
   *       type: string
   *       required: true 
   *     - in: formData
   *       name: product_id
   *       type: integer
   *       required: true
   *     - in: formData
   *       name: category_id
   *       type: integer
   *       required: true     
   *     responses:
   *       201:
   *         description: success
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   *       400:
   *         description: request error
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string
   *            validation:
   *             type: object   
   *       404:
   *         description: notfound
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   */
router.post("/relation/categories",product.createrelation)
/**
   * @swagger
   * /product:
   *   put:
   *     description: Returns the homepage
   *     tags: [Product]
   *     consumes:
   *     - application/x-www-form-urlencoded 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: query
   *       name: id
   *       type: integer
   *       required: true
   *     - in: header
   *       name: token
   *       type: string
   *       required: true 
   *     - in: formData
   *       name: productName
   *       type: string
   *       required: true
   *     - in: formData
   *       name: productDesc
   *       type: string
   *       required: true     
   *     responses:
   *       200:
   *         description: success
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   *       400:
   *         description: request error
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string
   *            validation:
   *             type: object   
   *       404:
   *         description: notfound
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   */
router.put("/",product.update)

/**
   * @swagger
   * /product:
   *   delete:
   *     description: Returns the homepage
   *     tags: [Product]
   *     consumes:
   *     - application/json 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: query
   *       name: id
   *       type: integer
   *       required: true  
   *     - in: header
   *       name: token
   *       type: string
   *       required: true 
   *     responses:
   *       200:
   *         description: success
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   *       404:
   *         description: notfound
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   */
router.delete("/",product.delete)
/**
   * @swagger
   * /product/relation/categories:
   *   delete:
   *     description: Returns the homepage
   *     tags: [Product]
   *     consumes:
   *     - application/json 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: query
   *       name: id
   *       type: integer
   *       required: true  
   *     - in: header
   *       name: token
   *       type: string
   *       required: true 
   *     responses:
   *       200:
   *         description: success
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   *       404:
   *         description: notfound
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   */
router.delete("/relation/categories",product.deleterelation)

module.exports =  router