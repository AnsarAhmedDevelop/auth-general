import express from "express"
import registerController from "../../controllers/auth/register.js";
import loginController from "../../controllers/auth/login.js";
import profileController from "../../controllers/auth/profile.js";
import { isAuthenticated } from "../../middlewares/auth.js";
import registerValidator from "../../validators/register-validator.js"
import updateProfileValidator from "../../validators/updateProfile-validator.js"
import loginValidator from "../../validators/login-validator.js";
import verifyEmailController from "../../controllers/auth/verifyEmail.js";
import otpResetPasswordController from "../../controllers/auth/resetOtp.js";
import resetPasswordValidator from "../../validators/resetPassword-validator.js";
import resetPasswordController from "../../controllers/auth/resetPassword.js";
import updateProfileController from "../../controllers/auth/updateProfile.js";
import { uploadAvatar } from "../../middlewares/updateAvatar.js";

const router= express.Router();

//localhost:4000/api/auth/register
router.post("/register",registerValidator, registerController)

//localhost:4000/api/auth/verifyEmail
router.post("/verifyEmail",verifyEmailController)

//localhost:4000/api/auth/login
router.post("/login",loginValidator ,loginController)

//localhost:4000/api/auth/profile
router.get("/profile",isAuthenticated,profileController)

//localhost:4000/api/auth/otpResetPassword
router.post("/otpResetPassword", otpResetPasswordController)

//localhost:4000/api/auth/resetPassword
router.post("/resetPassword",resetPasswordValidator ,resetPasswordController)

//localhost:4000/api/auth/updateProfile
router.put("/updateProfile",uploadAvatar ,isAuthenticated,updateProfileValidator, updateProfileController)

export default router