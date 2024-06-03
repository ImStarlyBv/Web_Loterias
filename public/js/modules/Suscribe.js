export default class Suscribe {
    constructor() {
        console.log("Esto es de Suscribe class")

        // Para pruebas de correo que ya están registrados
        this.subscribedEmail = "ya@existe.com"
    }

    /**
     * Crear el formulario para registrarse
     * @param {HTMLElement} modalBody - Cuerpo del modal donde se crea el formulario de esta función
     */
    start(modalBody) {
        modalBody.innerHTML = `<form action="" class="register-form flex">
        <label for="inp-email">Ingrese su correo electrónico</label>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@</span>
                <input type="text" class="form-control" id="inp-email" placeholder="ejemplo" aria-label="ejemplo@ejemplo.com" aria-describedby="addon-wrapping" style="    flex-grow: 5;">

                <select class="form-select" aria-label="Default select example" id="email-type">
                <option value="gmail" selected>@gmail</option>
                <option value="yahoo">@yahoo</option>
                <option value="outlook">@outlook</option>
                <option value="hotmail">@hotmail</option>
                </select>

                <select class="form-select" aria-label="Default select example" id="email-dot">
                <option value="com" selected>.com</option>
                <option value="es">.es</option>
                </select>
                </div>
                <span class="error inp-error hidden">Mensaje de error</span>
            <button type="submit" class="btn btn-success btn-register">Registrar</button>
        </form>`

        this.registerProcess()
    }

    isValidEmail(email) {
        //const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]{1,}$/;
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
            else { messageItem.classList.remove("success") }
        //input.classList.add(valid)
        messageItem.classList.remove("hidden")
        messageItem.textContent = messageText
    }

    registerProcess() {
        // Btn que se crea en la funcion "start" arriba

        document.querySelector(".btn-register").addEventListener("click", (e) => {
            e.preventDefault()

            const inpEmail = document.querySelector("#inp-email")
            const inpErrorMessage = document.querySelector(".inp-error")
            const emailType = document.querySelector("#email-type")
            const emailDot = document.querySelector("#email-dot")

            if (inpEmail.value == this.subscribedEmail) {
                alert("Error\n\nEl correo ingresado ya está registrado\n\nNo se si ponerlo poruqe puede ser una vulnerabilidad de seguridad XD\n\nSi se deja este mensaje ponerlo en el span de error")
                this.inpSuscribeMessage(inpEmail, inpErrorMessage, "El correo ingresado ya está suscrito.")
                return
            }

            if (this.isValidEmail(inpEmail.value)) {
                inpEmail.classList.remove("is-invalid")
                inpEmail.classList.add("is-valid")
                inpErrorMessage.classList.add("hidden")
                // Enviar el correo con el codigo y redireccionar a confirmar el codigo en la page
                //alert("Exito\n\nCorreo válido para registrarse")

                //alert(`Correo:\n\n${inpEmail.value}@${emailType.value}.${emailDot.value}`)                

                const confirmationURL = window.location.href + "verify-email"
                //console.log(confirmationURL)
                const emailData = {
                    to: `${inpEmail.value}@${emailType.value}.${emailDot.value}`
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
                        this.inpSuscribeMessage(inpEmail, inpErrorMessage, "Le hemos enviado un código de verificación al correo ingresado.", true)
                    })
                    .catch(error => {
                        console.error('Error al enviar el correo - Suscribe:', error);
                        console.log('Error al enviar el correo');
                    });
            } else {
                //alert("Error\n\nCorreo no válido para registrarse")
                this.inpSuscribeMessage(inpEmail, inpErrorMessage, "Debe introducir un correo válido.")
            }
        })
    }
}