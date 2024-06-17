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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



// Iniciar aupdateLotteries con el server
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

// sendEmail
app.post('/send-email', async (req, res) => {
  /*console.log(`\n\nEsto es req = \n\n`)
  console.log(req)
  console.log(`\n\n`)*/
  //console.log(`Esto es res = \n\n${JSON.stringify(res)}\n\n`)
  const { to, nav_invoice, pdf_invoice } = req.body;

  console.log(req.body)

  const subject = 'Código de verificación'
  const text = "Codigo de verificación de correo electrónico."
  const confirmationUrl = globalHost + "/verify-email"
  console.log(`confirmationUrl = ${confirmationUrl}`)
  try {
    const code = emailConfirmationCode.getACode()

    const encodedText = Buffer.from(to).toString('base64');

    const htmlContent = `
    <p style="font-size: 16px;">Su código de verificación es: <b>${code}</b></p> <br />
    <p style="font-size: 16px;">Haga <a href="${confirmationUrl}/${encodedText}">click en este enlace</a> para confirmar su cuenta.</p>

    <h3>Verifica tu cuenta</h3>
    <p style="font-size: 16px;">Beneficios de confirmar la cuenta:</p>
    <ul style="font-size: 16px;">
        <li>Seguridad</li>
        <li>Recuperar contraseña de forma fácil y rápido</li>
    </ul>

    <div style="height: 3px;
    border-radius: 50rem;
    width: 100%;
    background-color: rgb(209, 209, 209);"></div>

    <h3>Facturas</h3>
    <div style="display: flex;">
        <a href="${nav_invoice}" style="text-decoration: none; background-color: #2E8B57; color: white;
            padding: 10px 20px; font-size: 16px;">Ver en el navegador</a>
        <br />
        <a href="${pdf_invoice}" style="text-decoration: none;
            background-color: #2E8B57;
            color: white;
            padding: 10px 20px;
            margin-left: 7px; font-size: 16px;">Descargar PDF</a>
    </div>

    <p style="font-size: 16px;">Algo que tenga que ir en el footer del correo</p>
    <p style="font-size: 16px;">Ejemplo: si desconoce este correo ignore el contenido del mismo porque es confidencial o si quiere dejar un
        comentario para mejorar la comunicación o algo asi</p>
    <p style="font-size: 16px;">Y un contáctenos profesional ejemplo:</p>
    <p style="font-size: 16px;">Si tiene duda o desea comunicarse con nosotros puede hacerlo via <a href="#">nuestro centro de contactos</a> o
        escríbenos al siguiente<a href="#"> correo electrónico</a>.</p>
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
  console.log('\n\n')
  // Protocolo (http o https)
  const protocol = req.protocol;
  console.log(protocol)

  // Host (incluye el nombre de dominio y el puerto)
  const host = req.get('host');
  console.log(host)

  // Ruta (URL relativa)
  const path = req.originalUrl;
  console.log(path)
  // URL completa
  //const fullUrl = `${protocol}://${host}${path}`;
  //console.log('URL actual:', fullUrl);

  console.log('\n\n')

  const decodedText = Buffer.from(req.params.e, 'base64').toString('utf-8');

  const code = emailConfirmationCode.getACode()
  /*const htmlContent = `
    <p>Su código de verificación es: <b>${code}</b></p> <br/>
    <p>Haga <a href="http://localhost:3000/verify-email/${req.params.e}">click en este enlace</a> para confirmar su cuenta.</p>
    `*/
  const htmlContent = `
    <p style="font-size: 16px;">Su código de verificación es: <b>${code}</b></p> <br />
    <p style="font-size: 16px;">Haga <a href="${protocol}://${host}/verify-email/${req.params.e}">click en este enlace</a> para confirmar su cuenta.</p>

    <h3>Verifica tu cuenta</h3>
    <p style="font-size: 16px;">Beneficios de confirmar la cuenta:</p>
    <ul style="font-size: 16px;">
        <li>Seguridad</li>
        <li>Recuperar contraseña de forma fácil y rápido</li>
    </ul>

    <br />

    <p style="font-size: 16px;">Algo que tenga que ir en el footer del correo</p>
    <p style="font-size: 16px;">Ejemplo: si desconoce este correo ignore el contenido del mismo porque es confidencial o si quiere dejar un
        comentario para mejorar la comunicación o algo asi</p>
    <p style="font-size: 16px;">Y un contáctenos profesional ejemplo:</p>
    <p style="font-size: 16px;">Si tiene duda o desea comunicarse con nosotros puede hacerlo via <a href="#">nuestro centro de contactos</a> o
        escríbenos al siguiente<a href="#"> correo electrónico</a>.</p>
    `


  // Cambiar la forma de URL (estática para los ejemplos de desarrollo)

  //await sendEmail(decodedText, "Nuevo código de confirmación", "text", htmlContent)
  if (await sendEmail(decodedText, "Nuevo código de confirmación", "text", htmlContent)) {
    res.send({ result: true })
  } else {
    res.send({ result: false })
  }
});



// Usar el router para las rutas de correo electrónico
app.get('/suscribe', async (req, res) => {
  //res.send('Estas en verify-email');
  res.sendFile(__dirname + '/public/suscribe.html');
});



// Ruta para manejar la creación de suscripciones
app.post('/create-subscription', async (req, res) => {
  try {

    //console.log("\n\n")
    //console.log(res)
    //console.log("\n\n")

    const { email, paymentMethodId, m } = req.body;

    // Verificar si el cliente ya existe
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      // Crear un nuevo cliente si no existe
      customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: email,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        }
      });
    }

    // Verificar si el cliente ya tiene una suscripción activa
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      // Si ya hay una suscripción activa, no crear una nueva
      return res.status(400).send({ success: false, error: 'Customer already has an active subscription' });
    }

    // Crear una nueva suscripción
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'price_1PQFN7P6py5lJhlwUxUuTz6e' }],
      expand: ['latest_invoice']
    });

    console.log("\n\n")
    const { hosted_invoice_url, invoice_pdf } = await stripe.invoices.retrieve(subscription.latest_invoice.id)
    console.log(`\n\nFactura en navegador = ${hosted_invoice_url}`)
    console.log(`\n\nFactura en PDF = ${invoice_pdf}\n\n`)
    console.log("\n\n")

    // Enviar true si la tarjeta es correcta
    res.send({
      validCard: true,
      nav_invoice: hosted_invoice_url,
      pdf_invoice: invoice_pdf
    });

    /*console.log("\n\n")
    console.log(res)
    console.log("\n\n")*/
  } catch (error) {
    // Enviar false si hay algún error
    res.status(400).send({ success: false, error: error.message });
  }
});



// Ruta para servir el archivo HTML de cancelar suscripción
app.get('/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cancel-subscription.html'));
});



// Cancelar suscripción con correo
app.post('/cancel-subscription', async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar el cliente por correo electrónico
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return res.status(400).send({ success: false, error: 'Customer not found' });
    }

    const customer = customers.data[0];

    // Buscar la suscripción activa del cliente
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return res.status(400).send({ success: false, error: 'No active subscription found' });
    }

    const subscriptionId = subscriptions.data[0].id;

    // Cancelar la suscripción
    const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);

    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});



// Endpoint para manejar el webhook de Stripe
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_SECRET_KEY);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed:`, err.message);
    return response.sendStatus(400);
  }

  // Manejar el evento
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log(`\n\nPayment for invoice ${invoice.id} succeeded.\n\n`);
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log(`\n\nPayment for invoice ${failedInvoice.id} failed.\n\n`);
      break;
    // Maneja otros eventos que te interesen
    default:
      console.log(`\n\nUnhandled event type ${event.type}\n\n`);
  }

  response.send();
});



// Middleware para manejar rutas no definidas (404)
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  logger.writeAppLogs(`Error: ${err.message} - Desde // Middleware para manejo de errores`);
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});



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
