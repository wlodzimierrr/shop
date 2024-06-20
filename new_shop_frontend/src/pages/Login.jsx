import React, { useContext, useState } from 'react';

// Contexts
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  
  const [state, setState] = useState("Login");
  const { login, signup } = useContext(AuthContext)
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
    window.location.replace('/');
  };
  
  return (
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
      </div>
    </section>
  );
};

export default Login;
