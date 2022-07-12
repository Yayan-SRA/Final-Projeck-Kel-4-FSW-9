import React, { useState, useEffect } from "react";
import axios from "axios";
// import './styles.css'
import { Link } from "react-router-dom";

export default function Card() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8000/v1/Produk");
    setProduct(response.data);
  };

  return (
    <div className="mt-4">
      <div className="d-flex" style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {products.map((product, index) => (
          <div className="col-lg-2 mx-2 mt-2">
            <div key={product.id}>
              <div className='product-wrapper'>
                <div className='img-product'>
                  <img src={product.foto} style={{ width: "100%", height: "150px" }} alt="jam" />
                </div>
                <div className='text-product'>
                  <p className='title-product'>{product.nama_produk}</p>
                  <p className='desc-product'>{product.deskripsi}</p>
                  <p className='price-product'>{product.harga}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    // {products.map((product) => (
    //     <div key={product.id}>
    //     <div className='product-wrapper'>
    //         <div className='img-product'>
    //             <img src={require('../../images/jam-tangan.jpg')}  alt="jam"/>
    //         </div>
    //         <div className='text-product'>
    //             <p className='title-product'>{product.nama_produk}</p>
    //             <p className='desc-product'>{product.deskripsi}</p>
    //             <p className='price-product'>{product.harga}</p>
    //         </div>
    //     </div>
    // </div>
    //     ))}
  )
}
