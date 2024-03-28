import React, { useEffect, useState } from 'react';
import './navbar.css';

function Navbar() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getRole = async () => {
      try{
        const roleResponse = await fetch('http://localhost:8080/user/validate', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` } 
        });
        const role = await roleResponse.text();
        setRole(role);
      } catch (error) {
        console.error('Error validating authorization:', error);
      }
    };
    getRole();
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="navbar">
      <a href="/login" onClick={() => {localStorage.removeItem("token")}}>Log out</a>
      {role === "OWNER" && <a href="/profile">Store</a>}
      <a href="/order">Order</a>
      <a href="/product">Product</a>
    </div>
  );
}

export default Navbar;
