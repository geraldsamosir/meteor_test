const express = require("express")
const app  = express()
const fs  = require("fs")
require('dotenv').config()
const cors = require("cors")
const  bodyParser =  require("body-parser")
const compression =require('compression');



const certPrivate  =  fs.readFileSync(__dirname+'/ssl/key.pem')
const certPublic  = fs.readFileSync(__dirname+'/ssl/pubkey.pem')

app.set("certPrivate",certPrivate)
app.set("certPublic",certPublic)
app.set("secret_jwt",process.env.secret_jwt)
app.set("bycrypt_salt_round",process.env.bycrypt_salt_round)



//swagger initial
const swaggerdocs = require("./config/swagger")
const docsv1 =  new  swaggerdocs(app,1,"1.0.0")
docsv1.builthdocs()

app.use(cors())
app.use(compression())
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({ extended: false }));

//router 
require(__dirname+"/config/routermaper")(app)




app.listen(process.env.serverport,process.env.server,()=>{
    console.info("server meteor "+process.env.server+":"+process.env.serverport)
})