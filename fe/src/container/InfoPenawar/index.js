import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar3 from "../../components/navbar/Navbar3";

import arrow from "../../images/fi_arrow-left.png";
import buyer from "../../images/pr.svg";
import jam from "../../images/jam-tangan3.png";
import wa from "../../images/fi_whatsapp.svg";

function ModalTerima(props) {
  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>Yeay kamu berhasil mendapat harga yang sesuai</span>
          <p style={{ marginTop: "14px", textAlign: "justify", fontSize: "12px", color: "#8a8a8a" }}>Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="about-bargain">
          <div className="row">
            <div className="card">
              <span style={{ fontWeight: "bold", textAlign: "center", fontSize: "14px" }}>Product Match</span>
              <div className="info-buyer">
                <div className="card">
                  <img src={buyer} alt="buyer" width="48px" height="48px" />
                  <div className="card-body">
                    <span className="card-title">Nama Pembeli</span>
                    <p className="card-text">Kota</p>
                  </div>
                </div>
              </div>
              <div className="info-product">
                <div className="card">
                  <img src={jam} alt="buyer" width="48px" height="48px" />
                  <div className="card-body">
                    <p className="card-text">
                      Jam Tangan Casio
                      <br />
                      <s>Rp 250.000</s>
                      <br />
                      Ditawar Rp 200.000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/penawar">
              <button className="wa-btn">
                <div className="text-wa">
                  Hubungi via Whatsapp
                  <img src={wa} alt="wa" />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
    </Modal>
  );
}

export default function InfoPenawar() {
  const [modalTerima, setModalTerima] = React.useState(false);

  return (
    <>
      <div>
        <Navbar3 />
        <div>
          <a href="/home">
            {" "}
            {/* <img src={arrow} alt="" /> */}
            <div className="back-arrow3">
              <img src={arrow} width="100%" alt="" />
            </div>
          </a>
          <section>
            <div className="container" style={{ padding: "96px", width: "70%" }}>
              <div className="container" style={{ width: "90%" }}>
                <div className="about-buyer">
                  <div className="card">
                    <img src={buyer} alt="buyer" width="48px" height="48px" />
                    <div className="card-body">
                      <span className="card-title">Nama Penawar</span>
                      <p className="card-text">Kota</p>
                    </div>
                  </div>
                </div>
                <div className="bargained-product">
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>Daftar Produkmu yang Ditawar</span>
                  <div className="card">
                    <img src={jam} alt="product" width="48px" height="48px" />
                    <div className="card-body">
                      <span className="card-title">Penawaran Produk</span>
                      <span className="card-time">20 Apr, 14:04</span>
                      <p className="card-text">
                        Jam Tangan Casio
                        <br></br>Rp 250.000
                        <br></br>Ditawar Rp 200.000
                      </p>
                    </div>
                  </div>
                  <button className="btn-acc" onClick={() => setModalTerima(true)}>
                    Terima
                  </button>
                  <button className="btn-decline">Tolak</button>
                </div>
                <div>
                  <ModalTerima show={modalTerima} onHide={() => setModalTerima(false)} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
