import React, { useState, useEffect, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'

export default function Update() {
    const [user, SetUser] = useState("")
    const { id } = useParams()
    const [file, setFile] = useState(null);
    const navigasi = useNavigate()

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
                withCredentials: "true"
            })
            console.log('ini lagi', response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            console.log('ini coy', decoded);
            if (id != decoded.id) {
                navigasi(`/update/${decoded.id}`)
            }
            response = await fetch(`http://localhost:8000/user/${decoded.id}`)
            const data = await response.json()
            console.log('data', data)
            SetUser(data)
            console.log('setuser', SetUser(data))
        } catch (error) {
            navigasi("/")
        }
    }
    const ada = async () => {
        await fetch(`http://localhost:8000/user/${id}`)
    }
    useEffect(() => {
        if (!ada) {
            navigasi('/')
            return
        }
        else {
            fetchdata()
        }
    }, []);
    const [nama, SetNama] = useState(user.nama)
    const [kota, SetKota] = useState(user.kota)
    const [alamat, SetAlamat] = useState(user.alamat)
    const [image, SetImage] = useState(user.image)
    const [nomor_hp, SetNomor_hp] = useState(user.nomor_hp)
    const [msg, setmsg] = useState("")

    async function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        // A.push(uploaded)
        SetImage(URL.createObjectURL(uploaded));
        setFile(uploaded);
        // console.log(uploaded);
        // console.log(e.target.files[0]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData();

        form.append("image", file);


        try {
            if (file != null) {
                const response = await axios.put(
                    "http://localhost:8000/api/v1/profiles/:id/image/cloudinary",
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const response1 = await axios.put(
                    'http://localhost:8000/api/v1/profiles/:id/image',
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                // SetImage("http://localhost:8000/" + response1.data.url);
                SetImage(response.data.url)
                console.log(SetImage('inilah', response.data.url))
                // let gambar = "http://localhost:8000" + response1.data.url
                await axios.put(`http://localhost:8000/update/${id}`, {
                    nama: nama,
                    kota: kota,
                    alamat: alamat,
                    nomor_hp: nomor_hp,
                    image: response.data.url
                })
                // console.log(response.data.url);
                // console.log(image);
                navigasi("/home")
            } else {
                await axios.put(`http://localhost:8000/update/${id}`, {
                    nama: nama,
                    kota: kota,
                    alamat: alamat,
                    nomor_hp: nomor_hp
                })
                navigasi("/home")
            }
        } catch (err) {
            console.log(err);
            console.log(err?.responses?.data);
        }
    }

    return (
        <div className='container'>
            <Fragment>
                {/* <p>{nama}</p>
                <p>{image}</p> */}
                <form className='py-4' style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2>Update</h2>
                    <h5 className='text-center'>{msg}</h5>
                    <div className="mb-3">
                        <label for="exampleInputNama" className="form-label">Nama</label>
                        <input type="Nama" placeholder={user.nama} className="form-control" value={nama} onChange={(e) => SetNama(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputkota" className="form-label">Kota</label>
                        <input type="text" className="form-control" placeholder={user.kota} value={kota} onChange={(e) => SetKota(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputalamat" className="form-label">alamat</label>
                        <input type="text" className="form-control" placeholder={user.alamat} value={alamat} onChange={(e) => SetAlamat(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputnomorhp" className="form-label">nomor_hp</label>
                        <input type="text" className="form-control" placeholder={user.nomor_hp} value={nomor_hp} onChange={(e) => SetNomor_hp(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputimage" className="form-label">image</label>
                        <input class="form-control form-control-sm" id="formFileSm" type="file" onChange={handleUploadChange} />
                    </div>
                    {image ? (
                        <img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={image} />
                    ) : (<img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={user.image} />)}<br /><br />
                    <button onClick={handleSubmit} className="btn btn-primary" type='submit'>Save</button>
                </form>
            </Fragment>

        </div>
    )
}