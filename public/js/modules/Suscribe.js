import Loading from "./Loading.js";

const stripe = Stripe('pk_test_51PPw1mP6py5lJhlwvK6QjnGqYEt4vD1b9rnIz5J74iMAWYj4d2HtnsHzfPD098OYXmGy5dEAt52o3RUTGHOys3SK00AlG8V8Es');
const elements = stripe.elements();
const cardElement = elements.create('card');

export default class Suscribe {
    constructor() {
        console.log("Esto es de Suscribe class")
        this.loading = new Loading()
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
            <input type="email" id="inp-email" class="form-control" required>
            <label for="card-element">Tarjeta de crédito o débito</label>
            <div id="card-element"></div>
            <button type="submit" class="btn btn-success btn-register">Registrar</button>
        </form>
        <div id="payment-message" class="hidden">Mostrar mensajes.</div>
        </div>
        `

        this.registerProcess()
    }

    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    /**
     * Mostrar error al suscribirse.
     * @param {HTMLElement} input - Elemento input a validar.
     * @param {HTMLElement} messageItem - Elemento contenedor del mensaje a mostrar.
     * @param {string} messageText - Texto del mensaje a mostrar.
     * @param {boolean} isValid - El menaje es de éxito (true) o error (false)
     */

    inpSuscribeMessage(inputAbout, messageItem, messageText, isValid) {
        if (isValid) {
            messageItem.classList.add("success")
        }
        else {
            inputAbout.classList.remove("is-valid")
            inputAbout.classList.add("is-invalid")
            inputAbout.focus()

            messageItem.classList.remove("success")
            messageItem.classList.add("error")
        }
        messageItem.classList.remove("hidden")
        messageItem.textContent = messageText
    }

    registerProcess() {
        cardElement.mount('#card-element');

        const inpEmail = document.querySelector("#inp-email")
        const errorMessage = document.querySelector("#payment-message")
        const cardElementContainer = document.querySelector("#card-element")
        const form = document.getElementById('subscription-form');

        // Btn que se crea en la funcion "start" arriba
        /*document.querySelector(".btn-register")
            .addEventListener("click", (e) => {
                e.preventDefault()
            })*/

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (this.isValidEmail(inpEmail.value)) {

                console.log(`\n\nDebug 1\n\n`)

                inpEmail.classList.remove("is-invalid")
                inpEmail.classList.add("is-valid")

                const { paymentMethod, error } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        email: inpEmail.value,
                    },
                });

                //console.log(`\n\n${JSON.stringify(paymentMethod)}\n\n`)

                console.log(`\n\nDebug 2\n\n`)

                if (error) {
                    if (error.code == "incomplete_number") {

                        console.error(`Error personalizado\n${JSON.stringify(error)}`);

                        this.inpSuscribeMessage(cardElementContainer, errorMessage, "Debe introducir un número de tarjeta válido.")
                        //errorMessage.classList.remove('hidden');
                    }
                } else {
                    this.loading.createLoading()
                    const response = await fetch('/create-subscription', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: inpEmail.value,
                            paymentMethodId: paymentMethod.id,
                        }),
                    });

                    const subscription = await response.json();

                    if (subscription.error) {
                        this.loading.removeLoading()
                        console.error(`Error personalizado:\n${subscription.error}`);
                        this.inpSuscribeMessage(cardElementContainer, errorMessage, "", true)

                        this.inpSuscribeMessage(inpEmail, errorMessage, "Este correo ya tiene una suscripción en curso.")
                    } else {
                        cardElementContainer.classList.remove("is-invalid")
                        cardElementContainer.classList.add("is-valid")

                        this.loading.removeLoading()

                        const emailData = {
                            to: `${inpEmail.value}`,
                            nav_invoice: subscription.nav_invoice,
                            pdf_invoice: subscription.pdf_invoice
                        };

                        fetch('/send-email', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(emailData)
                        })
                            .then(response =>response.text())
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

                        this.inpSuscribeMessage(cardElementContainer, errorMessage, "Le hemos enviado un código de verificación al correo ingresado.", true)
                    }
                }
            }
            else {
                //alert("Error\n\nCorreo no válido para registrarse")
                errorMessage.classList.add("hidden")
                errorMessage.classList.remove("hidden")

                this.inpSuscribeMessage(inpEmail, errorMessage, "Debe introducir un correo válido.")
            }
        }
        );

    }
}


