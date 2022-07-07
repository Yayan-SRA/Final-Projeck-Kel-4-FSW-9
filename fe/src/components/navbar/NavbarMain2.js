import React from "react";
import "./NavbarMain2.css";
import { FiList } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NavbarMain2() {
  return (
    <>
      <div className="navbar-main-style">
        <div className="logo-navbar" />
        <div className="search">
          <input type="text" placeholder="Cari di sini ..." name="search"></input>
          <img className="search-icon" src={require("../../images/fi_search.png")} />
        </div>
        {/* <button className='masuk'>
          <FiLogIn className='login-icon'/>
          <a>Masuk</a>
        </button> */}
        <div className="icon-navbar">
          <Link to="/daftarjual">
            <FiList className="icon-navbar-wh" />
          </Link>
          <Link to="">
            <FiBell className="icon-navbar-wh" />
          </Link>
          <Link to="/infoprofil">
            <FiUser className="icon-navbar-wh" />
          </Link>
        </div>
      </div>
    </>
  );
}
