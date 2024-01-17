import React, { useState } from 'react'
import Container from '../../component/container'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { AddRoles } from '../../API/RoleApi/Role';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddSuccessToast = () => {
    toast.success('add successfully.', { autoClose: 2000 });
}

const addErrorToast = () => {
    toast.error('Data already exist !', {
        autoClose: 2000
    });
}


const AddRole = () => {
    const [loader, setloader] = useState(true)
    const prefix = process.env.REACT_APP_EMPLOYER_PRIFIX;
    const navigate = useNavigate()
    const employer = JSON.parse(localStorage.getItem("employer"))
    const token = localStorage.getItem("logintoken")
    // const token = employer.employer_token

    const [employeeData, setEmployeeData] = useState([]);

    const updateEmployeeData = (e, key) => {

        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setEmployeeData((prevData) => [...prevData, { value: checkboxValue, key }]);
        } else {
            setEmployeeData((prevData) => prevData.filter(item => item.value !== checkboxValue));
        }
    };



    const form = useFormik({
        initialValues: {
            title: "",
            permission_key: ""
        },

        enableReinitialize: true,

        validationSchema: yup.object({
            title: yup.string().required('Please Enter Role Title'),

        }),
        onSubmit: async (values) => {
            const data = {
                "title": values.title,
                "permissions": employeeData
            }
            console.log(data, "pppppppppppppppppppppppppppppppppp")

            const response = await AddRoles(data, token)
            console.log(response)
            if (response.status == true) {
                AddSuccessToast()
                // toast.success(response.message)
                setTimeout(() => {
                    navigate("/manage-roles")
                }, 1000)

            } else if (response.status == false) {
                console.log(response)
                // AddSuccessToast(response.message)
                addErrorToast()
            }
        }
    })

    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Add Role</h3>

                                    </div>{/* .nk-block-head-content */}
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>
                                            <div className="toggle-expand-content" data-content="pageMenu">
                                                <ul className="nk-block-tools g-3">
                                                    <li> <div className="nk-block-head-content" onClick={() => { navigate("/manage-roles") }}>
                                                        <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                                        <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></a>
                                                    </div></li>

                                                </ul>
                                            </div>
                                        </div>{/* .toggle-wrap */}
                                    </div>{/* .nk-block-head-content */}
                                </div>{/* .nk-block-between */}
                            </div>{/* .nk-block-head */}
                            <div className="nk-block">
                                <div className="card card-stretch">
                                    <div className="card-inner-group">
                                        {/* <div className="card-inner position-relative card-tools-toggle">
                                            <div className="card-title-group">


                                            </div>

                                        </div> */}



                                        <div className="card-inner p-0">
                                            <div className="nk-tb-list nk-tb-ulist">
                                                <div className="nk-tb-item nk-tb-head">
                                                    <div className="main-container container-fluid px-0">
                                                        {/* <div className="page-header">
                                                            <div className="page-leftheader"> */}
                                                        {/* <h4 className="page-title mb-0 text-primary">
                            {/ <Breadcrumbs order={{ first: { name: "User Management" } }} / > /}
                                < Breadcrumbs order={{ first: { name: "Manage Role", path: `${prefix}/managerole` }, second: { name: "Add Role" / , path: `${back}` / } }} />

                        </h4> */}
                                                        {/* </div>
                                                        </div> */}
                                                        <form className="row" id='registerForm'
                                                            onSubmit={form.handleSubmit}
                                                        >
                                                            <div className="row" style={{ padding: "2rem" }}>
                                                                <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label "><h6>Title</h6></label>
                                                                        <div className="row g-xs">
                                                                            <div className="input-group">
                                                                                <input type="text" className="form-control" placeholder="Enter Role Title" {...form.getFieldProps("title")} />
                                                                            </div>
                                                                            {form.touched.title && form.errors.title ?
                                                                                <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.title}</div> : ''}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br></br>

                                                                <div className="row mb-3">
                                                                    <label className="p-2"><h6>Customer</h6>
                                                                    </label>
                                                                    <div className="custom-controls-stacked d-flex mb-3">
                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "get_all_clients")}
                                                                            />
                                                                            <span className="custom-control-label"> Customer</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "get_single_client")}
                                                                            />
                                                                            <span className="custom-control-label">View single Customer</span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="row mb-3">
                                                                    <label className="p-2"><h6>Employee</h6>
                                                                    </label>
                                                                    <div className="custom-controls-stacked d-flex mb-3">
                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "employee_view")}
                                                                            />
                                                                            <span className="custom-control-label">View</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "employee_add")}
                                                                            />
                                                                            <span className="custom-control-label">Add Employee</span>
                                                                        </label>
                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "employee_edit")}
                                                                            />
                                                                            <span className="custom-control-label">Edit Employee</span>
                                                                        </label>
                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "employee_delete")}
                                                                            />
                                                                            <span className="custom-control-label">Delete Employee</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="p-2"><h6>Currency</h6>
                                                                    </label>
                                                                    <div className="custom-controls-stacked d-flex mb-3">
                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>


                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "get_all_currency")}
                                                                            />
                                                                            <span className="custom-control-label">View</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>

                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "get_single_currency")}
                                                                            />
                                                                            <span className="custom-control-label">View Single Currency</span>
                                                                        </label>


                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "Add_curency")}
                                                                            />
                                                                            <span className="custom-control-label">Add Currency</span>
                                                                        </label>


                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "update_currency")}
                                                                            />
                                                                            <span className="custom-control-label">Edit Currency</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "delete_currency")}
                                                                            />
                                                                            <span className="custom-control-label">Delete Currency</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="p-2"><h6>Wallet Icon</h6>
                                                                    </label>
                                                                    <div className="custom-controls-stacked d-flex mb-3">
                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "get_wallet_icons")}
                                                                            />
                                                                            <span className="custom-control-label">View</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "create_wallet")}
                                                                            />
                                                                            <span className="custom-control-label">Add Wallet Icon</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "update_wallet_icon")}
                                                                            />
                                                                            <span className="custom-control-label">Edit Wallet Icon</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "delete_wallet_icon")}
                                                                            />
                                                                            <span className="custom-control-label">Delete Wallet Icon</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                {/* 
                                                                <div className="row mb-3">
                                                                    <label className="p-2"><h6>Currency Wallet</h6>
                                                                    </label>
                                                                    <div className="custom-controls-stacked d-flex mb-3">
                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "get_all_currency_wallet_transaction")}
                                                                            />
                                                                            <span className="custom-control-label">View All Currency Wallet</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "get_single_currency_wallet_transaction")}
                                                                            />
                                                                            <span className="custom-control-label">View Single Currency Wallet</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "update_wallet_icon")}
                                                                            />
                                                                            <span className="custom-control-label">Edit Wallet Icon</span>
                                                                        </label>

                                                                        <label className="custom-control custom-checkbox diclamerpage" style={{ display: 'inline-flex', minHeight: '1.5rem', marginRight: '30px', }}>
                                                                            <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
                                                                                onChange={(e) => updateEmployeeData(e, "delete_wallet_icon")}
                                                                            />
                                                                            <span className="custom-control-label">Delete Wallet Icon</span>
                                                                        </label>
                                                                    </div>
                                                                </div> */}
                                                                <div className="col-md-12">
                                                                    <button type="submit" className="btn btn-primary mb-6 w-md mt-1">Add</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>{/* .nk-tb-list */}
                                        </div>{/* .card-inner */}
                                    </div>{/* .card-inner-group */}
                                </div>{/* .card */}
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div >
        </Container >
    )
}

export default AddRole
