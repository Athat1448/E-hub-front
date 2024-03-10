import React, { useState } from 'react';
import '../../css/createStore.css';

const CreateStore = () => {
    // State variables to store form inputs and error flags
    const [storeName, setStoreName] = useState('');
    const [lineApiKey, setLineApiKey] = useState('');
    const [lazadaApiKey, setLazadaApiKey] = useState('');
    const [storeNameError, setStoreNameError] = useState(false);

    // Function to handle form submission
    const handleCreateStore = async () => {
        // Checking for empty fields and updating error flags
        if (storeName.trim() === '') {
            setStoreNameError(true);
        } else {
            setStoreNameError(false);
        }
    };

    return (
        <div className="create-store-container">
            {/* Store Name input */}
            <div className={`form-group ${storeNameError ? 'error' : ''}`}>
                <label htmlFor="storeName">Store Name:</label>
                <input
                    type="text"
                    id="storeName"
                    value={storeName}
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
        </div>
    );
};

export default CreateStore;
