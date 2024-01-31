import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
// import BaseUrl from '../API/config';
import { BaseUrl } from '../API/config';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Pages/Loader/Loader';

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


    const auther = localStorage.getItem("logintoken") !== null && localStorage.getItem("logintoken") !== undefined && localStorage.getItem("logintoken") !== "" ? true : false
    return (
        <>

            {
                auther == false &&
                <div className="login-page-new">
                    <div className="container-fluid pt-3">
                        <div className="row pddd align-items-center justify-betweenBox">
                            <div className="col-6">
                                <img src="./images/Bank316Money.png" alt="" style={{ width: '125px', }} />
                            </div>
                            <div className="col-6">
                                <p className="signUpFlex"><span>Don't have an account? </span>
                                    <a href='' className="signUpBtn">Request Access</a></p>
                            </div>
                        </div>
                    </div>

                    <div class="login-page-new__main-top-divider"></div>
                    <div className="login-page-new__main">
                        <div class="login-page-new__main-bg"></div>
                        <div className="card newLoginBox">
                            <div className="card-inner pno">
                                <div className="nk-block-head">
                                    <div className="nk-block-head-content text-center">
                                        <h4 className="nk-block-title welcomeTxt">Welcome back admin !</h4>
                                        {/*<div className="nk-block-des">
                        <p>Access the Bank316  panel using your email and passcode.</p>
                    </div>*/}
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <div className="form-label-group">
                                            <label className="form-label loginLabel" htmlFor="default-01">Email</label>
                                        </div>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control form-control-lg" id="default-01" placeholder="Enter your email"
                                                name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                                            />
                                            {error == "Please Enter the Correct Email and Password" ? <p className='red' style={{ marginTop: '0px', fontWeight: '500', fontSize: '10px', }}>User Not Found</p> : errors.email && touched.email ? <p className='red' style={{ marginTop: '0px', fontWeight: '500', fontSize: '10px', }}>{errors.email}</p> : null}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="form-label-group">
                                            <label className="form-label loginLabel" htmlFor="password">Password</label>
                                            <a className="link  link-sm" style={{ cursor: 'pointer', color: "#163300" }} onClick={forgetpass}>Forgot Password?</a>
                                        </div>
                                        <div className="form-control-wrap">
                                            <a style={{ height: '40px,' }} className={show == false ? "form-icon form-icon-right passcode-switch lg is-hidden" : "form-icon form-icon-right passcode-switch lg is-shown"} data-target="password" >
                                                <em className="passcode-icon icon-show icon ni ni-eye" onClick={toggle} style={{ cursor: "pointer" }} />
                                                <em className="passcode-icon icon-hide icon ni ni-eye-off" onClick={toggle} style={{ cursor: "pointer" }} />
                                            </a>
                                            <input type={show == false ? "password" : "text"} className={show == false ? "form-control form-control-lg is-hidden" : "form-control form-control-lg is-shown"} id="password" placeholder="Enter your password"
                                                name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}
                                            />
                                            {error == "Password is not match" ? <p className='red' style={{ marginTop: '0px', fontWeight: '500', fontSize: '10px', }}>Password is not match</p> : errors.password && touched.password ? <p className='red' style={{ marginTop: '0px', fontWeight: '500', fontSize: '10px', }}>{errors.password}</p> : null}
                                        </div>
                                    </div>
                                    <div className="form-group" >
                                        <button className="btn btn-lg btn-block" type="submit" style={{ backgroundColor: "#163300", color: "#ffffff" }} >Log In</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="login-page-new__main-bot">
                            <div class="login-page-new__main-bot-text ng-star-inserted"> Don't have an account?
                                <a data-test="login__main-bot-text-link" class="login-page-new__main-bot-text-link" href=""> Request Access</a>
                            </div>
                        </div>

                    </div>
                    <ToastContainer />
                </div>
            }





        </>






    );
}

export default Login;
