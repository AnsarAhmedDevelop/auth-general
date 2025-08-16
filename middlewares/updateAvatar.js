import multer from "multer";
import path from "path";

// 'multer.diskStorage()' tells multer to store uploaded files directly on disk (server folder).
const storage = multer.diskStorage({
      // 'destination': Where the files will be saved.
    // 'cb' is a callback function: cb(error, destinationFolder)
    destination: (req, file, cb) => cb(null, "uploads/"),
      // 'filename': How the file will be named inside the uploads folder.
    filename: (req, file, cb) => {
          // Create a unique name using current timestamp + original filename
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// This function ensures only certain file formats are allowed.
const fileFilter = (req, file, cb) => {
       // Get file extension in lowercase (e.g., ".jpg")
    const ext = path.extname(file.originalname).toLowerCase();
    // console.log(ext,"ext")
       // Get MIME type from file metadata (e.g., "image/jpeg")
    const mime = file.mimetype;
     // Check if both extension and MIME type are allowed
    if (![".jpg", ".jpeg", ".png",".webp"].includes(ext) || !["image/jpeg", "image/png","image/webp"].includes(mime)) {
         // Reject file upload with an error message
        return cb(new Error("Only JPG, JPEG, webp and PNG images are allowed."), false);
    }
      // Accept the file
    cb(null, true);
};

// 'limits.fileSize' restricts file size (here: 5MB max)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// This will handle uploading a single file with the field name "avatar"
export const uploadAvatar = upload.single("avatar");