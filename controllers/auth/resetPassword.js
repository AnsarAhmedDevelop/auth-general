import { validationResult } from "express-validator"
import createHttpError from "http-errors"
import userModel from "../../models/auth/userModel.js"
import bcrypt from "bcryptjs"

const resetPasswordController = async (req, res, next) => {
    try {
        // validator
        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw createHttpError(400, result.array()[0].msg)
        }
        const { email, password, resetOtp } = req.body;

        if (!email || !password || !resetOtp) {
            throw createHttpError(401, "email, password and otp are required")
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            throw createHttpError(401, "Invalid Email")
        }

        if (user.resetOtp !== resetOtp || resetOtp === "") {
            throw createHttpError(401, "Invalid otp")
        }

        if (user.resetOtpExpireAt < Date.now()) {
            await userModel.findByIdAndDelete(user._id)
            throw createHttpError(401, "otp Expired.")
        }

        //create hashed pw using bryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        user.password = hashedPassword;
        user.resetOtp = "",
            user.resetOtpExpireAt = 0;
        await user.save();
        res.status(200).json({ message: "Password reset Successfully" })

    } catch (error) {
        next(error)
    }
}

export default resetPasswordController