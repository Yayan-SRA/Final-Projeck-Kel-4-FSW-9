import { BrowserRouter, Routes, Route } from "react-router-dom";
import DaftarJual from "./page/DaftarJual";
import Home from "./page/Home";
import InfoProduk from "./page/InfoProduk";
import InfoProfil from "./page/InfoProfil";
import Konfirmasi from "./page/Konfirmasi";
import Login from './page/Login';
import Masuk from "./page/Masuk";
import Preview from "./page/Preview";
import PreviewProduk from "./page/PreviewProduk";
import Register from "./page/Register";
import UpdateProduk from "./page/UpdateProduk";
import InfoPenawaran from "./page/InfoPenawaran";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Masuk />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="konfirmasi/:email" element={<Konfirmasi />} />
        <Route path="home" element={<Home />} />
        <Route path="infoprofil" element={<InfoProfil />} />
        <Route path="infoproduk" element={<InfoProduk />} />
        <Route path="daftarjual" element={<DaftarJual />} />
        <Route path="preview" element={<Preview />} />
        <Route path="preview/produk/:id" element={<PreviewProduk />} />
        <Route path="update/produk/:id" element={<UpdateProduk />} />
        <Route path="penawaran" element={<InfoPenawaran />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
