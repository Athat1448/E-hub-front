import React, { useEffect } from "react";
import Navbar from "../Navbar";

const ProductList = () => {

    useEffect(async () => {
        const productlist = await fetch('http://localhost:8080/api/productlist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }, [])


    return (
        <div>
            <Navbar />
            <h1> productlist </h1>
        </div>
    );
};

export default ProductList;