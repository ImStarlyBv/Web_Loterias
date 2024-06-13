import bbb from "../suscribe.js";

export default class Suscribe {
    constructor() {
        console.log("Esto es de Suscribe class")
    }

    /**
     * Crear el formulario para registrarse
     * @param {HTMLElement} modalBody - Cuerpo del modal donde se crea el formulario de esta función
     */
    start(modalBody) {
        modalBody.innerHTML = `
        <div class="subscription-container cr-s">
        <form id="subscription-form" class="register-form flex">
            <label for="inp-email">Correo electrónico</label>
            <input type="email" id="inp-email" required>
            <label for="card-element">Tarjeta de crédito o débito</label>
            <div id="card-element"></div>
            <button type="submit" class="btn btn-success btn-register">Registrar</button>
        </form>
        <div id="payment-message" class="hidden">Mostrar mensajes.</div>
        </div>
        `

        this.registerProcess()
        bbb()
    }

    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //const emailRegex = /^[a-zA-Z0-9._%+-]{1,}$/;
        return emailRegex.test(email);
    }

    /**
     * Mostrar error al suscribirse.
     * @param {HTMLElement} input - Elemento input a validar.
     * @param {HTMLElement} messageItem - Elemento contenedor del mensaje a mostrar.
     * @param {string} messageText - Texto del mensaje a mostrar.
     * @param {boolean} isValid - El menaje es de éxito (true) o error (false)
     */

    inpSuscribeMessage(input, messageItem, messageText, isValid) {
        if (isValid) { messageItem.classList.add("success") }
        else {
            messageItem.classList.remove("success")
            messageItem.classList.add("error")
        }
        //input.classList.add(valid)
        messageItem.classList.remove("hidden")
        messageItem.textContent = messageText
    }

    registerProcess() {
        // Btn que se crea en la funcion "start" arriba
        document.querySelector(".btn-register").addEventListener("click", (e) => {
            e.preventDefault()

            const inpEmail = document.querySelector("#inp-email")
            const errorMessage = document.querySelector("#payment-message")

            if (this.isValidEmail(inpEmail.value)) {
                inpEmail.classList.remove("is-invalid")
                inpEmail.classList.add("is-valid")
                errorMessage.classList.add("hidden")
                // Enviar el correo con el codigo y redireccionar a confirmar el codigo en la page
                //alert("Exito\n\nCorreo válido para registrarse")

                //alert(`Correo:\n\n${inpEmail.value}@${emailType.value}.${emailDot.value}`)          

                const emailData = {
                    to: `${inpEmail.value}`
                };

                fetch('/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(emailData)
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log('Correo enviado:', data);
                        console.log('Correo enviado con éxito - Suscribe');

                        //Aki debe ir el mensaje de correo enviado
                        this.inpSuscribeMessage(inpEmail, errorMessage, "Le hemos enviado un código de verificación al correo ingresado.", true)
                    })
                    .catch(error => {
                        console.error('Error al enviar el correo - Suscribe:', error);
                        console.log('Error al enviar el correo');
                    });
            } else {
                //alert("Error\n\nCorreo no válido para registrarse")
                this.inpSuscribeMessage(inpEmail, errorMessage, "Debe introducir un correo válido.")
            }
        })
    }
}