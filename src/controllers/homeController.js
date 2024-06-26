const homeRouter = require('express').Router()

homeRouter.get('/',(req,res)=>{
    res.render('home')
})

module.exports = {
    homeRouter
}