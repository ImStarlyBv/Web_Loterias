//here we will call the atlas DB 
// Antigua server.js

import mongoose from "mongoose";
import bcrypt from "bcrypt"
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;



// Importar mongoose

// Configurar la cadena de conexión

// Conectar a MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB Atlas', err);
    });



// Definir el modelo de Mongoose
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    creation_date: { type: String },
    confirmation_code: { type: String },
    status_account: { type: String },
    resuscribe: { type: String },
    name: { type: String },
    lastname: { type: String },
    password: { type: String },
    last_session: { type: String },
    lotteries_notification: { type: String },
    unsubscription_date: { type: String },
    my_favorite_lotteries: { type: String },
    end_subscription_date: { type: Date },
});

export class Atlas {
    static Usuario = model('Usuario', userSchema);

    static async create({
        email,
        creation_date,
        confirmation_code,
        status_account
    }) {

        console.log("\n\n")
        //console.log(name, lastname, age, email, password, creation_date)
        console.log(email)
        console.log(creation_date)
        console.log(confirmation_code)
        console.log("\n\n")
        //const Usuario = model('Usuario', userSchema);

        //ValidationEntries.validationEmail(email)
        //ValidationEntries.validationPassword(password)

        //console.log(`original password = ${password}`)
        //const hashedPassword = await bcrypt.hash(password, 10)

        //console.log("\n\nDatos recibidos en atlas:")
        //console.log(name, lastname, age, email, hashedPassword, creation_date)
        //console.log("\n\n")

        const ifExist = await this.Usuario.findOne({ email }) // Debe ser null para crear
        //if (ifExist) throw new Error("Ya existe una suscripción con este correo.")
        if (ifExist) {
            console.log(`\n\nProceso de creación\n\nYa existe una suscripción con este correo.`)
            console.log(`status_account = ${ifExist.status_account}\n\n`)
            //const userEmail = req.params.email;
            const newData = {status_account: "active"};

            try {
                const updatedUser = await this.updateUser({
                    email: { email },
                    newData: newData,
                    options: { new: true, runValidators: true },
                });

                if (!updatedUser) {
                    //return res.status(404).send({ message: 'Usuario no encontrado' });
                    return "Algo 1"
                }

                //res.status(200).send({ success: true, message: 'Usuario actualizado correctamente' });
            } catch (err) {
                //res.status(400).send({ success: false, error: err.message });
                return "Algo 2"
            }
        }

        //console.log(`ifExist = ${ifExist}`)

        // crear usuario y .save()
        try {
            const creationResult = await new this.Usuario({
                email,
                creation_date,
                confirmation_code,
                status_account
            }).save()

            if (creationResult) {
                console.log(`creationResult = ${creationResult}`)
                console.log("\n\nUsuario creado\n\n")
            }
        } catch (error) {
            console.log(`No se pudo crear el usuario por: ${error}`)
        }
    }

    static async getAUserByEmail({ email }) {
        return await this.Usuario.findOne({ email })
    }

    static async updateUser(options) {
        console.log(`Update user options = ${JSON.stringify(options)}`)
        //this.Usuario.findOneAndUpdate(options.email, options.status_account = "inactive")
        return this.Usuario.findOneAndUpdate(options.userEmail, options.newData, options.options)

    }

    static login({ email, pass }) {
        // Validar
        ValidationEntries.validationEmail(email)
        ValidationEntries.validationPassword(pass)
    }
}

class ValidationEntries {
    static validationEmail(email) {
        //validaciones..
        //if (password.length < 8) throw new Error("La contraseña debe tener mínimo 8 caracteres.").
    }
    static validationPassword(password) {
        //validaciones...
    }

    // mas static con validaciones
}