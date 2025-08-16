import mongoose from "mongoose"
import Config from "./config.js"


const connectDB= async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Connected to db Successfully")
    })
    mongoose.connection.on('error',(err)=>{
        console.error("Database connection error:", err)
    })

  await  mongoose.connect(Config.MONGO_URI)
}

export default connectDB