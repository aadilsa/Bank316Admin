import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <>

      <div className="nk-app-root">
        {/* main @s */}
        <div className="nk-main ">
          {/* wrap @s */}
          <div className="nk-wrap nk-wrap-nosidebar">
            {/* content @s */}
            <div className="nk-content ">
              <div className="nk-block nk-block-middle wide-xs mx-auto">
                <div className="nk-block-content nk-error-ld text-center">
                  <h1 className="nk-error-head">404</h1>
                  <h3 className="nk-error-title">Oops! Why you’re here?</h3>
                  <p className="nk-error-text">We are very sorry for inconvenience. It looks like you’re try to access a page that either has been deleted or never existed.</p>
                  <Link to={"/admin/dashboard"} className="btn btn-lg btn-primary mt-2">Back To Home</Link>
                </div>
              </div>{/* .nk-block */}
            </div>
            {/* wrap @e */}
          </div>
          {/* content @e */}
        </div>
        {/* main @e */}
      </div>


    </>
  )
}
