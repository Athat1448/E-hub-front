import React, { useState } from "react";
import Navbar from "../Navbar";
import "../../css/profile.css";

const Profile = () => {
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState('');

    const [orderData, setOrderData] = useState({
        allTime: 2,
        thisYear: 2,
        thisMonth: 2,
        thisWeek: 0,
        totalPrice: 0.00
    });

    const togglePopup = () => {
        setShowPopup(!showPopup);
        if (error) setError('');
    };

    const addEmployee = async () => {
        try{
            const response = await fetch('http://localhost:8080/store/adduser', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (response.ok) {
                togglePopup();
            } else {
                const data = await response.json();
                setError(data.detail);
                console.error('Failed to add employee:', data);
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <div>
            <Navbar />
            {showPopup && (
                    <div className="popup-container">
                        <h2>Add Employee</h2>
                        <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {error && <div className="error-text">{error}</div>}
                        <div className="button-container">
                            <button onClick={addEmployee}>Add</button>
                            <button onClick={togglePopup}>Close</button>
                        </div>

                    </div>
                )}
            <div className="flex-container">
                <label className="header">Atamarind</label>
                <button className="add-employee-button" onClick={togglePopup}>Add Employee</button>
            </div>
            <div className="profile-container">
                <div className="dashboard">
                    <label>Line Shoping</label>
                    <div className="item">
                        <div>
                            <p>All Time Orders</p>
                            <p>{orderData.allTime}</p>
                        </div>
                        <div>
                            <p>This Year Orders</p>
                            <p>{orderData.thisYear}</p>
                        </div>
                        <div>
                            <p>This Month Orders</p>
                            <p>{orderData.thisMonth}</p>
                        </div>
                        <div>
                            <p>This Week Orders</p>
                            <p>{orderData.thisWeek}</p>
                        </div>
                        <div>
                            <p>Total Price of Orders</p>
                            <p>0.00</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard">
                    <label>Lazada</label>
                    <div className="item">
                    <div>
                            <p>All Time Orders</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>This Year Orders</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>This Month Orders</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>This Week Orders</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>Total Price of Orders</p>
                            <p>0.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
