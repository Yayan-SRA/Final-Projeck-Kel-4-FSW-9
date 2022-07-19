import { Link } from "react-router-dom"

import imgSecondHand from "../images/SecondHand.jpeg"

export default function AuthIndex({ title, children }) {
  document.title = `${title} - SecondHand`
  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row p-0 h-100">
          <div className="col-md-5 p-0 d-none d-md-block">
            <Link to="/">
              <img src={imgSecondHand} className="vh-100 w-100" alt="Second Hand" style={{
                objectFit: "cover",
                objectPosition: "left"
              }}></img>
            </Link>
          </div>
          <div className="col-md-7 p-0">
            <div className="d-grid align-items-center justify-content-center h-100">
              <form className="vw-100 p-3" style={{
                maxWidth: "420px"
              }} autoComplete="off">
                {children}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}