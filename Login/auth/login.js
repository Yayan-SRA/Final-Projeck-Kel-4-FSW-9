import React from "react"
import { Link } from "react-router-dom"

import AuthIndex from "."
import Button from "../components/button"
import InputForm from "../components/inputForm"

export default function AuthLogin() {
  return (
    <AuthIndex
      title="Masuk"
    >
      <h4 className="fw-bold">
        Masuk
      </h4>
      <InputForm
        inputName="Email"
        inputType="email"
        inputPlaceHolder="youremail@example.com"
      />
      <InputForm
        inputName="Password"
        inputType="password"
        inputPlaceHolder="Masukkan Password"
      />
      <Button
        text="Masuk"
      />
      <div className="text-center mt-1 fw-semibold" style={{
        fontSize: "14px"
      }}>
        Belum punya Akun?&nbsp;
        <Link to="/register" className="text-decoration-none">
          <span style={{ color: "#7126B5" }}>Daftar di sini</span>
        </Link>
      </div>
    </AuthIndex>
  )
}