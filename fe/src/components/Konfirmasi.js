import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import swal from 'sweetalert'

export default function Konfirmasi() {
    const [show, setShow] = useState(true);
    const { email } = useParams()
    const [user, SetUser] = useState("")
    // const [email,SetEmail]=useState("")
    // const [password,SetPassword]=useState("")
    // const [msg,setmsg]=useState("")
    const [pesan, SetPesan] = useState("")
    const handleClose = () => setShow(false);
    const [OTP, SetOTP] = useState("")
    // const [link,SetLink] =useState("")
    // const navigasi = useNavigate()

    const fetchdata = async () => {
        const response = await fetch(`http://localhost:8000/usernama/${email}`)
        const data = await response.json()
        SetUser(data)
        if (data.verifikasi == 1) {
            setShow(false)
        }
    }

    useEffect(() => {
        fetchdata()
    }, []);

    const konfirmasi = async () => {
        if (user.OTP != OTP) {
            SetPesan("OTP Salah")
            return
        }
        await axios.put(`http://localhost:8000/update/${user.id}`, {
            verifikasi: "1"
        })
        setShow(false)
        await swal("Registrasi Berhasil!", "success");
    }

    // const login = async(e)=>{
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post("http://localhost:8000/login",{
    //             email:email,
    //             password:password,
    //         },{
    //             withCredentials:true
    //         })
    //         // console.log(response.data);
    //         const data = await response.data
    //         if(data.verifikasi != "1"){
    //             setmsg("Email Belum Diverifikasi")
    //             SetLink(data.email)
    //             return
    //         }
    //         await axios.get("http://localhost:8000/user",
    //             {
    //                 headers: {
    //                 "Authorization": `Bearer ${data.accessToken}`
    //                 }
    //             }
    //         )
    //         await navigasi(`/home/${data.email}`)
    //     } catch (error) {
    //         if(error.response){
    //             setmsg(error.response.data.msg)
    //             console.log(error.response.data);
    //         }
    //     }
    // }

    return (
        <div className='container'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Email Mu!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{pesan}</p>
                    <input type="text" placeholder='Masukan OTP yang sudah dikirim ke email mu' onChange={(e) => SetOTP(e.target.value)} className="form-control" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={konfirmasi}>
                        Konfirmasi
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <form className='py-4' style={{width:"50%",marginLeft:"auto",marginRight:"auto"}} onSubmit={login}>
                <h2>Login</h2>
                <h5 className='text-center'>
                    {msg}<span style={{display:"block"}} className='mx-1'>
                        {link =="" ? "" :<Link style={{textDecoration:"none"}} to={`/konfirmasi/${link}`}>Verifikasi Sekarang!</Link>}
                    </span>
                </h5>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Anda" value={email} onChange={(e)=>SetEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password Anda" value={password} onChange={(e)=>SetPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success mx-2">Login</button>
        </form> */}
            <Login />
        </div>
    );
}
