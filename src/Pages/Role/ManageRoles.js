import React, { useEffect, useState } from 'react';
import Container from '../../component/container';
import { useNavigate } from 'react-router-dom';
import { GetRoledata } from '../../API/RoleApi/Role';
import Loader from '../Loader/Loader';
import { Image } from 'antd';
import { useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from "yup"
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import EditRole from './EditRole';
import { deleteRoledata } from '../../API/RoleApi/Role';


const ManageRoles = () => {
    const [data, setdata] = useState([])



    const [pageNumber, setPagenumber] = useState(1)
    const [entries, SetEntries] = useState('10')
    const [totalSize, setTotalSize] = useState(10)
    const [count, setcount] = useState(0)


    // const [count, setcount] = useState(0)
    const [search, setsearch] = useState("")
    const [activeSearch, setactiveSearch] = useState(false);
    const [sortedBy, setSortedBy] = useState("")
    const [orderBy, setOrderBy] = useState('desc')
    const [loader, setloader] = useState(true)
    // const [pageNumber, setPagenumber] = useState(1)
    // const [totalSize, setTotalSize] = useState(10)
    // const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [loading, setloading] = useState(false)
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [id, setid] = useState()
    const [status, setstatus] = useState("ACTIVE")
    const [title, settitle] = useState()
    const [short_name, setshort_name] = useState()
    const [country_flag, setcountry_flag] = useState()
    // console.log(location.pathname, "locattaion path name")
    const [IconImage, setIconImage] = useState()
    const [upstatus, setupstatus] = useState()
    const [name, setname] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem("logintoken")

    setTimeout(() => {
        setscroll(true)
    }, 3000);


    const GetRole = async () => {
        try {
            const totaldata = await GetRoledata(token, sortedBy, orderBy, search, pageNumber)
            if (totaldata.status == true) {

                setTimeout(() => {
                    setExample(true)
                    const Count = totaldata.data.count
                    // console.log(object)
                    setcount(Count)
                    setTotalSize(Count / entries)
                    setdata(totaldata?.data?.rows)
                    setloader(false)
                }, 2000);
                setloader(true)
            }
        }
        catch (err) {
            console.log(err)
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }
    useEffect(() => {
        GetRole()
    }, [sortedBy, orderBy, search, pageNumber])





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
                const response = await deleteRoledata(id, token)
                if (response?.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Role has been deleted.',
                        'success'
                    )
                    GetRole()
                }
                else {
                    toast.error("something went wrong")
                }

            }
        })
    }



    const GoToAddRole = () => {
        navigate("/add-role")
    }

    const GoToEditRole = () => {
        navigate("/edit-role", { state: id })
    }


    const handleSideClick = () => {
        setactiveSearch(!activeSearch);
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
                                            <h5>Manage Roles</h5>
                                            <div className="nk-block-des text-soft">
                                                <p>You have total <span className='fw-bold'>({count})</span> Roles.</p>
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
                                                                <input type="text" className="form-control" id="default-04" placeholder="Search by Title" onChange={(e) => { setsearch(e.target.value); setPagenumber(1) }} />
                                                            </div>
                                                        </li>
                                                        <li><a className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>

                                                        <li className="nk-block-tools-opt">
                                                            <div className="drodown">
                                                                {/* <a className="btn btn-primary" ><em className="icon ni ni-plus" /><span></span></a> */}
                                                                <button type="submit" onClick={GoToAddRole} className="btn btn-primary ms-auto" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon " width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>&nbsp;<p> Add Role</p>
                                                                </button>

                                                                {/* <a className="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="dropdown" ><em className="icon ni ni-plus" /></a> */}
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        {/* <li data-bs-toggle="modal" data-bs-target="#modal-report" style={{ cursor: "pointer" }}><a ><span>Manage Role</span></a></li>
                                                                        <li><a ><span>Add Team</span></a></li>
                                                                        <li><a ><span>Import customer</span></a></li> */}
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
                                    <div className="nk-tb-list is-separate mb-3">
                                        <div className="nk-tb-item nk-tb-head">

                                            <div className="nk-tb-col"><span className="sub-text fw-bold">Title{sortedBy == "title" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("title") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("title") }} />}</span></div>
                                            <div className="nk-tb-col"><span className="sub-text fw-bold" >Created At {sortedBy == "created_at" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("created_at") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("created_at") }} />}</span></div>
                                            <div className="nk-tb-col"><span className="sub-text fw-bold">Status {sortedBy == "status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} />}</span></div>
                                            <div className="nk-tb-col text-end"><span className="sub-text fw-bold">Action</span></div>

                                        </div>{/* .nk-tb-item */}



                                        {
                                            loader == true ?

                                                <div className="nk-tb-item">
                                                    <div className="nk-tb-col"></div>
                                                    <div className="nk-tb-col tb-col-md"> {<Loader />}</div>
                                                    <div className="nk-tb-col tb-col-lg">

                                                    </div>
                                                    <div className="nk-tb-col tb-col-md">
                                                    </div>

                                                </div>
                                                :
                                                <>
                                                    {
                                                        data?.length == 0 &&
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col"></div>
                                                            <div className="nk-tb-col tb-col-md">  <h6>No Manage Roles Available</h6> </div>
                                                            <div className="nk-tb-col tb-col-lg">

                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                            </div>

                                                        </div>

                                                    }


                                                    {

                                                        data?.length > 0 && data.map((data) => {

                                                            var stillUtcs = moment.utc(data.created_at).toDate();
                                                            var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');

                                                            return (
                                                                <div className="nk-tb-item" key={data.id}>



                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card">
                                                                                <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data.title}</span>
                                                                            </div>
                                                                        </a>
                                                                    </div>


                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card">
                                                                                {
                                                                                    data.created_at == null ? <div className="user-info">
                                                                                        <span className="tb-lead">N/A<span className="dot dot-success d-md-none ms-1" /></span>

                                                                                    </div> : <div className="user-info">
                                                                                        <span className="tb-lead">{timeZones}</span>

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


                                                                            <li
                                                                                onClick={() => setid(data.role_id)}
                                                                            >
                                                                                <div className="drodown">
                                                                                    <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">

                                                                                            {/* <li ><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>View Details</span></a></li> */}
                                                                                            <li style={{ color: "blue", cursor: "pointer" }}
                                                                                                onClick={GoToEditRole}
                                                                                            ><a ><em className="icon ni ni-edit" /><span style={{ cursor: "pointer" }}>Edit</span></a></li>
                                                                                            <li
                                                                                                onClick={handleDelete}
                                                                                                style={{ color: "red", cursor: "pointer" }} ><a ><em className="icon ni ni-trash" /><span>Delete</span></a></li>


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
                                                {/* <div className="g">
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
                                                </div> */}


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




                <div>

                </div>



                {/* </div>
                </div> */}
            </Container >
        </>
    )
}

export default ManageRoles
