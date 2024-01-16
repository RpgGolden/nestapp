// AuthForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
  
    const handleSignup = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', signupData);
        console.log('Signup successful:', response.data);
      } catch (error) {
        console.error('Error signing up:', error.response.data.message);
      }
    };
  
    const handleLogin = async () => {
        try {
          const response = await axios.put('http://localhost:3000/api/auth/login', {
            email: loginData.username,
            password: loginData.password,
          });
    
          console.log('Login successful:', response.data);

          const { accessToken } = response.data;
    
          localStorage.setItem('accessToken', accessToken);
          // Используйте history.push для перехода на другую страницу
        //   history.push('/tasks');
        window.location.href = '/tasks'
        } catch (error) {
          console.error('Error logging in:', error.response.data.message);
        }
      };
      

  return (
    <div>
      <h1>Authentication</h1>

      <div>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={signupData.username}
          onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={signupData.email}
          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={signupData.password}
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
        />
        <button onClick={handleSignup}>Sign Up</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default AuthForm;