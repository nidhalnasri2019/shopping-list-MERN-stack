const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// create Schema

const UserSchema = Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    Register_date:{
        type:Date,
        default:Date.now
    }
})

const User = new mongoose.model('user', UserSchema)

module.exports = User;