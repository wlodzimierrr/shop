import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
        try {
            return token;
        } catch (e) {
            return null;
        }
        }
        return null;
    });

    const login = async (formData) => {
        console.log("Login function executed", formData);
        try {
          const response = await fetch(`api/auth/login`, {
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
            setUser(responseData.token)
          } else {
            alert(responseData.errors);
          }
        } catch (error) {
          console.error("Error logging in:", error);
          alert("An error occurred during login.");
        }
      };

      const logout = () => {
        localStorage.removeItem('auth-token');
        setUser(null);
        window.location.replace('/');
      };

      const signup = async (formData) => {
        console.log("Sign up function executed", formData);
        try {
          const response = await fetch(`api/auth/signUp`, {
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
          } else {
            alert(responseData.errors);
          }
        } catch (error) {
          console.error("Error signing up:", error);
          alert("An error occurred during sign-up.");
        }
      };

    const contextValue = { user, login, logout, signup };

    return (
        <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
