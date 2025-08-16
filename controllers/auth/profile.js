import userModel from "../../models/auth/userModel.js";

const profileController=async (req, res, next)=>{
    const id=req.user._id;
    // console.log(id,"user id");
    try {
     const userData= await  userModel.findById(id).select("-password -createdAt -updatedAt -__v");
     res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

export default profileController