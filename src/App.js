import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/product/Poducts';
import Createproduct from './components/product/CreateProduct';
import Profile from './components/profile/Profile';
import Incommingorder from './components/order/IncomingOrder';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {window.location.hostname === 'localhost' && <Route path="/" element={<Navigate to="/login" />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Products />} />
          <Route path="/create" element={<Createproduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Incommingorder />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
