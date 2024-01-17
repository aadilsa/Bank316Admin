import React, { useEffect, useState } from 'react';
import Container from '../../component/container';
import { getWalletIcon, AddWalletIcon, SingleWalletData, updateWallet, deleteWalletdata } from '../../API/WalletIconApi/WalleticonApi';
import Loader from '../Loader/Loader';
import { Image } from 'antd';
import { useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { GetPermissionData } from '../../API/PermissionApi/Permisson';

const initialValues = {
    Name: "",
    currencyimg: "",
}


const WalletIcon = () => {
    const [data, setdata] = useState([])
    const [search, setsearch] = useState("")
    const [count, setcount] = useState(0)
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [loading, setloading] = useState(false)
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [id, setid] = useState()
    const [status, setstatus] = useState("ACTIVE")
    const [permission, setpermission] = useState([])
    const [title, settitle] = useState()
    const [short_name, setshort_name] = useState()
    const [country_flag, setcountry_flag] = useState()
    // console.log(location.pathname, "locattaion path name")
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const [IconImage, setIconImage] = useState('')
    const [loader, setloader] = useState(true)

    const [upstatus, setupstatus] = useState()
    const [name, setname] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem("logintoken")
    const ref2 = useRef()
    const [profile, setprofile] = useState()

    const [get_wallet_icons, setget_wallet_icons] = useState()
    const [create_wallet, setcreate_wallet] = useState()
    const [update_wallet_icon, setsetupdate_wallet_icon] = useState()
    const [delete_wallet_icon, setdelete_wallet_icon] = useState()

    // const [updateimg, setupdateimg] = useState('')
    const [editimage, seteditimage] = useState('')
    const [editimgsecond, seteditimgsecond] = useState('')

    const [addmodalimage, setaddmodalimage] = useState('')

    const Profiledata = localStorage.getItem("Profiledata");
    console.log(get_wallet_icons, "setdelete_wallet_icon")
    console.log(create_wallet, "create_wallet")
    console.log(update_wallet_icon, "create_wallet")
    console.log(delete_wallet_icon, "create_wallet")
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
            console.error("Profiledata is undefined or null");
        }
    }, [])

    console.log(profile?.user_type, "profileprofileprofileprofileprofileprofile")





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


    console.log(permission, "perororororororororo")
    useEffect(() => {
        {
            permission?.map((data) => {
                console.log(data.key, "ooooooooooo")
                if (data.key == "get_wallet_icons") {
                    setget_wallet_icons(true)
                }
                if (data.key == 'create_wallet') {
                    setcreate_wallet(true)
                }
                if (data.key == "update_wallet_icon") {
                    setsetupdate_wallet_icon(true)
                }
                if (data.key == "delete_wallet_icon") {
                    setdelete_wallet_icon(true)
                }

            })
        }
    }, [permission])

    console.log(create_wallet, "perrrrrrrrrrrrrrrrrrrrr")
    const signUpSchemas = yup.object({
        Name: yup.string().min(3).required("Please Enter   Name"),
        currencyimg: yup.string().required("Please Upload Image"),
    });

    const AddSuccessToast = () => {
        toast.success('add successfully.', { autoClose: 2000 });
    }

    const addErrorToast = () => {
        toast.error('Data already exist !', {
            autoClose: 2000
        });
    }




    const Updatesucess = () => {
        toast.success('Update successfully.', { autoClose: 2000 });
    }


    const form = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: async (values, action) => {
            try {
                console.log(values, "valuess")
                const formData = new FormData();
                formData.append("name", values.Name)
                formData.append("image", IconImage)
                formData.append("status", status)
                const addNewIcon = await AddWalletIcon(token, formData)

                if (addNewIcon.status == true) {
                    ref2.current.click()
                    console.log(status, "sttattatat")
                    action.resetForm()
                    AddSuccessToast()
                    GetWalletIconData()
                    setstatus("ACTIVE")
                }
                else {
                    addErrorToast()
                }
            }
            catch (err) {
                console.log(err)

            }

        }
    })



    const GetWalletIconData = async () => {

        try {
            const totaldata = await getWalletIcon(token, sortedBy, orderBy, search, pageNumber)
            // console.log(totaldata.data.rows, "daatatta")
            if (totaldata?.status == true) {
                // setTotalSize(0)

                setTimeout(() => {
                    setExample(true)
                    setdata(totaldata?.data?.rows)
                    setcount(totaldata?.data?.count)
                    // console.log(totaldata?.data.count, 'totaldata')
                    const Count = totaldata?.data.count
                    setTotalSize(Count / entries)
                    setloader(false)
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
        GetWalletIconData()
    }, [sortedBy, orderBy, search, pageNumber])



    const getWalletDatabyid = async () => {
        try {
            const resp = await SingleWalletData(token, id)
            console.log(resp, "by id")
            const data = resp?.data
            setupstatus(data?.status)
            setname(data.name)
            seteditimage(data.wallet_image)
        }
        catch (err) {
            console.log(err)
        }

    }





    const updateWalletdata = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("status", upstatus)
            formData.append("image", IconImage || editimgsecond)
            const update = await updateWallet(token, formData, id)
            console.log(IconImage, "Icon image")
            if (update.status == true) {
                GetWalletIconData()
                Updatesucess()
            }
            else {
                addErrorToast()
            }
        }
        catch (err) {
            console.log(err)
        }
    }


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



    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)
        // const Comments = await fecthComments(CurrentPage);
        // setGetdata(Comments)
    };


    const [activeSearch, setactiveSearch] = useState(false);

    const handleSideClick = () => {
        setactiveSearch(!activeSearch);
    };






    const addimage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setIconImage(e.target.files[0]);
        } else {
            setIconImage();
        }
    }



    const uploadDocFunc = async (e) => {
        console.log('e', e.target.files[0]);
        const file = e.target.files[0];
        setaddmodalimage(e.target.files[0])
        form.setFieldValue('currencyimg', file)
    }


    setTimeout(() => {
        setscroll(true)
    }, 3000);





    const handleDelete = () => {
        // console.log("------------>>>>>>>>>>>>>>>>>")
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
                const response = await deleteWalletdata(token, id)
                if (response?.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Wallet icon has been deleted.',
                        'success'
                    )
                    GetWalletIconData()
                }
                else {
                    toast.error("something went wrong")
                }

            }
        })
    }


    const EdituploadDocFunc = async (e) => {
        seteditimgsecond(e.target.files[0])
        // setaddmodalimage(e.target.files[0])
        // console.log('e', e.target.files[0]);
        // const file = e.target.files[0];
        // form.setFieldValue('currencyimg', file)
    }

    // console.log(permission, "per")
    // console.log(profile)
    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h6>Wallet Icon</h6>
                                        <div className="nk-block-des text-soft">
                                            <p>You have total <span className='fw-bold'>({count})</span> Wallet Icon.</p>
                                        </div>
                                    </div>{/* .nk-block-head-content */}
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
                                                    {/* <li><a className="btn btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li> */}
                                                    <li className="nk-block-tools-opt">
                                                        <div className="drodown">
                                                            {
                                                                (create_wallet == true || profile?.user_type == "SUPERADMIN") && <a className="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="modal" data-bs-target="#modal-report"  ><em className="icon ni ni-plus" /> </a>

                                                            }

                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>{/* .toggle-wrap */}
                                    </div>{/* .nk-block-head-content */}
                                </div>{/* .nk-block-between */}
                            </div>{/* .nk-block-head */}



                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text fw-bold ">Icon</span></div>
                                        <div className="nk-tb-col"><span className="sub-text fw-bold">Name {sortedBy == "name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("name") }} />}</span></div>
                                        <div className="nk-tb-col"><span className="sub-text fw-bold">Status {sortedBy == "status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} />}</span></div>
                                        <div className="nk-tb-col text-end"><span className="sub-text fw-bold">Action</span></div>
                                    </div>{/* .nk-tb-item */}





                                    {/* {
                                        data?.length == 0 &&
                                        <div className="nk-tb-item">
                                            <div className="nk-tb-col"></div>
                                            <div className="nk-tb-col tb-col-md"></div>
                                            <div className="nk-tb-col tb-col-lg">
                                                {scroll == true ? <h6>No Wallet Icon Available</h6> : <Loader />}
                                            </div>
                                            <div className="nk-tb-col tb-col-md">
                                            </div>

                                        </div>

                                    } */}



                                    {
                                        loader == true ?
                                            <div className="nk-tb-item">
                                                <div className="nk-tb-col"> </div>
                                                <div className="nk-tb-col tb-col-md">   {<Loader />}</div>
                                                <div className="nk-tb-col tb-col-lg">

                                                </div>
                                                <div className="nk-tb-col tb-col-md">
                                                </div>

                                            </div> :
                                            <>

                                                {
                                                    data?.length == 0 &&
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col tb-col-md"><h6>No Wallet Icon Available</h6></div>
                                                        <div className="nk-tb-col tb-col-lg">

                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                        </div>

                                                    </div>

                                                }

                                                {


                                                    data?.length > 0 && data.map((data) => {

                                                        console.log("ddddddddddddddddddddddddddddddddddddd")
                                                        return (
                                                            <div className="nk-tb-item" key={data.id}>


                                                                <div className="nk-tb-col">
                                                                    <a >
                                                                        <div className="user-card">
                                                                            <div className="user-avatar ">
                                                                                <span><Image src={data.wallet_image} alt='img' width={40} height={40} /></span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>


                                                                <div className="nk-tb-col">
                                                                    <a >
                                                                        <div className="user-card">

                                                                            {
                                                                                data.name == null ? <div className="user-info">
                                                                                    <span className="tb-lead">N/A<span className="dot dot-success d-md-none ms-1" /></span>

                                                                                </div> : <div className="user-info">
                                                                                    <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data.name}</span>

                                                                                </div>
                                                                            }

                                                                        </div>
                                                                    </a>
                                                                </div>





                                                                <div className="nk-tb-col">
                                                                    <a >
                                                                        <div className="user-card">

                                                                            {
                                                                                data.status == "ACTIVE" ? <div className="user-info">
                                                                                    <span className="tb-status badge rounded-pill bg-primary">{data.status}</span>

                                                                                </div> : <div className="user-info">
                                                                                    <span className="tb-status badge rounded-pill bg-primary">{data.status}</span>

                                                                                </div>
                                                                            }

                                                                        </div>
                                                                    </a>
                                                                </div>



                                                                <div className="nk-tb-col nk-tb-col-tools">
                                                                    <ul className="nk-tb-actions gx-1">

                                                                        <li onClick={() => { setid(data.id) }}>
                                                                            <div className="drodown">
                                                                                <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                                    <ul className="link-list-opt no-bdr">
                                                                                        {
                                                                                            (update_wallet_icon == true || profile?.user_type == "SUPERADMIN") && <li style={{ color: "blue", cursor: "pointer" }}
                                                                                                onClick={getWalletDatabyid}
                                                                                                data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" ><a ><em className="icon ni ni-edit" /><span style={{ cursor: "pointer" }}>Edit</span></a></li>
                                                                                        }

                                                                                        {
                                                                                            (delete_wallet_icon == true || profile?.user_type == "SUPERADMIN") && <li style={{ color: "red", cursor: "pointer" }} onClick={handleDelete} ><a ><em className="icon ni ni-trash" /><span>Delete</span></a></li>
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


                                            </>
                                    }

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
                                                        activeClassName={'active'}

                                                    />
                                                }

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
                            <h5 className="modal-title"> Add Wallet Icon</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} data-dismiss="modal" onClick={() => { setaddmodalimage(''); form.resetForm() }} />
                        </div>
                        <form onSubmit={form.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Status</label>
                                    <div className="col">

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
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter  Name"
                                            name="Name" {...form.getFieldProps("Name")}
                                        />
                                        {form.errors.Name && form.touched.Name ? <p className='red' style={{ marginTop: 5 }}>{form.errors.Name}</p> : null}
                                    </div>
                                </div>

                                {/* <div className="form-group mb-3 row">
                                        <label className="form-label col-3 col-form-label">Currency Name</label>
                                        <div className="col">
                                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Name"
                                                name="currency_name" {...form.getFieldProps("currency_name")}
                                            />
                                            {form.errors.currency_name && form.touched.currency_name ? <p className='red' style={{ marginTop: 5 }}>{form.errors.currency_name}</p> : null}

                                        </div>
                                    </div> */}

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label"> Image</label>
                                    <div className="col" onChange={addimage}>
                                        <input type="file" className="form-control"
                                            onChange={uploadDocFunc} name="currencyimg"
                                            accept=".jpg, .jpeg, .png"

                                        />
                                        {
                                            addmodalimage != '' ? <Image src={URL.createObjectURL(addmodalimage)} height={60} width={100} /> : ''
                                        }
                                        {form.errors.currencyimg && form.touched.currencyimg ? <p className='red' >{form.errors.currencyimg}</p> : null}
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
                            <h5 className="modal-title"> Update Wallet Icon</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { seteditimgsecond(''); seteditimage('') }} />
                        </div>
                        <form
                            onSubmit={updateWalletdata}
                        >

                            <div className="modal-body">


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Status</label>
                                    <div className="col">
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
                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="max_amount"
                                            value={name} onChange={((e) => { setname(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                {/* <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Symbol</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="max_amount"
                                            value={symbol} onChange={((e) => { setsymbol(e.target.value) })}
                                        />
                                    </div>

                                </div> */}
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Image</label>
                                    <div className="col" onChange={((e) => setIconImage(e.target.files[0]))}>
                                        <input type="file" className="form-control" aria-describedby="emailHelp" placeholder="min_amount"
                                            onChange={EdituploadDocFunc}
                                            accept=".jpg, .jpeg, .png"

                                        />
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
                                <button type="submit" className="btn btn-primary ms-auto" data-bs-dismiss="modal">Update
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
                                    // onClick={deleteWallet}
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

export default WalletIcon;


