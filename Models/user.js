const mongoose = require("mongoose")
const { type } = require("os")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
     email:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true,
     },
     isVerified:{
        type:Boolean,
        default:false,
     }
},{
    timestamps:true
});

const userCollection = mongoose.model('user',userSchema)
module.exports = userCollection;