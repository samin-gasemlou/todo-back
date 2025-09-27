const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    userName:{type: String,required: true,unique: true,trim: true},
    password:{type: String,required: true,trim: true,minlength: 8},
    email:{type: String,required:true,unique:true,trim: true,lowercase: true}
},{timestamps:true});

module.exports = mongoose.model('User',UserModel);