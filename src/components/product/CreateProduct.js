import React, {useState} from "react";
import Navbar from "../Navbar";

const Createproduct = () => {
    const [productName, setProductName] = useState('');
    //const createProduct = async () => {};

    return (
        <div>
            <Navbar />
            <h1> createproduct </h1>
            <div>
                <input type="text" label="Product Name" placeholder="ชื่อสินค้า"  value={productName} onChange={(e) => setProductName(e.target.value)}/>
            </div>
        </div>
    );
};

export default Createproduct;