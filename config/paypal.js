import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Configuración del entorno de PayPal
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    // Para producción, usa: return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

// Crear y exportar el cliente de PayPal
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

export default { client };
