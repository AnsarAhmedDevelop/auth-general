import jwt from "jsonwebtoken"
import Config from "../config/config.js"


const generateToken=(payload)=>{
  return jwt.sign(payload,Config.JWT_SECRET, {expiresIn:"1d"})
}

const verifyToken=(token)=>{
  const decoded=jwt.verify(token,Config.JWT_SECRET)
  return decoded
}

export {generateToken, verifyToken}