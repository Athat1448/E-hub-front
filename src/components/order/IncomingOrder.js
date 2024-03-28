import React, { useState, useEffect } from 'react';
import '../../css/orderlist.css';
import Navbar from "../Navbar";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState('paidAt'); 
  const [sortedBy, setSortedBy] = useState('latest'); 

  const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? token : null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      const token = getToken();

      try {
        const response = await fetch('http://localhost:8080/order/getorders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDateFilterChange = (event) => {
    setSelectedDateFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortedBy(event.target.value);
  };

  const sortedOrders = React.useMemo(() => {
    if (orders.length === 0) return [];
    let sortedData = [...orders]; 
    if (selectedDateFilter === 'checkoutAt') {
      sortedData.sort((a, b) => new Date(a.checkoutAt) - new Date(b.checkoutAt));
    } else if (selectedDateFilter === 'lastUpdatedAt') {
      sortedData.sort((a, b) => new Date(a.lastUpdatedAt) - new Date(b.lastUpdatedAt));
    } else if (selectedDateFilter === 'paidAt') {
      sortedData.sort((a, b) => new Date(a.paidAt) - new Date(b.paidAt));
    }
    if (sortedBy === 'latest') {
      sortedData.reverse(); 
    }

    return sortedData;
  }, [orders, selectedDateFilter, sortedBy]);

  return (
    <div>
        <Navbar />
        <h1 className='header'>Orders</h1>
    <div className="orders-container">
<div className="filter-container">
        <label htmlFor="date-filter">Filter by Date:</label>
        <select id="date-filter" value={selectedDateFilter} onChange={handleDateFilterChange}>
          <option value="checkoutAt">Checkout At</option>
          <option value="lastUpdatedAt">Last Updated</option>
          <option value="paidAt">Paid At (Default)</option>
        </select>
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortedBy} onChange={handleSortChange}>
          <option value="latest">Latest (Default)</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {isLoading && <p>Loading orders...</p>}
      {error && <p className="error">Error: {error}</p>}
      {sortedOrders.length > 0 && (
  <ul className="orders-list">
    {sortedOrders.map((order) => (
      <li key={order.orderNumber} className="order-card">
        <div className="card-header">
          <p className="order-date">{new Date(order[selectedDateFilter]).toLocaleDateString()}</p>
        </div>
        <div className="card-body">
          <div className="order-details">
            <p>Order Number: {order.orderNumber}</p>
            <p>Recipient Name: {order.shippingAddress.recipientName}</p>
            <p>Phone Number: {order.shippingAddress.phoneNumber}</p>
            <p>Order Status: {order.orderStatus}</p>
            <p>Total Price: {order.totalPrice}</p>
          </div>
          <div className="shipment-info">
            <p>Shipment: {order.shipmentDetail.name} status: {order.shipmentStatus}</p>
            <p>Shipping Address: {order.shippingAddress.address} {order.shippingAddress.province} {order.shippingAddress.postalCode} </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
)}
      {sortedOrders.length === 0 && !isLoading && <p>No orders found.</p>}
    </div>
    </div>
  );
}

export default OrdersList;
