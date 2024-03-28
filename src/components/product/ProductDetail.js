import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
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
        console.log(data);
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
    <div>
    <Navbar />
    <h1 className="header">Product Detail</h1>
    <div className="product-detail-container">
        <div className="product-image-container">
          {product.imageUrls && product.imageUrls.map((imageUrl, index) => (
            <img className="product-image" key={index} src={imageUrl} alt={product.name} />
          ))}
        </div>
        <h1>{product.name}</h1>
        <p dangerouslySetInnerHTML={{__html: product.description}}></p>
        <h2>Variants</h2>
        <div className="product-variant">
        {product.variants && product.variants.map((variant, index) => (
          <div key={index}>
            <li>Option {index + 1}</li>
            {variant.options.map((option, optionIndex) => (
                <p key={optionIndex}>
                  {option.name}: {option.value}
                </p>
              ))}
            <p>ราคา: {variant.price} บาท ต่อ น้ำหนัก {variant.weight} กิโลกรัม</p>
          </div>
        ))}
        </div>
    </div>
    </div>
  );

};

export default ProductDetail;
