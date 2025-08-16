import createHttpError from "http-errors";
import { verifyToken } from "../services/jwtService.js";

export const isAuthenticated=(req, res, next)=>{
    const authHeader=req.headers.authorization;
    // console.log(authHeader,"auth header");
    if(authHeader==="Bearer null" || authHeader==="Bearer undefined"){
        throw createHttpError(401,"unAuthorized")
    }
    const token=authHeader.split(" ")[1]
    // console.log(token,"token")
    try {
     const decoded= verifyToken(token)
    //  console.log(decoded,"decoded")
     const {id,role}=decoded;
     const user={
        _id:id,
        role:role,
     }
     req.user=user;
    //  console.log(req.user,"req user");
     next()
    } catch (error) {
        next(error)
    }
}
