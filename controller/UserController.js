const baseController =  require("./baseController")
const UserModel  =  require("../model/UserModel")
const CryptoJS = require("crypto-js")
//jwt
const jsonwebtoken =    require("jsonwebtoken")
const joi  =  require("joi")
const bcrypt = require("bcrypt")

require('dotenv').config({path:"../.env"})

const Exptoken  = process.env.exptoken  

let user_create =  joi.object().keys({
    email : joi.string().email().required(),
    password_salt :  joi.string().required(),
    password_hash :  joi.string().required(),
})


const user_update =  joi.object().keys({
    email : joi.string().email(),
    password_salt :  joi.string(),
    password_hash :  joi.string(),
})

const user_login  = joi.object().keys({
    email : joi.string().email().required(),
    password :  joi.string().required(),
})  



module.exports  =  new class  UserControler extends baseController {
    constructor(){
        super(UserModel,user_create,user_update)
        this.login  =  this.login.bind(this)
    }



    async login(req,res){
        let body  =  req.body
        let validation  = joi.validate(body,user_update)
        if(validation.error != null){
            let user = await this.model.get({email : body.email })
            let is_auth  =   await bcrypt.compare(body.password,user[0].password_hash)
            if(is_auth){
                let token  =  jsonwebtoken.sign({
                                id: user[0].id,
                                email : user[0].email
                            },req.app.get("certPrivate"), {  expiresIn: Exptoken })
                let tokendata = await jsonwebtoken.verify(token, req.app.get("certPrivate"))            
                
                delete user[0].password_salt
                delete user[0].password_hash

                res.status(200)
                res.set({
                    token : token,
                    tokenexp : tokendata.exp,
                    refreshtoken  : CryptoJS.AES.
                                        encrypt( JSON.stringify({
                                        id: user[0].id,
                                        email : user[0].email,
                                        tokenexp:tokendata.exp
                                        })
                                        ,req.app.get("secret_jwt"))
                })
                res.json({
                    statusCode:200,
                    result: user
                })
                res.end()
            }
            else{
                res.set(403)
                res.json({
                    statusCode:403,
                    message :"username / password false",
                })
                res.end()
            }
        }
        else{
            res.status(400)
            res.json({
                statusCode : 400,
                message :"validation err",
                validation :validation
            })
        }
    }


    async refreshtoken(req,res){
        let refreshtoken  = req.headers.refreshtoken
        if(refreshtoken != undefined && refreshtoken !=""){
            let servertime  = new Date()
            //add 30 minutes after expired
            servertime.setMinutes(servertime.getMinutes() + 30 )
            
            let refreshObj =  CryptoJS.AES.decrypt(refreshtoken, req.app.get("secret_jwt")).toString(CryptoJS.enc.Utf8);
            try {
                refreshObj =  JSON.parse(refreshObj)    
            } catch (error) {
                res.status(400)
                res.json({
                    statusCode:400,
                    message : "refresh token invalid"
                })
                res.end()
            }
            
            if(servertime >= refreshObj.tokenexp){
                let token  = jsonwebtoken.sign({
                    id: refreshObj.id,
                    email : refreshObj.email
                },req.app.get("certPrivate"), {  expiresIn: Exptoken })
                let tokendata = await jsonwebtoken.verify(token, req.app.get("certPrivate")) 
                res.set({
                    token :token,
                    tokenexp : tokendata.exp,
                    refreshtoken  :CryptoJS.AES.
                                    encrypt( JSON.stringify({
                                    id: refreshObj.id,
                                    email : refreshObj.email,
                                    tokenexp : tokendata.exp
                                    }) 
                                    ,req.app.get("secret_jwt"))
                })
                
                res.json({
                    statusCode: 200,
                    message : "check in headers new token and refresh token send inside it"
                })
                res.end()
            }
            else{
                res.status(401)
                res.json({
                    statusCode:401,
                    message :"yout not allow for this request"
                })
                res.end()
            }
            
        }
        else{
            res.status(401)
            res.json({
                statusCode:401,
                message :"yout not allow for this request"
            })
            res.end()
        }

    }


}