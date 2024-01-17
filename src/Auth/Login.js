import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
// import BaseUrl from '../API/config';
import { BaseUrl } from '../API/config';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSuccessToast = () => {
    toast.success('Login successfully.', { autoClose: 2000 });
}

const initialValues = {
    email: "",
    password: "",
}


const Login = () => {
    const navigate = useNavigate()
    const [error, seterror] = useState()
    const [show, setshow] = useState(false)
    const token = localStorage.getItem('logintoken')


    const toggle = () => {
        setshow(!show)
    }
    console.log(show, "showwww")

    useEffect(() => {
        if (token === null) {
            navigate("/")
        } else {
            navigate("/admin/dashboard")
        }
    }, [])


    const signUpSchemas = yup.object({
        email: yup.string().email().required("Please Enter Your Email"),
        password: yup.string().min(5).required("Please Enter Your Password"),
    });

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: (values) => {
            console.log(values, "values")
            axios({
                url: `${BaseUrl}login`,
                method: 'POST',
                data: {
                    email: values.email,
                    password: values.password,
                }
            }).then((Response) => {
                // console.log(Response.data.data, "responcc .oppppppppp")
                const Adminlogintoken = Response?.data?.token
                const profile = Response?.data?.data
                localStorage.setItem('logintoken', Adminlogintoken)
                AdminSuccessToast();
                localStorage.setItem('Profiledata', JSON.stringify(profile))
                setTimeout(() => {
                    navigate('/admin/dashboard')
                }, 2000)
            }).catch((error) => {
                console.log(error)
                // console.log(error.response.data.message)
                seterror(error?.response?.data?.message)
                setTimeout(() => {
                    seterror()
                }, 4000)
            })
        }
    })

    const forgetpass = () => {
        navigate("/forget-password")
    }

    return (
        <div className="nk-body bg-white npc-default pg-auth">
            <div className="nk-app-root">
                {/* main @s */}
                <div className="nk-main ">
                    {/* wrap @s */}
                    <div className="nk-wrap nk-wrap-nosidebar">
                        {/* content @s */}
                        <div className="nk-content ">
                            <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                <div className="brand-logo pb-4 text-center">
                                    <a className="logo-link"  >
                                        {/* <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" /> */}
                                        <img className="logo-dark logo-img logo-img-lg"
                                            src="./images/minilogo.png"
                                            srcSet="./images/minilogo.png"
                                            alt="logo-dark"
                                            style={{ height: '300px', width: '70px' }} />
                                    </a>
                                </div>

                                <div className="card">
                                    <div className="card-inner card-inner-lg">
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h4 className="nk-block-title">Sign-In</h4>
                                                <div className="nk-block-des">
                                                    <p>Access the Bank316  panel using your email and passcode.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <div className="form-label-group">
                                                    <label className="form-label" htmlFor="default-01">Email or Username</label>
                                                </div>
                                                <div className="form-control-wrap">
                                                    <input type="text" className="form-control form-control-lg" id="default-01" placeholder="Enter your email address or username"
                                                        name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                                                    />
                                                    {error == "Please Enter the Correct Email and Password" ? <p className='red' style={{ marginTop: 5 }}>User Not Found</p> : errors.email && touched.email ? <p className='red' style={{ marginTop: 5 }}>{errors.email}</p> : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-label-group">
                                                    <label className="form-label" htmlFor="password">Passcode</label>
                                                    <a className="link  link-sm" style={{ cursor: 'pointer', color: "#163300" }} onClick={forgetpass}>Forgot Code?</a>
                                                </div>
                                                <div className="form-control-wrap">
                                                    <a className={show == false ? "form-icon form-icon-right passcode-switch lg is-hidden" : "form-icon form-icon-right passcode-switch lg is-shown"} data-target="password" >
                                                        <em className="passcode-icon icon-show icon ni ni-eye" onClick={toggle} style={{ cursor: "pointer" }} />
                                                        <em className="passcode-icon icon-hide icon ni ni-eye-off" onClick={toggle} style={{ cursor: "pointer" }} />
                                                    </a>
                                                    <input type={show == false ? "password" : "text"} className={show == false ? "form-control form-control-lg is-hidden" : "form-control form-control-lg is-shown"} id="password" placeholder="Enter your passcode"
                                                        name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}
                                                    />
                                                    {error == "Password is not match" ? <p className='red' style={{ marginTop: 5 }}>Password is not match</p> : errors.password && touched.password ? <p className='red' style={{ marginTop: 5 }}>{errors.password}</p> : null}
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <button className="btn btn-lg btn-block" type="submit" style={{ backgroundColor: "#163300", color: "#ffffff" }} >Sign in</button>
                                            </div>
                                        </form>
                                        {/* <div className="form-note-s2 text-center pt-4"> New on our platform? <a style={{ color: "#163300" }}>Create an account</a>
                                        </div>
                                        <div className="text-center pt-4 pb-3">
                                            <h6 className="overline-title overline-title-sap"><span>OR</span></h6>
                                        </div> */}
                                        {/* <ul className="nav justify-center gx-4">
                                            <li className="nav-item"><a className="nav-link" style={{ color: "#163300" }}>Facebook</a></li>
                                            <li className="nav-item"><a className="nav-link" style={{ color: "#163300" }}>Google</a></li>
                                        </ul> */}
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
            <ToastContainer />
        </div>

    );
}

export default Login;
