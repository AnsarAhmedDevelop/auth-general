import createHttpError from "http-errors";
import userModel from "../../models/auth/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../services/jwtService.js";
import { validationResult } from "express-validator";

const loginController = async (req, res, next) => {
    try {
        // validator
        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw createHttpError(400, result.array()[0].msg)
        }


        const { email, password } = req.body;

        const userData = await userModel.findOne({ email });
        if (!userData) {
            throw createHttpError(403, "Invalid email or password")
        }

        if(!userData.isVerified){
             throw createHttpError(403, "Complete your registration first.")
        }
        // console.log(userData,"user data")
        //bcryptjs pw compare
        //userData.password is hashed PW saved in db
        //password is from req.body
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            throw createHttpError(403, "Invalid email or password")
        }

        //create token
        const payload = {
            id: userData._id,
            role: userData.role
        }
        const token = generateToken(payload);

        res.status(200).json(token)

    } catch (error) {
        next(error)
    }

}

export default loginController