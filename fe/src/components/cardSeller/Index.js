import React, { useState, useEffect } from "react";
import axios from "axios";
// import './styles.css'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

export default function Card() {

  const [user, SetUser] = useState("")
  const navigasi = useNavigate()
  const [products, setProducts] = useState([])

  const fetchdata = async () => {
    try {
      let response = await axios.get("http://localhost:8000/token", {
        withCredentials: true
      })
      console.log('ini lagi', response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      console.log('ini coy', decoded);
      response = await fetch(`http://localhost:8000/user/${decoded.id}`)
      const data = await response.json()
      console.log('data', data)
      SetUser(data)
      console.log('setuser', SetUser(data))
      // response = await axios.get(`http://localhost:8000/v1/Produk/${id}`)
      // // data = await response.json()
      // setProducts(response.json())
      response = await axios.get(`http://localhost:8000/v1/Produk/${decoded.id}`)
      setProducts(response.data);
    } catch (error) {
      navigasi("/")
    }
  }
  const ada = async () => {
    await fetch(`http://localhost:8000/user/${user.id}`)
    console.log("makan", user.id)
  }
  // const getProducts = async () => {
  //   const response = await axios.get(`http://localhost:8000/v1/Produk/${id}`)
  //   setProducts(response.data);
  //   console.log(response.data);
  // };

  useEffect(() => {
    if (!ada) {
      navigasi('/')
      return
    }
    else {
      fetchdata()
    }
    // getProducts()
  }, []);

  return (
    <div>
      <div className="mt-4">
        <div className="d-flex" style={{ width: "100%", height: "150px" }}>
          {products.map((product) => (
            <div className="col-lg-4 mt-2 mx-2 ">
              <div key={product.id}>
                <div className='product-wrapper'>
                  <div className='img-product'>
                    <img src={product.foto} alt="jam" />
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
    </div>
  )
}
