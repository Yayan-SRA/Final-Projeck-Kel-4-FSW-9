import React, { useState, useEffect } from 'react'
import banner from "../../images/SecondHand.jpeg";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { login } from '../../actions/userAction';
import { useDispatch, useSelector } from "react-redux/es/exports";

function Login() {
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
      const { loginResult, loginLoading, loginError } = useSelector((state) => state.user)

    const dispatchEvent = useDispatch();
    // useEffect(() => {
    //     console.log("1. use effect component did mount");
    //     dispatchEvent(login())
    // }, [dispatchEvent])

    // console.log("coba", loginResult)
    // const apa = loginResult.id
    // console.log("coba2", apa)
    const handleSubmit = (event) => {
        event.preventDefault();

          dispatchEvent(login({
            email:email,
            password:password,
        }))
        // console.log("cobacoba", loginResult)
        // console.log("coba5", loginResult)
        // lanjut()
    }

    if(loginResult!==false){
        console.log("cobacoba", loginResult.verifikasi)
        // console.log("coba5", apa)
        const data = loginResult; 
        console.log("apajal", data.verifikasi)
        if (data.verifikasi !== "1") {
            setmsg("Email Belum Diverifikasi")
            SetLink(data.email)
            console.log("tes masuk")
            return
          }
          console.log("apa masuk sini?")
            axios.get("http://localhost:8000/user",
        {
          headers: {
            "Authorization": `Bearer ${data.accessToken}`
          }
        }
      )
      navigasi("/home")
    }

    // console.log("cobacoba", loginResult)
    // console.log("coba5", apa)
    // const lanjut = async () =>{
    //     // event.preventDefault();
    //     const data = loginResult;
    //     console.log("cobacoba", loginResult)
    //     console.log("coba5", apa)
    //     if (data.verifikasi != "1") {
    //         setmsg("Email Belum Diverifikasi")
    //         SetLink(data.email)
    //         return
    //       }
    //       await axios.get("http://localhost:8000/user",
    //     {
    //       headers: {
    //         "Authorization": `Bearer ${data.accessToken}`
    //       }
    //     }
    //   )
    //   await navigasi("/home")
    // }
  return (
<section>
<div className="wrapperLogin">
      <div className="secondhand-img-login">
        <img src={banner} width="100%" alt="" />
      </div>
      <form
        className="form-login" onSubmit={handleSubmit}>
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
</section>
  )
}

export default Login