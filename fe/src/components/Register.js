import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [nama, SetNama] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [confpassword, SetConfpassword] = useState("")
    const [msg, setmsg] = useState("")
    const navigasi = useNavigate()

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/register", {
                nama: nama,
                email: email,
                password: password,
                confpassword: confpassword
            })
            navigasi(`/konfirmasi/${email}`)
        } catch (error) {
            if (error.response) {
                setmsg(error.response.data.msg)
                console.log(error.response.data);
            }
        }
    }

    return (
        <div className='container'>
            <form className='py-4' style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }} onSubmit={register}>
                <h2>Register</h2>
                <h5 className='text-center'>{msg}</h5>
                <div className="mb-3">
                    <label for="exampleInputNama" className="form-label">Nama</label>
                    <input type="Nama" placeholder='Nama Anda' pattern="(?=.*[a-z])(?=.*[A-Z]).{1,20}" className="form-control" value={nama} onChange={(e) => SetNama(e.target.value)} title="Harus Memuat huruf besar dan huruf kecil" required />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Anda" value={email} onChange={(e) => SetEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    {/* <input type="password" className="form-control" placeholder="Password Anda" value={password} onChange={(e)=>SetPassword(e.target.value)}/> */}
                    <input className="form-control" placeholder="Password Anda" value={password} onChange={(e) => SetPassword(e.target.value)} type="password" id="psw" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Harus berisi setidaknya satu angka dan satu huruf besar dan kecil, dan setidaknya 8 karakter atau lebih" required />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Konfirmasi Password</label>
                    <input type="password" className="form-control" placeholder="Password Anda" value={confpassword} onChange={(e) => SetConfpassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <Link to={"/"} className="btn btn-success mx-2">Login</Link>
            </form>
        </div>
    )
}
