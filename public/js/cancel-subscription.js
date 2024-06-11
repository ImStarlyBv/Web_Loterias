// Eliminar suscripcion con codigo/id de suscripcion
/*
console.log("Funcinando con id de suscripcion")
document.getElementById('cancel-subscription-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const subscriptionId = document.getElementById('subscriptionId').value;
  const response = await fetch('/hola-aios', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptionId }),
  });
  const result = await response.json();
  const message = document.getElementById('message');
  if (result.success) {
      message.textContent = 'Subscription cancelled successfully.';
      message.style.color = 'green';
  } else {
      message.textContent = `Error cancelling subscription: ${result.error}`;
      message.style.color = 'red';
  }
});
*/


// Eliminar suscripcion con correo
console.log("Funcinando con correo")
document.getElementById('cancel-subscription-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;

  console.log(`Cancelar subs del correo: ${email}`)

  const response = await fetch('/cancel-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })

  });
  console.log(response)

  const result = await response.json();
  const message = document.getElementById('message');
  if (result.success) {
    message.textContent = 'Subscription cancelled successfully.';
    message.style.color = 'green';
  } else {
    message.textContent = `Error cancelling subscription: ${result.error}`;
    message.style.color = 'darkred';
  }
});
