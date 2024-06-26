const createRouter = require('express').Router()
const {parseError} = require('../config/errorConfig')
const { validationResult, body } = require('express-validator');
const {create} = require('../services/databaseService')
const {isUser} = require('../middlewares/guards')
createRouter.get('/create',(req,res)=>{
    res.render('create')
})
createRouter.post('/create',
    body('name').trim().isLength({min:2}).withMessage('Name is required and must be atleast 2 characters long'),
    body('location').trim().isLength({min:3}).withMessage('location is required and must be atleast 3 characters long'),
    body('elevation').trim().isNumeric().withMessage('elevations are required and must be atleast 2 characters long'),
    body('lastEruption').trim().isNumeric().withMessage('lastEruption is required and must be atleast 2 characters long'),
    body('image').trim().isURL({require_tld:false}).withMessage('image is required and must be atleast 5 characters long'),
    body('typeVolcano').trim().isLength({min:3,max:30}).withMessage('typeVolcano is required and must be atleast 3 characters long'),
    body('description').trim().isLength({min:10}).withMessage('Description is required and must be atleast 10 characters long'),
    isUser(),
    async (req,res)=>{
    const volcano = req.body
    console.log(req.body)
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                throw result.array();
            }
            const authorId = req.user._id
            const newVolcano = await create(req.body,authorId)
            res.redirect('/catalog')
        } catch (err) {
            res.render('create', { data: { volcano}, errors: parseError(err).errors });
        }
})

module.exports = {
    createRouter
}