import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { initStripe, createPaymentIntent } from '../utility/stripe';

// Contexts
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';

// Components
import Notification from '../components/Notification';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => {

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: '',
    loading: true,
  });

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode:'',
  });

  const { getTotalCartAmount, cartItems } = useContext(ShopContext);
  const { login, signup } = useContext(AuthContext)
  
  const handleShowNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === "Login") {
      await login(formData); 
    } else {
      await signup(formData); 
    }
    window.location.replace('/checkout');
  };
  useEffect(() => {
    initStripe().then(setStripePromise);
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

  const handleOrderSuccess = async (paymentIntent) => {
    try {
      const response = await fetch('/api/orders/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}` 
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          items: cartItems,
        }),
      });
      const { success, orderId } = await response.json();
      if (!success) {
        throw new Error('Network response was not ok');
      }

      console.log('Order saved successfully:', orderId);

      handleShowNotification('success', 'Payment successfull!');

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
    <>
    {localStorage.getItem('auth-token') ?
      <section className="max-padd-container flexCenter flex-col pt-16 bg-primary">      
        <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto px-14">
          {/* Notification Modal */}
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
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: clientSecretSettings.clientSecret,
                  appearance: { theme: 'stripe' },
                }}
              >
                <CheckoutForm onOrderSuccess={handleOrderSuccess} />
              </Elements>
            )
          )}
        </div>
      </section>
        :
    <section className="max-padd-container flexCenter flex-col pt-32 bg-primary">
      <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto px-14">
        <h3 className="h3">{state}</h3>
        <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={changeHandler}
                placeholder="Username"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="username"
              />
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={changeHandler}
                placeholder="First Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="given-name"
              />
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={changeHandler}
                placeholder="Last Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="family-name"
              />
              <input
                name="addressLine1"
                type="text"
                value={formData.addressLine1}
                onChange={changeHandler}
                placeholder="Address Line 1"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-line1"
              />
              <input
                name="addressLine2"
                type="text"
                value={formData.addressLine2}
                onChange={changeHandler}
                placeholder="Address Line 2"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-line2"
              />
              <input
                name="city"
                type="text"
                value={formData.city}
                onChange={changeHandler}
                placeholder="City"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-level2"
              />
              <input
                name="county"
                type="text"
                value={formData.county}
                onChange={changeHandler}
                placeholder="County"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-level1"
              />
              <input
                name="postcode"
                type="text"
                value={formData.postcode}
                onChange={changeHandler}
                placeholder="Postcode"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="postal-code"
              />
            </>
          )}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Your Email"
            className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
            autoComplete="email"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
            autoComplete="new-password"
          />
          <button type="submit" className="btn-dark rounded-xl my-5 !py-1">
            Continue
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-black font-bold">
            Already have an account?{' '}
            <span
              onClick={() => setState("Login")}
              className="text-secondary underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-black font-bold">
            Don't have an account?{' '}
            <span
              onClick={() => setState("Sign Up")}
              className="text-secondary underline cursor-pointer"
            >
              Click Here
            </span>
          </p>
        )}
        <div className="flexStart mt-4 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {state === "Login" &&
          <Link to={'/guestCheckout'}>
            <button type="submit" className="btn-dark rounded-xl my-5 !py-1">
                Check out as a guest
            </button>
          </Link>
          }
      </div>
    </section>
    }
    </>
  );
};

export default Checkout;
