import UiControls from "./UiControls.js"

const uiControls = new UiControls()

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

const btnResend = document.querySelector(".btn-resend")
btnResend.addEventListener("click", (e) => {
    e.preventDefault()

    const url = window.location.href
    const urlObject = new URL(url);
    const em = urlObject.pathname.split('/').pop();

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
        .then(response => response.text())
        .catch(error => {
            console.error('Error al enviar el correo - Resend code:', error);
            //alert('Error al enviar el correo');
            console.log('Error al enviar el correo - Resend code');
        });
})