import React from "react";
import "./style.css";
import NavbarMain2 from "../../components/navbar/NavbarMain2";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronCircleRight } from "react-icons/fa";

export default function SellerHalamanProduk() {
  return (
    <div>
      <NavbarMain2 />
      <div className="bagidua">
        <div className="bungkuskiri">
          <div className="wrapper-product2">
            <div className="img-product2">
              <img src={require("../../images/jam-tangan3.png")} alt="jam" />
              <FaChevronCircleRight className="icon-next-arrow" />
            </div>
            {/* <div className="arrow">
              <FaChevronCircleRight className="icons-next-arrow" />
            </div> */}
          </div>
          <div className="deskripsi">
            <h3>Deskripsi</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="bungkuskanan">
          <div className="keterangan">
            <div className="text-keterangan">
              <h5>Jam Tangan Casio</h5>
              <p>Aksesoris</p>
              <h5>Rp 250.000</h5>
              <button className="button-upload-produk">Terbitkan</button>
              <button className="button-edit-produk">Edit</button>
            </div>
          </div>
          <div className="seller">
            <div className="img-seller">
              <img src={require("../../images/seller.png")} alt="jam" />
            </div>
            <div className="nama-seller">
              <h6>Nama Penjual</h6>
              <p>Kota</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
