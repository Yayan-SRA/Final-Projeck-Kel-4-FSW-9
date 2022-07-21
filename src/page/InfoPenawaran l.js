// import "./styles/style.css";
import jwt_decode from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, Linking } from "react-router-dom";
import { BsListUl, BsPerson } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import Nav from "../components/Nav";
import { Button } from "react-bootstrap"
import style from "./styles/InfoPenawaran.module.css"
import { IoMdNotificationsOutline } from "react-icons/io"
import wa from "../image/camera.png";
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { View, StyleSheet, Linking} from 'react-native';

export default function InfoPenawaran() {
  const [token, SetToken] = useState('');
  const navigasi = useNavigate()
  const [kategori, setKategori] = useState([])
  const [modalTerima, setModalTerima] = useState(false);
  const [user, SetUser] = useState("");
  const [produk, setProduk] = useState([]);
  const [harga, setHarga] = useState([]);
  const [deskripsi, SetDeskripsi] = useState([]);
  const [produkIndex, setProdukIndex] = useState(0);
  const [tawar, setTawar] = useState("");
  const [nomor, setNomor] = useState("");
  const [id_penawaran, setId_penawaran] = useState("");
  const [coba, setCoba] = useState("");
//   const [penawaranmu, setPenawaranmu] = useState(false)

//   const  now = new Date().toLocaleTimeString();
// console.log(now)

useEffect(() => {
  fetchdata();
}, [])

const fetchdata = async () => {
  try {
    console.log("coba masuk")
      let response = await axios.get("http://localhost:8000/token", {
          withCredentials: true
      })
      SetToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      response = await fetch(`http://localhost:8000/user/${decoded.id}`)
      const data = await response.json()
      SetUser(data)
      response = await axios.get("http://localhost:8000/v1/Produk/add/form")
      setKategori(response.data)
      response = await axios.get(`http://localhost:8000/v1/penawaran/${decoded.id}`)
      setProduk(response.data)
      response = await axios.get(`http://localhost:8000/v1/penawaranBuyer/${decoded.id}`)
      setCoba(response.data)
      // console.log(response.data)
  } catch (error) {
      navigasi("/")
  }
}

console.log("apaya 2", user.id)
  // const getProduct = () => {
  //   let response = axios.get(`http://localhost:8000/v1/penawaran/2`)
  //   SetData(response.data)
  // };
  
//   console.log("tes respon", user.id)
//   console.log("tes respon 2", tawar)
  console.log("tes respon 3", produk)
//   console.log("tes respon 4", produk[0].id_status)
  console.log("tes respon 5", coba)
  console.log("tes respon 3", produk.length)
  // console.log("tes respon 4", tawar[0].Product.User.nama)
  // console.log("tes respon 3", tawar[0].penawaranHarga)
  // console.log("tes respon 4", tawar[0].Product.nama_produk)
  // useEffect(() => {
  //   getProduct();
  // }, []);
  // const navigasi = useNavigate()
// const negoisasi = () => {
//     window.location.replace(`https://wa.me/6287862477187`);
// }
const hubungi = async () => {
    console.log("tes", nomor)
    window.open(`https://wa.me/${nomor}`);
}
const negoisasi = async () => {
    console.log("tes", nomor)
    console.log("tes2", id_penawaran)
    try {
        let response = await axios.put(`http://localhost:8000/v1/penawaran/update/${id_penawaran}`, {
            id_status: "2",
        })
        console.log('uji',response.data)
    } catch (error) {
        
    }
    window.open(`https://wa.me/${nomor}`);
    window.location.reload();
}
  // if(nomor){
  //   if(msg){
  //   // Kode negara 62 = Indonesia
  //     let url = 'whatsapp://send?text=' + msg + '&phone=62' + nomor;
  //     Linking.openURL(url).then((data) => {
  //       console.log('WhatsApp Opened');
  //     }).catch(() => {
  //       alert('Make sure Whatsapp installed on your device');
  //     });
  //   }else{
  //     alert('Please insert message to send');
  //   }
  // }else{
  //   alert('Please insert mobile no');
  // }
// }

  const content1 = <div>
      <BsListUl onClick={() => navigasi("/daftarjual")} style={{ width: "47px", height: "25px", cursor: "pointer" }} />
      <IoMdNotificationsOutline style={{ width: "45px", height: "25px", cursor: "pointer" }} />
      <BsPerson style={{ width: "45px", height: "25px", cursor: "pointer" }} />
  </div >
  const content = <input style={{ borderRadius: "15px", background: '#EEEEEE' }} className="form-control me-2 mx-3" type="search" placeholder="Cari disini.." aria-label="Search"></input>
  const contentUser = <div
      style={{
          height: '34px',
          backgroundColor: '#4B1979',
          color: '#4B1979',
          marginTop: "12px"
      }}>
      Navbarsa
  </div>
  return (
    <>
    <Nav content={content} content1={content1} contentUser={contentUser} />
    <div className='container-fluid p-4'>
            {coba.length == 0 ?
        <div className='row justify-content-md-center g-1'>
            
        {produk.map((data, index) => {
          return (
            <div key={data.id} className='col-lg-6'>
            <div className={style.atas}>
                <div className={style.atas} style={{ display: "flex" }}>
                    <div>
                        {data.User.image === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.User.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                    </div>
                    <div>
                        <strong>{data.User.nama} (Pembeli)</strong><br />
                        <p>{data.User.kota}</p>
                        {/* {console.log(product.Kategori)} */}
                        {/* {console.log(kategori)} */}
                    </div>
                </div>
                <h6 className={style.kanan}><b>Daftar Produkmu yang Ditawar</b></h6>
                <div className={style.kanan} style={{ display: "flex" }}>
                <div>
                        {data.Product.foto === null ? <img src={wa} className="rounded-circle mx-2" width="150px" height="150px" alt="userimage" /> : <img src={data.Product.foto} className="rounded mx-1 my-1" width="150px" height="150px" alt="userimage" />}
                </div>
                <div>
                    <small>{data.Status.stat}</small><br />
                    <strong>{data.Product.nama_produk}</strong>
                    <small>(Kategori {data.Product.Kategori.macam})</small>
                    <p>Rp {data.Product.harga} x {data.jumlah} pcs</p>
                    <p>Rp {data.Product.harga * data.jumlah}</p>
                    <p>Ditawar Rp {data.penawaranHarga}</p>

                </div>
                </div>
                {data.id_status !== 3 ?
                    <div className='row justify-content-end'>
                        <div className='col-lg-3 col-3'>
                            <Button className="form-control mt-2"  style={{
                                background: '#FFFFFF',
                                color: '#151515',
                                borderColor: '#7126B5',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} data-bs-toggle="modal" data-bs-target="#status">
                                status
                            </Button>
                        </div>
                        <div className="modal fade" id="status" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <strong className='m-2'>Perbarui status penjualan produkmu</strong>
                                                <br/>
                                                {/* <form>
                                                <Form.Check className="form-check">
                                                <Form.Check.Input type="radio" className="form-check-input" id="radio1" name="optradio" value="option1" checked />Option 1
                                                <Form.Check.Label className="form-check-label" for="radio1"></Form.Check.Label>
                                                </Form.Check>
                                                <div className="form-check">
                                                <input type="radio" className="form-check-input" id="radio2" name="optradio" value="option2" />Option 2
                                                <label className="form-check-label" for="radio2"></label>
                                                </div>
                                                <div onChange={event => this.setGender(event)}>
                                                    <input type="radio" value="MALE" name="gender"/> Male
                                                    <input type="radio" value="FEMALE" name="gender"/> Female
                                                </div>

                                                <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label className="form-check-label" for="flexRadioDefault1">
                                                    Default radio
                                                </label>
                                                </div>
                                                <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                                <label className="form-check-label" for="flexRadioDefault2">
                                                    Default checked radio
                                                </label>
                                                </div>

                                                </form> */}
                                                    <div>
                                                        <div class="form-check">
                                                            <input
                                                            class="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault1"
                                                            />
                                                            <label class="form-check-label" for="flexRadioDefault1">
                                                            Default radio
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input
                                                            class="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault2"
                                                            checked
                                                            />
                                                            <label class="form-check-label" for="flexRadioDefault2">
                                                            Default checked radio
                                                            </label>
                                                        </div>
                                                        </div>
                                                <br/>
                                                <div className='row justify-content-center'>
                                                <div className='col-lg-12 col-12'>
                                                <Button type="button" onClick={hubungi
                                                 } className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}> 
                                                    Kirim
                                                </Button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        <div className='col-lg-3 col-3'>
                            <Button onClick={(e) => {
                            setNomor(data.User.nomor_hp)
                            }} className="form-control mt-2"  style={{
                                background: '#7126B5',
                                borderColor: '#7126B5',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} data-bs-toggle="modal" data-bs-target="#tes">
                                Hubungi di WA
                            </Button>
                        </div>
                        <div className="modal fade" id="tes" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            <h4 className="modal-title">Konfirmasi</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <strong className='m-2'>Hubungi sekarang ?</strong>
                                                <br/>
                                                <br/>
                                                <div className='row justify-content-end'>
                                                <div className='col-lg-3 col-3'>
                                                <Button type='button' data-bs-dismiss="modal" className="form-control mt-2"  style={{
                                                    background: '#FFFFFF',
                                                    color: '#151515',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    BATAL
                                                </Button>
                                                            </div>
                                                <div className='col-lg-3 col-3'>
                                                <Button type="button" onClick={hubungi
                                                 } className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}> 
                                                    IYA
                                                </Button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                            :
                            <div className='row justify-content-end'>
                        
                            <div className='col-lg-3 col-3'>
                                <Button className="form-control mt-2"  style={{
                                    background: '#FFFFFF',
                                    color: '#151515',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }}>
                                    Tolak
                                </Button>
                            </div>
                            <div className='col-lg-3 col-3'>
                                <Button className="form-control mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
                                    background: '#7126B5',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }}>
                                    Terima
                                </Button>
                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body m-4">
                                                <strong>Yeay kamu berhasil mendapat harga yang sesuai</strong>
                                                <p>Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</p>
                                                <div id={style.modal}>
                                                <div className='m-1' style={{ display: "flex" }}>
                                                    <div>
                                                        {data.User.image === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.User.image} className="rounded mx-2" width="60px" height="60px" alt="userimage" />}
                                                    </div>
                                                    <div className="">
                                                        <strong >{data.User.nama} (Pembeli)</strong>
                                                        <p>{data.User.kota}</p>
                                                    </div>
                                                </div>
                                                <div className='m-1' style={{ display: "flex" }}>
                                                    <div>
                                                        {data.Product.foto === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.Product.foto} className="rounded mx-2" width="60px" height="60px" alt="userimage" />}
                                                    </div>
                                                    <div>
                                                        <strong >{data.Product.nama_produk}</strong>
                                                        <p className={style.hargaAwal}>Rp {data.Product.harga * data.jumlah} </p>
                                                        <p className={style.harga}> Ditawar Rp {data.penawaranHarga}</p>
                                                        {/* <h6>Rp ({total})</h6> */}
                                                    </div>
                                                </div>
                                                </div>
                                                <Button type="button" onClick={(e) => {
                                                    setNomor(data.User.nomor_hp);
                                                    setId_penawaran(data.id);
                                                 }} className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }} data-bs-toggle="modal" data-bs-target="#coba"> 
                                                    Hubungi Via Whatsapp
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="coba" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            <h4 className="modal-title">Konfirmasi</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <strong className='m-2'>Apakah anda yakin ?</strong>
                                                <br/>
                                                <br/>
                                                <div className='row justify-content-end'>
                                                <div className='col-lg-3 col-3'>
                                                <Button type='button' data-bs-dismiss="modal" className="form-control mt-2"  style={{
                                                    background: '#FFFFFF',
                                                    color: '#151515',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    BATAL
                                                </Button>
                                                            </div>
                                                <div className='col-lg-3 col-3'>
                                                <Button type="button" onClick={negoisasi
                                                 } className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}> 
                                                    IYA
                                                </Button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Toaster
                                    containerStyle={{
                                        top: 230,
                                        left: 20,
                                        bottom: 20,
                                        right: 20,
                                    }}
                                />
                            </div>
                        </div>
                        }
            </div>
            </div>
          );
        })}
        </div>

             :

             <div>
            {produk.length !== 0 ? 
            <div className='row justify-content-center'>
            <div className='col-6'>
                <div className='row justify-content-md-center'>
                <div className={style.atas1}>
                <div className={style.bagian}>
                    <h3>Daftar Produkmu yang Ditawar</h3>
                    </div>
                {produk.map((data, index) => {
            return (
            <div key={data.id} className='col-12'>
            <div className={style.atas}>
                <div className={style.atas} style={{ display: "flex" }}>
                    <div>
                        {data.User.image === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.User.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                    </div>
                    <div>
                        <strong>{data.User.nama} (Pembeli)</strong><br />
                        <p>{data.User.kota}</p>
                        {/* {console.log(product.Kategori)} */}
                        {/* {console.log(kategori)} */}
                    </div>
                </div>
                <div className={style.kanan} style={{ display: "flex" }}>
                <div>
                        {data.Product.foto === null ? <img src={wa} className="rounded-circle mx-2" width="150px" height="150px" alt="userimage" /> : <img src={data.Product.foto} className="rounded mx-1 my-1" width="150px" height="150px" alt="userimage" />}
                </div>
                <div>
                    <small>{data.Status.stat}</small><br />
                    <strong>{data.Product.nama_produk}</strong>
                    <small>(Kategori {data.Product.Kategori.macam})</small>
                    <p>Rp {data.Product.harga} x {data.jumlah} pcs</p>
                    <p>Rp {data.Product.harga * data.jumlah}</p>
                    <p>Ditawar Rp {data.penawaranHarga}</p>

                </div>
                </div>
                {data.id_status !== 3 ?
                    <div className='row justify-content-end'>
                        <div className='col-lg-3 col-3'>
                            <Button className="form-control mt-2"  style={{
                                background: '#FFFFFF',
                                color: '#151515',
                                borderColor: '#7126B5',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} data-bs-toggle="modal" data-bs-target="#status">
                                status
                            </Button>
                        </div>
                        <div className="modal fade" id="status" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <strong className='m-2'>Perbarui status penjualan produkmu</strong>
                                                <br/>
                                                <Form>
                                                {['checkbox', 'radio'].map((type) => (
                                                    <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check 
                                                        type={type}
                                                        id={`default-${type}`}
                                                        label={`default ${type}`}
                                                    />

                                                    <Form.Check
                                                        disabled
                                                        type={type}
                                                        label={`disabled ${type}`}
                                                        id={`disabled-default-${type}`}
                                                    />
                                                    </div>
                                                ))}
                                                        </Form>
                                                    
                                                <br/>
                                                <div className='row justify-content-center'>
                                                <div className='col-lg-12 col-12'>
                                                <Button type="button" onClick={hubungi
                                                 } className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}> 
                                                    Kirim
                                                </Button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        <div className='col-lg-3 col-3'>
                            <Button onClick={(e) => {
                            setNomor(data.User.nomor_hp)
                            }} className="form-control mt-2"  style={{
                                background: '#7126B5',
                                borderColor: '#7126B5',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} data-bs-toggle="modal" data-bs-target="#tes">
                                Hubungi di WA
                            </Button>
                        </div>
                        <div className="modal fade" id="tes" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            <h4 className="modal-title">Konfirmasi</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <strong className='m-2'>Hubungi sekarang ?</strong>
                                                <br/>
                                                <br/>
                                                <div className='row justify-content-end'>
                                                <div className='col-lg-3 col-3'>
                                                <Button type='button' data-bs-dismiss="modal" className="form-control mt-2"  style={{
                                                    background: '#FFFFFF',
                                                    color: '#151515',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    BATAL
                                                </Button>
                                                            </div>
                                                <div className='col-lg-3 col-3'>
                                                <Button type="button" onClick={hubungi
                                                 } className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}> 
                                                    IYA
                                                </Button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                            :
                            <div className='row justify-content-end'>
                        
                            <div className='col-lg-3 col-3'>
                                <Button className="form-control mt-2"  style={{
                                    background: '#FFFFFF',
                                    color: '#151515',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }}>
                                    Tolak
                                </Button>
                            </div>
                            <div className='col-lg-3 col-3'>
                                <Button className="form-control mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
                                    background: '#7126B5',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }}>
                                    Terima
                                </Button>
                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body m-4">
                                                <strong>Yeay kamu berhasil mendapat harga yang sesuai</strong>
                                                <p>Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</p>
                                                <div id={style.modal}>
                                                <div className='m-1' style={{ display: "flex" }}>
                                                    <div>
                                                        {data.User.image === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.User.image} className="rounded mx-2" width="60px" height="60px" alt="userimage" />}
                                                    </div>
                                                    <div className="">
                                                        <strong >{data.User.nama} (Pembeli)</strong>
                                                        <p>{data.User.kota}</p>
                                                    </div>
                                                </div>
                                                <div className='m-1' style={{ display: "flex" }}>
                                                    <div>
                                                        {data.Product.foto === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.Product.foto} className="rounded mx-2" width="60px" height="60px" alt="userimage" />}
                                                    </div>
                                                    <div>
                                                        <strong >{data.Product.nama_produk}</strong>
                                                        <p className={style.hargaAwal}>Rp {data.Product.harga * data.jumlah} </p>
                                                        <p className={style.harga}> Ditawar Rp {data.penawaranHarga}</p>
                                                        {/* <h6>Rp ({total})</h6> */}
                                                    </div>
                                                </div>
                                                </div>
                                                <Button type="button" onClick={(e) => {
                                                    setNomor(data.User.nomor_hp);
                                                    setId_penawaran(data.id);
                                                 }} className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }} data-bs-toggle="modal" data-bs-target="#coba"> 
                                                    Hubungi Via Whatsapp
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="coba" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            <h4 className="modal-title">Konfirmasi</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <strong className='m-2'>Apakah anda yakin ?</strong>
                                                <br/>
                                                <br/>
                                                <div className='row justify-content-end'>
                                                <div className='col-lg-3 col-3'>
                                                <Button type='button' data-bs-dismiss="modal" className="form-control mt-2"  style={{
                                                    background: '#FFFFFF',
                                                    color: '#151515',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    BATAL
                                                </Button>
                                                            </div>
                                                <div className='col-lg-3 col-3'>
                                                <Button type="button" onClick={negoisasi
                                                 } className="btn form-control mt-2" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}> 
                                                    IYA
                                                </Button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Toaster
                                    containerStyle={{
                                        top: 230,
                                        left: 20,
                                        bottom: 20,
                                        right: 20,
                                    }}
                                />
                            </div>
                        </div>
                        }
            </div>
            </div>
          );
                })}
                </div>
                </div>
            </div>
            <div className='col-6'>
                <div className='row justify-content-md-center'>
                <div className={style.atas1}>
                    <div className={style.bagian}>
                    <h3>Daftar Produk yang kamu tawar</h3>
                    </div>
                    {coba.map((data, index) => {
               return (
                 <div key={data.id} className='col-12'>
                    <div className={style.atas}>
                     <div className={style.atas} style={{ display: "flex" }}>
                         <div>
                             {data.Product.User.image === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.Product.User.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                         </div>
                         <div>
                             <strong>{data.Product.User.nama} (Penjual)</strong><br />
                             <p>{data.Product.User.kota}</p>
                             {/* {console.log(product.Kategori)} */}
                             {/* {console.log(kategori)} */}
                         </div>
                     </div>
                     <div className={style.kanan} style={{ display: "flex" }}>
                     <div>
                             {data.Product.foto === null ? <img src={wa} className="rounded-circle mx-2" width="150px" height="150px" alt="userimage" /> : <img src={data.Product.foto} className="rounded mx-1 my-1" width="150px" height="150px" alt="userimage" />}
                     </div>
                     <div>
                         <small>{data.Status.stat}</small><br />
                         <strong>{data.Product.nama_produk}</strong>
                         <small>(Kategori {data.Product.Kategori.macam})</small>
                         <p>Rp {data.Product.harga} x {data.jumlah} pcs</p>
                         <p>Rp {data.Product.harga * data.jumlah}</p>
                         <p>Ditawar Rp {data.penawaranHarga}</p>
                     </div>
                     </div>
                 </div>
                 </div>
               );
                    })}
                </div>
                </div>
            </div>
            </div>
            :
            <div className='col-6'>
                <div className='row justify-content-md-center'>
                {coba.map((data, index) => {
               return (
                 <div key={data.id} className='col-lg-6'>
                    <div className={style.atas}>
                     <div className={style.atas} style={{ display: "flex" }}>
                         <div>
                             {data.Product.User.image === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.Product.User.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                         </div>
                         <div>
                             <strong>{data.Product.User.nama} (Penjual)</strong><br />
                             <p>{data.Product.User.kota}</p>
                             {/* {console.log(product.Kategori)} */}
                             {/* {console.log(kategori)} */}
                         </div>
                     </div>
                     <h6 className={style.kanan}><b>Produk yang kamu tawar</b></h6>
                     <div className={style.kanan} style={{ display: "flex" }}>
                     <div>
                             {data.Product.foto === null ? <img src={wa} className="rounded-circle mx-2" width="150px" height="150px" alt="userimage" /> : <img src={data.Product.foto} className="rounded mx-1 my-1" width="150px" height="150px" alt="userimage" />}
                     </div>
                     <div>
                         <small>{data.Status.stat}</small><br />
                         <strong>{data.Product.nama_produk}</strong>
                         <small>(Kategori {data.Product.Kategori.macam})</small>
                         <p>Rp {data.Product.harga} x {data.jumlah} pcs</p>
                         <p>Rp {data.Product.harga * data.jumlah}</p>
                         <p>Ditawar Rp {data.penawaranHarga}</p>
                     </div>
                     </div>
                 </div>
                 </div>
               );
             })}
                </div>
            </div>
            }

             </div>
            }
    </div>
</>
  )
}
