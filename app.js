import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cors from "cors"
import authRoutes from "./routes/auth/userRoutes.js"
const app=express();
app.use(cors())
app.use("/uploads",express.static("uploads"));
app.use(express.json());


app.get("/",(req, res,next)=>{   
    res.send("Bcakend is working");
})


//localhost:4000/api/auth/register
//localhost:4000/api/auth/login
//localhost:4000/api/auth/profile
app.use("/api/auth",authRoutes)


// Global error handler
app.use(globalErrorHandler)




export default app