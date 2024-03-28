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
    const [onHandNumber, setOnHandNumber] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleImageUpload = async (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=' /* API Key */, {
              method: 'POST',
              body: formData
            });
      
            if (response.ok) {
              const data = await response.json();
              setImageUrl(data.data.url);
            } else {
              console.error('Failed to upload image');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
    };

    const handleSubmit = async () => {
        try {
            const productData = {
                code: productCode,
                categoryId: parseInt(selectedCategory),
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
                        onHandNumber: parseInt(onHandNumber),
                        price: parseFloat(price),
                        options: [0],
                        weight: parseFloat(weight)
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
                console.error('Failed to create product:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="create-product-container">
            <h1 className="create-product-header">Create Product</h1>
            <div className="">
                {imageUrl ? (
                    <div className="image-container">
                        <input className="image-input-upload-button" type="file" onChange={handleImageUpload} />
                        <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
                    </div>
                ) : (
                    <div className="image-container">
                        <div className="image-input">
                            <input className="image-input-upload-button" type="file" onChange={handleImageUpload} />
                        </div>
                    </div>
                )}
            </div>
            <div className="form-group-container">
                <div className="form-group-container-item">
                <div className="form-group-name-container">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="form-group">
                    <label>Code</label>
                        <input type="text" placeholder="Product Code" value={productCode} onChange={(e) => setProductCode(e.target.value)} />
                    </div>
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
                    <label>Description</label>
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group-variants-container">
                    <div className="form-group">
                        <label className="invisible-text">Variant</label>
                        <input type="text" placeholder="Variant Name" value={variantOptionName} onChange={(e) => setVariantOptionName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Variant</label>
                        <input type="text" placeholder="Variant Value" value={variantOptionValue} onChange={(e) => setVariantOptionValue(e.target.value)} />
                    </div>
                    </div>
                </div>

                <div className="form-group-container-item">
                    <div className="form-group">
                        <label>On Hand</label>
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
                </div>
            </div>
            {popupVisible && (
                <div className="popup">
                    <p>Product has been created successfully!</p>
                    <button className="create-product-button" onClick={() => setPopupVisible(false)}>Close</button>
                </div>
            )}
        </div>
        </div>
    );
    
};

export default Createproduct;
