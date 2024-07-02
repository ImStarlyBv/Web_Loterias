import UiControls from "./UiControls.js"

const uiControls = new UiControls()
const notificationContainer = uiControls.$(".notification-container")

// Cambiar de inp de forma automática al escribir el código de verificación
const allInps = uiControls.$(".inp-code")
allInps.forEach((inp, i) => {
    inp.addEventListener("input", (e) => {
        const trimmedValue = e.target.value.trim();
        if (trimmedValue !== e.target.value) {
            console.log("Espacios en blanco eliminados");
            e.target.value = trimmedValue;
        } else {
            //console.log(e);

            if (inp.value.length > 0) {
                if (allInps[i + 1] !== undefined) {
                    allInps[i + 1].focus()
                }
            }
        }
    });
});

function showMessageNotification(text, validationClass) {
    notificationContainer.innerHTML = text
    notificationContainer.classList.remove("is-valid", "is-invalid")
    notificationContainer.classList.add(validationClass)
    notificationContainer.style.display = "block"
}

function hideMessageNotification() {
    const timeout = setTimeout(() => {
        clearTimeout(timeout)
        notificationContainer.style.display = "none"
    }, 5000);
}

const btnResend = uiControls.$(".btn-resend")
btnResend.addEventListener("click", (e) => {
    e.preventDefault()

    showMessageNotification("Enviando nuevo código...", "is-valid")

    const url = window.location.href
    const urlObject = new URL(url);
    const em = urlObject.pathname.split('/').pop(); // em = email

    // Re-send code
    const rs = {
        em: em
    }

    fetch(`/resend-code/${em}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rs)
    })
        .then(response => {
            response.text()
            showMessageNotification("Correo enviado.", "is-valid")
            hideMessageNotification()
        })
        .catch(error => {
            console.error('Error al enviar el correo - Resend code:', error);
            //alert('Error al enviar el correo');
            console.log('Error al enviar el correo - Resend code');
        });
})

const btnSendCode = uiControls.$(".btn-send-code")
btnSendCode.addEventListener("click", async (e) => {
    e.preventDefault()
    //console.log("Confirmando")
    let code = ""

    for (const inpValue of allInps) {
        //console.log(inpValue.value)
        code += inpValue.value
    }

    console.log(`code = ${code}`)

    if (code == "" || code.length < 6) {
        console.log("No")
        showMessageNotification("Debe completar el código de verificación.", "is-invalid")
        hideMessageNotification()
    } else {
        showMessageNotification("Confirmando...", "is-valid")
        //hideMessageNotification()
        console.log("Confirmar correo de email en la DB")

        const url = window.location.href
        const urlObject = new URL(url);
        const em = urlObject.pathname.split('/').pop(); // em = email

        // Fetch para confirmar código
        const confirmationCode = await fetch("/confirmation-code", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, em })
        })
            .then(response => {
                response.text()
                //console.log(`Status = ${response.status}`)
                console.log(`Result success = ${response.ok}`)
                console.log(`Result =`)
                console.log(response)
                
                if (response.ok) {
                    showMessageNotification("Código valido.", "is-valid")
                } else {
                    showMessageNotification("Código invalido.", "is-invalid")                    
                }
                hideMessageNotification()

                //return response.json()
            })
            .catch(error => {
                console.error('Error personalizado\nError al confirmar código', error);
            });
    }
})