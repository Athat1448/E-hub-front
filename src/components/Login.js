import React, { useState } from 'react';
import '../css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token);

        try{
          const roleResponse = await fetch('http://localhost:8080/user/validate', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${data.token}` } 
          });
          const role = await roleResponse.text();
          setRole(role);
        } catch (error) {
          console.error('Error validating authorization:', error);
        }
        
      if(role === "OWNER", "EMPLOYEE"){
          window.location.href = "/order";
        } else if(role === ""){
          window.location.href = "/createstore";
        }
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <div className="form-group">
        <label>Username</label>
        <div>
          <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label>Password</label>
        <div>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className='from-group register-label'>
          Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default Login;
