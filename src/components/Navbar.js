import React from 'react';
import './navbar.css';

function Navbar() {

  return (
    <div className="navbar">
      <a href="/login" onClick={() => {localStorage.removeItem("token")}}>Log out</a>
      <a href="/profile">Profile</a>
      <a href="/order">Order</a>
      <a href="/product">Product</a>
    </div>
  );
}

export default Navbar;
