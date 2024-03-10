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

  console.log(product);

  return (
    <div>
      <h1 className="">Product Detail</h1>
      <div className="">
        <div className="">
          {product.imageUrls && product.imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={product.name} />
          ))}
            <h2 className="">{product.name}</h2>
            <p className="">{product.description}</p>
            {product.variants && product.variants.map((variant, index) => (
              <div key={index}>
                <h3>{variant.name}</h3>
                <p>{variant.price}</p>
                <p>{variant.quantity}</p>
                <p>{variant.option}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
