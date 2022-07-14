import Navbar from "../../components/navbar/Navbar";
import "./style.css";
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import arrow from "../../images/fi_arrow-left.png";
import gambar from "../../images/gambar1.svg";
import jamtangan from "../../images/jamtangan.svg";
// import NavbarMain from '../../components/navbar/NavbarMain'
import { FiPlus } from "react-icons/fi";
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function InfoPenawaran() {
  // const [id_penjual, SetId_penjual] = useState("1");
  // const [nama_produk, SetNama_produk] = useState("");
  // const [harga, SetHarga] = useState("");
  // const [stok, SetStok] = useState("");
  // const [deskripsi, SetDeskripsi] = useState("");
  // const [foto, SetFoto] = useState("");
  // const navigasi = useNavigate();

  // const getProduct = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let post = await axios.get("http://localhost:8000/v1/Produk", {
  //       id_penjual,
  //       nama_produk,
  //       harga,
  //       stok,
  //       deskripsi,
  //       foto,
  //     });
  //     let put = await axios.put("http://localhost:8000/v1/Produk", {
  //       id_penjual,
  //       nama_produk,
  //       harga,
  //       stok,
  //       deskripsi,
  //       foto,
  //     });
  //     navigasi("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <section id="header">
        <header>
          <div className="logo"></div>
          <div className="judul">
            <p>Info Penawar</p>
          </div>
        </header>

        <div className="back-arrow2">
          <img src={arrow} width="100%" alt="" />
        </div>
      </section>

      <section id="card">
        <div className="container">
          {/* <i className="bi bi-arrow-left-short"></i> */}
          <div className="box">
            <div className="profil">
              <div className="foto-profil">
                <img src={gambar} />
              </div>
              <div className="nama-profil">
                <p>Nama Pembeli</p>
                <p>Kota</p>
              </div>
            </div>
            <div className="data">
              <div className="judul-data">
                <p>Daftar Produkmu yang Ditawar</p>
              </div>
              <div className="detail-data">
                <div className="foto">
                  <img src={jamtangan} />
                </div>
                <div className="info">
                  <p>Penawaran Produk</p>
                  <p>Jam Tangan Casio</p>
                  <p>Rp 250.000</p>
                  <p>Ditawar Rp 200.000</p>
                </div>
                <div className="date">
                  <p>20 apr, 14:04</p>
                </div>
              </div>
              <div className="btn">
                <button>Status</button>
                <button className="btn-hubungi" data-bs-toggle="modal" data-bs-target="#exampleModal"> Terima </button>

                {/* <i className="bi bi-whatsapp"></i> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="container-status">
        <div className="kotak">
          <form action={getProduct} method="POST">
            <div className="close">
              <span></span>
              <span></span>
            </div>
            <h3>Perbarui status penjualan produkmu</h3>
            <input
              type="radio"
              name="modal_status"
              value="pil1"
              className="mod-stat"
            />
            <input
              type="text"
              className="input-text-produk"
              value={nama_produk}
              onChange={(e) => SetNama_produk(e.target.value)}
            />
            <label className="label-info-produk">Harga Produk</label>
            <input
              type="text"
              className="input-text-produk"
              value={harga}
              onChange={(e) => SetHarga(e.target.value)}
            />
            <label className="label-info-produk">Stok Produk</label>
            <input
              type="text"
              className="input-text-produk"
              value={stok}
              onChange={(e) => SetStok(e.target.value)}
            />
            Berhasil terjual
            <br />
            <p>
              Kamu telah sepakat menjual produk <br />
              ini kepada pembeli
            </p>
            <input
              type="radio"
              name="modal_status"
              value="pil2"
              className="mod-stat"
              disabled="disabled"
            />
            Batalkan transaksi
            <br />
            <p>
              Kamu membatalkan transaksi
              <br />
              produk ini dengan pembeli
            </p>
          </form>
          <button className="btn-kirim">Kirim</button>
        </div>
      </div> */}

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div className="">
              <div className="yeay-berhasil">
                <p> Yeay kamu berhasil mendapat harga yang sesuai</p>

                <p>
                  Segera hubungi pembeli melalui whatsapp untuk transaksi
                  selanjutnya
                </p>
              </div>


              <div> 
                
              <div className="profil-penawaran">
                
                <div className="foto-profil">
                  
                  <img src={gambar} />
                </div>

                <div className="nama-profilpenawaran">
                <p> Product match</p>
                <p>Nama Pembeli</p>
                <p>Kota</p>
              </div>

              
              </div>
              
              </div>
              
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-hubungiwa">Hubungi via whatsapp</button>
            </div>
          </div>
        </div>
</div>
    </>

    
  );
}
