import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const GuestCheckoutForm = ({ onOrderSuccess }) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:4242/success.html',
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      if (paymentIntent.status === 'succeeded') {
        onOrderSuccess(paymentIntent, formData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} id="checkout-form" className="flex flex-col gap-2">
      <input
        name="email"
        type="text"
        value={formData.email}
        onChange={changeHandler}
        placeholder="Email"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="given-email"
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
      <PaymentElement />
      <button type="submit" disabled={!stripe} className="btn-dark rounded-xl my-5 !py-1">
        Submit
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default GuestCheckoutForm;
