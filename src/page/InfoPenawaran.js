import jwt_decode from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
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
import { data } from 'autoprefixer';

export default function InfoPenawaran() {
    const [token, SetToken] = useState('');
    const navigasi = useNavigate()
    const [kategori, setKategori] = useState([])
    const [user, SetUser] = useState("");
    const [produk, setProduk] = useState([]);
    const [nomor, setNomor] = useState("");
    const [id_penawaran, setId_penawaran] = useState("");
    const [coba, setCoba] = useState("");
    const [penawaranmu, setPenawaranmu] = useState(false)
    const [status, setStatus] = useState("");
    const [id_produkTerjual, setId_produkTerjual] = useState("");
    const [id_pembeli, setId_pembeli] = useState("");
    const [id_penjual, setId_penjual] = useState("");
    const [jumlahProduk, setJumlahProduk] = useState("");
    const [totalHarga, setTotalHarga] = useState("");
    const [stok, setStok] = useState("");



    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        try {
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
        } catch (error) {
            navigasi("/")
        }
    }

    console.log("tes", produk)
    console.log("tes 2", coba)
    
    const penawaranMasuk = () => {
        setPenawaranmu(false)
    }
    const penawaranKeluar = () => {
        setPenawaranmu(true)
    }

    const kirim = async () => {
        console.log("tes", status)
        console.log("tes2", id_penawaran)
        try {
            let response = await axios.put(`http://localhost:8000/v1/penawaran/update/${id_penawaran}`, {
                id_status: status,
            })
            console.log('uji', response.data)
            if (status == 1) {
                response = await axios.post(`http://localhost:8000/api/v1/penjualan`, {
                    id_pembeli: id_pembeli,
                    id_penjual: id_penjual,
                    id_status: status,
                    id_produk: id_produkTerjual,
                    id_penawaran: id_penawaran,
                    jumlahProduk: jumlahProduk,
                    totalHarga: totalHarga,
                })
                console.log('uji 2', response.data)
                const sisaStok = stok - jumlahProduk
                console.log('uji stok', sisaStok)
                if (sisaStok == 0){
                    response = await axios.put(`http://localhost:8000/v1/Produk/update/${id_produkTerjual}`, {
                        keterangan: "disabled",
                        stok: sisaStok,
                        produkTerjual: jumlahProduk,
                    })
                    console.log('uji 3', response.data)
                } else{
                    response = await axios.put(`http://localhost:8000/v1/Produk/update/${id_produkTerjual}`, {
                        keterangan: "sold",
                        stok: sisaStok,
                        produkTerjual: jumlahProduk,
                    })
                    console.log('uji 4', response.data)
                }
            }
        } catch (error) {
            console.log(error)
        }
        window.location.reload();
    }
    const hubungi = () => {
        console.log("tes", nomor)
        let cekNomor = nomor.substring(0, 1);
        let cekNomor1 = nomor.substring(0, 2);
        if(cekNomor == 0){
            let hasilCek = nomor.substring(1);
            console.log("cek no2", hasilCek)
            window.open(`https://wa.me/62${hasilCek}`);
            window.location.reload();
        } else if(cekNomor1 == 62){
            window.open(`https://wa.me/${nomor}`);
            window.location.reload();
        } else {
            window.open(`https://wa.me/${nomor}`);
            window.location.reload();
        }
    }
    const negoisasi = async () => {
        console.log("tes", nomor)
        console.log("tes2", id_penawaran)
        let cekNomor = nomor.substring(0, 1);
        let cekNomor1 = nomor.substring(0, 2);
        console.log("cek no", cekNomor)
        if(cekNomor == 0){
            let hasilCek = nomor.substring(1);
            console.log("cek no2", hasilCek)
            try {
                let response = await axios.put(`http://localhost:8000/v1/penawaran/update/${id_penawaran}`, {
                    id_status: "2",
                })
                console.log('uji', response.data)
            } catch (error) {
                console.log(error)
            }
            window.open(`https://wa.me/62${hasilCek}`);
            window.location.reload();
        } else if (cekNomor1 == 62){
            try {
                let response = await axios.put(`http://localhost:8000/v1/penawaran/update/${id_penawaran}`, {
                    id_status: "2",
                })
                console.log('uji', response.data)
            } catch (error) {
                console.log(error)
            }
            window.open(`https://wa.me/${nomor}`);
            window.location.reload();
        }else {
            window.open(`https://wa.me/${nomor}`);
            window.location.reload();
        }
    }

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(money);
    };


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
            <div className='row justify-content-start' style={{
                margin: 'auto',
                width: '80%',
            }}>
                <div className='col-2'>
                    <Button type="button" onClick={penawaranMasuk} className="btn form-control mt-2" style={{
                        background: '#7126B5',
                        borderColor: '#7126B5',
                        borderRadius: '16px',
                        padding: '12px 16px',
                    }}>
                        Penawaran Masuk
                    </Button>
                </div>
                <div className='col-2'>
                    <Button type="button" onClick={penawaranKeluar} className="btn form-control mt-2" style={{
                        background: '#7126B5',
                        borderColor: '#7126B5',
                        borderRadius: '16px',
                        padding: '12px 16px',
                    }}>
                        Penawaran Keluar
                    </Button>
                </div>
            </div>
            {penawaranmu == false ?
                <div className='container-fluid p-4'>
                    <div className='row justify-content-md-center g-1'>
                        <div className='col-8'>
                            {produk.length !== 0 ?
                            <>
                            {produk.map((data, index) => {
                                return (
                                    <div className='row justify-content-md-center g-1'>
                                        <div key={data.id} className='col-12'>
                                            <div className={style.atas}>
                                                <div className={style.atas} style={{ display: "flex" }}>
                                                    <div>
                                                        {data.User.image === null ? <img src={wa} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={data.User.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                                                    </div>
                                                    <div>
                                                        <strong>{data.User.nama} (Pembeli)</strong><br />
                                                        <p>{data.User.kota}</p>
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
                                                        <p>{formatRupiah(data.Product.harga)} x {data.jumlah} pcs</p>
                                                        <p>{formatRupiah(data.Product.harga * data.jumlah)}</p>
                                                        <p>Ditawar {formatRupiah(data.penawaranHarga)}</p>

                                                    </div>
                                                </div>
                                                {data.id_status == 1 || data.id_status == 4 ?
                                                    (data.id_status === 1 ? <h5 style={{ textAlign: "right" }}>Berhasil Terjual</h5> : <h5 style={{ textAlign: "right" }}>Dibatalkan</h5>)
                                                    :
                                                    <>
                                                        {data.id_status !== 3 ?
                                                            <div className='row justify-content-end'>
                                                                <div className='col-lg-3 col-3'>
                                                                    <Button className="form-control mt-2" style={{
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
                                                                                <br />
                                                                                <br />
                                                                                <form>
                                                                                    <div>
                                                                                        <div className="form-check">
                                                                                            <input
                                                                                                className="form-check-input"
                                                                                                type="radio"
                                                                                                name="Berhasil Terjual"
                                                                                                id="berhasil" checked={status === '1'} value="1" onClick={() => setStatus('1')}
                                                                                            />
                                                                                            <label className="form-check-label" for="berhasil">
                                                                                                Berhasil terjual
                                                                                            </label>
                                                                                            <p style={{
                                                                                                color: "#8A8A8A"
                                                                                            }}>Kamu telah sepakat menjual produk ini kepada pembeli</p>
                                                                                        </div>
                                                                                        <div className="form-check">
                                                                                            <input
                                                                                                className="form-check-input"
                                                                                                type="radio"
                                                                                                name="Batal"
                                                                                                id="dibatalkan" checked={status === '4'} value="4" onClick={() => setStatus('4')}
                                                                                            />
                                                                                            <label className="form-check-label" for="dibatalkan">
                                                                                                Batalkan transaksi
                                                                                            </label>
                                                                                            <p style={{
                                                                                                color: "#8A8A8A"
                                                                                            }}>Kamu membatalkan transaksi produk ini dengan pembeli</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                                <br />
                                                                                <div className='row justify-content-center'>
                                                                                    <div className='col-lg-12 col-12'>
                                                                                        <Button type="button" onClick={(e) => {
                                                                                            setId_penawaran(data.id);
                                                                                            setId_pembeli(data.id_user);
                                                                                            setId_produkTerjual(data.id_produk);
                                                                                            setJumlahProduk(data.jumlah);
                                                                                            setTotalHarga(data.penawaranHarga);
                                                                                            setStok(data.Product.stok);
                                                                                            setId_penjual(data.Product.id_penjual);
                                                                                        }} className="btn form-control mt-2" style={{
                                                                                            background: '#7126B5',
                                                                                            borderColor: '#7126B5',
                                                                                            borderRadius: '16px',
                                                                                            padding: '12px 16px',
                                                                                        }} data-bs-toggle="modal" data-bs-target="#tess">
                                                                                            Kirim
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="modal fade" id="tess" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h4 className="modal-title">Konfirmasi</h4>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <strong className='m-2'>Apakah anda yakin merubah status penawaran?</strong>
                                                                                <br />
                                                                                <br />
                                                                                <div className='row justify-content-end'>
                                                                                    <div className='col-lg-3 col-3'>
                                                                                        <Button type='button' data-bs-dismiss="modal" className="form-control mt-2" style={{
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
                                                                                        <Button type="button" onClick={kirim
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
                                                                <div className='col-lg-3 col-3'>
                                                                    <Button onClick={(e) => {
                                                                        setNomor(data.User.nomor_hp)
                                                                    }} className="form-control mt-2" style={{
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
                                                                                <br />
                                                                                <br />
                                                                                <div className='row justify-content-end'>
                                                                                    <div className='col-lg-3 col-3'>
                                                                                        <Button type='button' data-bs-dismiss="modal" className="form-control mt-2" style={{
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
                                                                    <Button type="button" 
                                                                    onClick={() => {
                                                                        setStatus('4')
                                                                        setId_penawaran(data.id);
                                                                    }
                                                                }
                                                                    className="form-control mt-2" style={{
                                                                        background: '#FFFFFF',
                                                                        color: '#151515',
                                                                        borderColor: '#7126B5',
                                                                        borderRadius: '16px',
                                                                        padding: '12px 16px',
                                                                    }} data-bs-toggle="modal" data-bs-target="#tolak">
                                                                        Tolak
                                                                    </Button>
                                                                </div>
                                                                <div className="modal fade" id="tolak" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h4 className="modal-title">Konfirmasi</h4>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <strong className='m-2'>Apakah anda yakin ingin menolak tawaran ini?</strong>
                                                                                <br />
                                                                                <br />
                                                                                <div className='row justify-content-end'>
                                                                                    <div className='col-lg-3 col-3'>
                                                                                        <Button type='button' data-bs-dismiss="modal" className="form-control mt-2" style={{
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
                                                                                        <Button type="button" onClick={()=>kirim ()
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
                                                                                                <p className={style.hargaAwal}> {formatRupiah(data.Product.harga * data.jumlah)} </p>
                                                                                                <p className={style.harga}> Ditawar  {formatRupiah(data.penawaranHarga)}</p>
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
                                                                                    <br />
                                                                                    <br />
                                                                                    <div className='row justify-content-end'>
                                                                                        <div className='col-lg-3 col-3'>
                                                                                            <Button type='button' data-bs-dismiss="modal" className="form-control mt-2" style={{
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
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            </>
                            :
                            <>
                            <div>
                                <h3 className='text-center py-4 mt-5'>Belum Ada Yang Mengajukan Penawaran</h3>
                                <h5 className='text-center py-4'>Tetap Semangat Berjualan Wahai Pejuang Cuan</h5>
                            </div>
                            </>
                            }

                        </div>
                    </div>
                </div>

                :

                <div className='container-fluid p-4'>
                    <div className='row justify-content-md-center g-1'>
                        <div className='col-8'>
                            {coba.length !== 0 ?
                            <>
                                {coba.map((data, index) => {
                                { console.log("status", data.id_status) }
                                return (
                                    <div className='row justify-content-md-center g-1'>
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
                                                <h6 className={style.kanan}><b>Produk yang kamu tawar</b></h6>
                                                <div className={style.kanan} style={{ display: "flex" }}>
                                                    <div>
                                                        {data.Product.foto === null ? <img src={wa} className="rounded-circle mx-2" width="150px" height="150px" alt="userimage" /> : <img src={data.Product.foto} className="rounded mx-1 my-1" width="150px" height="150px" alt="userimage" />}
                                                    </div>
                                                    <div>
                                                        <small>{data.Status.stat}</small><br />
                                                        <strong>{data.Product.nama_produk}</strong>
                                                        <small>(Kategori {data.Product.Kategori.macam})</small>
                                                        <p>{formatRupiah(data.Product.harga)} x {data.jumlah} pcs</p>
                                                        <p>{formatRupiah(data.Product.harga * data.jumlah)}</p>
                                                        <p>{formatRupiah(data.penawaranHarga)}</p>
                                                    </div>
                                                </div>
                                                {data.id_status === 1 ? <h5 style={{ textAlign: "right" }}>Berhasil Dibeli</h5> : (data.id_status === 3 ? <h5 style={{ textAlign: "right" }}>Sabar...</h5> : (data.id_status == 2 ? <h5 style={{ textAlign: "right" }}>Negosiasi...</h5> : <h5 style={{ textAlign: "right" }}>Yah Dibatalkan, Kacau Penjualnya</h5>))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            </>
                            :
                            <>
                            <div>
                                <h3 className='text-center py-4 mt-5'>Kamu Belum Mengajukan Penawaran</h3>
                                <h5 className='text-center py-4'>Ayo Segera Cari Produk Impianmu</h5>
                            </div>
                            </>
                            }

                        </div>
                    </div>
                </div>
            }
        </>
    )
}
