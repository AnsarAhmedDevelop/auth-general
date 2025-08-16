import dotenv from "dotenv"
dotenv.config()

const {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    SERVICE,
    SENDER_EMAIL,
    HOST,
    EMAIL_PORT,
    SECURE,
    PASS,
    BACKEND_URL

}=process.env

const Config={
    PORT,
    MONGO_URI,
    JWT_SECRET,
    SERVICE,
    SENDER_EMAIL,
    HOST,
    EMAIL_PORT,
    SECURE,
    PASS,
    BACKEND_URL
}

export default Config