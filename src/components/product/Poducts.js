import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "../../css/productList.css";

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/products/getproducts", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="header">Product List</h1>
      <div className="product-list">
          {productList.map((product) => (
              <Link to={{ pathname: `/product/${product.id}` }} className="product-link">
                  <div className="card">
                      <img src={product.imageUrls[0]} alt={product.name} />
                      <div className="card-body">
                          <h2 className="card-title">{product.name}</h2>
                      </div>
                  </div>
              </Link>
          ))}
          <Link to="/product/create" className="create-product-link">
              <div className="card create-product-card">
                  <div className="plus-icon">+</div>
              </div>
          </Link>
      </div>
    </div>
  );
};

export default ProductList;
