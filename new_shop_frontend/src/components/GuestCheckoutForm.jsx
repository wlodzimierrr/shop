import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const GuestCheckoutForm = ({ onOrderSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
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
        onOrderSuccess(paymentIntent, data);
        reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="checkout-form" className="flex flex-col gap-2">
      {errors.email && <p className="text-red-500">Email is required</p>}
      <input
        {...register("email", { required: true })}
        type="text"
        placeholder="Email"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="given-email"
      />
      {errors.firstName && <p className="text-red-500">First Name is required</p>}
      <input
        {...register("firstName", { required: true })}
        type="text"
        placeholder="First Name"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="given-name"
      />
      {errors.lastName && <p className="text-red-500">Last Name is required</p>}
      <input
        {...register("lastName", { required: true })}
        type="text"
        placeholder="Last Name"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="family-name"
      />
      {errors.addressLine1 && <p className="text-red-500">Address Line 1 is required</p>}
      <input
        {...register("addressLine1", { required: true })}
        type="text"
        placeholder="Address Line 1"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="address-line1"
      />
      <input
        {...register("addressLine2")}
        type="text"
        placeholder="Address Line 2"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="address-line2"
      />
      {errors.city && <p className="text-red-500">City is required</p>}
      <input
        {...register("city", { required: true })}
        type="text"
        placeholder="City"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="address-level2"
      />
      {errors.county && <p className="text-red-500">County is required</p>}
      <input
        {...register("county", { required: true })}
        type="text"
        placeholder="County"
        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
        autoComplete="address-level1"
      />
      {errors.postcode && <p className="text-red-500">Postcode is required</p>}
      <input
        {...register("postcode", { required: true })}
        type="text"
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
