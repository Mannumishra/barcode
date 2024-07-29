const mongoose = require("mongoose")

const connectdb = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/barcode")
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectdb
}