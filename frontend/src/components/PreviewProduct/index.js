import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux/es/exports";
import axios from "axios"
import "./style.css";
import { addProduct } from '../../actions/productAction';
import { useNavigate, useParams, Link } from 'react-router-dom'
// import NavbarMain2 from "../../components/navbar/NavbarMain2";
// import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronCircleRight } from "react-icons/fa";

function  PreviewProduct () {
  const { previewProductResult, previewProductLoading, previewProductError } = useSelector((state) => state.product)
console.log("tes fungsi", previewProductResult)

const [file, setFile] = useState(previewProductResult.file);
const [id_penjual, SetId_penjual] = useState(previewProductResult.id_penjual)
const [id_kategori, SetId_kategori] = useState(previewProductResult.id_kategori)
const [nama_produk, SetNama_produk] = useState(previewProductResult.nama_produk)
const [harga, SetHarga] = useState(previewProductResult.harga)
const [stok, SetStok] = useState(previewProductResult.stok)
const [deskripsi, SetDeskripsi] = useState(previewProductResult.deskripsi)
const [foto, SetFoto] = useState(previewProductResult.foto)
const navigasi = useNavigate()
const [msg, setmsg] = useState("")

if(previewProductLoading == false){
  navigasi ("/home");
}
// console.log("tes fungsi", data.id_penjual)
// console.log("tes fungsi", data.deskripsi)
// console.log("tes fungsi", data.foto)

// const deskripsi = data.deskripsi;
const dispatchEvent = useDispatch();

const submit = async (event) => {
  event.preventDefault();
  const form = new FormData();

  form.append("image", file);
  console.log('yeay masuk sini')

  try {
    // if (user.kota == null || user.alamat == null || user.nomor_hp == null || user.image == null) {
    //   console.log("Lengkapi Profil Dulu!!")
    //   setmsg("Lengkapi Profil Dulu!!")
    //   SetLink(user.id)
    //   return
    // }

    if (file != null) {
      let response = await axios.post("http://localhost:8000/v1/Produk/add/image/cloudinary",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      );
      console.log('yeay masuk sini 3',)
      SetFoto(response.data.url)
      console.log("1. Masuk Handle Submit")
      dispatchEvent(addProduct({
          id_penjual:id_penjual,
          id_kategori:id_kategori,
          nama_produk:nama_produk,
          harga:harga,
          stok:stok,
          deskripsi:deskripsi,
          foto:response.data.url
      }))

      // console.log("mencoba", addProductResult)
  response = await axios.post("http://localhost:8000/v1/Produk/email")
  console.log(response.data);
  navigasi("/");
} else {

  dispatchEvent(addProduct({
    id_penjual:id_penjual,
    id_kategori:id_kategori,
    nama_produk:nama_produk,
    harga:harga,
    stok:stok,
    deskripsi:deskripsi,
    // foto:response.data.url
}))
  navigasi("/");
}
  } catch (error) {
    console.log(error);
    if (error.response) {
      setmsg(error.response.data.msg)
      console.log(error.response.data);
    }
  }
}

return(
<div>
      <div className="bagidua">
        <div className="bungkuskiri">
          <div className="wrapper-product2">
            <div className="img-product2">
              <img src={foto} alt="jam" />
              <FaChevronCircleRight className="icon-next-arrow" />
            </div>
            {/* <div className="arrow">
              <FaChevronCircleRight className="icons-next-arrow" />
            </div> */}
          </div>
          <div className="deskripsi">
            <h3>Deskripsi</h3>
            <p>
              loremewjbvjewbvjwnbaejvebjw
            </p>
          </div>
        </div>
        <div className="bungkuskanan">
          <div className="keterangan">
            <div className="text-keterangan">
              <h5>{nama_produk}</h5>
              <p>{id_kategori}</p>
              <h5>Rp {harga}</h5>
              <button onClick={(event)=>submit (event)} className="button-upload-produk">Terbitkan</button>
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
)
}

export default PreviewProduct