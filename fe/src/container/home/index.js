import React, { useState, useEffect } from "react";
import Carousel from "../../components/carousel/Index";
import Kategori from "../../components/kategori/Index";
import NavbarMain2 from "../../components/navbar/NavbarMain2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function SellerDaftarJual() {
  // const [nama,SetNama] =  useState("")
  const [token, SetToken] = useState("")
  // const { email } = useParams()
  const [user, SetUser] = useState("")
  const navigasi = useNavigate()

  useEffect(() => {
    refreshToken();
  }, [])

  const refreshToken = async () => {
    try {
      let response = await axios.get("http://localhost:8000/token", {
        withCredentials: true
      })
      SetToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      response = await axios.get("http://localhost:8000/user",
        {
          headers: {
            "Authorization": `Bearer ${response.data.accessToken}`,
          },
        }
      )
      if (response.data.verifikasi !== "1") {
        await axios.delete("http://localhost:8000/logout", {
          withCredentials: true
        })
        navigasi("/")
        return
      }

      response = await fetch(`http://localhost:8000/usernama/${decoded.email}`)
      const data = await response.json()
      SetUser(data)
    } catch (error) {
      navigasi("/")
    }
  }
  return (
    <div>
      <NavbarMain2 />
      <Carousel />
      <Kategori />
    </div>
  );
}
