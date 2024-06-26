const {Schema,model,Types} = require('mongoose')

const userSchema = new Schema({
    
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{
    collations:{
        locale:'en',
        strength:2
    }
})
const User = model('User',userSchema)
module.exports = {
    User
}