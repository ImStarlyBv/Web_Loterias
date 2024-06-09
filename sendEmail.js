import transporter from './config/emailConfig.js'; // Importa el transporter configurado
import AppLogs from './utils/logger.js';
const logger = new AppLogs();

// Función para enviar un correo electrónico
async function sendEmail(to, subject, text, html) {
    try {
        await transporter.sendMail({
            from: "notificacionLoterias@outlook.com", // Correo electrónico del remitente
            to: to, // Correo electrónico del destinatario
            subject: subject, // Asunto del correo
            text: text, // Contenido del correo en texto plano
            html: html
        });
        console.log('Correo enviado con éxito 1');
    } catch (error) {
        console.error('Error al enviar el correo 1:', error);

        logger.writeAppLogs(`Error al enviar el correo 1 - catch result = ${error}`);
    }
}

export default sendEmail;
