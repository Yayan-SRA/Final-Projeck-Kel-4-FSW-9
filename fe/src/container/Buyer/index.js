import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarMain2 from "../../components/navbar/NavbarMain2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import jam from "../../images/jam-tangan3.png";
import seller from "../../images/seller.png";

function ModalTawar(props) {
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
          <div className="card">
            <img src={jam} alt="seller" width="45px" height="45px" style={{ borderRadius: "14px" }} />
            <div className="card-jewelry">
              <span className="title-jewelry">Jam Tangan Casio</span>
              <p className="price-tag">Rp 250.000</p>
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
export default function Buyer() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <NavbarMain2 />
      <div className="buyer-halaman-produk">
        <div className="container">
          <div className="col-md-6 sm-12" style={{ width: "100%" }}>
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={jam} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={jam} alt="Second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={jam} alt="Third slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={jam} alt="Fourth slide" />
              </Carousel.Item>
            </Carousel>

            <div className="product-description">
              <div className="card">
                <span style={{ fontWeight: "bold" }}>Deskripsi</span>
                <br></br>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  <br></br>
                  <br></br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 sm-12" style={{ width: "100%" }}>
            <div className="about-product">
              <div className="card">
                <span style={{ fontWeight: "bold" }}>Jam Tangan Casio</span>
                <span style={{ fontSize: "12px", color: "#8A8A8A", marginTop: "5px" }}>Aksesoris</span>
                <span style={{ fontSize: "16px", marginTop: "10px" }}>Rp 250.000</span>
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
