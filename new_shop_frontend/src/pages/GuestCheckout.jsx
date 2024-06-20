import { useContext, useEffect, useState } from 'react';

// Stripe
import { initStripe, createPaymentIntent } from '../utility/stripe';
import { Elements } from '@stripe/react-stripe-js';

// Contexts
import { ShopContext } from '../context/ShopContext';

// Components
import Notification from '../components/Notification';
import GuestCheckoutForm from '../components/GuestCheckoutForm';


const GuestCheckout = () => {

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const { getTotalCartAmount, cartItems } = useContext(ShopContext);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: '',
    loading: true,
  });

  const handleShowNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    initStripe().then(setStripePromise).catch(error => console.error('Stripe initialization error:', error));
  }, []);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const clientSecret = await createPaymentIntent(getTotalCartAmount(), 'gbp');
        setClientSecretSettings({
          clientSecret: clientSecret,
          loading: false,
        });
      } catch (error) {
        console.error('Error:', error);
        setClientSecretSettings({
          clientSecret: '',
          loading: false,
        });
      }
    };

    fetchPaymentIntent();
  }, [getTotalCartAmount]);

  const handleOrderSuccess = async (paymentIntent, formData) => {
    try {
      const response = await fetch('/api/orders/saveGuestOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          items: cartItems,
          personalDetails: formData,
        }),
      });

      const { success, orderId } = await response.json();
      if (!success) {
        throw new Error('Network response was not ok');
      }

      console.log('Order saved successfully:', orderId);

      handleShowNotification('success', 'Payment successful!');

      setTimeout(() => {
        window.location.replace('/cartPage');
      }, 2000);

    } catch (error) {
      console.error('Error saving order:', error);
      handleShowNotification('error', 'Failed payment.');
      window.location.replace('/cartPage');
    }
  };

  return (
    <section className="max-padd-container flexCenter flex-col pt-8 mb-8 bg-primary">
      <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto px-14">
        <Notification
          showModal={showNotification}
          setShowModal={setShowNotification}
          title={notificationType === 'success' ? 'Success' : 'Error'}
          message={notificationMessage}
          onClose={handleCloseNotification}
        />
        {clientSecretSettings.loading ? (
          <h1>Loading ...</h1>
        ) : (
          stripePromise && clientSecretSettings.clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret: clientSecretSettings.clientSecret, appearance: { theme: 'stripe' } }}>
              <GuestCheckoutForm onOrderSuccess={handleOrderSuccess} />
            </Elements>
          )
        )}
      </div>
    </section>
  );
};

export default GuestCheckout;