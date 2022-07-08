import React from "react";
import "./NavbarMainStyles.css";
import { loginIcon } from "../../images/fi_log-in.svg";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NavbarMain() {
  return (
      <div className="navbar-main-style">
        <div className="logo-navbar" />
        <div className="search">
          <input type="text" placeholder="Cari di sini ..." name="search"></input>
          <img className="search-icon" src={require("../../images/fi_search.png")} />
        </div>
        <Link to="/login">
          <button className="masuk">
            <FiLogIn className="login-icon" />
            <a>Masuk</a>
          </button>
        </Link>
      </div>
  );
}
