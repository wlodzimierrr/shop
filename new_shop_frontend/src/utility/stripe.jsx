import { loadStripe } from '@stripe/stripe-js';

// Fetch the publishable key and initialize Stripe
export const initStripe = async () => {
    const res = await fetch('/api/orders/publishableKey');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    const publishableKey = data.publishable_key;
    return loadStripe(publishableKey);
};

// Create a payment intent
export const createPaymentIntent = async (amount, currency) => {
    try {
        const response = await fetch('/api/orders/paymentIntent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount,
            currency: currency,
            payment_method_types: ['card'],
        }),
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.client_secret;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
