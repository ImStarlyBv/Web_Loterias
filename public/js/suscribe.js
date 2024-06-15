const bbb = () => {

  /*const stripe = Stripe('pk_test_51PPw1mP6py5lJhlwvK6QjnGqYEt4vD1b9rnIz5J74iMAWYj4d2HtnsHzfPD098OYXmGy5dEAt52o3RUTGHOys3SK00AlG8V8Es');
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  const form = document.getElementById('subscription-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inpEmail = document.querySelector("#inp-email")

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: inpEmail.value,
      },
    });

    if (error) {
      console.error(`Error personalizado\n${error}`);
      document.getElementById('payment-message').textContent = error.message;
      document.getElementById('payment-message').classList.remove('hidden');
    } else {
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
      console.log(JSON.stringify(subscription))
      alert(JSON.stringify(subscription))

      if (subscription.error) {
        console.error(`Error personalizado:\n${subscription.error}`);
        document.getElementById('payment-message').textContent = subscription.error.message;
        document.getElementById('payment-message').classList.remove('hidden');
      } else {
        document.getElementById('payment-message').textContent = 'Subscription successful!';
        document.getElementById('payment-message').classList.remove('hidden');
      }
    }
  });*/


}
export default bbb