import React from "react";
import NavbarMain from "../../components/navbar/NavbarMain";
import "./styles.css";
import { FiBox, FiPlus } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import Card from "../../components/card/Index";
import NavbarMain2 from "../../components/navbar/NavbarMain2";

export default function SellerDaftarJual() {
  return (
    <div>
      {/* ------Navbar------ */}
      <NavbarMain2 />
      {/* --------content-------- */}
      <div className="seller-container">
        <p className="text-daftar">Daftar Jual Saya</p>
        {/* --------seller profile-------- */}
        <div className="seller-profile-wrapper">
          <div className="seller-image">
            <img src={require("../../images/seller.png")} alt="profile" />
          </div>
          <div className="content-profile">
            <div className="text-profile">
              <div className="name-profile">Nama Penjual</div>
              <div className="city-profile">Kota</div>
            </div>
            <button className="edit-profile">Edit</button>
          </div>
        </div>
        {/* -------end seller profile------- */}
        {/* -------kategori------- */}
        <div className="kategori-wrapper">
          <p>Kategori</p>
          <div className="kategori-option">
            <div className="icon-text-option">
              <FiBox className="icon-box-profile" />
              <p>Semua Produk</p>
            </div>
            <FiChevronRight className="icon-box-chevron" />
          </div>
          <div className="kategori-option">
            <div className="icon-text-option">
              <FiHeart className="icon-box-profile" />
              <p>Diminati</p>
            </div>
            <FiChevronRight className="icon-box-chevron" />
          </div>
          <div className="kategori-option-last">
            <div className="icon-text-option">
              <FiDollarSign className="icon-box-profile" />
              <p>Terjual</p>
            </div>
            <FiChevronRight className="icon-box-chevron" />
          </div>
        </div>
        {/* -------end kategori------- */}
        <div className="row">
          <div className="cardDaftarJual-wrapper">
            <div className="card-product">
              <div className="card-style">
                <div className="add-card">
                  <div className="add-card-wrapper">
                    <div className="add-card-img-product">
                      <FiPlus className="icon-plus" />
                    </div>
                    <p className="add-product">Tambah Produk</p>
                  </div>
                </div>
                <Card />
                <Card />
              </div>
              <div className="card-style">
                <Card />
                <Card />
                <Card />
              </div>
              <div className="card-style">
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------end content------- */}
    </div>
  );
}
