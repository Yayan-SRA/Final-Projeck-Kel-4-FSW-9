import { useState } from "react"

export default function InputForm({ inputName, inputType, inputPlaceHolder }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <div className="mb-3">
        {
          inputType === "password" ?
            (
              <>
                <label className="form-label mb-1 fs-6 fw-semibold" style={{
                  fontSize: "14px"
                }}>{inputName}</label>
                <div className="input-group mb-0">
                  <input type={showPassword ? "text" : "password"} className="form-control border-end-0 rounded-end-0 rounded-4 shadow-none py-2 ps-3 pe-0" placeholder={inputPlaceHolder} style={{
                    fontSize: "12px"
                  }} autoComplete="off"></input>
                  <span className="input-group-text bg-white border-start-0 rounded-start-0 rounded-4 py-2 px-3" onClick={(e) => { setShowPassword(showPassword ? false : true) }} style={{
                    cursor: "pointer"
                  }}>
                    {
                      showPassword ?
                        (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          </>
                        )
                        :
                        (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                          </>
                        )
                    }
                  </span>
                </div>
              </>
            )
            :
            (
              <>
                <label className="form-label mb-1 fs-6 fw-semibold" style={{
                  fontSize: "14px"
                }}>{inputName}</label>
                <input type={inputType} className="form-control rounded-4 shadow-none py-2 px-3" placeholder={inputPlaceHolder} style={{
                  fontSize: "12px"
                }} autoComplete="off"></input>
              </>
            )
        }
      </div>
    </>
  )
}