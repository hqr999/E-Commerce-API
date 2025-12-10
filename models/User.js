const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {type: String,required:[true,'Por favor dê um nome'],minlength:3,maxlength:50},
    email: {type: String,required:[true,'Por favor dê um e-mail'],validate:{
        validator:validator.isEmail,
        message:'Por favor dê um email válido'
    }},
    password:{type:String,required: [true,'Por favor dê uma senha'],minlength:6},
    role:{type:String,enum:['admin','user'],default: 'user'}

})



module.exports = mongoose.model('User',UserSchema)