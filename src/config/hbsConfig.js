const exphandle = require('express-handlebars')

function configHbs(app){
    const handlebars = exphandle.create({
        extname:'.hbs'
    })
    app.engine('.hbs',handlebars.engine)
    app.set('view engine','.hbs')
}
module.exports = {
    configHbs
}