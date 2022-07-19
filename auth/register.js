import { Link } from "react-router-dom"

import AuthIndex from "."
import Button from "../components/button"
import InputForm from "../components/inputForm"

export default function AuthRegister() {
  return (
    <AuthIndex
      title="Daftar"
    >
      <h4 className="fw-bold">
        Daftar
      </h4>
      <InputForm
        inputName="Nama"
        inputType="text"
        inputPlaceHolder="Nama Lengkap"
      />
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
        text="Daftar"
      />
      <div className="text-center mt-1 fw-semibold" style={{
        fontSize: "14px"
      }}>
        Sudah punya Akun?&nbsp;
        <Link to="/login" className="text-decoration-none">
          <span style={{ color: "#7126B5" }}>Masuk di sini</span>
        </Link>
      </div>
    </AuthIndex>
  )
}