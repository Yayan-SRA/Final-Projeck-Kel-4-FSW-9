import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import arrow from "../../images/fi_arrow-left.png";
// import NavbarMain from '../../components/navbar/NavbarMain'
import { FiPlus } from "react-icons/fi";

export default function InfoProfil() {
  return (
    <>
      <section id="header">
        <header>
          <div className="logo"></div>
          <div className="judul">
            <p>Info Penawar</p>
          </div>
        </header>
      </section>

      <section id="card">
        <div className="alert">
          <p>
            Status produk berhasil diperbarui<i className="bi bi-x"></i>
          </p>
        </div>
        <div className="container">
          <i className="bi bi-arrow-left-short"></i>
          <div className="box">
            <div className="profil">
              <div className="foto-profil">
                <img src="img/pr.svg" />
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
                  <img src="img/data.svg" />
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
                <button className="btn-hubungi">
                  Hubungi di <i className="bi bi-whatsapp"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="data">
              <div className="detail-data">
                <div className="foto">
                  <img src="img/2.svg" />
                </div>
                <div className="info">
                  <p>Penawaran Produk</p>
                  <p>Smartwatch Samsung Galaxy Pro S...</p>
                  <p>Rp 3.550.000</p>
                  <p>
                    <del>Ditawar Rp 2.000.000</del>
                  </p>
                </div>
                <div className="date">
                  <p>1 apr, 09:08</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-status">
        <div className="kotak">
          <form action="">
            <div className="close">
              <span></span>
              <span></span>
            </div>
            <h3>Perbarui status penjualan produkmu</h3>
            <input type="radio" name="modal_status" value="pil1" className="mod-stat" />
            Berhasil terjual
            <br />
            <p>
              Kamu telah sepakat menjual produk <br />
              ini kepada pembeli
            </p>
            <input type="radio" name="modal_status" value="pil2" className="mod-stat" disabled="disabled" />
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
      </div>
    </>
  );
}
