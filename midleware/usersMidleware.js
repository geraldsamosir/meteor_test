const bycrypt =  require("bcrypt")
const jsonwebtoken =    require("jsonwebtoken")
module.exports =  new class userMidelware {


    async checkisauth(req,res,next){
        if(req.headers.token  !=  undefined && req.headers.token !="" && req.headers.token != null){
            let  decoded = {}
            try {
              decoded  =  await jsonwebtoken.verify(req.headers.token, req.app.get("certPrivate")) 
              next();   
            } catch (error) {
                if(error.name == "TokenExpiredError"){
                    res.status(403)
                    res.json({
                        statusCode:403,
                        message :"token Expired"
                    })
                }
                else{
                    res.status(401)
                    res.json({
                        statusCode:401,
                        message :"yout not allow for this request"
                    })                        
                }
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


    async hashAndSalt(req,res,next){
        if(req.body.password != "" && req.body.password != undefined){            
            req.body.password_salt = await bycrypt.genSalt(parseInt(req.app.get("bycrypt_salt_round")))
            req.body.password_hash = await bycrypt.hash(req.body.password,req.body.password_salt)
            delete req.body.password
        }
        next();
    }
}