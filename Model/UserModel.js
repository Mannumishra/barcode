const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is must required"]
    },
    age:{
        type:String,
        required:[true,"age is must required"]
    },
    phone:{
        type:Number,
        required:[true,"phone is must required"]
    },
    email:{
        type:String,
        required:[true,"email is must required"]
    },
    address:{
        type:String,
        required:[true,"address is must required"]
    },
    barcodeUrl: String 
} ,{timestamps:true})

const user = mongoose.model("user" , userSchema)

module.exports = user