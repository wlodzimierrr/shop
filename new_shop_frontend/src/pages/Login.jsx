import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [state, setState] = useState("Login");
  const { login, signup } = useContext(AuthContext);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (state === "Login") {
      await login(data);
    } else {
      await signup(data);
    }
    reset();
    window.location.replace('/');
  };

  return (
    <section className="max-padd-container flexCenter flex-col pt-4 bg-primary">
      <div className="w-full max-w-[666px] h-[800px] bg-primary m-auto px-14">
        <h3 className="h3">{state}</h3>
        <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit(onSubmit)}>
          {state === "Sign Up" && (
            <>
              {errors.username && <p className="text-red-500">Username is required</p>}
              <input
                {...register("username", { required: true })}
                placeholder="Username"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="username"
              />
              {errors.firstName && <p className="text-red-500">First Name is required</p>}
              <input
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="given-name"
              />
              {errors.lastName && <p className="text-red-500">Last Name is required</p>}
              <input
                {...register("lastName", { required: true })}
                placeholder="Last Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="family-name"
              />
              {errors.addressLine1 && <p className="text-red-500">Address Line 1 is required</p>}
              <input
                {...register("addressLine1", { required: true })}
                placeholder="Address Line 1"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-line1"
              />

              <input
                {...register("addressLine2")}
                placeholder="Address Line 2"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-line2"
              />
              {errors.city && <p className="text-red-500">City is required</p>}
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-level2"
              />
              <input
                {...register("county",)}
                placeholder="County"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-level1"
              />
              {errors.postcode && <p className="text-red-500">Postcode is required</p>}
              <input
                {...register("postcode", { required: true })}
                placeholder="Postcode"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="postal-code"
              />            </>
          )}
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Your Email"
            className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
            autoComplete="email"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}
          <input
            {...register("password", { required: true })}
            type="password"
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
      </div>
    </section>
  );
};

export default Login;
