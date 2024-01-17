import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';


const initialValues = {
    email: "",
}


const ForgetPassword = () => {
    const navigate = useNavigate()

    const signUpSchemas = yup.object({
        email: yup.string().email().required("Please Enter Your Email"),
    });



    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: (values) => {

        }
    })







    const GoToLogin = () => {
        navigate("/")
    }



    return (
        <div classname=" class=&quot;nk-body bg-white npc-default pg-auth&quot;">
            <div className="nk-app-root">
                {/* main @s */}
                <div className="nk-main ">
                    {/* wrap @s */}
                    <div className="nk-wrap nk-wrap-nosidebar">
                        {/* content @s */}
                        <div className="nk-content ">
                            <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                <div className="brand-logo pb-4 text-center">
                                    <a className="logo-link">
                                        <img className="logo-light logo-img logo-img-lg" src="./images/Bank316money.png" srcSet="./images/Bank316money.png 2x" alt="logo" />
                                        <img className="logo-dark logo-img logo-img-lg" src="./images/Bank316money.png" srcSet="./images/Bank316money.png 2x" alt="logo-dark" />
                                    </a>
                                </div>
                                <div className="card">
                                    <div className="card-inner card-inner-lg">
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h5 className="nk-block-title">Reset password</h5>
                                                <div className="nk-block-des">
                                                    <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <div className="form-label-group">
                                                    <label className="form-label" htmlFor="default-01">Email</label>
                                                </div>
                                                <div className="form-control-wrap">
                                                    <input type="email" className="form-control form-control-lg" id="default-01" placeholder="Enter your email address"
                                                        name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                                                    />
                                                    {errors.email && touched.email ? <p className='red' style={{ marginTop: 5 }}>{errors.email}</p> : null}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-lg btn-primary btn-block" style={{ backgroundColor: "#163300", color: "#ffffff" }}> Reset Password</button>
                                            </div>
                                        </form>
                                        <div className="form-note-s2 text-center pt-4">
                                            <a onClick={GoToLogin} style={{ cursor: 'pointer' }}><strong>Return to login</strong></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-footer nk-auth-footer-full">
                                <div className="container wide-lg">
                                    <div className="row g-3">
                                        <div className="col-lg-6 order-lg-last">
                                            <ul className="nav nav-sm justify-content-center justify-content-lg-end">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Terms &amp; Condition</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Privacy Policy</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Help</a>
                                                </li>
                                                <li className="nav-item dropup">
                                                    <a className="dropdown-toggle dropdown-indicator has-indicator nav-link" data-bs-toggle="dropdown" data-offset="0,10"><span>English</span></a>
                                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                        <ul className="language-list">
                                                            <li>
                                                                <a href="#" className="language-item">
                                                                    <img src="./images/flags/english.png" alt className="language-flag" />
                                                                    <span className="language-name">English</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="language-item">
                                                                    <img src="./images/flags/spanish.png" alt className="language-flag" />
                                                                    <span className="language-name">Español</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="language-item">
                                                                    <img src="./images/flags/french.png" alt className="language-flag" />
                                                                    <span className="language-name">Français</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="language-item">
                                                                    <img src="./images/flags/turkey.png" alt className="language-flag" />
                                                                    <span className="language-name">Türkçe</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="nk-block-content text-center text-lg-left">
                                                <p className="text-soft">© 2023 CryptoLite. All Rights Reserved.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* wrap @e */}
                    </div>
                    {/* content @e */}
                </div>
                {/* main @e */}
            </div>
        </div>

    );

}

export default ForgetPassword;

