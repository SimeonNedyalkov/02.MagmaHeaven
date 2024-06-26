const { verifyToken } = require("../services/jwt")

function session(){
    return function(req,res,next){
        const token = req.cookies?.token
        if(token){
            try{
                const sessionData = verifyToken(token)
                req.user = {
                    username:sessionData.username,
                    email:sessionData.email,
                    _id:sessionData._id
                }
                res.locals.hasUser = true
            }catch(err){
                
                res.clearCookie('token')
                res.locals.hasUser = false
            }
        }
        next()
    }
}
module.exports={
    session
}