import React, { useState, useEffect } from "react";
import axios from "axios";
// import './styles.css'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'

export default function Card() {
  const [products, setProduct] = useState(null);
  const [jumlahs, setJumlah] = useState(null);
  const { id } = useParams()
  const navigasi = useNavigate()
  const [token, SetToken] = useState('');
  let content = null;

  // useEffect(() => {
  //   getProducts();
  // }, []);
  const url= 'http://localhost:8000/token' 
  useEffect(() => {
		  axios
      .get(url, {
                withCredentials: true
            })
      .then(res => {
        SetToken(res.data.accessToken)
        const decoded = jwt_decode(res.data.accessToken)
        console.log("coba in", decoded)
        
        axios
        .get(`http://localhost:8000/v1/Produk/${decoded.id}`)
        .then(res => {
          console.log("oi",res)
          console.log("oilah",res.data.length)
          setProduct(res.data)
          setJumlah(res.data.length)
        })
        .catch(err => {
          console.log(err)
        })
      })
			.catch(err => {
        console.log(err)
			})
      // setProduct(response.data);
      // const data = await response.json()
      // console.log('apa',data)
      // setProduct(data);
    }, [url])
    
    // console.log("coba pro", products.product[])
  // const getProducts = async () => {
  //   try {
  //     let response = await axios.get("http://localhost:8000/token", {
  //               withCredentials: true
  //           })
  //           SetToken(response.data.accessToken)
  //     const decoded = jwt_decode(response.data.accessToken)
  //     response = await fetch(`http://localhost:8000/v1/Produk/${decoded.id}`);
  //     // setProduct(response.data);
  //     console.log('apa2',response)
  //     const data = await response.json()
  //     console.log('apa',data)
  //     setProduct(data);
      
  //   } catch (error) {
  //     navigasi("/")
  //   }
  // };
//   const ada = async () => {
//     await fetch(`http://localhost:8000/v1/Produk/${id}`)
//     console.log('tes',id)
// }
// useEffect(() => {
//     if (!ada) {
//         navigasi('/')
//         return
//     }
//     else {
//         getProducts()
//     }
// }, []);
console.log("coba", jumlahs)
// const tampil = () =>{
//   try {
    

//       return`
//       ${
//       for(let i = 0; i<=jumlahs; i++){
//       }
//       <div className="col-lg-3 mt-2">
//       <div key={${products.product[i].id}}>
//       <div className='product-wrapper'>
//                       <div className='img-product'>
//                         <img src={${products.product[i].foto}} alt="jam" />
//                       </div>
//                       <div className='text-product'>
//                         <p className='title-product'>{${products.product[i].nama_produk}}</p>
//                         <p className='desc-product'>{${products.product[i].deskripsi}}</p>
//                         <p className='price-product'>{${products.product[i].harga}}</p>
//                       </div>
//                       </div>
//                       </div>
//                       </div>
                      
//                       <script>
//        }
//       </script>
//                       `;
                    
                      
                      
//                     } catch (error) {
//     console.log("apa",error)
//   }
// }
// console.log("coba", tampil)
if(products){
  return (
    <div className="mt-4">
      <div className="row">
        {/* {tampil} */}
        {products.map((product) => (
          <div className="col-lg-3 mt-2">
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
    //     ))} */}
  )
  
}

return(
  <div>

    {content}
  </div>
)
}
