import React, { useState } from 'react';
import BASE_URL from '../../config';

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const login = async () => {
    console.log("Login function executed", formData);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login.");
    }
  };

  const signup = async () => {
    console.log("Sign up function executed", formData);
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred during sign-up.");
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state === "Login" ? login() : signup();
  };

  return (
    <section className="max-padd-container flexCenter flex-col pt-32 bg-primary">
      <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto px-14">
        <h3 className="h3">{state}</h3>
        <form className="flex flex-col gap-4 mt-7" onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
              className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
              autoComplete="username"
            />
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
            autoComplete="current-password"
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
        <div className="flexStart mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
