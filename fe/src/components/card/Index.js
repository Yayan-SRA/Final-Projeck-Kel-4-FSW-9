import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'
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
<section>
            {products.map((product, index) => (
            <div key={product.id}>
            <div className='product-wrapper'>
            <div className='img-product'>
                <img src={product.foto}  alt="jam"/>
            </div>
            <div className='text-product'>
                <p className='title-product'>{product.nama_produk}</p>
                <p className='desc-product'>{product.deskripsi}</p>
                <p className='price-product'>{product.harga}</p>
            </div>
            </div>
            </div>
            ))}
</section>
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
