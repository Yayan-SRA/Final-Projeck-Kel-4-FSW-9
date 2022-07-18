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

function ModalTawar(props) {
  const { getSelectedProductResult, getSelectedProductLoading, getSelectedProductError } = useSelector((state) => state.product)
  console.log("coba hasil", getSelectedProductResult)
  const dispatchEvent = useDispatch()
  
  // const getID = () => {
  //   dispatchEvent(getSelectedProduct({
  //     id,
  //   }))
  // }
  // if(id !== false){
  //   getID()
  // }
  // const coba = async => {
    
  // }
//   useEffect(() => {
//     // coba()
// }, []);

  useEffect(() => {
    console.log("1. use effect component did mount");
    dispatchEvent(getSelectedProduct())
}, [dispatchEvent])
  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>Masukkan Harga Tawarmu</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="" style={{ fontSize: "14px", textAlign: "justify" }}> 
          Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.
        </p>
        {/* <div className="deskripsi">
          <div className="gambar-jam">
            <img src={jam} alt="exp" className="" style={{ widht: "48" }} />
          </div>
          <div className="detail " style={{ fontSize: "14px", lineHeight: "20px", paddingTop: "18px", paddingLeft: "5px" }}>
            <b className="">Jam Tangan Casio</b>
            <p>Rp 250.000</p>
          </div>
        </div> */}
        <div className="about-jewelry">
          <div className="card-seller">
            <img src={getSelectedProductResult.foto} alt="seller" width="45px" height="45px" style={{ borderRadius: "14px" }} />
            <div className="card-jewelry">
              <span className="title-jewelry">{getSelectedProductResult.nama_produk}</span>
              <p className="price-tag">Rp {getSelectedProductResult.harga}</p>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div class="mb-3">
              <label for="harga_tawar" class="form-label">
                Harga Tawar
              </label>
              <input type="text" class="form-control " id="harga_tawar" placeholder="Rp 0,00" style={{ borderRadius: "14px" }} />
            </div>
            <button type="submit" className="bargain-price-btn " onClick={props.onHide}>
              Kirim
            </button>
          </form>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
    </Modal>
  );
}
export default function ProductBuyer() {
  const [modalShow, setModalShow] = useState(false);
  // const [id, setId] = useState("");
  const { id } = useParams()
  console.log("coba id", id)
  // setId(useParams())
  console.log("coba id 2", id)

  
  
  const { getSelectedProductResult, getSelectedProductLoading, getSelectedProductError } = useSelector((state) => state.product)
  console.log("coba hasil", getSelectedProductResult)
  const dispatchEvent = useDispatch()
  
//   dispatchEvent(kirimId({
//   id,
// }))
  const getID = () => {
    dispatchEvent(kirimId({
      id,
    }))
  }
  // if(id !== false){
  //   getID()
  // }
  // const coba = async => {
    
  // }
//   useEffect(() => {
//     // coba()
// }, []);

  useEffect(() => {
    console.log("1. use effect component did mount");
    dispatchEvent(getSelectedProduct())
}, [dispatchEvent])

  return (
    <>
      <div className="buyer-halaman-produk">
        <div className="container">
          <div className="col-md-6 sm-12" style={{ width: "100%" }}>
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={getSelectedProductResult.foto} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={getSelectedProductResult.foto} alt="Second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={getSelectedProductResult.foto} alt="Third slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={getSelectedProductResult.foto} alt="Fourth slide" />
              </Carousel.Item>
            </Carousel>

            <div className="product-description">
              <div className="card">
                <span style={{ fontWeight: "bold" }}>Deskripsi</span>
                <br></br>
                <p>
                  {getSelectedProductResult.deskripsi}
                  <br></br>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 sm-12" style={{ width: "100%" }}>
            <div className="about-product">
              <div className="card">
                <span style={{ fontWeight: "bold" }}>{getSelectedProductResult.nama_produk}</span>
                <span style={{ fontSize: "12px", color: "#8A8A8A", marginTop: "5px" }}>{getSelectedProductResult.id_kategori}</span>
                <span style={{ fontSize: "16px", marginTop: "10px" }}>Rp {getSelectedProductResult.harga}</span>
                {/* <p>Rp 250.000</p> */}

                <button className="btn-edit" onClick={() => setModalShow(true)}>
                  Saya tertarik ingin nego
                </button>
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
              <ModalTawar show={modalShow} onHide={() => setModalShow(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}