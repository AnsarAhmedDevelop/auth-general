import { checkSchema } from "express-validator";


export default checkSchema({
    firstName:{
        notEmpty: true,
        errorMessage:"First Name is required",
        trim: true,
        isString:{
            errorMessage:"First Name must be String",
        }
    },
    lastName:{
        notEmpty: true,
        errorMessage:"Last Name is required",
        trim: true,
        isString:{
            errorMessage:"Last Name must be String",
        }
    },
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
