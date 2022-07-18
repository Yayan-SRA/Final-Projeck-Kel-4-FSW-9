import React, { useState, useEffect } from 'react'
import Nav from "../components/Nav"
import { BsListUl, BsPerson } from 'react-icons/bs';
import { IoMdNotificationsOutline } from "react-icons/io"
import { useNavigate, useParams } from 'react-router-dom';
import style from "./styles/Preview.module.css"
import { Button } from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import secondHand from "../image/camera.png"

export default function PreviewProduk() {
    const [user, SetUser] = useState("")
    const [product, setProducts] = useState([])
    const { id } = useParams()
    const [kategori, setKategori] = useState([])
    const [penjual, setPenjual] = useState([])

    useEffect(() => {
        fetchdata()
    }, []);

    const fetchdata = async () => {
        try {
            let response = await axios.get("http://localhost:8000/token", {
                withCredentials: true
            })
            const decoded = jwt_decode(response.data.accessToken)
            response = await fetch(`http://localhost:8000/user/${decoded.id}`)
            const data = await response.json()
            SetUser(data)
            // response = await axios.get(`http://localhost:8000/v1/Produk/preview/${id}`)
            response = await axios.get(`http://localhost:8000/v1/Produk/preview/${id}`)
            // console.log(response.data.Kategori.macam)
            setKategori(response.data.Kategori)
            setPenjual(response.data.User)
            console.log(response.data);
            setProducts(response.data)
        } catch (error) {
            navigasi("/")
        }
    }
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(money);
    };

    const navigasi = useNavigate()
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
                <div className='row justify-content-md-center g-1'>
                    <div className='col-lg-6'>
                        <img className='p-4' src={product.foto} width="100%" />
                        <div className={style.kanan}>
                            <strong style={{ fontSize: "20px" }}>Deskripsi</strong><br />
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                            <p>{product.deskripsi}</p>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className={style.kanan}>
                            <strong>{product.nama_produk}</strong><br />
                            <small>{kategori.macam}(Kategori)</small>
                            <strong className='mt-3 d-block'>{formatRupiah(product.harga)}</strong>
                            <div className='row'>
                                <div className='col-lg-12 col-12'>
                                    {product.id_penjual != user.id ? <Button className="form-control mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
                                        background: '#7126B5',
                                        borderColor: '#7126B5',
                                        borderRadius: '16px',
                                        padding: '12px 16px',
                                    }}>
                                        Saya Tertarik dan Ingin Nego
                                    </Button> : <Button className="form-control mt-2" style={{
                                        background: '#7126B5',
                                        borderColor: '#7126B5',
                                        borderRadius: '16px',
                                        padding: '12px 16px',
                                    }}>
                                        Update Produk
                                    </Button>}
                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Masukan Harga Tawaranmu</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.</p>
                                                    <div id={style.modal} style={{ display: "flex" }}>
                                                        <div>
                                                            {product.foto === null ? <img src={secondHand} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={product.foto} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                                                        </div>
                                                        <div className="">
                                                            <strong >{product.nama_produk}</strong>
                                                            <h6>{formatRupiah(product.harga)}</h6>
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <strong>Harga Tawar</strong>
                                                        <input className='form-control' style={{
                                                            border: "1px solid #D0D0D0",
                                                            borderRadius: '16px',
                                                            padding: '12px 16px',
                                                        }} placeholder="Rp 0.0" />
                                                    </div>
                                                    <Button className="form-control mt-2" style={{
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
                        </div>
                        <div className={style.kanan} style={{ display: "flex" }}>
                            <div>
                                {penjual.image === null ? <img src={secondHand} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={penjual.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                            </div>
                            <div>
                                <strong>{penjual.nama} (Penjual)</strong><br />
                                <p>{penjual.kota}</p>
                                {/* {console.log(product.Kategori)} */}
                                {/* {console.log(kategori)} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}