import React from "react";
// // import Carousel from "../../components/Carousel";
// import Kategori from "../../components/Kategori";
// import NavbarMain2 from "../../components/Navbar/NavbarMain2";

import { Carousel } from "../../section";
import { Navbar } from "../../section";
import { Kategori } from "../../section";
// import { Nav } from "../../section";
// import { ListProduct } from "../../components";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import jwt_decode from "jwt-decode";

export default function HomePage() {

  return (
    <div>
      <Navbar />
      {/* <Nav /> */}
      <Carousel />
      <Kategori />
      {/* <ListProduct/> */}
    </div>
  );
}
