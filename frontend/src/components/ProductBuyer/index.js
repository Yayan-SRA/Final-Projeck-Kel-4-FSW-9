import React, { useState, useEffect, Fragment } from 'react'
import "./probuy.css";
import { useNavigate, useParams } from 'react-router-dom'
import { getSelectedProduct, kirimId } from '../../actions/productAction';
import { useDispatch, useSelector } from "react-redux/es/exports";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import jam from "../../images/jam-tangan3.png";
import seller from "../../images/seller.png";

function ProductBuyer() {
    const [modalShow, setModalShow] = useState(false);
  // const [id, setId] = useState("");
  const { id } = useParams()
  console.log("coba id", id)
  // setId(useParams())
  console.log("coba id 2", id)

  
  
  const { getSelectedProductResult, getSelectedProductLoading, getSelectedProductError } = useSelector((state) => state.product)
  
  const dispatchEvent = useDispatch()
  
  const getId = () => {
      dispatchEvent(getSelectedProduct({
          id, 
        }))
        
    }
    //   const getID = () => {
        //     dispatchEvent(kirimId({
            //       id,
            //     }))
            //   }
            // if(id !== false){
                //   getID()
                // }
                // const coba = async => {
                    
                    // }
    useEffect(() => {
        getId()
    }, []);
                    
    console.log("coba hasil", getSelectedProductResult)
    const product = getSelectedProductResult;
                    
//   useEffect(() => {
//     console.log("1. use effect component did mount");
//     dispatchEvent(getSelectedProduct())
// }, [dispatchEvent])

  return (
    <>
      <div className="buyer-halaman-produk">
        <div className="container">
          <div className="col-md-6 sm-12" style={{ width: "100%" }}>
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={product.foto} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={product.foto} alt="Second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={product.foto} alt="Third slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={product.foto} alt="Fourth slide" />
              </Carousel.Item>
            </Carousel>

            <div className="product-description">
              <div className="card">
                <span style={{ fontWeight: "bold" }}>{product.deskripsi}</span>
                <br></br>
                <p>
                  {/* {getSelectedProductResult.deskripsi} */}
                  lorem
                  <br></br>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 sm-12" style={{ width: "100%" }}>
            <div className="about-product">
              <div className="card">
                <span style={{ fontWeight: "bold" }}>{product.nama_produk}</span>
                <span style={{ fontSize: "12px", color: "#8A8A8A", marginTop: "5px" }}>{product.id_kategori}</span>
                <span style={{ fontSize: "16px", marginTop: "10px" }}>Rp {product.harga}</span>
                {/* <p>Rp 250.000</p> */}

                {/* <button className="btn-edit" onClick={() => setModalShow(true)}>
                  Saya tertarik ingin nego
                </button> */}
              </div>
            </div>
            <div className="about-seller">
              <div className="card">
                <img src={seller} alt="seller" width="48px" height="48px" />
                <div className="card-body">
                  <span className="card-title">Nama Penjual</span>
                  <p className="card-text">Kota</p>
                </div>
              </div>
            </div>
            <div>
              {/* <ModalTawar show={modalShow} onHide={() => setModalShow(false)} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductBuyer