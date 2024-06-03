import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    //service: 'outlook', // Puedes usar 'hotmail' o 'live' en lugar de 'outlook' si lo prefieres
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, //No estaba originalmente // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Correo electrónico desde el que se enviarán los correos
        pass: process.env.EMAIL_PASS  // Contraseña del correo electrónico o contraseña de aplicación específica
    }
});

export default transporter;
