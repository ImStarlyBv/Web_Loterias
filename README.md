# Repositorio original
https://github.com/ImStarlyBv/verLoterias

# Comandos
Iniciar la app `node app.js`

## Dependencias
- dotenv
- express
- nodemailer
- ws
- stripe
- body-parser
- mongoose
- bcrypt
- axios


### Configuración para enviar correos
Crear un archivo `.env` en la raiz del proyecto. <br/>
Crear las variables de credenciales
- `EMAIL_USER=VALOR_DE_CREDENCIAL`
- `EMAIL_PASS=VALOR_DE_CREDENCIAL`
- `STRIPE_SECRET_KEY=VALOR_DE_CREDENCIAL`
- `STRIPE_PRICE=VALOR_DE_CREDENCIAL`
- `MONGODB_URI=VALOR_DE_CREDENCIAL`