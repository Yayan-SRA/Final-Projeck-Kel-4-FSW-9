
import Navbar from "../../components/navbar/Navbar";
import "./style.css";
import arrow from "../../images/fi_arrow-left.png";
import React, { useState, useEffect, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate, useParams, Link } from 'react-router-dom'
// import NavbarMain from '../../components/navbar/NavbarMain'
import { FiPlus } from "react-icons/fi";
import { Next } from "react-bootstrap/esm/PageItem";


const InfoProfil = () => {

  const [file, setFile] = useState(null);
  const [token, SetToken] = useState('');
  const [user, SetUser] = useState('');
  const [id_penjual, SetId_penjual] = useState("0")
  const [id_kategori, SetId_kategori] = useState("")
  const [nama_produk, SetNama_produk] = useState("")
  const [harga, SetHarga] = useState("")
  const [stok, SetStok] = useState("")
  const [deskripsi, SetDeskripsi] = useState("")
  const [foto, SetFoto] = useState("")
  const [msg, setmsg] = useState("")
  const navigasi = useNavigate()
  const [link, SetLink] = useState("")

  async function uploadFoto(e) {
    let uploaded = e.target.files[0];
    // A.push(uploaded)
    SetFoto(URL.createObjectURL(uploaded));
    setFile(uploaded);
    // console.log(uploaded);
    // console.log(e.target.files[0]);
  }

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = async () => {
    // let response = await axios.get("http://localhost:8000/token", {
    //     withCredentials: "true"
    // })
    // if (!response) {
    //     navigasi("/")
    //     return
    // }
    // response = await fetch(`http://localhost:8000/user/${id}`)
    // const data = await response.json()
    // SetUser(data)
    try {
      let response = await axios.get("http://localhost:8000/token", {
        withCredentials: true
      })
      SetToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      response = await fetch(`http://localhost:8000/user/${decoded.id}`)
      console.log('data2', response)
      
      const data = await response.json()
      console.log('data', data)
      SetUser(data)
      // console.log('setuser', SetUser(data))
    } catch (error) {
      navigasi("/")
    }
  }

  const addProduct = async (e) => {
    e.preventDefault();
    // let response = await axios.get('http://localhost:8000/token', {
    //   withCredentials: true,
    // });

    // SetToken(response.data.accessToken);
    // const decoded = jwt_decode(response.data.accessToken);
    // response = await axios.get('http://localhost:8000/user', {
    //   headers: {
    //     Authorization: `Bearer ${response.data.accessToken}`,
    //   },
    //   withCredentials: true,
    // });
    // if (response.data.verifikasi != '1') {
    //   await axios.delete('http://localhost:8000/logout', {
    //     withCredentials: true,
    //   });
    //   navigasi('/');
    //   return;
    // }

    // response = await fetch(`http://localhost:8000/usernama/${decoded.email}`);
    // const data = await response.json();
    // console.log(data);
    // SetId_penjual(data.id)
    // console.log(data.id);
    const form = new FormData();

    form.append("image", file);
    console.log('yeay masuk sini')

    try {
      if (user.kota == null || user.alamat == null || user.nomor_hp == null || user.image == null) {
        console.log("Lengkapi Profil Dulu!!")
        setmsg("Lengkapi Profil Dulu!!")
        SetLink(user.id)
        return
      }

      if (file != null) {
        let response = await axios.post("http://localhost:8000/v1/Produk/add/image/cloudinary",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }

        );
        console.log('yeay masuk sini 2')
        console.log('yeay masuk sini 3',)
        SetFoto(response.data.url)
        console.log("fdfsdf");
        response = await axios.post("http://localhost:8000/v1/Produk/add", {
          id_penjual: user.id,
          id_kategori: id_kategori,
          nama_produk: nama_produk,
          harga: harga,
          stok: stok,
          deskripsi: deskripsi,
          foto: response.data.url
        })
        console.log(response.data);
        response = await axios.post("http://localhost:8000/v1/Produk/email")
        console.log(response.data);
        navigasi("/");
      } else {

        await axios.post("http://localhost:8000/v1/Produk/add", {
          id_penjual: id_penjual,
          id_kategori: id_kategori,
          nama_produk: nama_produk,
          harga: harga,
          stok: stok,
          deskripsi: deskripsi,
          // foto:response.data.url
        })
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




  return (
    <div>
      <Navbar />
      <div className="back-arrow2">
        <img src={arrow} width="100%" alt="" />
      </div>
      <form onSubmit={addProduct}>
        <div className="form-produk">
          <div className="formulir-info-produk">
            {/* <h3 className="text-center">{msg}</h3> */}
            <h4 className='text-center'>
              {msg}<span style={{ display: "block" }} className='mx-1'>
                {link == "" ? "" : <Link style={{ textDecoration: "none" }} to={`/update/${link}`}>Lengkapi</Link>}
              </span>
            </h4>
            <label className="label-info-produk">Nama Produk</label>
            <input type="text" className="input-text-produk" value={nama_produk} onChange={(e) => SetNama_produk(e.target.value)} />
            <label className="label-info-produk">Harga Produk</label>
            <input type="text" className="input-text-produk" value={harga} onChange={(e) => SetHarga(e.target.value)} />
            <label className="label-info-produk">Stok Produk</label>
            <input type="text" className="input-text-produk" value={stok} onChange={(e) => SetStok(e.target.value)} />
            <label className="label-info-produk">Kategori</label>
            <select className="input-text-produk" aria-label="Pilih Kategori" value={id_kategori} onChange={(e) => SetId_kategori(e.target.value)}>
              <option selected>Pilih Kota</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label className="label-info-produk-alamat">Deskripsi</label>
            <textarea className="input-text-produk form-control" rows="3" placeholder="Contoh: barang tahan air" value={deskripsi} onChange={(e) => SetDeskripsi(e.target.value)}></textarea>
            <label className="label-info-produk">Foto Produk</label>
              {/* <input type="text" className="input-text-produk" value={foto} onChange={(e)=>SetFoto(e.target.value)} /> */}
              
              
              {foto ? (
                        <img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={foto} /> 
                    ) : (<div className="fotoProduk"><FiPlus className="plus-icon" />
                    </div>)}
              {/* <img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={foto} /> */}
              {/* <br /><br /> */}
              <input className="upfoto" type="file" required onChange={uploadFoto} />
            
            <div className="button">
              <button className="button-preview-produk">Preview</button>
            </div>
            <button type="submit" className="button-simpan-produk">Terbitkan</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default InfoProfil;


