import React, { useState } from 'react';
import '../css/register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const token = await response.text();

      if (response.ok) {
        console.log('User registered successfully');
        localStorage.setItem("token", token);
        window.location.href = '/createstore';
      } else {
        console.error('Failed to register user:', response.statusText);
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-header">Register</h1>
      <div className="form-group">
        <label>Username</label>
        <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="register-button" onClick={handleRegister}>Register</button>
      <div className="form-group login-label">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
