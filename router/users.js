/**
   * @swagger
   * tags:
   *   name: Users
   *   description: Users rest api
*/
const express =  require("express")
const user = require("../controller/UserController")
const userMidelware =  require("../midleware/usersMidleware")
const router = express.Router()


/**
   * @swagger
   * /users:
   *   get:
   *     description: Returns the homepage
   *     tags: [Users]
   *     consumes:
   *     - application/json 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: query
   *       name: id
   *       type: integer
   *     - in: query
   *       name: email
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
   *                     email:
   *                      type: string
   *                     created_date:
   *                      type: string
   *                     password_salt:
   *                      type: string
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
router.get("/", user.get)

/**
   * @swagger
   * /users/login:
   *   post:
   *     description: Returns the homepage
   *     tags: [Users]
   *     consumes:
   *     - application/x-www-form-urlencoded 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: formData
   *       name: email
   *       type: string
   *       required: true
   *     - in: formData
   *       name: password
   *       type: string
   *       required: true    
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
   *                     email:
   *                      type: string
   *                     created_date:
   *                      type: string
   *                     password_salt:
   *                      type: string
   *                     update_at:
   *                       type: string
   *                     created_at:
   *                       type: string  
   *       403:
   *         description: notfound
   *         schema:
   *           type: object
   *           properties:
   *            statuscode:
   *             type: integer
   *            message:
   *             type: string   
   */
router.post("/login",user.login)

/**
   * @swagger
   * /users/token:
   *   get:
   *     description: Returns the homepage
   *     tags: [Users]
   *     consumes:
   *     - application/x-www-form-urlencoded 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: header
   *       name: refreshtoken
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
router.get("/token",user.refreshtoken)

/**
   * @swagger
   * /users/:
   *   post:
   *     description: Returns the homepage
   *     tags: [Users]
   *     consumes:
   *     - application/x-www-form-urlencoded 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: formData
   *       name: email
   *       type: string
   *       required: true
   *     - in: formData
   *       name: password
   *       type: string
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
router.post("/",userMidelware.hashAndSalt,user.create)
/**
   * @swagger
   * /users/:
   *   put:
   *     description: Returns the homepage
   *     tags: [Users]
   *     consumes:
   *     - application/x-www-form-urlencoded 
   *     produces:
   *     - application/json 
   *     parameters:
   *     - in: query
   *       name: id
   *       type: integer
   *       required: true
   *     - in: formData
   *       name: email
   *       type: string
   *     - in: formData
   *       name: password
   *       type: string    
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
   *                     email:
   *                      type: string
   *                     created_date:
   *                      type: string
   *                     password_salt:
   *                      type: string
   *                     update_at:
   *                       type: string
   *                     created_at:
   *                       type: string     
   */
router.put("/",userMidelware.hashAndSalt, user.update)
//router.delete("/",user.delete)



module.exports =  router