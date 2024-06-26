const editAndDeleteRouter = require('express').Router()
const {getVolcanoById,update} = require('../services/databaseService')
const { validationResult, body } = require('express-validator');
const { parseError } = require('../config/errorConfig');
const {isUser} = require('../middlewares/guards')
editAndDeleteRouter.get('/edit/:id',async(req,res)=>{
    const id = req.params.id
    const volcano = await getVolcanoById(id)
    res.render('edit',{volcano})
})
editAndDeleteRouter.post('/edit/:id',body('name').trim().isLength({min:2}).withMessage('Name is required and must be atleast 2 characters long'),
body('location').trim().isLength({min:3}).withMessage('location is required and must be atleast 3 characters long'),
body('elevation').trim().isNumeric().withMessage('elevations are required and must be atleast 2 characters long'),
body('lastEruption').trim().isNumeric().withMessage('lastEruption is required and must be atleast 2 characters long'),
body('image').trim().isURL({require_tld:false}).withMessage('image is required and must be atleast 5 characters long'),
body('typeVolcano').trim().isLength({min:3,max:30}).withMessage('typeVolcano is required and must be atleast 3 characters long'),
body('description').trim().isLength({min:10}).withMessage('Description is required and must be atleast 10 characters long'),
isUser(),
async(req,res)=>{
    const id = req.params.id
    const data = req.body
    const userId = req.user?._id
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw result.array();
        }
        await update(id,data,userId)
        res.redirect('/catalog')
    } catch (err) {
        res.render('edit', { data: {data}, errors: parseError(err).errors });
    }
    
})

module.exports = {
    editAndDeleteRouter
}