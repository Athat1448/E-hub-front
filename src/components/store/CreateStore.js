import React, { useState } from 'react';
import '../../css/createStore.css';

const CreateStore = () => {
    // State variables to store form inputs and error flags
    const [name, setStoreName] = useState('');
    const [lineApiKey, setLineApiKey] = useState('');
    const [lazadaApiKey, setLazadaApiKey] = useState('');
    const [storeNameError, setStoreNameError] = useState(false);

    const handleCreateStore = async () => {
        try {
            const response = await fetch('http://localhost:8080/store/create', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, lineApiKey, lazadaApiKey }),
            });
            console.log( name, lineApiKey, lazadaApiKey );
            const data = await response.body;
            if (response.ok) {
              localStorage.setItem("token", data.token);
              window.location.href = "/order";
            } else {
              console.error('create failed:', response.statusText);
            }
          } catch (error) {
            console.error('Error during create:', error.message);
          }
    };


    return (
        <div className="create-store-container">
            <h1 className='header'> Create Your Own Store </h1>
            {/* Store Name input */}
            <div className={`form-group ${storeNameError ? 'error' : ''}`}>
                <label htmlFor="storeName">Store Name:</label>
                <input
                    type="text"
                    id="storeName"
                    value={name}
                    onChange={e => setStoreName(e.target.value)}
                />
                {storeNameError && <span className="error-text">Required</span>}
            </div>

            {/* Line API Key input */}
            <div className={`form-group`}>
                <label htmlFor="lineApiKey">Line API Key:</label>
                <input
                    type="text"
                    id="lineApiKey"
                    value={lineApiKey}
                    onChange={e => setLineApiKey(e.target.value)}
                />
            </div>

            {/* Lazada API Key input */}
            <div className={`form-group`}>
                <label htmlFor="lazadaApiKey">Lazada API Key:</label>
                <input
                    type="text"
                    id="lazadaApiKey"
                    value={lazadaApiKey}
                    onChange={e => setLazadaApiKey(e.target.value)}
                />
            </div>

            {/* Submit button */}
            <button className="create-store-button" onClick={handleCreateStore}>Create Store</button>

            <button className="back-button" onClick={() => {window.location.href = "/login"}}>Back</button>
            <p> wait for invite </p>
        </div>
    );
};

export default CreateStore;
