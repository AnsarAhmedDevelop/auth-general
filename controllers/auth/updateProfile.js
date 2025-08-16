import createHttpError from "http-errors";
import userModel from "../../models/auth/userModel.js";
import { validationResult } from "express-validator";
import fs from "fs/promises"
import { fileTypeFromBuffer } from "file-type";


// Function to validate uploaded file's binary signature
const validateFileSignature = async (filePath) => {
    // Read the uploaded file into a buffer
    const buffer = await fs.readFile(filePath);
    // Detect the file type from the binary data
    const fileType = await fileTypeFromBuffer(buffer);
    // console.log(fileType.ext,"fileType extens")

    // If file type is not recognized or not allowed, delete it and throw an error
    if (!fileType || !["jpg", "jpeg", "png","webp"].includes(fileType.ext)) {
        await fs.unlink(filePath);
        throw createHttpError(401, "File signature mismatch. Invalid image.");
    }
};


const updateProfileController = async (req, res, next) => {
    const id = req.user._id;


    // Will hold the path of uploaded avatar image
    let avatarPath = null;
    if (req.file) {
        //Replace all \ with /
        avatarPath = req.file.path.replace(/\\/g, "/");
        try {
            await validateFileSignature(avatarPath);
        } catch (error) {
            return next(error);
        }
    }

    try {
        // validator
        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw createHttpError(400, result.array()[0].msg)
        }

        const { firstName, lastName, email } = req.body;
        const user = await userModel.findById(id);
        if (email && user.email !== email) {
            const userExist = await userModel.findOne({ email })
            if (userExist) {
                throw createHttpError(409, "Email is Already in use")
            }
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (avatarPath) user.avatar = avatarPath;
        await user.save()
        res.status(201).json({
            message: "profile update Successfully",
            user: {
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                avatar: user.avatar
            }
        })

    } catch (error) {
        next(error)
    }
}

export default updateProfileController