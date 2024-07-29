const mongoose = require("mongoose")

const connectdb = async()=>{
    try {
        await mongoose.connect("mongodb+srv://mannu22072000:3ifVsxZDk49nx6aa@cluster0.b7vw3na.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectdb
}