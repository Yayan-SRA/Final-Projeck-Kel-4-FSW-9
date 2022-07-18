import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios"
import arrow from "../../images/fi_arrow-left.png";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import { addProduct } from '../../actions/productAction';
// import { previewProduct } from '../PreviewProduct/index'
import { previewProduct } from '../../actions/productAction';
import "./style.css";
import {getKategori} from "../../actions/kategoriAction"
import { useDispatch, useSelector } from "react-redux/es/exports";

function AddProduct() {
  // console.log("tes", store)
    const [file, setFile] = useState(null);
    const [token, SetToken] = useState('');
    const [user, SetUser] = useState('');
    const [id_penjual, SetId_penjual] = useState("11")
    const [id_kategori, SetId_kategori] = useState("")
    const [nama_produk, SetNama_produk] = useState("")
    const [harga, SetHarga] = useState("")
    const [stok, SetStok] = useState("")
    const [deskripsi, SetDeskripsi] = useState("")
    const [foto, SetFoto] = useState("")
    const [msg, setmsg] = useState("")
    const navigasi = useNavigate()
    const [link, SetLink] = useState("")
    const [kate, SetKate] = useState([])

    const { getKategoriResult, getKategoriLoading, getKategoriError } = useSelector((state) => state.kategori)
    const { addProductResult, addProductLoading, addProductError } = useSelector((state) => state.product)
    
    const dispatchEvent = useDispatch();
    useEffect(() => {
        // console.log("1. use effect component did mount");
        dispatchEvent(getKategori())
    }, [dispatchEvent])

    const handleSubmit = async (event) => {
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

            console.log("mencoba", addProductResult)
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
      const handlePreview = async (event) => {
        event.preventDefault();
        console.log("berhasil masuk")
        try {
          console.log("sini juga")
          dispatchEvent(previewProduct({
            id_penjual:id_penjual,
            id_kategori:id_kategori,
            nama_produk:nama_produk,
            harga:harga,
            stok:stok,
            deskripsi:deskripsi,
            file:file,
            foto:foto
        }))
        await navigasi("/preview")
        } catch (error) {
          console.log(error)
          // if(error.response){
          //   setmsg(error.response.data.msg)
          //   console.log(error.response.data.msg)
          // }
        }
      }
    async function uploadFoto(e) {
        let uploaded = e.target.files[0];
        // A.push(uploaded)
        SetFoto(URL.createObjectURL(uploaded));
        setFile(uploaded);
        // console.log(uploaded);
        // console.log(e.target.files[0]);
      }
  return (
    <section>
      <div className="back-arrow2">
        <img src={arrow} width="100%" alt="" />
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-produk">
          <div className="formulir-info-produk">
            {/* <h3 className="text-center">{msg}</h3> */}
            <h4 className='text-center'>
              {msg}<span style={{ display: "block" }} className='mx-1'>
                {link == "" ? "" : <Link style={{ textDecoration: "none" }} to={`/update/${link}`}>Lengkapi</Link>}
              </span>
            </h4>
            <label className="label-info-produk">Nama Produk</label>
            <input type="text" className="input-text-produk" value={nama_produk} onChange={(event) => SetNama_produk(event.target.value)} />
            <label className="label-info-produk">Harga Produk</label>
            <input type="text" className="input-text-produk" value={harga} onChange={(event) => SetHarga(event.target.value)} />
            <label className="label-info-produk">Stok Produk</label>
            <input type="text" className="input-text-produk" value={stok} onChange={(event) => SetStok(event.target.value)} />
            <label className="label-info-produk">Kategori</label>
            <select className="input-text-produk" aria-label="Pilih Kategori" value={id_kategori} onChange={(event) => SetId_kategori(event.target.value)}>
              {/* <option selected>Pilih Kota</option> */}
              {getKategoriResult ? (
                getKategoriResult.map((kategori) => (
                    // console.log(Kategori.nama_produk)
                        
                    <option key={kategori.id} value={kategori.id}>{kategori.macam}</option>
                        
                ))
            ) : getKategoriLoading ? (
                <p>loading...</p>
            ) : (
                <p>{getKategoriError ? getKategoriError : "Data Kosong"}</p>
            )

            }
              
              
            </select>
            <label className="label-info-produk-alamat">Deskripsi</label>
            <textarea className="input-text-produk form-control" rows="3" placeholder="Contoh: barang tahan air" value={deskripsi} onChange={(event) => SetDeskripsi(event.target.value)}></textarea>
            <label className="label-info-produk">Foto Produk</label>
              {/* <input type="text" className="input-text-produk" value={foto} onChange={(event)=>SetFoto(event.target.value)} /> */}
              
              
              {foto ? (
                        <img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={foto} /> 
                    ) : (<div className="fotoProduk"><FiPlus className="plus-icon" />
                    </div>)}
              {/* <img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={foto} />
              <br /><br /> */}
              <input className="upfoto" type="file" required  onChange={uploadFoto}/>
            
            <div className="button">
              {/* <p>{deskripsi}</p> */}
              <button onClick={(event) => handlePreview(event)} className="button-preview-produk">Preview</button>
            </div>
            <button type="submit" className="button-simpan-produk">Terbitkan</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default AddProduct