const allVolcanoesRouter = require('express').Router()
const {getAllVolcanoes} = require('../services/databaseService')

allVolcanoesRouter.get('/catalog',async(req,res)=>{
    const allVolcanoes = await getAllVolcanoes()
    res.render('allVolcanoes',{allVolcanoes})
})

module.exports = {
    allVolcanoesRouter
}