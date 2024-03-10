import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Products from './components/product/Poducts';
import Profile from './components/profile/Profile';
import Incommingorder from './components/order/IncomingOrder';
import ProductDetail from './components/product/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';
import Createproduct from './components/product/CreateProduct';
import CreateStore from './components/store/CreateStore';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {window.location.hostname === 'localhost' && <Route path="/" element={<Navigate to="/login" />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/create" element={<Createproduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Incommingorder />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/createstore" element={<CreateStore />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;