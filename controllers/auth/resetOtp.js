import createHttpError from "http-errors";
import userModel from "../../models/auth/userModel.js";
import transporter from "../../config/nodemailer.js";
import Config from "../../config/config.js";

const otpResetPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw createHttpError(401, "email  is required")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            throw createHttpError(401, "Invalid Email")
        }

         //otp create
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        // expire time
        const expireAt = Date.now() + 10 * 60 * 1000;
         //email send
        await transporter.sendMail({
            from: Config.SENDER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "otp for Reset Password", // Subject line
            text: `Your otp is ${otp}. Reset Your Password using this otp.`, // plain text body
        });

        user.resetOtp=otp;
        user.resetOtpExpireAt=expireAt;
        await user.save();

        res.status(201).json({message:"Enter Your otp sent on Email to Reset Password"})

    } catch (error) {
        next(error)
    }
}

export default otpResetPasswordController