export default class Suscribe {
    constructor() {
        this.subscribedEmail = "ya@existe.com"
    }

    start(modalBody) {
        modalBody.innerHTML = `<form action="" class="register-form flex">
        <label for="inp-email">Ingrese su correo electrónico</label>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@</span>
                <input type="text" class="form-control" id="inp-email" placeholder="ejemplo" aria-label="ejemplo@ejemplo.com" aria-describedby="addon-wrapping" style="    flex-grow: 5;">

                <select class="form-select" aria-label="Default select example">
                <option value="gmail" selected>@gmail</option>
                <option value="yahoo">@yahoo</option>
                <option value="outlook">@outlook</option>
                <option value="hotmail">@hotmail</option>
                </select>

                <select class="form-select" aria-label="Default select example">
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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    /**
     * Mostrar error al suscribirse.
     * @param {HTMLElement} input - Elemento input a validar.
     * @param {HTMLElement} messageItem - Elemento de error a mostrar.
     * @param {string} messageText - Texto del mensaje a mostrar.
     */

    inpSuscribeError(input, messageItem, messageText) {
        input.classList.add("is-invalid")
        messageItem.classList.remove("hidden")
        messageItem.textContent = messageText
    }

    registerProcess() {
        // Btn que se crea en la funcion "start" arriba

        document.querySelector(".btn-register").addEventListener("click", (e) => {
            e.preventDefault()

            const inpEmail = document.querySelector("#inp-email")
            const inpErrorMessage = document.querySelector(".inp-error")

            if (inpEmail.value == this.subscribedEmail) {
                alert("Error\n\nEl correo ingresado ya está registrado\n\nNo se si ponerlo poruqe puede ser una vulnerabilidad de seguridad XD\n\nSi se deja este mensaje ponerlo en el span de error")
                this.inpSuscribeError(inpEmail, inpErrorMessage, "El correo ingresado ya está suscrito.")
                return
            }

            if (this.isValidEmail(inpEmail.value)) {
                inpEmail.classList.remove("is-invalid")
                inpEmail.classList.add("is-valid")
                inpErrorMessage.classList.add("hidden")
                alert("Exito\n\nCorreo válido para registrarse")
            } else {
                //alert("Error\n\nCorreo no válido para registrarse")
                this.inpSuscribeError(inpEmail, inpErrorMessage, "Debe introducir un correo válido.")
            }
        })
    }
}