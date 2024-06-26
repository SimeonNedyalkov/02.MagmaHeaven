const detailsRouter = require('express').Router()
const {getVolcanoById,vote} = require('../services/databaseService')
const {parseError} = require('../config/errorConfig')
const { validationResult, body } = require('express-validator');

detailsRouter.get('/details/:id',async(req,res)=>{
    const id = req.params.id
    const volcano = await getVolcanoById(id)
    const isOwner = volcano.owner == req.user?._id
    const votesCount = volcano.voteList.length
    const alreadyVoted = Boolean(volcano.voteList.find(l=>req.user?._id == l.toString()))
    res.render('details',{volcano,isOwner,votesCount,alreadyVoted})
})
detailsRouter.get('/vote/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const result = validationResult(req);
            if (!result.isEmpty()) {
                throw result.array();
            }
        await vote(id,req.user?._id)
        res.redirect(`/details/${id}`)
    }catch(err){
        res.render('details', { errors: parseError(err).errors });
    }
    
    
})

module.exports = {
    detailsRouter
}