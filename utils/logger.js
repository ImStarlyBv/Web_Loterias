import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en un entorno ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class AppLogs {
    constructor() { }

    writeAppLogs(content) {
        const date = new Date()

        /*console.log(`Dia = ${date.getDate()}`)
        console.log(`Mes = ${date.getUTCMonth() + 1}`)
        console.log(`Anio = ${date.getUTCFullYear()}`)

        console.log(`Hora = ${date.getHours()}`)
        console.log(`Minutos = ${date.getUTCMinutes()}`)
        console.log(`Segundos = ${date.getUTCSeconds()}`)
        console.log(`Horario = ${date.getUTCHours() > 12 ? "PM" : "AM"}`)

        console.log(`Href = `)*/

        const day = date.getDate() < 10 ?
            "0" + date.getDate() : date.getDate()
        const month = (date.getUTCMonth() + 1) < 10 ?
            "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)
        const year = date.getUTCFullYear() < 10 ?
            "0" + date.getUTCFullYear() : date.getUTCFullYear()

        const hour = date.getHours()
        // Poner hora en formato de 24 horas
        let formatedHour = hour > 12 ? hour - 12 : hour
        formatedHour = formatedHour < 10 ?
            "0" + formatedHour : formatedHour

        const minute = date.getUTCMinutes() < 10 ?
            "0" + date.getUTCMinutes() : date.getUTCMinutes()
        const second = date.getUTCSeconds() < 10 ?
            "0" + date.getUTCSeconds() : date.getUTCSeconds()

        const timeType = hour > 12 ? "PM" : "AM"

        const fullDateResult = `${day}/${month}/${year} - ${formatedHour}:${minute}:${second} ${timeType}`
        const logMessage = `- ${fullDateResult}: ${content}\n`; // Formato del log
        const logDir = path.join(__dirname, '../logs');
        const logFilePath = path.join(logDir, 'app.log.txt');

        // Asegúrate de que la carpeta 'logs' exista
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        // Escribir el log en el archivo
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.log('Error writing logs file ', err);
            } else {
                console.log('Successfully wrote logs file');
            }
        });
    }
}
