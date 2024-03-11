import React, { useEffect, useState } from "react";
import "../../css/productDetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  var strUrl = window.location.href;
  var strId = strUrl.split("/");
  var Id = Number(strId[4]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/getproduct`, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Id": Id,
          },
        });
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    fetchData();
  }, []);

  const deleteProduct = async () => {
    await fetch(`http://localhost:8080/products/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Id": Id,
      },
    });
  }

  return (
    <div className="product-detail-container">
      <div>
        <h1>Product Detail</h1>
        <div className="product-image-container">
          {product.imageUrls && product.imageUrls.map((imageUrl, index) => (
            <img className="product-image" key={index} src={imageUrl} alt={product.name} />
          ))}
        </div>
        <h2>{product.name}</h2>
        <p dangerouslySetInnerHTML={{__html: product.description}}></p>
        <h3>Variants:</h3>
        {product.variants && product.variants.map((variant, index) => (
          <div className="product-variant" key={index}>
            <h4>Variant {index + 1}</h4>
            <p>Price: {variant.price}</p>
            <p>Weight: {variant.weight}</p>
            <p>Options:</p>
            <ul>
              {variant.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  {option.name}: {option.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

};

export default ProductDetail;
