import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import Container from '../../component/container';
import BaseUrl from '../../API/config';
import { Image } from 'antd'
import ReactPaginate from 'react-paginate';
import { GetTotaluserdata } from '../../API/UserApi/UserApi';
import { GetPermissionData } from '../../API/PermissionApi/Permisson';
import moment from 'moment';

import Loader from '../Loader/Loader';
import { Getusermanagement } from '../../API/userManagement';
const token = localStorage.getItem("logintoken")

const InactiveUser = () => {

    const [userdata, setuserdata] = useState([])
    const [count, setcount] = useState(0)
    const [id, setid] = useState()
    const [search, setsearch] = useState("")
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [loading, setloading] = useState(false)
    // console.log(location.pathname, "locattaion path name")
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')

    const [permission, setpermission] = useState([])
    const [get_all_clients, setget_all_clients] = useState()
    const [get_single_client, setget_single_client] = useState()
    const [profile, setprofile] = useState()
    const [loader, setloader] = useState(true)
    const token = localStorage.getItem("logintoken")
    const location = useLocation()
    const [recentTab, setrecentTab] = useState("")
    const [tab, settab] = useState(0)

    const Profiledata = localStorage.getItem("Profiledata");

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


    setTimeout(() => {
        setscroll(true)
    }, 3000);

    setTimeout(() => {
        setloading(true)
    }, 2000);



    const navigate = useNavigate()
    const [activeSearch, setactiveSearch] = useState(false);

    const handleSideClick = () => {
        setactiveSearch(!activeSearch);
    };


    // console.log(id, "thoiididi")


    const GetTotalUser = async () => {
        try {
            const totaldata = await Getusermanagement(token, tab, sortedBy, orderBy, search, pageNumber)

            console.log(totaldata.status, "okkkkkkkkkkk")
            // console.log(totaldata.data.message == "jwt expired")
            if (totaldata?.status == true) {
                setTimeout(() => {
                    setuserdata(totaldata.data.rows)
                    setcount(totaldata.data.count)
                    setExample(true)
                    console.log(totaldata.data, "dtatatatat")
                    const Count = totaldata?.data.count

                    setTotalSize(Count / entries)
                    setloader(false)

                    // const Count = totaldata?.data.count
                    // setTotalSize(Count / entries)
                }, 2000);

                setloader(true)
            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                console.log("Adddillll")
                localStorage.removeItem('logintoken')
                navigate("/")
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
            }
            else {
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
                console.log("dkdkdkdkdkdkkdkdkdkdkk")
            }
        }
        catch (err) {
            // console.log(err, "LLLLLLLLLLLLLLLL")
            console.log(err, "ddddddddddddddddddddddddddd")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }

    useEffect(() => {
        GetTotalUser()
    }, [search, pageNumber, orderBy, sortedBy])


    const recipientsdetails = (id) => {
        console.log(id, "iddddddddd send")
        {
            (get_single_client == true || profile?.user_type == "SUPERADMIN") && navigate(`/customer/inside-recipients`, { state: id })
        }

    }


    const outesideRecipientData = (id) => {
        console.log(id, "iddddddddd send")
        {
            (get_single_client == true || profile?.user_type == "SUPERADMIN") && navigate(`/customer/outside-recipients`, { state: id })
        }

    }



    const Custmerdetails = (id) => {
        console.log(id, "iddddddddd send")
        {
            (get_single_client == true || profile?.user_type == "SUPERADMIN") && navigate(`/user-details`, { state: id })
        }

    }


    // const Customertransaction = (id) => {
    //     console.log(id, "iddddddddd send")
    //     navigate(`/transaction`, { state: id })
    // }

    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)
        // const Comments = await fecthComments(CurrentPage);
        // setGetdata(Comments)
    };



    // useEffect(() => {
    //     console.log(pageNumber, "pagenumber")
    //     console.log(search)
    // }, [search,pageNumber])
    // console.log(pageNumber, "pagenumber")
    // console.log(search, "searchh")

    // const handleSearchClick = () => {
    //     setActiveSearch(!activeSearch);
    // };

    // console.log(activeSearch, "togllelel")



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
        // GetUserdata(token, pageNumber, search, orderBy, sortedBy);
    }

    const Export = async () => {
        // const resp = await 
    }


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
                if (data.key == "get_all_clients") {
                    setget_all_clients(true)
                }
                if (data.key == 'get_single_client') {
                    setget_single_client(true)
                }
                // if (data.key == "get_single_currency") {
                //     setget_single_currency(true)
                // }
                // if (data.key == "update_currency") {
                //     setupdate_currency(true)
                // }
                // if (data.key == "delete_currency") {
                //     setdelete_currency(true)
                // }
            })
        }
    }, [permission])

    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        {/* <h3 className="nk-block-title page-title">Customers</h3> */}
                                        <h5 >Inactive Users</h5>
                                        <div className="nk-block-des text-soft">
                                            <p>Total <span className='fw-bold'>({count})</span> User account.</p>
                                        </div>
                                    </div>{/* .nk-block-head-content */}
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="more-options"><em className="icon ni ni-more-v" /></a>
                                            <div className="toggle-expand-content" data-content="more-options">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search" />
                                                            </div>
                                                            <input type="text" className="form-control" id="default-04" placeholder="Search by name" onChange={(e) => { setsearch(e.target.value); setPagenumber(1) }} />
                                                        </div>
                                                    </li>
                                                    <li ><a href={BaseUrl + `clients/export`} className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>

                                                    {/* <li className="nk-block-tools-opt">
                                                        <a href="#" className="btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus" /></a>
                                                        <a href="#" className="btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus" /><span>Add</span></a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>{/* .nk-block-head-content */}
                                </div>{/* .nk-block-between */}
                            </div>{/* .nk-block-head */}
                            <div className="card card-full">
                                <div className="card-inner" style={{ borderBottom: "1px solid #ddd" }}>
                                    <div className="card-title-group">
                                        {/* <div className="card-title">
                                        <h6 className="title"><span className="me-2"> Recent Transactions </span> <a href="#" className="link d-none d-sm-inline">See
                                            History</a></h6>
                                    </div> */}
                                        <div className="card-tools">
                                            <ul className="card-tools-nav">
                                                <li className={search == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch(""); setTotalSize(0) }}><span >{search == "" ? <b>All</b> : <span>All</span>}</span></a></li>
                                                <li className={search == "pending" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("pending"); setTotalSize(0) }}><span>{search == "pending" ? <b>In progress</b> : <span>In progress</span>}</span></a></li>
                                                {/* <li className={recentTab == "Oh - hold" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("Oh - hold")}><span>Oh - hold</span></a></li> */}
                                                <li className={search == "approved" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("approved"); setTotalSize(0) }}><span> {search == "approved" ? <b>Approved </b> : <span>Approved </span>}</span></a></li>
                                                <li className={search == "rejected" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("rejected"); setTotalSize(0) }}><span>{search == "rejected" ? <b>Rejected </b> : <span>Rejected </span>}</span></a></li>
                                                <li className={search == "Not_applied" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("Not_applied"); setTotalSize(0) }}><span>{search == "Not_applied" ? <b>Not Applied </b> : <span>Not Applied </span>}</span></a></li>
                                                {/* <li className={recentTab == "approved by receiver" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("approved by receiver"); setTotalSize(0) }}><span> {recentTab == "approved by receiver" ? <b>Approved by receiver</b> : <span>Approved by receiver</span>}</span></a></li> */}
                                                {/* <li className={recentTab == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("")}><span>All</span></a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">

                                        {/* <div className="nk-tb-col "><span className="sub-text fw-bold">User Detail  {sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('first_name') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('first_name') }} />} </span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">DOB  {sortedBy == "date_of_birth" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('date_of_birth') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('date_of_birth') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Verified  {sortedBy == "email_verified_at" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('email_verified_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('email_verified_at') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Created At  {sortedBy == "created_at" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">Referral Id  {sortedBy == "date_of_birth" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('referral_code') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('referral_code') }} />}</span></div>
                                        <div className="nk-tb-col nk-tb-col-tools">
                                            {
                                                (get_single_client == true || profile?.user_type == "SUPERADMIN") &&

                                                <ul className="nk-tb-actions gx-1 my-n1">
                                                    <li>
                                                        <div className="drodown">
                                                            <span className="sub-text fw-bold">Action</span>
                                                        </div>
                                                    </li>
                                                </ul>

                                            }
                                        </div> */}

                                        <div className="nk-tb-col"><span className="sub-text">User {sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-mb"><span className="sub-text">
                                            Verified {sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Phone {sortedBy == 'phone' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">DOB {sortedBy == "date_of_birth" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("date_of_birth") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("date_of_birth") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Created At {sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span>
                                        </div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Referral Code {sortedBy == "referral_code" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("referral_code") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("referral_code") }} />}</span></div>
                                        <div className="nk-tb-col nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1 my-n1">
                                                <li>
                                                    <div className="drodown">
                                                        <a className="sub-text" >Action</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>{/* .nk-tb-item */}
                                    {
                                        loader == true ?
                                            <div className="nk-tb-item">
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col tb-col-mb"></div>
                                                <div className="nk-tb-col tb-col-md">
                                                </div>
                                                <div className="nk-tb-col tb-col-lg">  {<Loader />}</div>
                                                <div className="nk-tb-col tb-col-lg">
                                                </div>
                                                <div className="nk-tb-col tb-col-md "></div>
                                                <div className="nk-tb-col nk-tb-col-tools"></div>
                                            </div> :
                                            <>
                                                {
                                                    userdata.length == 0 &&


                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col tb-col-mb"></div>
                                                        <div className="nk-tb-col tb-col-md">

                                                        </div>
                                                        <div className="nk-tb-col tb-col-lg">     {scroll == true ? <h6>No Customer Data Available</h6> : <Loader />}</div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md "></div>
                                                        <div className="nk-tb-col nk-tb-col-tools"></div>
                                                    </div>
                                                }


                                                {
                                                    userdata.length > 0 && userdata.map((data) => {
                                                        var stillUtcs = moment.utc(data.created_at).toDate();
                                                        var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');

                                                        return (
                                                            //         <div className="nk-tb-item" key={data.id} >
                                                            //             <div className="nk-tb-col" >
                                                            //                 <a >
                                                            //                     <div className="user-card">
                                                            //                         <div className="user-avatar bg-primary">
                                                            //                             <span><Image src={data.avatar} alt='img' width={40} height={40} style={{ objectFit: 'cover' }} /></span>
                                                            //                         </div>
                                                            //                         {
                                                            //                             data?.first_name == null ? <div className="user-info text-primary" >
                                                            //                                 <span className="tb-lead text-primary" onClick={() => { Custmerdetails(data.id) }} style={{ cursor: "pointer" }}>N/A<span className="dot dot-success d-md-none ms-1" /></span>
                                                            //                             </div> : <div className="user-info " onClick={() => { Custmerdetails(data.id) }} style={{ cursor: "pointer" }}>
                                                            //                                 <span className="tb-lead text-primary" style={{ textTransform: "capitalize" }}>{data?.first_name} {data?.middle_name} {data?.last_name}<span className="dot dot-success d-md-none ms-1" /></span>
                                                            //                                 <span>{data?.email}</span><br></br>
                                                            //                                 <span>+{data?.phone_code}{data?.phone}</span>
                                                            //                             </div>
                                                            //                         }
                                                            //                     </div>
                                                            //                 </a>
                                                            //             </div>

                                                            //             {
                                                            //                 data?.date_of_birth == null ? <div className="nk-tb-col tb-col-lg">
                                                            //                     <span>N/A</span>
                                                            //                 </div> : <div className="nk-tb-col tb-col-lg">
                                                            //                     <span>{data?.date_of_birth}</span><br></br>
                                                            //                 </div>
                                                            //             }



                                                            //             <div className="nk-tb-col tb-col-lg">
                                                            //                 <ul className="list-status">
                                                            //                     {
                                                            //                         data?.email_verified_at == null ? <li><em className="icon text-danger ni ni-cross-circle" /> <span>Email</span></li> : <li><em className="icon text-success ni ni-check-circle" /> <span>Email</span></li>
                                                            //                     }
                                                            //                     {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}
                                                            //                 </ul>
                                                            //             </div>


                                                            //             {/* <div className="nk-tb-col tb-col-md">
                                                            //                 <span className="tb-status text-success">Active</span>
                                                            //             </div> */}


                                                            //             {
                                                            //                 data?.created_at == null ? <div className="nk-tb-col tb-col-lg">
                                                            //                     <span>N/A</span>
                                                            //                 </div> : <div className="nk-tb-col tb-col-lg">
                                                            //                     <span>{timeZones}</span>
                                                            //                 </div>
                                                            //             }



                                                            //             {/* {
                                                            //     data?.addresses.length == 0 ? <div className="nk-tb-col tb-col-lg">
                                                            //         <span>N/A</span>
                                                            //     </div> :
                                                            //         //   max-width: 240px;
                                                            //         //   display: inline-block;
                                                            //         //   white-space: break-spaces;
                                                            //         <div className="nk-tb-col tb-col-lg" style={{ maxWidth: "240px", display: 'inline-block', whiteSpace: 'break-spaces' }}>
                                                            //             <span>{data?.addresses[0]?.street}<br></br> {data?.addresses[0]?.apartment}   {data?.addresses[0]?.city}  {data?.addresses[0]?.state} {data?.addresses[0]?.country}</span>
                                                            //         </div>
                                                            // } */}
                                                            //             <div className="nk-tb-col tb-col-md">
                                                            //                 {data?.referral_code == null ? <span>N/A</span> : <span>{data?.referral_code}</span>}

                                                            //             </div>


                                                            //             <div className="nk-tb-col nk-tb-col-tools">
                                                            //                 <ul className="nk-tb-actions gx-1">
                                                            //                     {/* <li className="nk-tb-action-hidden">
                                                            //                         <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Wallet">
                                                            //                             <em className="icon ni ni-wallet-fill" />
                                                            //                         </a>
                                                            //                     </li>
                                                            //                     <li className="nk-tb-action-hidden">
                                                            //                         <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                            //                             <em className="icon ni ni-mail-fill" />
                                                            //                         </a>
                                                            //                     </li>
                                                            //                     <li className="nk-tb-action-hidden">
                                                            //                         <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                            //                             <em className="icon ni ni-user-cross-fill" />
                                                            //                         </a>
                                                            //                     </li> */}

                                                            //                     {
                                                            //                         (get_single_client == true || profile.user_type == "SUPERADMIN") &&

                                                            //                         <li onClick={() => { setid(data.id) }}>
                                                            //                             <div className="drodown">
                                                            //                                 <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>

                                                            //                                 <div className="dropdown-menu dropdown-menu-end">
                                                            //                                     <ul className="link-list-opt no-bdr">
                                                            //                                         <li onClick={() => { Custmerdetails(data.id) }}><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>View Details</span></a></li>
                                                            //                                         <li onClick={() => { recipientsdetails(data.id) }}><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>Inside Recipient</span></a></li>
                                                            //                                         <li onClick={() => { outesideRecipientData(data.id) }}><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>Outside Recipient</span></a></li>
                                                            //                                     </ul>
                                                            //                                 </div>

                                                            //                             </div>
                                                            //                         </li>
                                                            //                     }

                                                            //                 </ul>
                                                            //             </div>
                                                            //         </div>
                                                            <>
                                                                <div className="nk-tb-item" key={data.id}>
                                                                    {/* <div className="nk-tb-col nk-tb-col-check">
                                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                                <input type="checkbox" className="custom-control-input" id="uid1" />
                                                                                <label className="custom-control-label" htmlFor="uid1" />
                                                                            </div>
                                                                        </div> */}
                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card">
                                                                                <div className="user-avatar bg-primary">
                                                                                    <span><Image src={data.avatar} alt='img' width={40} height={40} style={{ objectFit: 'cover' }} /></span>

                                                                                </div>
                                                                                <div className="user-info" style={{ cursor: "pointer", }}
                                                                                    onClick={() => { Custmerdetails(data.id) }}
                                                                                >
                                                                                    {
                                                                                        data?.first_name !== null ? <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data?.first_name}{data?.middle_name} {data?.last_name} <span className="dot dot-success d-md-none ms-1" /></span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}>N/A<span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    }
                                                                                    {
                                                                                        data?.email !== null ? <span>{data?.email}</span> : <span>N/A</span>
                                                                                    }

                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div >
                                                                    {/* data?.email_verified_at == null ? <li><em className="icon text-danger ni ni-cross-circle" /> <span>Email</span></li> : <li><em className="icon text-success ni ni-check-circle" /> <span>Email</span></li> */}
                                                                    <div className="nk-tb-col tb-col-mb">

                                                                        {
                                                                            data?.email_verified_at == null ? <span><em className="icon text-danger ni ni-cross-circle" /> <span>Email</span></span> : <span><em className="icon text-success ni ni-check-circle" /> <span>Email</span></span>
                                                                        }
                                                                        {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}

                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        <span>+{data?.phone_code} {data?.phone}</span>
                                                                    </div>
                                                                    {
                                                                        (data?.date_of_birth == null || data?.date_of_birth == "") ? <div className="nk-tb-col tb-col-lg">
                                                                            <span>N/A</span>
                                                                        </div> : <div className="nk-tb-col tb-col-lg">
                                                                            <span>{data?.date_of_birth}</span><br></br>
                                                                        </div>
                                                                    }
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <span>{timeZones}</span>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        {data?.referral_code == null ? <span>N/A</span> : <span>{data?.referral_code}</span>}
                                                                    </div>


                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">
                                                                            {/* <li className="nk-tb-action-hidden" onClick={() => { Custmerdetails(data.id) }}>
                                                                                <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                                    <em class="icon ni ni-user-alt" ></em>
                                                                                </a>
                                                                            </li>
                                                                            <li className="nk-tb-action-hidden" >
                                                                                <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                                    <em class="icon ni ni-eye" ></em>
                                                                                </a>
                                                                            </li> */}
                                                                            <li>
                                                                                <div className="drodown">
                                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>



                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">
                                                                                            <li style={{ cursor: "pointer" }} onClick={() => { Custmerdetails(data.id) }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                            <li style={{ cursor: "pointer" }} ><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>

                                                                                            {/* <li class="divider"></li> */}
                                                                                            {/* <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-check-circle-cut  "></em><span>Confrim</span></a></li>
                                                                                                <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-cross-c"></em><span>Reject</span></a></li> */}
                                                                                        </ul>
                                                                                    </div>

                                                                                    {/* {
                                                                                        (data?.status == "failed" || data?.status == "completed") &&
                                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                <li style={{ cursor: "pointer" }} onClick={() => GoToUserDetail(data.client_id)}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                                <li style={{ cursor: "pointer" }} onClick={() => { GoAllreqTxn(data.id) }}><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    } */}

                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>{/* .nk-tb-item */}
                                                            </>

                                                        )


                                                    })
                                                }
                                                {/* </tbody> */}
                                            </>
                                    }

                                </div > {/* .nk-tb-list */}
                                <div className="card" >
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


                                            {/* 
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
                                            </div> */}
                                        </div>
                                    </div>
                                </div>{/* .card */}
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default InactiveUser

