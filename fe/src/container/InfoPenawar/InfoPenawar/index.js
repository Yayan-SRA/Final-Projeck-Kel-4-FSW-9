import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Navbar3 from "../../components/navbar/Navbar3";

import arrow from "../../images/fi_arrow-left.png";
import buyer from "../../images/pr.svg";
import jam from "../../images/jam-tangan3.png";
import wa from "../../images/fi_whatsapp.svg";
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ModalTerima(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
          Yeay kamu berhasil mendapat harga yang sesuai
        </span>
        <p
          style={{
            marginTop: "14px",
            textAlign: "justify",
            fontSize: "12px",
            color: "#8a8a8a",
          }}
        >
          Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya!!!
        </p>
      </Modal.Title>
      <Modal.Body>
        <div className="about-bargain">
          <div className="row">
            <div className="card">
              <span
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                Product Match
              </span>
              <div className="info-buyer">
                <div>
                  <div className="card">
                    <img src={buyer} alt="buyer" width="48px" height="48px" />
                    <div className="card-body">
                      <span className="card-title">Nama Pembeli</span>
                      <p className="card-text">Kota</p>
                    </div>
                  </div>

                  <div className="info-product">
                    <div className="card">
                      <img src={jam} alt="buyer" width="48px" height="48px" />
                      <div className="card-body">
                        <p className="card-text">
                          {props.data != undefined && props.data.nama_produk}
                          <br />
                          <s>{props.data != undefined && props.data.harga}</s>
                          <br />
                          Ditawar Rp 200.000
                        </p>
                      </div>
                    </div>
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
  const [modalTerima, setModalTerima] = useState(false);
  const [user, SetUser] = useState("");
  const [produk, setProduk] = useState([]);
  const [harga, setHarga] = useState([]);
  const [deskripsi, SetDeskripsi] = useState([]);
  const [produkIndex, setProdukIndex] = useState(0);
  const [foto, SetFoto] = useState("");

  const  now = new Date().toLocaleTimeString();
console.log(now)

  const getProduct = () => {
    axios
      .get(`http://localhost:8000/v1/produk/${1}`, {
        params: {
          user: 1,
          produk: produk,
          harga: harga,
          deskripsi: deskripsi,
          foto: foto,
        },
      })
      .then((response) => {
        setProduk(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

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
            <div
              className="container"
              style={{ padding: "96px", width: "70%" }}
            >
              {produk.map((data, index) => {
                return (
                  <>
                    <div>
                      <div className="container" style={{ width: "90%" }}>
                        <div className="about-buyer">
                          <div className="card">
                            <img
                              src={buyer}
                              alt="buyer"
                              width="48px"
                              height="48px"
                            />
                            <div className="card-body">
                              <span className="card-title">Nama Penawar</span>
                              <p className="card-text">Kota</p>
                            </div>
                          </div>
                        </div>
                        <div className="bargained-product">
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            Daftar Produkmu yang Ditawar
                          </span>
                          <div className="card">
                            <img
                              src={data.foto}
                              alt="product"
                              width="30px"
                              height="108px"
                            />
                            <div className="card-body">
                              <span className="card-title">
                                Penawaran Produk
                              </span>
                              <span className="card-time">{now}</span>
                              <p className="card-text">
                                {data.nama_produk}
                                <br></br> {data.harga}
                                <br></br> <br></br> {data.deskripsi}{" "}
                              </p>
                            </div>
                          </div>
                          <button
                            className="btn-acc"
                            onClick={(e) => {
                              setModalTerima(true);
                              setProdukIndex(index);
                            }}
                          >
                            Terima
                          </button>
                          <button className="btn-decline">Tolak</button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <div>
                <ModalTerima
                  data={produk[produkIndex]}
                  show={modalTerima}
                  onHide={() => setModalTerima(false)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
