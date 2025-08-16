import Config from "./config.js";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: Config.HOST,
  port: Number(Config.EMAIL_PORT),
  secure: Boolean(Config.SECURE),
  service: Config.SERVICE,
  auth: {
    user: Config.SENDER_EMAIL,
    pass: Config.PASS,
  },
  tls:{
    rejectUnauthorized: false
  }
});

export default transporter