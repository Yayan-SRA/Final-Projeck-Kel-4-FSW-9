// import './App.css';
import {ListProduct} from "./components"
import {HomePage} from "./container"
import {HalAddProduct} from "./container"
import {HalLogin} from "./container"
import {HalProductBuyer} from "./container"
import {HalPreviewProduct} from "./container"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/addproduct" element={<HalAddProduct />} />
      <Route path="/login" element={<HalLogin />} />
      <Route path="/preview" element={<HalPreviewProduct />} />
      <Route path="/product/:id" element={<HalProductBuyer />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
