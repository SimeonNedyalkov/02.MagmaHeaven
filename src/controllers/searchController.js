const searchRouter = require('express').Router()

searchRouter.get('/search',(req,res)=>{
    res.render('search')
})

module.exports = {
    searchRouter
}