const express =  require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.status(200)
    res.json({
        statusCode :200,
        message:"meteor rest api"
    })
})

module.exports =  router