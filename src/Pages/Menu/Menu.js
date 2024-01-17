import React, { useEffect, useState } from 'react';
import Container from '../../component/container';
import { GetPermissiondata } from '../../API/MenuAPi/Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup"
import { deleteMenudata, AddPermission, getMenuById, updateMenu } from '../../API/MenuAPi/Menu';

const initialValues = {
    name: "",
}


const AdminSuccessToast = () => {
    toast.success('add successfully.', { autoClose: 2000 });
}
const DeleteToast = () => {
    toast.error('Delete successfully !', {
        autoClose: 2000
    });
}

const errorToast = () => {

    toast.error('data already exists !', {

    });
}

const Updatesucess = () => {
    toast.success('Update successfully.', { autoClose: 2000 });
}

const UpdateFail = () => {
    toast.error('data already exists ', {
        autoClose: 2000
    });

}


const Menu = () => {
    const token = localStorage.getItem("logintoken")
    const [Permission, setPermission] = useState([])
    const [total, settotal] = useState()


    const [id, setid] = useState()
    const [status, setstatus] = useState("ACTIVE")

    const [name, setname] = useState()
    const [upstatus, setupstatus] = useState("")
    const ref2 = useRef()


    const signUpSchemas = yup.object({
        name: yup.string().min(3).required("Please Enter Your Name"),
    });




    const deletePermision = async () => {
        try {
            const userdelete = await deleteMenudata(id, token)
            console.log(userdelete, "Role delele")
            DeleteToast()
            GetMenu()
        }
        catch (err) {
            console.log(err, "err")
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: async (values, action) => {
            console.log(values, status, "vallalala")
            const data = {
                name: values.name,
                status: status
            }
            const resp = await AddPermission(data, token)
            console.log(resp.status, "resppspspspspspsp")
            if (resp.status == true) {

                AdminSuccessToast()
                ref2.current.click()
                action.resetForm()
            }
            else {
                errorToast()
            }
            GetMenu()
            setstatus("ACTIVE")


        }
    })



    const GetMenu = async () => {
        try {
            const totaldata = await GetPermissiondata(token)
            setPermission(totaldata.data.rows)
            settotal(totaldata.data.count)
            console.log(totaldata.data, "totaldata")

        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        GetMenu()
    }, [])



    const GetMenudatabyId = async () => {
        try {
            const resp = await getMenuById(token, id)
            console.log(resp, "responce")
            setname(resp?.data?.name)
            setupstatus(resp?.data?.status)

        }
        catch (err) {
            console.log(err)
        }
    }

    const PermissionEdit = async (e) => {
        e.preventDefault()
        const data = {
            name: name,
            status: upstatus
        }

        const resp = await updateMenu(token, data, id)
        GetMenu()
        if (resp.status == true) {
            Updatesucess()

        }
        else {
            UpdateFail()
        }
        console.log(resp, "responce")


    }



    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const handleCheckboxChange = (roleId) => {
        if (selectedRoleId === roleId) {
            setSelectedRoleId(null);
        } else {
            setSelectedRoleId(roleId);
        }
    };





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
                                            <h3 className="nk-block-title page-title">Permission Lists</h3>
                                            <div className="nk-block-des text-soft">
                                                <p>You have total {total} Permission.</p>
                                            </div>
                                        </div>{/* .nk-block-head-content */}
                                        <div className="nk-block-head-content">
                                            <div className="toggle-wrap nk-block-tools-toggle">
                                                <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>
                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                    <ul className="nk-block-tools g-3">
                                                        <li><a className="btn btn-white btn-outline-light"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>
                                                        <li className="nk-block-tools-opt">
                                                            <div className="drodown">
                                                                <a className="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="dropdown"><em className="icon ni ni-plus" /></a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        <li data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><a ><span>Add User</span></a></li>
                                                                        <li><a ><span>Add Team</span></a></li>
                                                                        <li><a ><span>Import User</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>{/* .toggle-wrap */}
                                        </div>{/* .nk-block-head-content */}
                                    </div>{/* .nk-block-between */}
                                </div>{/* .nk-block-head */}
                                <div className="nk-block">
                                    <div className="card card-stretch">
                                        <div className="card-inner-group">
                                            <div className="card-inner position-relative card-tools-toggle">
                                                <div className="card-title-group">
                                                    <div className="card-tools">
                                                        <div className="form-inline flex-nowrap gx-3">
                                                            <div className="form-wrap w-150px">
                                                                <select className="form-select js-select2" data-search="off" data-placeholder="Bulk Action">
                                                                    <option value>Bulk Action</option>
                                                                    <option value="email">Send Email</option>
                                                                    <option value="group">Change Group</option>
                                                                    <option value="suspend">Suspend User</option>
                                                                    <option value="delete">Delete User</option>
                                                                </select>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <span className="d-none d-md-block"><button className="btn btn-dim btn-outline-light disabled">Apply</button></span>
                                                                <span className="d-md-none"><button className="btn btn-dim btn-outline-light btn-icon disabled"><em className="icon ni ni-arrow-right" /></button></span>
                                                            </div>
                                                        </div>{/* .form-inline */}
                                                    </div>{/* .card-tools */}
                                                    <div className="card-tools me-n1">
                                                        <ul className="btn-toolbar gx-1">
                                                            <li>
                                                                <a className="btn btn-icon search-toggle toggle-search" data-target="search"><em className="icon ni ni-search" /></a>
                                                            </li>{/* li */}
                                                            <li className="btn-toolbar-sep" />{/* li */}
                                                            <li>
                                                                <div className="toggle-wrap">
                                                                    <a className="btn btn-icon btn-trigger toggle" data-target="cardTools"><em className="icon ni ni-menu-right" /></a>
                                                                    <div className="toggle-content" data-content="cardTools">
                                                                        <ul className="btn-toolbar gx-1">
                                                                            <li className="toggle-close">
                                                                                <a className="btn btn-icon btn-trigger toggle" data-target="cardTools"><em className="icon ni ni-arrow-left" /></a>
                                                                            </li>{/* li */}
                                                                            <li>
                                                                                <div className="dropdown">
                                                                                    <a className="btn btn-trigger btn-icon dropdown-toggle" data-bs-toggle="dropdown">
                                                                                        <div className="dot dot-primary" />
                                                                                        <em className="icon ni ni-filter-alt" />
                                                                                    </a>
                                                                                    <div className="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-end">
                                                                                        <div className="dropdown-head">
                                                                                            <span className="sub-title dropdown-title">Filter Users</span>
                                                                                            <div className="dropdown">
                                                                                                <a className="btn btn-sm btn-icon">
                                                                                                    <em className="icon ni ni-more-h" />
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="dropdown-body dropdown-body-rg">
                                                                                            <div className="row gx-6 gy-3">
                                                                                                <div className="col-6">
                                                                                                    <div className="custom-control custom-control-sm custom-checkbox">
                                                                                                        <input type="checkbox" className="custom-control-input" id="hasBalance" />
                                                                                                        <label className="custom-control-label" htmlFor="hasBalance"> Have Balance</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-6">
                                                                                                    <div className="custom-control custom-control-sm custom-checkbox">
                                                                                                        <input type="checkbox" className="custom-control-input" id="hasKYC" />
                                                                                                        <label className="custom-control-label" htmlFor="hasKYC"> KYC Verified</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-6">
                                                                                                    <div className="form-group">
                                                                                                        <label className="overline-title overline-title-alt">Role</label>
                                                                                                        <select className="form-select js-select2">
                                                                                                            <option value="any">Any Role</option>
                                                                                                            <option value="investor">Investor</option>
                                                                                                            <option value="seller">Seller</option>
                                                                                                            <option value="buyer">Buyer</option>
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-6">
                                                                                                    <div className="form-group">
                                                                                                        <label className="overline-title overline-title-alt">Status</label>
                                                                                                        <select className="form-select js-select2">
                                                                                                            <option value="any">Any Status</option>
                                                                                                            <option value="active">Active</option>
                                                                                                            <option value="pending">Pending</option>
                                                                                                            <option value="suspend">Suspend</option>
                                                                                                            <option value="deleted">Deleted</option>
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-12">
                                                                                                    <div className="form-group">
                                                                                                        <button type="button" className="btn btn-secondary">Filter</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="dropdown-foot between">
                                                                                            <a className="clickable" >Reset Filter</a>
                                                                                            <a >Save Filter</a>
                                                                                        </div>
                                                                                    </div>{/* .filter-wg */}
                                                                                </div>{/* .dropdown */}
                                                                            </li>{/* li */}
                                                                            <li>
                                                                                <div className="dropdown">
                                                                                    <a className="btn btn-trigger btn-icon dropdown-toggle" data-bs-toggle="dropdown">
                                                                                        <em className="icon ni ni-setting" />
                                                                                    </a>
                                                                                    <div className="dropdown-menu dropdown-menu-xs dropdown-menu-end">
                                                                                        <ul className="link-check">
                                                                                            <li><span>Show</span></li>
                                                                                            <li className="active"><a >10</a></li>
                                                                                            <li><a >20</a></li>
                                                                                            <li><a >50</a></li>
                                                                                        </ul>
                                                                                        <ul className="link-check">
                                                                                            <li><span>Order</span></li>
                                                                                            <li className="active"><a >DESC</a></li>
                                                                                            <li><a >ASC</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>{/* .dropdown */}
                                                                            </li>{/* li */}
                                                                        </ul>{/* .btn-toolbar */}
                                                                    </div>{/* .toggle-content */}
                                                                </div>{/* .toggle-wrap */}
                                                            </li>{/* li */}
                                                        </ul>{/* .btn-toolbar */}
                                                    </div>{/* .card-tools */}
                                                </div>{/* .card-title-group */}
                                                <div className="card-search search-wrap" data-search="search">
                                                    <div className="card-body">
                                                        <div className="search-content">
                                                            <a className="search-back btn btn-icon toggle-search" data-target="search"><em className="icon ni ni-arrow-left" /></a>
                                                            <input type="text" className="form-control border-transparent form-focus-none" placeholder="Search by user or email" />
                                                            <button className="search-submit btn btn-icon"><em className="icon ni ni-search" /></button>
                                                        </div>
                                                    </div>
                                                </div>{/* .card-search */}
                                            </div>{/* .card-inner */}
                                            <div className="card-inner p-0">
                                                <div className="nk-tb-list nk-tb-ulist">
                                                    <div className="nk-tb-item nk-tb-head">
                                                        <div className="nk-tb-col nk-tb-col-check">
                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" className="custom-control-input" id="uid" />
                                                                <label className="custom-control-label" htmlFor="uid" />
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col"><span className="sub-text">User</span></div>
                                                        {/* <div className="nk-tb-col tb-col-mb"><span className="sub-text">Balance</span></div> */}
                                                        {/* <div className="nk-tb-col tb-col-md"><span className="sub-text">Phone</span></div> */}
                                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Verified</span></div>
                                                        {/* <div className="nk-tb-col tb-col-lg"><span className="sub-text">Last Login</span></div> */}

                                                        <div className="nk-tb-col nk-tb-col-tools text-end">
                                                            <div className="dropdown">
                                                                <a className="btn btn-xs btn-outline-light btn-icon dropdown-toggle" data-bs-toggle="dropdown" data-offset="0,5"><em className="icon ni ni-plus" /></a>
                                                                <div className="dropdown-menu dropdown-menu-xs dropdown-menu-end">
                                                                    <ul className="link-tidy sm no-bdr">
                                                                        {/* <li>
                                                                            <div className="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" className="custom-control-input" defaultChecked id="bl" />
                                                                                <label className="custom-control-label" htmlFor="bl">Balance</label>
                                                                            </div>
                                                                        </li> */}
                                                                        <li>
                                                                            <div className="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" className="custom-control-input" defaultChecked id="ph" />
                                                                                <label className="custom-control-label" htmlFor="ph">Phone</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" className="custom-control-input" id="vri" />
                                                                                <label className="custom-control-label" htmlFor="vri">Verified</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" className="custom-control-input" id="st" />
                                                                                <label className="custom-control-label" htmlFor="st">Status</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        Permission.length > 0 && Permission.map((data) => {
                                                            return (
                                                                <div className="nk-tb-item" key={data.id}>
                                                                    <div className="nk-tb-col nk-tb-col-check">
                                                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                            <input type="checkbox" className="custom-control-input"
                                                                                id={`uid_${data.id}`}
                                                                                checked={selectedRoleId === data.id}
                                                                                onChange={() => handleCheckboxChange(data.id)}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={`uid_${data.id}`} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card">
                                                                                <div className="user-info">
                                                                                    <span className="tb-lead">{data.name}<span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    <span></span>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>

                                                                    {
                                                                        data.status == "ACTIVE" ? <div className="nk-tb-col tb-col-md">
                                                                            <span className="tb-status text-success">{data.status}</span>
                                                                        </div> : <div className="nk-tb-col tb-col-md">
                                                                            <span className="tb-status text-danger">{data.status}</span>
                                                                        </div>
                                                                    }
                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">
                                                                            <li className="nk-tb-action-hidden">
                                                                                <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Wallet">
                                                                                    <em className="icon ni ni-wallet-fill" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="nk-tb-action-hidden">
                                                                                <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                                    <em className="icon ni ni-mail-fill" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="nk-tb-action-hidden">
                                                                                <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                                    <em className="icon ni ni-user-cross-fill" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <div className="drodown">
                                                                                    <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" onClick={() => { setid(data.id) }} /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">
                                                                                            <li><a ><em className="icon ni ni-focus" /><span>Quick View</span></a></li>
                                                                                            <li><a ><em className="icon ni ni-eye" /><span>View Details</span></a></li>
                                                                                            <li style={{ color: "blue", cursor: "pointer" }} onClick={() => GetMenudatabyId()} data-bs-toggle="modal" data-bs-target="#exampledit" data-bs-whatever="@mdo" ><a ><em className="icon ni ni-edit" /><span>Edit</span></a></li>
                                                                                            <li style={{ color: "red", cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-danger"> <a ><em className="icon ni ni-trash" /><span>Delete</span></a></li>
                                                                                            <li className="divider" />
                                                                                            <li><a ><em className="icon ni ni-shield-star" /><span>Reset Pass</span></a></li>
                                                                                            <li><a ><em className="icon ni ni-shield-off" /><span>Reset 2FA</span></a></li>
                                                                                            <li><a ><em className="icon ni ni-na" /><span>Suspend User</span></a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                            )

                                                        })
                                                    }






                                                </div>{/* .nk-tb-list */}
                                            </div>{/* .card-inner */}
                                            <div className="card-inner">
                                                <div className="nk-block-between-md g-3">
                                                    <div className="g">
                                                        <ul className="pagination justify-content-center justify-content-md-start">
                                                            <li className="page-item"><a className="page-link" >Prev</a></li>
                                                            <li className="page-item"><a className="page-link" >1</a></li>
                                                            <li className="page-item"><a className="page-link" >2</a></li>
                                                            <li className="page-item"><span className="page-link"><em className="icon ni ni-more-h" /></span></li>
                                                            <li className="page-item"><a className="page-link" >6</a></li>
                                                            <li className="page-item"><a className="page-link" >7</a></li>
                                                            <li className="page-item"><a className="page-link" >Next</a></li>
                                                        </ul>{/* .pagination */}
                                                    </div>
                                                    <div className="g">
                                                        <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                                                            <div>Page</div>
                                                            <div>
                                                                <select className="form-select js-select2" data-search="on" data-dropdown="xs center">
                                                                    <option value="page-1">1</option>
                                                                    <option value="page-2">2</option>
                                                                    <option value="page-4">4</option>
                                                                    <option value="page-5">5</option>
                                                                    <option value="page-6">6</option>
                                                                    <option value="page-7">7</option>
                                                                    <option value="page-8">8</option>
                                                                    <option value="page-9">9</option>
                                                                    <option value="page-10">10</option>
                                                                    <option value="page-11">11</option>
                                                                    <option value="page-12">12</option>
                                                                    <option value="page-13">13</option>
                                                                    <option value="page-14">14</option>
                                                                    <option value="page-15">15</option>
                                                                    <option value="page-16">16</option>
                                                                    <option value="page-17">17</option>
                                                                    <option value="page-18">18</option>
                                                                    <option value="page-19">19</option>
                                                                    <option value="page-20">20</option>
                                                                </select>
                                                            </div>
                                                            <div>OF 102</div>
                                                        </div>
                                                    </div>{/* .pagination-goto */}
                                                </div>{/* .nk-block-between */}
                                            </div>{/* .card-inner */}
                                        </div>{/* .card-inner-group */}
                                    </div>{/* .card */}
                                </div>{/* .nk-block */}
                            </div>
                        </div>
                    </div>
                </div>




                <div className="modal fade" id="exampledit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Permission</h5>
                                <button type="button" ref={ref2} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={PermissionEdit}>


                                    <div className="mb-3">
                                        <label for="recipient-name" className="col-form-label">Name</label>
                                        <input type="text" className="form-control" id="recipient-name" placeholder='Please Enter your Name'
                                            value={name} onChange={(e) => { setname(e.target.value) }}
                                        />

                                    </div>

                                    <div className="mb-3">
                                        <div className="col"
                                            onChange={(e) => { setupstatus(e.target.value) }}
                                        >

                                            {
                                                upstatus == "ACTIVE" ? <label className="form-check">
                                                    <input className="form-check-input" type="radio" checked value={"ACTIVE"} />
                                                    <span className="form-check-label">Active</span>
                                                </label> : <label className="form-check">
                                                    <input className="form-check-input" type="radio" value={"ACTIVE"} />
                                                    <span className="form-check-label"> Active</span>
                                                </label>
                                            }
                                            {
                                                upstatus == "INACTIVE" ? <label className="form-check">
                                                    <input className="form-check-input" type="radio" checked value={"INACTIVE"} />
                                                    <span className="form-check-label">Inactive</span>
                                                </label> :
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="radio" value={"INACTIVE"} />
                                                        <span className="form-check-label">Inactive</span>
                                                    </label>

                                            }

                                        </div>
                                    </div>




                                    <div className="modal-footer">

                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>










                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Menu</h5>
                                <button type="button" ref={ref2} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label for="recipient-name" className="col-form-label">Name</label>
                                        <input type="text" className="form-control" id="recipient-name" placeholder='Please Enter your Name'
                                            name="name" value={values.name} onChange={handleChange} onBlur={handleBlur}
                                        />
                                        {errors.name && touched.name ? <p className='red' style={{ marginTop: 5 }}>{errors.name}</p> : null}
                                    </div>
                                    <div className="mb-3">
                                        {
                                            status == "ACTIVE" &&
                                            <div className="col"
                                                onChange={(e) => { setstatus(e.target.value) }}
                                            >
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" defaultChecked name="flexRadioDefault" id="flexRadioDefault1" value={"ACTIVE"} />
                                                    <span className="form-check-label">    Active</span>
                                                </label>
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"INACTIVE"} />
                                                    <span className="form-check-label">    Inactive</span>
                                                </label>
                                            </div>
                                        }

                                        {
                                            status == "INACTIVE" &&
                                            <div className="col"
                                                onChange={(e) => { setstatus(e.target.value) }}
                                            >
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"ACTIVE"} />
                                                    <span className="form-check-label">    Active</span>
                                                </label>
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" defaultChecked name="flexRadioDefault" id="flexRadioDefault1" value={"INACTIVE"} />
                                                    <span className="form-check-label">    Inactive</span>
                                                </label>
                                            </div>
                                        }

                                    </div>


                                    <div className="modal-footer">
                                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">Close</button> */}
                                        <button type="submit" className="btn btn-primary">Add</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>




                <div className="modal modal-blur fade" id="modal-danger" tabIndex={-1} role="dialog" aria-hidden="true" data-bs-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                        <div className="modal-content">

                            <div className="modal-status " style={{ backgroundColor: '#1a48aa' }} />
                            <div className="modal-body text-center py-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon mb-2 icon-lg" style={{ color: '#1a48aa' }} width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 9v2m0 4v.01" /><path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" /></svg>
                                <h3>Are you sure?</h3>
                                <div className="text-muted">Do you really want to remove this Offer Data?</div>
                            </div>
                            <div className="modal-footer">
                                <div className="w-100">
                                    <div className="row">
                                        <div className="col"><a className="btn w-100" data-bs-dismiss="modal" style={{ backgroundColor: '#1a48aa', color: 'white' }}>
                                            Cancel
                                        </a></div>
                                        <div className="col"><button className="btn btn-danger w-100" data-bs-dismiss="modal"
                                            onClick={() => deletePermision()}
                                        >
                                            Delete
                                        </button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Container>

        </>
    );
}

export default Menu;
