import createHttpError from "http-errors";
import userModel from "../../models/auth/userModel.js";

const verifyEmailController = async (req, res, next) => {
    try {
        const { email, verifyOtp } = req.body;
        if (!email || !verifyOtp) {
            throw createHttpError(401, "email and otp is required")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            throw createHttpError(401, "Invalid Email")
        }
        // console.log(user,"user");
        if( user.verifyOtp !== verifyOtp || verifyOtp === ""){
            throw createHttpError(401, "Invalid otp")
        }

        if( user.verifyOtpExpireAt < Date.now()){
           await userModel.findByIdAndDelete(user._id)
             throw createHttpError(401, "otp Expired. Do Registeration again")
        }
        user.isVerified=true;
        user.verifyOtp="";
        user.verifyOtpExpireAt=0;
        await user.save();

        res.status(200).json({message:"Email verified Succussfully"})
    } catch (error) {
        next(error)
    }
}

export default verifyEmailController