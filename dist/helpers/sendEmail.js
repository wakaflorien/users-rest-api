"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (to, subject, text) => {
    console.log("OPTIONS", process.env.SEND_EMAIL, process.env.SEND_EMAIL_PASSWORD);
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: `${process.env.SEND_EMAIL}`,
            pass: `${process.env.SEND_EMAIL_PASSWORD}`,
        },
    });
    const mailOptions = {
        from: `${process.env.SEND_EMAIL}`,
        to: to,
        subject: subject,
        text: text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
};
exports.sendEmail = sendEmail;
