import React, { useEffect, useState } from 'react';
import Container from '../../component/container';
import { CurrencyData, AddCurrency, SingleCurrencyData, updateCurrency, deleteCurrency } from '../../API/CurrencyAPI/CurrencyApi';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Image } from 'antd';
import Loader from '../Loader/Loader';
import { useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import { GetPermissionData } from '../../API/PermissionApi/Permisson';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';


const Updatesucess = () => {
    toast.success('Update successfully.', { autoClose: 2000 });
}

const initialValues = {
    Title: "",
    ShortName: "",
    symbol: "",
    currencyimg: "",

}



const AddSuccessToast = () => {
    toast.success('add successfully.', { autoClose: 2000 });
}

const DeleteToast = () => {
    toast.success('Delete successfully.', { autoClose: 2000 });
}


const addErrorToast = () => {
    toast.error('Data already exist !', {
        autoClose: 2000
    });
}


const Currency = () => {
    const [data, setdata] = useState([])
    const [count, setcount] = useState(0)
    const [id, setid] = useState()
    const [search, setsearch] = useState("")
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [loading, setloading] = useState(false)
    const [country_flag, setcountry_flag] = useState()
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const token = localStorage.getItem("logintoken")
    // const Profiledata = localStorage.getItem("Profiledata")
    const [title, settitle] = useState()
    const [symbol, setsymbol] = useState()
    const [short_name, setshort_name] = useState()
    const [currency_images, setcurrency_image] = useState('')
    const [permission, setpermission] = useState([])
    // const [delete_currency, setdelete_currency] = useState()
    const [Add_curency, setAdd_curency] = useState()
    const [get_all_currency, setget_all_currency] = useState()
    const [get_single_currency, setget_single_currency] = useState()
    const [update_currency, setupdate_currency] = useState()
    const [delete_currency, setdelete_currency] = useState()
    const [profile, setprofile] = useState()
    const [loader, setloader] = useState(true)
    const Profiledata = localStorage.getItem("Profiledata");

    const [addmodalimage, setaddmodalimage] = useState('')
    const [editimage, seteditimage] = useState('')
    const [editimgsecond, seteditimgsecond] = useState('')

    useEffect(() => {
        if (Profiledata) {
            try {
                const Profile = JSON.parse(Profiledata);
                setprofile(Profile)
                console.log(Profile, "ddtttttttttttttt");
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            // console.error("Profiledata is undefined or null");
        }
    }, [])

    console.log(profile?.user_type, "profileprofileprofileprofileprofileprofile")
    const navigate = useNavigate()
    const ref2 = useRef()

    setTimeout(() => {
        setscroll(true)
    }, 3000);

    const PerMissionData = async () => {
        try {
            const resp = await GetPermissionData(token)
            if (resp?.data?.permission) {
                setpermission(JSON.parse(resp?.data?.permission));
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        PerMissionData()
    }, [])


    useEffect(() => {
        {
            permission?.map((data) => {
                console.log(data.key, "ooooooooooo")
                if (data.key == "Add_curency") {
                    setAdd_curency(true)
                }
                if (data.key == 'get_all_currency') {
                    setget_all_currency(true)
                }
                if (data.key == "get_single_currency") {
                    setget_single_currency(true)
                }
                if (data.key == "update_currency") {
                    setupdate_currency(true)
                }
                if (data.key == "delete_currency") {
                    setdelete_currency(true)
                }
            })
        }
    }, [permission])

    const signUpSchemas = yup.object({
        Title: yup.string().min(3).required("Please Enter Currency Title"),
        ShortName: yup.string().min(3).required("Please Enter Currency Short Name"),
        symbol: yup.string().min(1).required("Please Enter Currency Symbol"),
        currencyimg: yup.string().required("Please Upload Image"),
    });


    // let resetFormFunction;
    const form = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: async (values, action) => {
            try {
                const formData = new FormData();
                formData.append("title", values.Title)
                formData.append("short_name", values.ShortName)
                formData.append("symbol", values.symbol)
                formData.append("image", currency_images)
                const addNewCurrency = await AddCurrency(token, formData)
                if (addNewCurrency.status == true) {
                    ref2.current.click()
                    action.resetForm()
                    AddSuccessToast()
                    GetCurrencyData()
                }
                else {
                    addErrorToast()
                    ref2.current.click()
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    })
    // resetFormFunction = form.resetForm;

    const deleteCurrencydata = async () => {
        try {
            const userdelete = await deleteCurrency(token, id)
            console.log(userdelete, "Role delele")
            DeleteToast()
            GetCurrencyData()
        }
        catch (err) {
            console.log(err, "err")
        }
    }

    const updateCurrencydata = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title)
            formData.append("short_name", short_name)
            formData.append("symbol", symbol)
            formData.append("image", currency_images || editimgsecond)
            const update = await updateCurrency(token, formData, id)
            if (update.status == true) {
                GetCurrencyData()
                Updatesucess()
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const addimage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setcurrency_image(e.target.files[0]);
        } else {
            setcurrency_image();
        }
    }

    const uploadDocFunc = async (e) => {
        setaddmodalimage(e.target.files[0])
        console.log('e', e.target.files[0]);
        const file = e.target.files[0];
        form.setFieldValue('currencyimg', file)
    }


    const EdituploadDocFunc = async (e) => {
        seteditimgsecond(e.target.files[0])
        // setaddmodalimage(e.target.files[0])
        // console.log('e', e.target.files[0]);
        // const file = e.target.files[0];
        // form.setFieldValue('currencyimg', file)
    }


    const Emptydata = async (e) => {
        seteditimgsecond('')
    }

    const GetCurrencyData = async () => {
        try {
            const totaldata = await CurrencyData(token, sortedBy, orderBy, search, pageNumber)
            console.log(totaldata, "?????????????????")
            if (totaldata.status == true) {
                setTimeout(() => {
                    setloader(false)
                    setExample(true)
                    setdata(totaldata?.data.rows)
                    setcount(totaldata?.data.count)
                    console.log(totaldata?.data.count, 'totaldata')
                    const Count = totaldata?.data.count
                    setTotalSize(Count / entries)

                }, 2000);
                setloader(true)
            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                localStorage.removeItem('logintoken')
                navigate("/")

            }

        }
        catch (err) {
            console.log(err, "thiiiiiiiiiiiiiiiiiiiii")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }



    useEffect(() => {
        GetCurrencyData()
    }, [search, pageNumber, orderBy, sortedBy])


    const getCurrencyDatabyid = async () => {
        try {
            const resp = await SingleCurrencyData(token, id)
            console.log(resp, "by id")
            const data = resp?.data
            settitle(data.title)
            setsymbol(data.symbol)
            setshort_name(data.short_name)
            setcurrency_image(data.icon)
            // setaddmodalimage()
            seteditimage(data.icon)
        }
        catch (err) {
            console.log(err)
        }

    }

    const Custmerdetails = (id) => {
        console.log(id, "iddddddddd send")
        navigate(`/user-details`, { state: id })
    }

    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)
    };

    const [activeSearch, setactiveSearch] = useState(false);

    const handleSideClick = () => {
        setactiveSearch(!activeSearch);
    };

    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const handleCheckboxChange = (roleId) => {
        if (selectedRoleId === roleId) {
            setSelectedRoleId(null);
        } else {
            setSelectedRoleId(roleId);
        }
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
                const response = await deleteCurrency(token, id)
                if (response?.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Currency has been deleted.',
                        'success'
                    )
                    GetCurrencyData()
                }
                else {
                    toast.error("something went wrong")
                }

            }
        })
    }


    // const handleFormSubmit = (values, resetForm) => {
    //     // You can use resetForm here to reset the form outside the onSubmit function
    //     resetForm();
    // };
    console.log(addmodalimage, "addmodalimageaddmodalimageaddmodalimage")


    const emptydata = () => {
        // seteditimgsecond('')
    }

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
                                        <h5 >Currency</h5>
                                        <div className="nk-block-des text-soft">
                                            <p>You have total <span className="fw-bold">({count})</span>  Currency.</p>
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
                                                                (Add_curency == true || profile?.user_type == "SUPERADMIN") && <a className="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="modal" data-bs-target="#modal-report" ><em className="icon ni ni-plus" /></a>
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
                                        <div className="nk-tb-col"><span className="sub-text fw-bold">Image {sortedBy == "title" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("title") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("title") }} />} </span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">Short Name {sortedBy == 'short_name' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('short_name') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('short_name') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Symbol {sortedBy == "symbol" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("symbol") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("symbol") }} />}</span></div>
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
                                                            <div className="nk-tb-col "> <h6>No  Currency Data Available</h6> </div>
                                                            <div className="nk-tb-col tb-col-lg">
                                                            </div>
                                                            <div className="nk-tb-col  tb-col-lg"></div>
                                                        </div>}

                                                    {
                                                        data.length > 0 && data.map((data) => {
                                                            return (
                                                                <div className="nk-tb-item" key={data.id}>
                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card" >
                                                                                <div className="user-avatar bg-white" >
                                                                                    <span ><Image src={data.icon} alt='img' width={40} height={40} /></span>
                                                                                </div>

                                                                                {
                                                                                    data.title == null ? <div className="user-info">
                                                                                        <span className="tb-lead">N/A<span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    </div> : <div className="user-info">
                                                                                        <span className="tb-lead">{data.title}<span className="dot dot-success d-md-none ms-1" /></span>

                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </a>
                                                                    </div>


                                                                    <div className="nk-tb-col tb-col-md">
                                                                        {data.short_name == null ? <span>N/A</span> : <span>{data.short_name}</span>}
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <ul className="list-status">
                                                                            {data.symbol == null ? <li> <span>N/A</span></li> : <li> <span className='badge rounded-pill bg-primary' >{data.symbol}</span></li>}
                                                                        </ul>
                                                                    </div>

                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">
                                                                            <li onClick={() => { setid(data.id) }}>
                                                                                <div className="drodown">
                                                                                    <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">
                                                                                            {
                                                                                                (update_currency == true || profile?.user_type == "SUPERADMIN") && <li style={{ color: "blue", cursor: "pointer" }} onClick={getCurrencyDatabyid} data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" ><a ><em className="icon ni ni-edit" /><span style={{ cursor: "pointer" }}>Edit</span></a></li>
                                                                                            }
                                                                                            {
                                                                                                (delete_currency == true || profile?.user_type == "SUPERADMIN") && <li onClick={handleDelete} style={{ color: "red", cursor: "pointer" }} ><a ><em className="icon ni ni-trash" /><span>Delete</span></a></li>
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
                            <h5 className="modal-title"> Add Currency</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} data-dismiss="modal"
                                onClick={() => { setaddmodalimage(''); form.resetForm() }}
                            />
                        </div>
                        <form onSubmit={form.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Title</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Name"
                                            name="Title" {...form.getFieldProps("Title")} />
                                        {form.errors.Title && form.touched.Title ? <p className='red' style={{ marginTop: 5 }}>{form.errors.Title}</p> : null}
                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Short Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Short Name"
                                            name="ShortName" {...form.getFieldProps("ShortName")} />
                                        {form.errors.ShortName && form.touched.ShortName ? <p className='red' style={{ marginTop: 5 }}>{form.errors.ShortName}</p> : null}
                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Symbol</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Symbol"
                                            name="symbol" {...form.getFieldProps("symbol")} />
                                        {form.errors.symbol && form.touched.symbol ? <p className='red' style={{ marginTop: 5 }}>{form.errors.symbol}</p> : null}
                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Image</label>
                                    <div className="col" onChange={addimage}>
                                        <input type="file" className="form-control" aria-describedby="emailHelp"
                                            onChange={uploadDocFunc} name="currencyimg"
                                            accept=".jpg, .jpeg, .png"
                                        />
                                        {form.errors.currencyimg && form.touched.currencyimg ? <p className='red' >{form.errors.currencyimg}</p> : null}
                                        {
                                            addmodalimage != '' ? <Image src={URL.createObjectURL(addmodalimage)} height={60} width={100} /> : ''
                                        }
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
                            <h5 className="modal-title"> Update Currency</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { seteditimgsecond(''); seteditimage('') }} />
                        </div>
                        <form onSubmit={updateCurrencydata}>
                            <div className="modal-body">
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Title</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Level Name"
                                            value={title} onChange={((e) => { settitle(e.target.value) })}
                                        />
                                    </div>

                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Short Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="max_amount"
                                            value={short_name} onChange={((e) => { setshort_name(e.target.value) })}
                                        />
                                    </div>

                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Symbol</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="max_amount"
                                            value={symbol} onChange={((e) => { setsymbol(e.target.value) })}
                                        />
                                    </div>
                                </div>



                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Image</label>
                                    <div className="col" onChange={((e) => setcurrency_image(e.target.files[0]))}>
                                        <input type="file" className="form-control" aria-describedby="emailHelp" placeholder="min_amount"
                                            onChange={EdituploadDocFunc}
                                            accept=".jpg, .jpeg, .png"

                                        />
                                        {

                                        }
                                        {
                                            editimgsecond == '' &&
                                                editimage != '' ? <Image src={editimage} height={60} width={100} /> : ''
                                        }
                                        {
                                            editimgsecond != '' &&
                                                editimgsecond != '' ? <Image src={URL.createObjectURL(editimgsecond)} height={60} width={100} /> : ''
                                        }
                                    </div>
                                </div>
                            </div>



                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary ms-auto" data-bs-dismiss="modal">

                                    Update
                                </button>
                            </div>

                        </form>
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
                                        onClick={() => deleteCurrencydata()}
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
    );
}
export default Currency;
