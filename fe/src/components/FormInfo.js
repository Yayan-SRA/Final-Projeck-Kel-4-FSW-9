import React from "react";
import "./FormInfo.css";

export default function FormInfo() {
  return (
    <>
      <img className="back-arrow" src={require("../images/fi_arrow-left.png")} />
      <div className="form-profil">
        <div className="cam-profil">
          <img className="camera" src={require("../images/fi_camera.png")} />
        </div>
        <div className="formulir-info-profil">
          <label className="label-info-profil">
            Nama*
            <input type="text" className="input-text-profil" name="Nama" />
          </label>
          <label className="label-info-profil">
            Kota*
            <select className="input-text-profil" aria-label="Default select example">
              <option selected>Pilih Kota</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </label>
          <label className="label-info-profil-alamat">
            Alamat*
            <textarea className="input-text-profil" class="form-control" rows="3" placeholder="Contoh: Jalan Ikan Hiu 33"></textarea>
          </label>
          <label className="label-info-profil">
            No Handphone*
            <input type="text" className="input-text-profil" name="Contoh: +628123456789" />
          </label>
          <button className="button-simpan-profil">Simpan</button>
        </div>
      </div>
    </>
  );
}
