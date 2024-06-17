import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState("Login");
  const [ formData, setFormData ] = useState({
    "username": '',
    "password": '',
    "email": '',
  })

  const login = async () => {
    console.log("Login function executed", formData)
    let responseData;
    await fetch('http://localhost:4000/login', {
      method:'POST',
      headers: {
        Accept: 'application/formData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors)
    }
  }
  
  const signup = async () => {
    console.log("Sign up function executed", formData)
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method:'POST',
      headers: {
        Accept: 'application/formData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors)
    }
  }

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  return (
    <section className='max-padd-container flexCenter flex-col pt-32 bg-primary'>
      <div className='w-full max-w-[666px] h-[600px] bg-primary m-auto px-14'>
        <h3 className='h3'>Login</h3>
        <div className='flex flex-col gap-4 mt-7'>
          {state === "Sign Up" ? <input name='username' type='text' value={formData.username} onChange={changeHandler} placeholder='Your Name' className='h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm'/> 
          : ""}
          <input name='email' value={formData.email} onChange={changeHandler}  type='email' placeholder='Your Email' className='h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm'/>
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' className='h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm'/>
        </div>
        <button onClick={() => {state==="Login"?login():signup()}} className='btn-dark rounded-xl my-5 !py-1'>Continue</button>
        {state === "Sign Up" ? <p className='text-black font-bold'>Already have an account? <span onClick={() => {setState("Login")}} className='text-secondary underline cursor-pointer'>Login</span></p> 
        : <p className='text-black font-bold'>Don't have an account? <span onClick={() => {setState("Sign Up")}} className='text-secondary underline cursor-pointer'>Click Here</span></p>}
        <div className='flexStart mt-6 gap-3'>
          <input type='checkbox' name='' id=''/>
          <p>By continuing, I agree the terms of use & privacy policy</p>
        </div>
      </div>
    </section>
    )
}

export default Login