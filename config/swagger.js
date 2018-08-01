const swagger = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()

module.exports =    class swaggers {
    constructor(app,version,versionstring){
        this.app =  app
        this.version =  version
        this.versionstring = versionstring
        this.swaggerinfo = {
            info: { 
                title: process.env.restapiname, 
                version: this.versionstring, 
                description: process.env.restapidesc, 
              },
              host: process.env.server+':'+process.env.serverport, 
              basePath: '/v'+this.version+'/', 
        }

        this.optswager = {
            swaggerDefinition: this.swaggerinfo,
            apis: ['./router/*.js'],
        }

        this.swaggerUiSetupconf = {
             //explorer : true, //open if you want to open the explorer
            swaggerUrl:"http://"+process.env.server+":"+process.env.serverport+"/swagger.json"
        }
        this.swaggerSpec = swagger(this.optswager)
        this.builthdocs.bind(this)
        
    }

    builthdocs(){
        let swaggerSpec =  this.swaggerSpec
        this.app.get('/swagger.json', function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger,this.swaggerUiSetupconf ));
    }
}