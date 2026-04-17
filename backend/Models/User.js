const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    status : {
        type : String,
        enum : ['active' , 'inactive'],
        default :'active'
    },
    role : {
        type : String,
        enum:['admin' , 'user'],
        default: 'user'
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true})

userSchema.index({name:1 , email:1})

module.exports = mongoose.model('User' , userSchema)