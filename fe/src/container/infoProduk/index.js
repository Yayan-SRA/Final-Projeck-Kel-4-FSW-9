
import Navbar from "../../components/navbar/Navbar";
import "./style.css";
import arrow from "../../images/fi_arrow-left.png";
import React, { useState, useEffect, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'
// import NavbarMain from '../../components/navbar/NavbarMain'
import { FiPlus } from "react-icons/fi";
import { Next } from "react-bootstrap/esm/PageItem";

const InfoProfil = () => {

  
//   const [fileInputState, setFileInputState] = useState('');
//   const [foto,SetFoto]=useState("")
//   const [previewSource, setPreviewSource] = useState('');
//   const [selectedFile, setSelectedFile] = useState();
//   const [successMsg, setSuccessMsg] = useState('');
//   const [errMsg, setErrMsg] = useState('');
//   const handleFileInputChange = (e) => {
//       const file = e.target.files[0];
//       SetFoto(URL.createObjectURL(file));
//       // setFileInputState(file);
//       console.log('ini upload',file);
//       console.log('ini target',e.target.files[0]);
//       previewFile(file);
//       setSelectedFile(file);
//       setFileInputState(e.target.value);
//   };

//   const previewFile = (file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//           setPreviewSource(reader.result);
//       };
//   };

//   const handleSubmitFile = (e) => {
//       e.preventDefault();
      
//       if (!selectedFile) return;
//       const reader = new FileReader();
//       console.log('ini reader',reader)
//       const selfil = reader.readAsDataURL(selectedFile);
//       console.log('ini selfil',selfil)
//       reader.onloadend = () => {
//         uploadImage(reader.result);
//       };
//       // console.log('ini onlod',onlod)

//       reader.onerror = () => {
//           console.error('Error!!');
//           setErrMsg('something went wrong!');
//       };
//   };

//   const uploadImage = async (base64EncodedImage) => {

//     try {
//         const coba = await fetch('http://localhost:8000/api/upload', {
//             method: 'POST',
//             body: JSON.stringify({ data: base64EncodedImage }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//         setFileInputState('');
//         setPreviewSource('');
//         setSuccessMsg('Image uploaded successfully');

//         console.log("ini coba", coba)
//         // console.log("ini form", form)
//     } catch (err) {
//         console.error(err);
//         setErrMsg('Something went wrong!');
//     }

// };
// return (
//     <div>
//         <h1 className="title">Upload an Image</h1>
//         {/* <Alert msg={errMsg} type="danger" />
//         <Alert msg={successMsg} type="success" /> */}
//         <form onSubmit={handleSubmitFile} className="form">
//             <input
//                 id="fileInput"
//                 type="file"
//                 name="image"
//                 onChange={handleFileInputChange}
//                 value={fileInputState}
//                 className="form-input"
//             />
//             <button className="btn" type="submit">
//                 Submit
//             </button>
//         </form>
//         {previewSource && (
//             <img
//                 src={previewSource}
//                 alt="chosen"
//                 style={{ height: '300px' }}
//             />
//         )}
//     </div>
// );


  const [file, setFile] = useState(null);

const [id_penjual,SetId_penjual]=useState("1")
const [id_kategori,SetId_kategori]=useState("")
const [nama_produk,SetNama_produk]=useState("")
const [harga,SetHarga]=useState("")
const [stok,SetStok]=useState("")
const [deskripsi,SetDeskripsi]=useState("")
const [foto,SetFoto]=useState("")
const [msg,setmsg]=useState("")
const navigasi = useNavigate()

async function uploadFoto(e) {
  let uploaded = e.target.files[0];
  // A.push(uploaded)
  SetFoto(URL.createObjectURL(uploaded));
  setFile(uploaded);
  // console.log(uploaded);
  // console.log(e.target.files[0]);
}

const addProduct = async(e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("image", file);
console.log('yeay masuk sini')
    try {
      if (file != null) {
                const response = await axios.post("http://localhost:8000/v1/Produk/add/image/cloudinary",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
                
            );
            console.log('yeay masuk sini 2') 
            console.log('yeay masuk sini 3', response) 
            SetFoto(response.data.url)
            await axios.post("http://localhost:8000/v1/Produk/add",{
              // id_penjual,
              // id_kategori,
              // nama_produk,
              // harga,
              // stok,
              // deskripsi,
              // foto,

            id_penjual:id_penjual,
            id_kategori:id_kategori,
            nama_produk:nama_produk,
            harga:harga,
            stok:stok,
            deskripsi:deskripsi,
            foto:response.data.url
        })
            navigasi("/");
      }else {
        await axios.post("http://localhost:8000/v1/Produk/add",{
              // id_penjual,
              // id_kategori,
              // nama_produk,
              // harga,
              // stok,
              // deskripsi,
              // foto,

            id_penjual:id_penjual,
            id_kategori:id_kategori,
            nama_produk:nama_produk,
            harga:harga,
            stok:stok,
            deskripsi:deskripsi,
            // foto:response.data.url
        })
            navigasi("/");
      }
    } catch (error) {
        console.log(error);
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
          <label className="label-info-produk">Nama Produk</label>
          <input type="text" className="input-text-produk" value={nama_produk} onChange={(e)=>SetNama_produk(e.target.value)} />
          <label className="label-info-produk">Harga Produk</label>
          <input type="text" className="input-text-produk" value={harga} onChange={(e)=>SetHarga(e.target.value)} />
          <label className="label-info-produk">Stok Produk</label>
          <input type="text" className="input-text-produk" value={stok} onChange={(e)=>SetStok(e.target.value)} />
          <label className="label-info-produk">Kategori</label>
          <select className="input-text-produk" aria-label="Pilih Kategori" value={id_kategori} onChange={(e)=>SetId_kategori(e.target.value)}>
            <option selected>Pilih Kota</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <label className="label-info-produk-alamat">Deskripsi</label>
          <textarea className="input-text-produk form-control" rows="3" placeholder="Contoh: barang tahan air" value={deskripsi} onChange={(e)=>SetDeskripsi(e.target.value)}></textarea>
          <label className="label-info-produk">Foto Produk</label>
          <div className="fotoProduk">
          {/* <input type="text" className="input-text-produk" value={foto} onChange={(e)=>SetFoto(e.target.value)} /> */}
            {/* <FiPlus className="plus-icon" /> */}
            <input type="file" onChange={uploadFoto}/>
            
                        <img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={foto} />
                    <br /><br />
          </div>
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
