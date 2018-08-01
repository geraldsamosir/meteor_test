const { readdirSync } = require('fs')
const { basename, extname } = require('path')

module.exports = app => {
  const routerDir = `${process.cwd()}/router`
  
  readdirSync(routerDir).forEach(file => {
    let filename = basename(file, extname(file))

    if (file.indexOf('.js') ) {
      if(filename !== 'index'){
        app.use('/v1/' + filename, require(`${routerDir}/${file}`))
      }
      else{
        app.use('/v1/' , require(`${routerDir}/${file}`))
      }
    }
  })
}