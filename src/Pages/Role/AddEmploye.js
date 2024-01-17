import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup';
import { GetRoledatatitle } from '../../API/RoleApi/Role';
import { AddEmployee } from '../../API/Employees/Employees';
import { toast } from 'react-toastify';
import Select from 'react-select';

import 'react-toastify/dist/ReactToastify.css';


const AddSuccessToast = (e) => {
    toast.success(e, { autoClose: 2000 });
}


const addErrorToast = (e) => {
    toast.error(e, {
        autoClose: 2000
    });
}



export const AddEmploye = () => {
    const [data, setdata] = useState([])
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const token = localStorage.getItem("logintoken")

    const phoneRegExp = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"


    const countryCodes = [
        { value: '+1', label: '+1 (United States)' },
        { value: '+44', label: '+44 (United Kingdom)' },
        { value: '+81', label: '+81 (Japan)' },
        { value: '+86', label: '+86 (China)' },
        { value: '+91', label: '+91 (India)' },
        { value: '+49', label: '+49 (Germany)' },
        { value: '+33', label: '+33 (France)' },
        { value: '+39', label: '+39 (Italy)' },
        { value: '+7', label: '+7 (Russia)' },
        { value: '+55', label: '+55 (Brazil)' },
        { value: '+81', label: '+81 (Japan)' },
        { value: '+82', label: '+82 (South Korea)' },
        { value: '+34', label: '+34 (Spain)' },
        { value: '+61', label: '+61 (Australia)' },
        { value: '+91', label: '+91 (India)' },
        { value: '+92', label: '+92 (Pakistan)' },
        { value: '+880', label: '+880 (Bangladesh)' },
        { value: '+234', label: '+234 (Nigeria)' },
        { value: '+62', label: '+62 (Indonesia)' },
        { value: '+92', label: '+92 (Pakistan)' },
        { value: '+27', label: '+27 (South Africa)' },
        { value: '+52', label: '+52 (Mexico)' },
        { value: '+1', label: '+1 (Canada)' },
        { value: '+46', label: '+46 (Sweden)' },
        { value: '+358', label: '+358 (Finland)' },
        { value: '+47', label: '+47 (Norway)' },
        { value: '+46', label: '+46 (Sweden)' },
        { value: '+41', label: '+41 (Switzerland)' },
        { value: '+31', label: '+31 (Netherlands)' },
        { value: '+32', label: '+32 (Belgium)' },
        { value: '+353', label: '+353 (Ireland)' },
        { value: '+44', label: '+44 (United Kingdom)' },
        { value: '+49', label: '+49 (Germany)' },
        { value: '+39', label: '+39 (Italy)' },
        { value: '+33', label: '+33 (France)' },
        { value: '+34', label: '+34 (Spain)' },
        { value: '+30', label: '+30 (Greece)' },
        { value: '+90', label: '+90 (Turkey)' },
        { value: '+972', label: '+972 (Israel)' },
        { value: '+20', label: '+20 (Egypt)' },
        { value: '+971', label: '+971 (United Arab Emirates)' },
        { value: '+966', label: '+966 (Saudi Arabia)' },
        { value: '+965', label: '+965 (Kuwait)' },
        { value: '+971', label: '+971 (United Arab Emirates)' },
        { value: '+65', label: '+65 (Singapore)' },
        { value: '+82', label: '+82 (South Korea)' },
        { value: '+81', label: '+81 (Japan)' },
        { value: '+86', label: '+86 (China)' },
        { value: '+852', label: '+852 (Hong Kong)' },
        { value: '+886', label: '+886 (Taiwan)' },
        { value: '+91', label: '+91 (India)' },
    ];




    const form = useFormik({
        initialValues: {
            employer_name: "",
            last_name: "",
            country_of_residence: "",
            email: "",
            phone_code: "",
            mobile_number: "",
            role: "",
            password: "",
            confirm_password: "",
            dob: "",
            post_code: "",
            apartment: "",
            street_housenumber: ""
        },

        initialValues: {
            employer_name: '',
            last_name: '',
            country_of_residence: '',
            email: '',
            phone_code: '',
            mobile_number: '',
            role: '',
            password: '',
            confirm_password: '',
            dob: '',
            post_code: '',
            apartment: '',
            street_housenumber: '',
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            employer_name: yup.string().required('Please Enter First Name'),
            last_name: yup.string().required('Please Enter Last Name'),
            dob: yup.date().max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'Must be 18 years or older').required('Please Enter Date Of Birth'),

            apartment: yup.string().required('Please Enter Apartment'),
            street_housenumber: yup.string().required('Please Enter Street House Number'),
            country_of_residence: yup.string().required('Please Enter Country Of Residence'),
            post_code: yup.string().required('Please Enter Post Code').min(1, 'Post Code Must Contain 1 Number'),
            phone_code: yup.string().required('Please Select Country Code'),
            mobile_number: yup.string().required('Please Enter Mobile Number').min(10, 'Mobile Number Must Contain 10 Number').max(15, 'Mobile Number Max Contain 15 Number'),
            email: yup.string().email('Invalid Email Address Format').required('Please Enter Email Address'),
            role: yup.string().required('Please select Role'),
            password: yup.string().required('Please Enter Password'),
            confirm_password: yup.string().required('Please Enter Confirm Password').oneOf([yup.ref('password'), null], 'Password Must Be Same'),
        }),

        onSubmit: async (values, { resetForm }) => {
            const data = {
                "firstname": values.employer_name,
                "lastname": values.last_name,
                "password": values.password,
                "email": values.email,
                "role_id": values.role,
                "phone": values.mobile_number,
                "phone_code": values.phone_code,
                "country_of_residence": values.country_of_residence,
                "dob": values.dob,
                "post_code": values.post_code,
                "street_housenumber": values.street_housenumber,
                "apartment": values.apartment
            };

            console.log(values, "daaatatat");
            const response = await AddEmployee(token, data);
            console.log(response);

            if (response.status == true) {
                AddSuccessToast(response.message);
                setTimeout(() => {
                    // Reset the form
                    resetForm();
                    // Navigate to '/manage-employee'
                    navigate('/manage-employee');
                }, 1000);
            } else {
                console.log(response);
                addErrorToast(response?.response?.data?.message
                );
            }
        }

    })


    const GoBack = () => {
        navigate("/manage-employee")
    }

    console.log(form.initialValues, "LLLLLLLLLLLLLLLLLLL")

    const GetRole = async () => {
        try {
            const totaldata = await GetRoledatatitle(token)
            console.log(totaldata, "->>>>>>>>>>>>>>>")
            if (totaldata.status == true) {
                setdata(totaldata.data.rows)
            }

            console.log(totaldata, "datatat roleeeeeeeeeeeeee")

        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetRole()
    }, [])




    return (
        <>
            <Container>
                <div className="nk-content ">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h3 className="nk-block-title page-title">Add employee</h3>
                                        </div>{/* .nk-block-head-content */}
                                        <div className="nk-block-head-content">
                                            <div className="toggle-wrap nk-block-tools-toggle">
                                                <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>
                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                    <ul className="nk-block-tools g-3">
                                                        <li>
                                                            <div className="nk-block-head-content" onClick={GoBack}>
                                                                <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                                                <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></a>
                                                            </div>
                                                            {/* <a className="btn btn-primary" onClick={GoBack}><em className="icon ni ni-plus" /><span>Add Role</span></a> */}
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>{/* .toggle-wrap */}
                                        </div>{/* .nk-block-head-content */}
                                    </div>{/* .nk-block-between */}
                                </div>{/* .nk-block-head */}





                                <div className="user-card">
                                    <div className="main-container container-fluid px-0">
                                        <div className="page-header">
                                            <div className="page-leftheader">
                                                <h4 className="page-title mb-0 text-primary">
                                                    {/* 
                        < Breadcrumbs order={{ first: { name: "Manage User", path: `${prefix}/manageuser` }, second: { name: "Add User" / , path: `${back}` / } }} /> */}

                                                </h4>
                                            </div>




                                            <form className="row" id='registerForm'
                                                onSubmit={form.handleSubmit}
                                            >
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-18">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">First Name</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input type="text" className={`form-control ${form.touched.employer_name && form.errors.employer_name ? 'is-invalid' : ''}`} placeholder="Enter Employee Name" {...form.getFieldProps("employer_name")} />
                                                                </div>
                                                                {form.touched.employer_name && form.errors.employer_name ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.employer_name}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-18">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Last Name</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input type="text" className={`form-control ${form.touched.last_name && form.errors.last_name ? 'is-invalid' : ''}`} placeholder="Enter LastName" {...form.getFieldProps("last_name")} />
                                                                </div>
                                                                {form.touched.last_name && form.errors.last_name ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.last_name}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Email</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input type="text" className={`form-control ${form.touched.email && form.errors.email ? 'is-invalid' : ''}`} placeholder="Enter Email ID" {...form.getFieldProps("email")} />
                                                                </div>
                                                                {form.touched.email && form.errors.email ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.email}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Country Code List</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <select
                                                                        className={`form-control ${form.touched.phone_code && form.errors.phone_code ? 'is-invalid' : ''}`}
                                                                        {...form.getFieldProps("phone_code")}
                                                                        onChange={(e) => {
                                                                            form.setFieldValue('phone_code', e.target.value);
                                                                            setSelectedCountryCode(e.target.value);
                                                                            // form.setFieldTouched('phone_code', true);
                                                                        }}

                                                                    >
                                                                        <option value="" disabled>Select Country Code</option>
                                                                        {countryCodes.map((code) => (
                                                                            <option key={code.value} value={code.value}>
                                                                                {code.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                {form.touched.phone_code && form.errors.phone_code && (
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>
                                                                        {form.errors.phone_code}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Mobile No.</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text">{selectedCountryCode}</span>
                                                                    </div>
                                                                    <input
                                                                        type="number"  // Change type to "text"
                                                                        className={`form-control ${form.touched.mobile_number && form.errors.mobile_number ? 'is-invalid' : ''}`}
                                                                        placeholder="Enter Mobile No."
                                                                        {...form.getFieldProps("mobile_number")}
                                                                    />
                                                                </div>
                                                                {form.touched.mobile_number && form.errors.mobile_number ? (
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>
                                                                        {form.errors.mobile_number}
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Date Of Birth</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input
                                                                        type="date"
                                                                        className={`form-control ${form.touched.dob && form.errors.dob ? 'is-invalid' : ''}`}
                                                                        placeholder="Enter Country Of Residence"
                                                                        {...form.getFieldProps("dob")}
                                                                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                                                                    />
                                                                </div>
                                                                {form.touched.dob && form.errors.dob ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.dob}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Country Of Residence</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input type="text" className={`form-control ${form.touched.country_of_residence && form.errors.country_of_residence ? 'is-invalid' : ''}`} placeholder="Enter Country Of Residence" {...form.getFieldProps("country_of_residence")} />
                                                                </div>
                                                                {form.touched.country_of_residence && form.errors.country_of_residence ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.country_of_residence}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Post Code</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input type="number" className={`form-control ${form.touched.post_code && form.errors.post_code ? 'is-invalid' : ''}`} placeholder="Enter Post Code" {...form.getFieldProps("post_code")} />
                                                                </div>
                                                                {form.touched.post_code && form.errors.post_code ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.post_code}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Street House Number</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input type="text" className={`form-control ${form.touched.street_housenumber && form.errors.street_housenumber ? 'is-invalid' : ''}`} placeholder="Enter House Number" {...form.getFieldProps("street_housenumber")} />
                                                                </div>
                                                                {form.touched.street_housenumber && form.errors.street_housenumber ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.street_housenumber}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Apartment</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input type="text" className={`form-control ${form.touched.apartment && form.errors.apartment ? 'is-invalid' : ''}`} placeholder="Enter Apartment" {...form.getFieldProps("apartment")} />
                                                                </div>
                                                                {form.touched.apartment && form.errors.apartment ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.apartment}</div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Role List</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <select
                                                                        className={`form-control mb-0 ${form.touched.role && (!form.values.role || form.errors.role) ? 'is-invalid' : ''}`}
                                                                        name="role"
                                                                        {...form.getFieldProps("role")}
                                                                        style={{ height: 40 }}
                                                                    >
                                                                        <option value="" disabled>Select Role</option>
                                                                        {data.map((e) => (
                                                                            <option key={e.role_id} value={e.role_id}>
                                                                                {e.title}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                {form.touched.role && (!form.values.role || form.errors.role) && (
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>
                                                                        {form.errors.role || 'Please select a valid role.'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Password</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        className={`form-control  ${form.touched.password && form.errors.password ? 'is-invalid' : ''}`}
                                                                        placeholder="Enter Password"
                                                                        {...form.getFieldProps("password")}
                                                                    />
                                                                    <span
                                                                        className="input-group-text"
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                    >
                                                                        {showPassword ? 'Hide' : 'Show'}
                                                                    </span>
                                                                </div>
                                                                {form.touched.password && form.errors.password ? (
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>
                                                                        {form.errors.password}
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                        <div className="form-group" style={{ marginTop: 20 }}>
                                                            <label className="form-label">Confirm Password</label>
                                                            <div className="row g-xs">
                                                                <div className="input-group" style={{ height: 40 }}>
                                                                    <input
                                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                                        className={`form-control  ${form.touched.confirm_password && form.errors.confirm_password ? 'is-invalid' : ''}`}
                                                                        placeholder="Enter Confirm Password"
                                                                        {...form.getFieldProps("confirm_password")}
                                                                    />
                                                                    <span
                                                                        className="input-group-text"
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                    >
                                                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                                                    </span>
                                                                </div>
                                                                {form.touched.confirm_password && form.errors.confirm_password ? (
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>
                                                                        {form.errors.confirm_password}
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <button type="submit" className="btn btn-primary mb-6 w-md mt-1">Add</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </Container >
        </>
    )
}
