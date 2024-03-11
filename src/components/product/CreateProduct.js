import React, { useState } from "react";
import Navbar from "../Navbar";
import categoriesData from "./categories.json";
import "../../css/createProduct.css";

const Createproduct = () => {
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [variantOptionName, setVariantOptionName] = useState('');
    const [variantOptionValue, setVariantOptionValue] = useState('');
    const [barcode, setBarcode] = useState('');
    const [onHandNumber, setOnHandNumber] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const productData = {
                code: productCode,
                categoryId: selectedCategory,
                description: description,
                imageUrls: [imageUrl],
                name: productName,
                variantOptions: {
                    option1: {
                        data: [
                            {
                                value: variantOptionValue
                            }
                        ],
                        name: variantOptionName
                    }
                },
                variants: [
                    {
                        barcode: barcode,
                        onHandNumber: onHandNumber,
                        price: price,
                        options: [0],
                        weight: weight
                    }
                ]
            };

            console.log(productData);

            const response = await fetch('http://localhost:8080/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(productData)
            });
            console.log(response);

            if (response.ok) {
                setPopupVisible(true);
            } else {
                // Handle error response
                console.error('Failed to create product:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="create-product-container">
            <h1 className="create-product-header">Create Product</h1>
            <div className="form-group">
                <label>Product Name</label>
                <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {categoriesData.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Product Code</label>
                <input type="text" placeholder="Product Code" value={productCode} onChange={(e) => setProductCode(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Image URL</label>
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Variant Option Name</label>
                <input type="text" placeholder="Variant Option Name" value={variantOptionName} onChange={(e) => setVariantOptionName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Variant Option Value</label>
                <input type="text" placeholder="Variant Option Value" value={variantOptionValue} onChange={(e) => setVariantOptionValue(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Barcode</label>
                <input type="text" placeholder="Barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            </div>
            <div className="form-group">
                <label>On Hand Number</label>
                <input type="number" placeholder="On Hand Number" value={onHandNumber} onChange={(e) => setOnHandNumber(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Weight</label>
                <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <button className="create-product-button" onClick={handleSubmit}>Submit</button>
    
            {popupVisible && (
                <div className="popup">
                    <p>Product has been created successfully!</p>
                    <button onClick={() => setPopupVisible(false)}>Close</button>
                </div>
            )}
        </div>
        </div>
    );
    
};

export default Createproduct;
