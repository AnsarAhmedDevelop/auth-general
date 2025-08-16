import { checkSchema } from "express-validator";


export default checkSchema({
    email:{
        notEmpty: true,
        errorMessage:"Email is required",
        trim: true,
        isEmail:{
             errorMessage:"Email should be Valid Email",
        }
    },
    password:{
        notEmpty: true,
        errorMessage:"Password is required",
        trim: true,
        isLength:{
            options:{min:6},
            errorMessage:"Password Must be atleast 6 Characters",
        },
        matches:{
            options: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            errorMessage:"Password Must be contain letters, numbers and special Characters",
        }
    }
})
