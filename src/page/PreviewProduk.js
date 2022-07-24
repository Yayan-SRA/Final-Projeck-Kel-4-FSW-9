import React, { useState, useEffect } from 'react'
import Nav from "../components/Nav"
import { BsListUl, BsPerson } from 'react-icons/bs';
import { IoMdNotificationsOutline } from "react-icons/io"
import { useNavigate, useParams, Link } from 'react-router-dom';
import style from "./styles/Preview.module.css"
import { Button } from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast';
import CurrencyFormat from 'react-currency-format';
import swal from 'sweetalert';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import secondHand from "../image/camera.png"

export default function PreviewProduk() {
    const [user, setUser] = useState("")
    const [product, setProducts] = useState([])
    const [id_status, setId_status] = useState("3")
    const [jumlah, setJumlah] = useState("")
    const [penawaranharga, setPenawaranHarga] = useState("")
    const { id } = useParams()
    const [kategori, setKategori] = useState([])
    const [penjual, setPenjual] = useState([])
    const [produk, setProduk] = useState([])
    // const [keterangan, setKeterangan] = useState("")
    const [msg, setmsg] = useState("")
    const [link, SetLink] = useState("")
    const [coba, setCoba] = useState("")
    const [Cek, setCek] = useState([])
    const [terakhir, setTerakhir] = useState([])
    const [wist, setWist] = useState([])

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
            const iduser = decoded.id
            const data = await response.json()
            setUser(data)
            response = await axios.get(`http://localhost:8000/v1/Produk/preview/${id}`)
            setProduk(response.data)
            setKategori(response.data.Kategori)
            setPenjual(response.data.User)
            setProducts(response.data)
            response = await axios.get(`http://localhost:8000/v1/penawaranBuyer/${decoded.id}`)
            setCoba(response.data)
            response = await axios.get(`http://localhost:8000/penawaranProduk/${id}`)
            setCek(response.data)
            console.log("Cek", response.data);
            const orang = response.data
            const terakhir = orang.filter((user) => user.id_user == decoded.id).slice(-1)[0]
            console.log("terakhir", terakhir);
            setTerakhir((terakhir))
            response = await axios.get(`http://localhost:8000/wishlist/${decoded.id}/${id}`)
            console.log("sukai", response.data);
            setWist(response.data)
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

    const berhasil = () => {
        const content = <strong>Berhasil Mengajukan Penawaran</strong>
        toast.success(content, {
            duration: 4000,
            // Styling
            style: { background: '#73CA5C', color: 'white', padding: "22px" },
            className: '',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        })
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const gagal = (pesan) => {
        toast.error(pesan, {
            duration: 5000
        })
    }

    const tawar = async (e) => {
        e.preventDefault();
        try {
            if (user.kota == null || user.alamat == null || user.nomor_hp == null || user.image == null) {
                setmsg("Lengkapi Profil Dulu!!")
                SetLink(user.id)
                gagal("Lengkapi Profil Terlebih Dahulu")
                return
            }
            await axios.post("http://localhost:8000/v1/penawaran/add", {
                id_user: user.id,
                id_produk: product.id,
                id_penjual: penjual.id,
                id_status: id_status,
                jumlah: jumlah,
                penawaranHarga: penawaranharga
            })

            berhasil()
            await sleep(1.5 * 1000)
            window.location.reload()
        } catch (error) {
            console.log(error);
            if (error.response) {
                setmsg(error.response.data.msg)
                console.log(error.response.data);
            }
            const pesan = <strong>{error.response.data.msg}</strong>
            gagal(pesan)
        }
    }

    const wish = async () => {
        try {
            let response = await axios.post(`http://localhost:8000/api/v1/wishlist/add`, {
                id_user: user.id,
                id_produk: produk.id,
                diminati: "yes"
            })
            console.log("add", response.data)
            response = await axios.put(`http://localhost:8000/v1/Produk/update/${produk.id}`, {
                disukai: produk.disukai + 1
            })
            console.log("+", response.data)
        } catch (error) {

        }
        window.location.reload();
    }

    const hapusWish = async () => {
        try {
            let response = await axios.delete(`http://localhost:8000/delete/${user.id}/${produk.id}`)
            console.log("hapus", response.data)
            response = await axios.put(`http://localhost:8000/v1/Produk/update/${produk.id}`, {
                disukai: produk.disukai - 1
            })
            console.log("-", response.data)
        } catch (error) {

        }
        window.location.reload();
    }

    const back = async () => {
        navigasi("/home")
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { value = "" } = e.target;
        const parsedValue = value.replace(/[^\d,]/gi, "");
        setPenawaranHarga(parsedValue);
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
                    {product.keterangan == "disabled"?
                    <>
                    <div className='col-lg-4'>
                        <h2 style={{
                            color:"red",
                            textAlign:"center",
                            marginTop:"50px"
                        }}>Akses Dilarang</h2>
                        <button onClick={() => back()} className="form-control mt-2 btn-outline-danger" style={{
                                                    textAlign: "center",
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }} >
                                                    Kembali ke halaman utama
                                                </button>
                    </div>
                    </>
                    :
                    <>
                    <div className='col-lg-6'>
                        <h4 className='text-center'>
                            {msg}<span style={{ display: "block" }} className='mx-1'>
                                {link == "" ? "" : <Link style={{ textDecoration: "none" }} to={"/infoprofil"}>Lengkapi</Link>}
                            </span>
                        </h4>
                        <img className='p-4' src={product.foto} width="100%" />
                        <div className={style.kanan}>
                            <strong style={{ fontSize: "20px" }}>Deskripsi</strong><br />
                            <p>{product.deskripsi}</p>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className={style.kanan}>
                            <strong style={{ fontSize: "22px" }}>{product.nama_produk}</strong><br />
                            <small style={{ fontSize: "16px" }}>{kategori.macam}(Kategori)</small><br />
                            <small style={{ fontSize: "15px" }}>{product.stok}(Jumlah Stok)</small>
                            <strong className='mt-3 d-block'>{formatRupiah(product.harga)}</strong>
                            <div className='row'>
                                <div className='col-lg-12 col-12'>
                                    {product.id_penjual !== user.id ?
                                        ((Cek.filter((orang) => (orang.id_user === user.id)).map((user) => (user))).length !== 0 ? ((terakhir.id_status === 1 || terakhir.id_status === 4) ? 
                                        <>
                                        <Button className="form-control mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
                                            background: '#7126B5',
                                            borderColor: '#7126B5',
                                            borderRadius: '16px',
                                            padding: '12px 16px',
                                        }}>
                                            Saya Tertarik dan Ingin Nego
                                        </Button>
                                        {wist === null ? <button onClick={() => wish()} className="form-control mt-2" style={{
                                                    textAlign: "center",
                                                    background: '#FFFFFF',
                                                    color: '#151515',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    Tambahkan ke Wishlist
                                                </button> : <button onClick={() => hapusWish()} className="form-control mt-2 btn-outline-danger" style={{
                                                    textAlign: "center",
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    Hapus Wishlist
                                                </button>}
                                        </>
                                            :
                                            <Button type="button" style={{
                                                background: '#D0D0D0',
                                                borderColor: '#D0D0D0',
                                                borderRadius: '16px',
                                                padding: '12px 16px',
                                            }} className="form-control mt-2" disabled data-bs-toggle="button">
                                                {terakhir.id_status === 3 ? "Menunggu respon penjual" : "Negosiasi..."}
                                            </Button>)

                                            :
                                            <div>
                                                <Button className="form-control mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
                                                    background: '#7126B5',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    Saya Tertarik dan Ingin Nego
                                                </Button>
                                                {wist === null ? <button onClick={() => wish()} className="form-control mt-2" style={{
                                                    textAlign: "center",
                                                    background: '#FFFFFF',
                                                    color: '#151515',
                                                    borderColor: '#7126B5',
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    Tambahkan ke Wishlist
                                                </button> : <button onClick={() => hapusWish()} className="form-control mt-2 btn-outline-danger" style={{
                                                    textAlign: "center",
                                                    borderRadius: '16px',
                                                    padding: '12px 16px',
                                                }}>
                                                    Hapus Wishlist
                                                </button>}
                                            </div>
                                        )

                                        : <div>
                                            <Button onClick={() => navigasi(`/update/produk/${id}`)} className="form-control mt-2" style={{
                                                background: '#7126B5',
                                                borderColor: '#7126B5',
                                                borderRadius: '16px',
                                                padding: '12px 16px',
                                            }}>
                                                Update Produk
                                            </Button>
                                        </div>}
                                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="staticBackdropLabel">Masukan Harga Tawaranmu</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.</p>
                                                    <div id={style.modal} style={{ display: "flex" }}>
                                                        <div>
                                                            {product.foto === null ? <img src={secondHand} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={product.foto} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                                                        </div>
                                                        <div className="">
                                                            <strong >{product.nama_produk}</strong>
                                                            <h6>{formatRupiah(product.harga)} x {jumlah} <i>pcs</i> </h6>
                                                            <h6>{formatRupiah((product.harga) * jumlah)} </h6>
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <strong>Jumlah</strong>
                                                        <input type="number" max={product.stok} value={jumlah} onChange={(e) => setJumlah(e.target.value)} className='form-control' style={{
                                                            border: "1px solid #D0D0D0",
                                                            borderRadius: '16px',
                                                            padding: '12px 16px',
                                                        }} placeholder="pcs" />
                                                    </div>
                                                    <div className='mt-3'>
                                                        <strong>Harga Tawar</strong>
                                                        <CurrencyFormat value={penawaranharga} onChange={handleChange} style={{
                                                            border: '1px solid #D0D0D0',
                                                            borderRadius: '16px',
                                                            padding: '12px 16px',
                                                        }} className='form-control' displayType={'input'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'} placeholder="Rp 0.0" />
                                                
                                                    </div>
                                                    <Button onClick={(e) => tawar(e)} className="form-control mt-2" style={{
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
                            </div>
                        </div>
                    </div>
                    </>
                    }

                </div>
            </div>
        </>
    )
}
