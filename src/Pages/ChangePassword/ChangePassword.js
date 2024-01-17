import React, { useEffect, useState } from 'react';
import Container from '../../component/container';
import { useFormik } from 'formik';
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../../API/config';
// import { ChangePasswordAdmin } from '../../Api/ChangePasswordAPI/ChangePassword';
import { ChangePasswordAdmin } from '../../API/ChangePasswordAPI/ChangePassword';

const initialValues = {
    oldpassword: "",
    password: "",
    ConfirmPassword: "",
}

const AdminSuccessToast = () => {
    toast.success('Password Change successfully.', { autoClose: 2000 });
}


const UpdateFail = () => {
    toast.error('old password not match ', {
        autoClose: 2000
    });
}

const ChangePassword = () => {
    const navigate = useNavigate()
    const [error, seterror] = useState()
    const [show, setshow] = useState(false)
    const [showone, setshowone] = useState(false)
    const [showtwo, setshowtwo] = useState(false)
    const token = localStorage.getItem('logintoken')

    const toggle = () => {
        setshow(!show)
    }

    const toggleone = () => {
        setshowone(!showone)
    }

    const toggletwo = () => {
        setshowtwo(!showtwo)
    }
    const signUpSchemas = yup.object({
        oldpassword: yup.string().min(5).required("Please Enter Your Old Password"),
        password: yup.string().min(5).required("Please Enter Your Password"),
        ConfirmPassword: yup.string().required("Please Enter Confirm Password").oneOf([yup.ref('password'), null],
            "Password Must Match"
        )
    });

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: async (values) => {
            console.log(values, "valueess")
            console.log(values, "valuuuu")
            const data = {
                "oldPassword": values.oldpassword,
                "password": values.password,
                "confirmPassword": values.ConfirmPassword
            }
            try {
                const resp = await ChangePasswordAdmin(data, token)
                console.log(resp.status, "responce")
                // const result = resp.response.status
                if (resp.status == true) {
                    AdminSuccessToast()
                    setTimeout(() => {
                        navigate("/users")
                    }, 2000)
                }
                else {
                    UpdateFail()
                }
            }
            catch (errr) {
                UpdateFail()
                console.log(errr)
            }
        }
    })

    return (
        <>
            <Container>
                <div className="nk-body bg-white npc-default pg-auth">
                    <div className="nk-app-root">
                        {/* main @s */}
                        <div className="nk-main ">
                            {/* wrap @s */}
                            <div className="nk-wrap nk-wrap-nosidebar">
                                {/* content @s */}
                                <div className="nk-content ">
                                    <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                        <div className="card">
                                            <div className="card-inner card-inner-lg">
                                                <div className="nk-block-head">
                                                    <div className="nk-block-head-content">
                                                        <h4 className="nk-block-title">Change Password</h4>
                                                    </div>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <div className="form-label-group">
                                                            <label className="form-label" htmlFor="default-01">Old Password</label>
                                                        </div>
                                                        <div className="form-control-wrap">
                                                            <a className={show == false ? "form-icon form-icon-right passcode-switch lg is-hidden" : "form-icon form-icon-right passcode-switch lg is-shown"} data-target="oldpassword">
                                                                <em className="passcode-icon icon-show icon ni ni-eye" onClick={toggle} />
                                                                <em className="passcode-icon icon-hide icon ni ni-eye-off" onClick={toggle} />
                                                            </a>
                                                            <input type={show == false ? "password" : "text"} className={show == false ? "form-control form-control-lg is-hidden" : "form-control form-control-lg is-shown"} id="oldpassword" placeholder="Enter Password Old Password"
                                                                name="oldpassword" value={values.oldpassword} onChange={handleChange} onBlur={handleBlur} />
                                                            {errors.oldpassword && touched.oldpassword ? <p className='red' style={{ marginTop: 5 }}>{errors.oldpassword}</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-label-group">
                                                            <label className="form-label" htmlFor="default-01">New Password</label>
                                                        </div>
                                                        <div className="form-control-wrap">
                                                            <a className={showone == false ? "form-icon form-icon-right passcode-switch lg is-hidden" : "form-icon form-icon-right passcode-switch lg is-shown"} data-target="password">
                                                                <em className="passcode-icon icon-show icon ni ni-eye" onClick={toggleone} />
                                                                <em className="passcode-icon icon-hide icon ni ni-eye-off" onClick={toggleone} /></a>
                                                            <input type={showone == false ? "password" : "text"} className={showone == false ? "form-control form-control-lg is-hidden" : "form-control form-control-lg is-shown"} id="password" placeholder="Enter New Password"
                                                                name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                                            {errors.password && touched.password ? <p className='red' style={{ marginTop: 5 }}>{errors.password}</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-label-group">
                                                            <label className="form-label" htmlFor="password">Confrim Password</label>
                                                        </div>
                                                        <div className="form-control-wrap">
                                                            <a className={showtwo == false ? "form-icon form-icon-right passcode-switch lg is-hidden" : "form-icon form-icon-right passcode-switch lg is-shown"} data-target="ConfirmPassword">
                                                                <em className="passcode-icon icon-show icon ni ni-eye" onClick={toggletwo} />
                                                                <em className="passcode-icon icon-hide icon ni ni-eye-off" onClick={toggletwo} /></a>
                                                            <input type={showtwo == false ? "password" : "text"} className={showtwo == false ? "form-control form-control-lg is-hidden" : "form-control form-control-lg is-shown"} placeholder="Enter Confrim Password"
                                                                id='ConfirmPassword' name="ConfirmPassword" value={values.ConfirmPassword} onChange={handleChange} onBlur={handleBlur} />
                                                            {errors.ConfirmPassword && touched.ConfirmPassword ? <p className='red' style={{ marginTop: 5 }}>{errors.ConfirmPassword}</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group" >
                                                        <button className="btn btn-lg btn-block" type="submit" style={{ backgroundColor: "#163300", color: "#ffffff" }} >Change Password</button>
                                                    </div>
                                                </form>
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
            </Container>
        </>
    );
}

export default ChangePassword;
