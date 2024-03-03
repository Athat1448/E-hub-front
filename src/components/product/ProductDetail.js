import React from "react";
import "../../css/productDetail.css";

const ProductDetail = ({ product }) => {
  if (!product) {
    return <div>No product data available</div>;
  }

  const { imageUrls, name, description, price } = product;

  if (!imageUrls || !imageUrls.length) {
    return <div>No image available</div>;
  }

  return (
    <div className="product-detail">
      <img src={imageUrls[0]} alt={name} />
      <div className="details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
