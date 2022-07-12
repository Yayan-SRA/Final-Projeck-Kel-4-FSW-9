import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate, useParams, Link } from 'react-router-dom'
import NavbarMain from '../../components/navbar/NavbarMain'
import './styles.css'
import { FiBox, FiPlus } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import Card from '../../components/cardSeller/Index'
import NavbarMain2 from '../../components/navbar/NavbarMain2';

export default function SellerDaftarJual() {
    const [token, SetToken] = useState('');
    const [user, SetUser] = useState('');
    const [msg, setmsg] = useState("")
    const navigasi = useNavigate()
    const [link, SetLink] = useState("")


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
            const data = await response.json()
            console.log('data', data)
            SetUser(data)
            // console.log('setuser', SetUser(data))
        } catch (error) {
            navigasi("/")
        }
    }

    return (
        <div>
            {/* <NavbarMain/> */}
            <NavbarMain2 />
            <p className='text-daftar'>Daftar Jual Saya</p>
            <div className='seller-container'>
                <div className='seller-profile-wrapper'>
                    <div className='seller-image'>
                        <img src={user.image} alt="profile" />
                    </div>
                    <div className='content-profile'>
                        <div className='text-profile'>
                            <div className='name-profile'>{user.nama}</div>
                            <div className='city-profile'>{user.kota}</div>
                        </div>
                        <Link style={{ textDecoration: "none" }} to={`/update/${user.id}`} className='edit-profile'>
                            Edit
                        </Link>
                    </div>

                </div>
                <div className='kategori-wrapper'>
                    <p>Kategori</p>
                    <div className='kategori-option'>
                        <div className='icon-text-option'>
                            <FiBox className='icon-box-profile' />
                            <p>Semua Produk</p>
                        </div>
                        <FiChevronRight className='icon-box-chevron' />
                    </div>
                    <div className='kategori-option'>
                        <div className='icon-text-option'>
                            <FiHeart className='icon-box-profile' />
                            <p>Diminati</p>
                        </div>
                        <FiChevronRight className='icon-box-chevron' />
                    </div>
                    <div className='kategori-option-last'>
                        <div className='icon-text-option'>
                            <FiDollarSign className='icon-box-profile' />
                            <p>Terjual</p>
                        </div>
                        <FiChevronRight className='icon-box-chevron' />
                    </div>
                </div>
                <div className='row'>
                    <div className='cardDaftarJual-wrapper'>
                        <div className='add-card'>
                            <div className='add-card-wrapper'>
                                <div className='add-card-img-product'>
                                    <FiPlus className='icon-plus' />
                                </div>
                                <p className='desc-product'>Tambah Produk</p>
                            </div>
                        </div>
                        <Card />
                    </div>
                </div>
            </div>

        </div>
    )
}