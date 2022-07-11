// import React, { useState } from "react";
import banner from "../../src/images/SecondHand.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
// import { Link } from "react-router-dom";

// export default function Login() {
//   let [showPassword, setShowPassword] = useState(false);
//   const checkShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")
  const [msg, setmsg] = useState("")
  const [link, SetLink] = useState("")
  // const [Users,SetUsers] =useState([])
  // const [User,SetUser] = useState([])
  const navigasi = useNavigate()
  let [showPassword, setShowPassword] = useState(false);
  const checkShowPassword = () =>
    setShowPassword(!showPassword);

  // useEffect(()=>{
  //     fetchdata()
  // });

  // const fetchdata = async()=>{
  //     const response= await fetch('http://localhost:8000')
  //     const data= await response.json()
  //     SetUsers(data)
  //     let m
  //     for(let i=0 ;i<data.length;i++){
  //         if(data[i].email==email){
  //             m=i
  //         }
  //     }
  //     SetUser(data[m])
  //     // console.log(data);
  // }

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      }, {
        withCredentials: true
      })
      // console.log(response.data);
      const data = await response.data
      if (data.verifikasi != "1") {
        setmsg("Email Belum Diverifikasi")
        SetLink(data.email)
        return
      }
      // if(email){
      //     SetLink(`http://localhost:konfirmasi/${data.email}`)
      //     return
      // }
      // const response1 = await fetch(`http://localhost:8000`)
      // const data1= await response1.json()
      // let m
      // for(let i=0 ;i<Users.length;i++){
      //     if(Users[i].email==email){
      //         m=i
      //     }
      // }
      // const data1 =  Users[m]
      // console.log(User);
      // SetUser(data[m])
      // console.log(data[m].refresh_token);
      // console.log(data1.accessToken);
      await axios.get("http://localhost:8000/user",
        {
          headers: {
            "Authorization": `Bearer ${data.accessToken}`
          }
        }
      )
      // console.log(data.accessToken);
      // console.log(Users);
      // console.log(data.accessToken);

      await navigasi("/home")
    } catch (error) {
      if (error.response) {
        setmsg(error.response.data.msg)
        console.log(error.response.data);
      }
    }
  }

  return (
    <div className="wrapperLogin">
      <div className="secondhand-img-login">
        <img src={banner} width="100%" alt="" />
      </div>
      <form
        className="form-login" onSubmit={login}>
        <h5 className='text-center'>
          {msg}<span style={{ display: "block" }} className='mx-1'>
            {link == "" ? "" : <Link style={{ textDecoration: "none" }} to={`/konfirmasi/${link}`}>Verifikasi Sekarang!</Link>}
          </span>
        </h5>
        <h3 className="title-text-login">Login</h3>
        <label className="label-info-login">Email</label>
        <input type="text" className="input-text-login" placeholder="Email Anda" name="email" value={email} onChange={(e) => SetEmail(e.target.value)} />
        <label className="label-info-login">Password</label>
        <div>
          <input type={showPassword ? "password" : "text"} className="input-text-login" placeholder="Masukkan password" name="password" value={password} onChange={(e) => SetPassword(e.target.value)}>
            {/* add icon eyes*/}
          </input>
          <button className="icon-password-login">{showPassword ? <BsEyeSlash onClick={checkShowPassword} /> : <BsEye onClick={checkShowPassword} />}</button>
        </div>
        {/* <Link to="/home">
          <button className="button-simpan-login">Masuk</button>
        </Link> */}
        <button type="submit" className="button-simpan-login">Masuk</button>
        <label className="text-login">
          <h6>
            Belum punya akun?{" "}
            <Link to="/register">
              <span style={{ color: "#7126B5" }}>Daftar di sini</span>
            </Link>
          </h6>
        </label>
      </form>
    </div >
  );

}