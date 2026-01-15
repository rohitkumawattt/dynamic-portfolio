import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 10,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

export default transporter;