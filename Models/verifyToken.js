const mongoose = require("mongoose")

const verifyTokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        user:"user"
    },
    token:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

const tokenCollection = mongoose.model('token',verifyTokenSchema)
module.exports=tokenCollection