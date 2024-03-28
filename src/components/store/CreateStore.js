import React, { useEffect, useState } from 'react';
import '../../css/createStore.css';

const CreateStore = () => {
    const [name, setStoreName] = useState('');
    const [lineApiKey, setLineApiKey] = useState('');
    const [lazadaApiKey, setLazadaApiKey] = useState('');
    const [storeNameError, setStoreNameError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
        }
      }, []);

    const handleCreateStore = async () => {
      if (!name) {
          setStoreNameError(true);
          return;
      }
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
          const data = await response.text();
          if (response.ok) {
            localStorage.setItem("token", data);
            window.location.href = "/order";
          } else {
            console.error('create failed:', response.statusText);
          }
        } catch (error) {
          console.error('Error during create:', error.message);
        }
  };


    return (
      <div>
        <h1 className='create-store-header'> Create Your Own Store </h1>
        <div className="create-store-container">
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
            <div className="create-store-button-container">
              <button className="create-store-button" onClick={() => {window.location.href = "/login"}}>Back</button>
              <button className="create-store-button" onClick={handleCreateStore}>Create Store</button>
            </div>
        </div>
        </div>
    );
};

export default CreateStore;
