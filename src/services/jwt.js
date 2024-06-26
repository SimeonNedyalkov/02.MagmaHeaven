const jwt = require('jsonwebtoken')
secret = 'My super secr37'
function createToken(userData){
    const payload = {
        username:userData.username,
        email: userData.email,
        _id:userData._id,
    }
    const token = jwt.sign(payload,secret,{
        expiresIn:'2d'
    })
    return token
}
function verifyToken(token){
    const data = jwt.verify(token,secret)
    return data
}
module.exports = {
    createToken,
    verifyToken
}