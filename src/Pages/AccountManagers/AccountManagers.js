import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { GetAccountManager, AddAccountManager, deleteAccountManager } from '../../API/AccountManagerApi/AccManager'
// import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Image } from 'antd';
import Loader from '../Loader/Loader';
import { useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


const initialValues = {
    name: "",
    email: "",
}

const AccountManagers = () => {
    const [data, setdata] = useState([])
    const [search, setsearch] = useState("")
    const [count, setcount] = useState(0)
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const [loader, setloader] = useState(true)
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [id, setid] = useState()
    const [updatename, setupdatename] = useState()
    const [updatEmail, setupdatEmail] = useState()
    const token = localStorage.getItem("logintoken")
    const navigate = useNavigate()
    const ref2 = useRef()


    const signUpSchemas = yup.object({
        name: yup.string().min(3).required("Please Enter Name "),
        email: yup.string().min(3).required("Please Enter Email"),

    });



    const AddSuccessToast = (e) => {
        toast.success(e, { autoClose: 2000 });
    }

    const DeleteToast = () => {
        toast.success('Delete successfully.', { autoClose: 2000 });
    }


    const addErrorToast = (e) => {
        toast.error(e, {
            autoClose: 2000
        });
    }


    // let resetFormFunction;
    const form = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: async (values, action) => {
            console.log("aDDDDDDDDDDDDDDDD")
            try {
                const Data = {
                    name: values.name,
                    email: values.email
                }
                const addNewCurrency = await AddAccountManager(token, Data)
                if (addNewCurrency.status == true) {
                    ref2.current.click()
                    action.resetForm()
                    AddSuccessToast(addNewCurrency.message)
                    AllAccountManager()
                    console.log(addNewCurrency.message, "?????????????")
                }
                else {
                    console.log(addNewCurrency?.response?.data?.message, "?????????????")
                    addErrorToast(addNewCurrency?.response?.data?.message)
                    ref2.current.click()
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    })




    const AllAccountManager = async () => {
        try {
            const totaldata = await GetAccountManager(token)
            console.log(totaldata.data, "daatatta")
            if (totaldata?.status == true) {
                // setTotalSize(0)
                setTimeout(() => {
                    setloader(false)
                    setExample(true)
                    setdata(totaldata?.data)
                    setcount(totaldata?.data?.count)
                    // console.log(totaldata?.data.count, 'totaldata')
                    const Count = totaldata?.data.count
                    setTotalSize(Count / entries)

                }, 2000);
                setloader(true)

            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                localStorage.removeItem('logintoken')
                navigate("/")
            }
            else {
                setTimeout(() => {
                    setloader(false)
                    console.log("??????????????")
                }, 2000);
                setloader(true)
            }

        }
        catch (err) {
            console.log(err, "errrrrrrr")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }
    useEffect(() => {
        AllAccountManager()
    }, [])


    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)
    };

    const sortChange = (col) => {
        if (col === sortedBy) {
            setSortedBy(col);
            orderBy === "asc" ? setOrderBy("desc") : setOrderBy("asc")
        } else {
            setSortedBy(col)
            setOrderBy("desc")
        }
    }



    const handleDelete = () => {
        console.log("------------>>>>>>>>>>>>>>>>>")
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteAccountManager(id, token)
                if (response?.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Account Manager has been deleted.',
                        'success'
                    )
                    AllAccountManager()
                }
                else {
                    toast.error("something went wrong")
                }

            }
        })
    }
    // console.log(data, "datatatatatat")
    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        {/* <h3 className="nk-block-title page-title">Currency</h3> */}
                                        <h5 >Account Managers</h5>
                                        <div className="nk-block-des text-soft">
                                            <p>You have swtotal <span className="fw-bold">({count})</span>Account Managers.</p>
                                        </div>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>
                                            <div className="toggle-expand-content" data-content="pageMenu">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search" />
                                                            </div>
                                                            <input type="text" className="form-control" id="default-04" placeholder="Search by name" onChange={(e) => { setsearch(e.target.value); setPagenumber(1) }} />
                                                        </div>
                                                    </li>

                                                    <li className="nk-block-tools-opt">
                                                        <div className="drodown">
                                                            {
                                                                <a className="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="modal" data-bs-target="#modal-report" ><em className="icon ni ni-plus" /></a>
                                                            }
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text fw-bold">Name {sortedBy == "name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("name") }} />} </span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">email{sortedBy == 'email' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('email') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('email') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Created At  {sortedBy == "created_at" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("created_at") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("created_at") }} />}</span></div>
                                        <div className="nk-tb-col text-end"><span className="sub-text fw-bold">Action</span></div>
                                    </div>{/* .nk-tb-item */}
                                    {
                                        loader == true ?
                                            <div className="nk-tb-item">
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col "> {<Loader />}</div>
                                                <div className="nk-tb-col tb-col-lg"> </div>
                                                <div className="nk-tb-col tb-col-lg"></div>
                                            </div>
                                            :
                                            <>
                                                <tbody>
                                                    {
                                                        data.length == 0 &&
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col"></div>
                                                            <div className="nk-tb-col "><h6>No  Currency Data Available</h6></div>
                                                            <div className="nk-tb-col tb-col-lg">
                                                            </div>
                                                            <div className="nk-tb-col  tb-col-lg"></div>
                                                        </div>}

                                                    {
                                                        data.length > 0 && data.map((data) => {
                                                            var stillUtcs = moment.utc(data.created_at).toDate();
                                                            var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                                            return (
                                                                <div className="nk-tb-item" key={data.id}>
                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card" >
                                                                                <div className="user-avatar bg-white" >
                                                                                    <span ><Image src={data.icon} alt='img' width={40} height={40} /></span>
                                                                                </div>

                                                                                {
                                                                                    data.name == null ? <div className="user-info">
                                                                                        <span className="tb-lead">N/A<span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    </div> : <div className="user-info">
                                                                                        <span className="tb-lead">{data.name}<span className="dot dot-success d-md-none ms-1" /></span>

                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </a>
                                                                    </div>


                                                                    <div className="nk-tb-col tb-col-md">
                                                                        {data.email == null ? <span>N/A</span> : <span>{data.email}</span>}
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <ul className="list-status">
                                                                            {data.created_at == null ? <li> <span>N/A</span></li> : <li> <span className='badge rounded-pill bg-primary' >{timeZones}</span></li>}
                                                                        </ul>
                                                                    </div>

                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">
                                                                            <li onClick={() => { setid(data.id); setupdatename(data.name); setupdatEmail(data.email) }} >
                                                                                <div className="drodown">
                                                                                    <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">
                                                                                            {
                                                                                                <li style={{ color: "blue", cursor: "pointer" }}
                                                                                                    // onClick={getCurrencyDatabyid}
                                                                                                    data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" ><a ><em className="icon ni ni-edit" /><span style={{ cursor: "pointer" }}>Edit</span></a></li>
                                                                                            }
                                                                                            {
                                                                                                <li onClick={handleDelete} style={{ color: "red", cursor: "pointer" }} ><a ><em className="icon ni ni-trash" /><span>Delete</span></a></li>
                                                                                            }
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
                                                </tbody>
                                            </>}

                                </div>{/* .nk-tb-list */}
                                <div className="card">
                                    <div className="card-inner">
                                        <div className="nk-block-between-md g-3">
                                            <div className="g">
                                                {example == true &&
                                                    <ReactPaginate
                                                        previousLabel={"Previous"}
                                                        nextLabel={'Next'}
                                                        forcePage={pageNumber - 1}
                                                        breakLabel={"..."}
                                                        pageCount={totalSize}
                                                        marginPagesDisplayed={1}
                                                        pageRangeDisplayed={2}
                                                        onPageChange={Click}
                                                        containerClassName={'pagination justify-content-center'}
                                                        pageClassName={'page-item'}
                                                        pageLinkClassName={'page-link'}
                                                        previousClassName={'page-item'}
                                                        previousLinkClassName={'page-link'}
                                                        nextClassName={'page-item'}
                                                        nextLinkClassName={'page-link'}
                                                        breakClassName={"page-item"}
                                                        breakLinkClassName={'page-link'}
                                                        activeClassName={'active'} />}
                                            </div>

                                            {/* <div className="g">
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
                                            </div> */}
                                        </div>
                                    </div>
                                </div>{/* .card */}
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div>






            <div className="modal modal-blur fade" id="modal-report" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Add Account Manager</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} data-dismiss="modal"
                                onClick={() => { form.resetForm() }}
                            />
                        </div>
                        <form onSubmit={form.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Name"
                                            name="name" {...form.getFieldProps("name")} />
                                        {form.errors.name && form.touched.name ? <p className='red' style={{ marginTop: 5 }}>{form.errors.name}</p> : null}
                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Email</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Email"
                                            name="email" {...form.getFieldProps("email")} />
                                        {form.errors.email && form.touched.email ? <p className='red' style={{ marginTop: 5 }}>{form.errors.email}</p> : null}
                                    </div>
                                </div>



                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary ms-auto" >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon " width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>&nbsp;<p> Add</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




            <div className="modal modal-blur fade" id="modal-reportUpdate" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Update Account Manager</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form onSubmit={form.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Name"
                                            name="name" {...form.getFieldProps("name")} />
                                        {form.errors.name && form.touched.name ? <p className='red' style={{ marginTop: 5 }}>{form.errors.name}</p> : null}
                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Email</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Email"
                                            name="email" {...form.getFieldProps("email")} />
                                        {form.errors.email && form.touched.email ? <p className='red' style={{ marginTop: 5 }}>{form.errors.email}</p> : null}
                                    </div>
                                </div>



                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary ms-auto" >
                                    <p> Update</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default AccountManagers
