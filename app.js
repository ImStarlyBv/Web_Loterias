import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import AppLogs from './utils/logger.js';
import sendEmail from './sendEmail.js';
import EmailConfirmationCode from './utils/EmailConfirmationCode.js';
import updateJson from './utils/updateLotteries.js';
const emailConfirmationCode = new EmailConfirmationCode()

// Implementando pagos
import Stripe from 'stripe';
import bodyParser from 'body-parser';

// Cargar las variables de entorno
dotenv.config();

let globalHost = ""

// Obtener __dirname en un entorno ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const logger = new AppLogs();

// Inicair aupdateLotteries
updateJson() // Se actualiza por cada cliente abierto (cada ventana en el navegador)

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para registrar solicitudes
app.use((req, res, next) => {
  logger.writeAppLogs(`${req.method} ${req.url} - Desde Middleware para registrar solicitudes`);
  next();
});

// Rutas

// Ejemplo de uso de sendEmail
app.post('/send-email', async (req, res) => {
  //console.log(`Esto es req = \n\n${req}`)
  //console.log(`Esto es res = \n\n${res}`)
  const { to } = req.body;

  const subject = 'Código de verificación'
  const text = "Codigo de verificación de correo electrónico."
  const confirmationUrl = globalHost + "/verify-email"
  console.log(`confirmationUrl = ${confirmationUrl}`)
  try {
    const code = emailConfirmationCode.getACode()


    /**/

    // To re-send code using base64
    const encodedText = Buffer.from(to).toString('base64');

    /**/


    const htmlContent = `
    <p>Su código de verificación es: <b>${code}</b></p> <br/>
    <p>Haga <a href="${confirmationUrl}/${encodedText}">click en este enlace</a> para confirmar su cuenta.</p>
    `
    await sendEmail(to, subject, text, htmlContent);
    res.status(200).send('Correo enviado con éxito');
    logger.writeAppLogs(`Correo enviado con éxito - Desde sendEmail | Estado: 200`);
  } catch (error) {
    res.status(500).send('Error al enviar el correo');
    logger.writeAppLogs(`Error al enviar el correo - Desde sendEmail | Estado: 500`);
    console.log(`Error\n\n${error}`)
  }
});

// Usar el router para las rutas de correo electrónico
app.use('/verify-email', async (req, res) => {
  //res.send('Estas en verify-email');
  res.sendFile(__dirname + '/public/email-confirmation.html');
});

// Reenviar código
app.use('/resend-code/:e', async (req, res) => {
  /**/
  // To re-send code using base64
  const decodedText = Buffer.from(req.params.e, 'base64').toString('utf-8');
  /**/

  const code = emailConfirmationCode.getACode()
  const htmlContent = `
    <p>Su código de verificación es: <b>${code}</b></p> <br/>
    <p>Haga <a href="http://localhost:3000/verify-email/${req.params.e}">click en este enlace</a> para confirmar su cuenta.</p>
    `
  // Cambiar la forma de URL (estatica para los ejemplos de desarrollo)

  await sendEmail(decodedText, "Nuevo código de confirmación", "text", htmlContent)
});

// Middleware para manejar rutas no definidas (404)
/*app.use((req, res, next) => {
  res.status(404).send('Página no encontrada. Redirigiendo a la página principal...');
  // O redirigir a una página específica
  // res.redirect('/');
});
*/

// Implementando pagos


// Usar el router para las rutas de correo electrónico
app.get('/suscribe', async (req, res) => {
  //res.send('Estas en verify-email');
  res.sendFile(__dirname + '/public/suscribe.html');
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-subscription', async (req, res) => {
  try {
    const { email, paymentMethodId } = req.body;

    // Crear un cliente
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: email,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Crear una suscripción
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'your_price_id' }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.send(subscription);
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});



// server.js (continuación)
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
  const event = request.body;

  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log(`Payment for invoice ${invoice.id} succeeded.`);
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log(`Payment for invoice ${failedInvoice.id} failed.`);
      break;
    // Maneja otros eventos que te interesen
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
});



// Middleware para manejar rutas no definidas (404)
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

/*app.use("/a/:id", (req, res, next) => {
  res.send("Jodiendo xd")
  //next()
  x(req.params.id)
});

const x = (id) => {
  console.log("Hola con el id " + id)
}*/


// Middleware para manejo de errores
app.use((err, req, res, next) => {
  logger.writeAppLogs(`Error: ${err.message} - Desde // Middleware para manejo de errores`);
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});


/*
Para cambiar la forma de URL (estatica para los ejemplos de desarrollo)
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  let host = server.address().address;
  const port = server.address().port;

  // En local, cambia la IP a 'localhost' para facilidad
  if (host === '::' || host === '0.0.0.0') {
    host = 'localhost';
  }

  console.log(`Server is listening at http://${host}:${port}`);
});

*/





// App en ejecución escuchando
const server = app.listen(port, () => {
  logger.writeAppLogs(`Servidor escuchando en http://localhost:${port} - Desde App en ejecución escuchando`);
  console.log(`Servidor escuchando en http://localhost:${port}`);

  let host2 = server.address().address;
  // En local, cambia la IP a 'localhost' para facilidad
  if (host2 === '::' || host2 === '0.0.0.0') {
    host2 = 'localhost';
  }
  const port2 = server.address().port;
  globalHost = `http://${host2}:${port2}`
  console.log(`#2 - Server is listening at http://${host2}:${port2}`);
});
