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

export default function HalamanProduk() {
  // const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <NavbarMain2 />
      <div className="seller-halaman-produk">
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

            <div className="deskripsi-produk">
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
            <div className="tentang-produk">
              <div className="card">
                <span style={{ fontWeight: "bold" }}>Jam Tangan Casio</span>
                <span style={{ fontSize: "12px", color: "#8A8A8A", marginTop: "5px" }}>Aksesoris</span>
                <span style={{ fontSize: "16px" }}>Rp 250.000</span>
                {/* <p>Rp 250.000</p> */}
                <button className="btn-publish-seller">Terbitkan</button>
                <Link to="/edit-product">
                  <button className="btn-edit-seller">Edit</button>
                </Link>
              </div>
            </div>
            <div className="tentang-seller">
              <div className="card">
                <img src={seller} alt="seller" width="48px" height="48px" />
                <div className="card-body">
                  <span className="card-title">Nama Penjual</span>
                  <p className="card-text">Kota</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
