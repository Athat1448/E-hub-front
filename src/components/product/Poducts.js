import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../../css/productList.css";

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "GET",
        header: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setProductList(data);
    };
    fetchData();
  }, []);

  return (
    
    <div>
      <Navbar />
      <h1>Product List</h1>
            <div className="product-list">
                {productList.map(product => (
                    <div className="card" key={product.productId}>
                        <img src={product.imageUrls[0]} alt={product.name} />
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  );
};

export default ProductList;
