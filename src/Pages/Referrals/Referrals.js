import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { RequestMoneyData } from '../../API/RequestMoneypi/ReqMoneyApi'
import ReactPaginate from 'react-paginate'
import Loader from '../Loader/Loader'
import { ManualBankStatus } from '../../API/RequestMoneypi/ReqMoneyApi'
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import moment from 'moment';
import { toast } from 'react-toastify';
import { WithdrawalsTxn } from '../../API/Withdrawals/WithdrawalsAPI'
import 'react-toastify/dist/ReactToastify.css';
// import CopyToClipboard from 'react-copy-to-clipboard'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import BaseUrl from '../../API/config'

import { GetReferrals } from '../../API/ReferralAPI/ReferralAPI'

const Referrals = () => {
    const [data, setdata] = useState([])
    const [count, setcount] = useState(0)
    const [id, setid] = useState()
    const [search, setsearch] = useState("")
    const [loader, setloader] = useState(true)
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [Toggle, setToggle] = useState()
    const [loading, setloading] = useState(false)
    const [country_flag, setcountry_flag] = useState()
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const token = localStorage.getItem("logintoken")
    const [selectedValue, setSelectedValue] = useState(true)
    const [recentTab, setrecentTab] = useState("")
    const [reqmoneymsg, setreqmoneymsg] = useState("")
    const navigate = useNavigate()
    const ref2 = useRef()



    const GetReferralsData = async () => {
        try {
            const totaldata = await GetReferrals(token, sortedBy, orderBy, search, pageNumber)
            console.log(totaldata.data.rows, "daatattadsddddddd")
            if (totaldata.status == true) {
                setTimeout(() => {
                    setExample(true)
                    setdata(totaldata?.data.rows)
                    setcount(totaldata?.data.count)
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
            console.log(err)
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }
    useEffect(() => {
        GetReferralsData()
    }, [sortedBy, orderBy, search, pageNumber, recentTab])


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
    };

    const GoToUserDetail = (id) => {
        console.log(id, "iddddddddddddddddd")
        navigate("/user-details", { state: id })
    }

    const GoWithdrwal = (data) => {
        // navigate(`/transaction`, { state: statadata })
        navigate("/admin/withdrawal", { state: data })
    }
    const copiedInfo = () => {
        toast.success(" Successful copy ", { autoClose: 1000 })
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
                                        <h5>Referrals</h5>
                                        <div className="nk-block-des text-soft">
                                            <p>Total <span className='fw-bold'>({count})</span> Referrals  </p>
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
                                                    <li><a className="btn btn-white btn-outline-primary" href={BaseUrl + `clients/all/admin/deposits/export`}><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>
                                                    <li className="nk-block-tools-opt">
                                                        <div className="drodown">
                                                            {/* <a className="dropdown-toggle btn btn-icon btn-primary"
                                                            // data-bs-toggle="dropdown" 
                                                            ><em className="icon ni ni-plus" /></a> */}
                                                            {/* <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report" ><a ><span>Add Currency</span></a></li>
                                                                    <li><a ><span>Add Team</span></a></li>
                                                                    <li><a ><span>Import customer</span></a></li>
                                                                </ul>
                                                            </div> */}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-full">
                                <div className="card-inner" style={{ borderBottom: "1px solid #ddd" }}>
                                    <div className="card-title-group">
                                        {/* <div className="card-title">
                                        <h6 className="title"><span className="me-2"> Recent Transactions </span> <a href="#" className="link d-none d-sm-inline">See
                                            History</a></h6>
                                    </div> */}
                                        <div className="card-tools">
                                            <ul className="card-tools-nav">
                                                <li className={recentTab == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab(""); setTotalSize(0) }}><span >{recentTab == "" ? <b>History
                                                </b> : <span>History
                                                </span>}</span></a></li>
                                                <li className={recentTab == "Pending" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("Pending"); setTotalSize(0) }}><span>{recentTab == "Pending" ? <b>
                                                    Pending</b> : <span>
                                                    Pending</span>}</span></a></li>
                                                {/* <li className={recentTab == "Oh - hold" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("Oh - hold")}><span>Oh - hold</span></a></li> */}
                                                {/* <li className={recentTab == "Failed" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("Failed"); setTotalSize(0) }}><span>{recentTab == "Failed" ? <b>Rejected</b> : <span>Rejected</span>}</span></a></li>
                                                <li className={recentTab == "Success" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("Success"); setTotalSize(0) }}><span> {recentTab == "Success" ? <b>Processed</b> : <span>Processed</span>}</span></a></li> */}
                                                {/* <li className={recentTab == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("")}><span>All</span></a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">

                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text">User {sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} />}</span></div>
                                        {/* <div className="nk-tb-col tb-col-mb"><span className="sub-text">
                                            TXN ID {sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />}</span></div> */}
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Phone {sortedBy == 'phone' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Referral code {sortedBy == "referral_code" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("referral_code") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("referral_code") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Created At {sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span>
                                        </div>
                                        {/* <div className="nk-tb-col tb-col-md"><span className="sub-text">Status {sortedBy == "payment_status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_status") }} />}</span></div>
                                        <div className="nk-tb-col nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1 my-n1">
                                                <li>
                                                    <div className="drodown">
                                                        <a className="sub-text" >Action</a>

                                                    </div>
                                                </li>
                                            </ul>
                                        </div> */}
                                        {/* <div className="nk-tb-col "><span className="sub-text fw-bold">Name{sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} />} </span></div> */}
                                        {/* <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">TXN ID{sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />} </span></div> */}
                                        {/* <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">referral_code{sortedBy == "referral_code" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("referral_code") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">Created At{sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span></div> */}
                                        {/* <div className="nk-tb-col tb-col-lg text-center"><span className="sub-text  fw-bold">Status{sortedBy == "status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} />}</span></div>
                                        <div className="nk-tb-col  text-center"><span className="sub-text fw-bold">Action</span></div> */}
                                    </div>

                                    {
                                        loader == true ?
                                            <div className="nk-tb-item">
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col tb-col-md"></div>
                                                <div className="nk-tb-col tb-col-lg">
                                                    <Loader />
                                                </div>
                                                <div className="nk-tb-col tb-col-lg">
                                                </div>
                                                {/* <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div> */}
                                                {/* <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div> */}
                                                {/* <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div> */}

                                            </div>
                                            :
                                            <>
                                                {
                                                    data.length == 0 &&
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col tb-col-md"></div>
                                                        <div className="nk-tb-col">
                                                            <h6>No Request Money Data Available</h6></div>
                                                        <div className="nk-tb-col tb-col-md">
                                                        </div>
                                                        {/* <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div>
                                                        <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div> */}
                                                        {/* <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div> */}
                                                    </div>
                                                }


                                                {
                                                    data.length > 0 && data.map((data) => {
                                                        // console.log(data, "setreqmoneymsgsetreqmoneymsgsetreqmoneymsg")
                                                        var stillUtcs = moment.utc(data.created_at).toDate();
                                                        var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                                        return (
                                                            //         <div className="nk-tb-item" key={data.id}>
                                                            //             <div className="nk-tb-col">
                                                            //                 <a >
                                                            //                     <div className="user-card" >
                                                            //                         {

                                                            //                             <div className="user-info " style={{ cursor: "pointer", }}
                                                            //                             //  onClick={() => GoToUserDetail(data?.transaction?.client_id)}
                                                            //                             >
                                                            //                                 <span className="tb-lead " ><span style={{ textTransform: "capitalize" }}>{data?.first_name}{data?.middle_name}{data?.last_name} </span>
                                                            //                                     <br></br> {data?.email}<br></br>
                                                            //                                     {data?.phone_code} {data?.phone}
                                                            //                                     <span className="dot dot-success d-md-none ms-1" /></span>
                                                            //                             </div>
                                                            //                         }
                                                            //                     </div>
                                                            //                 </a>
                                                            //             </div>

                                                            //             {/* <div className="nk-tb-col tb-col-lg">
                                                            //                 <a > */}
                                                            //             {/* <div className="user-card" > */}
                                                            //             {/* key-request_identity, value-International Send,
                                                            //                      key-request_type, value-Easy Bank Manual, wallet, Google-pay, card, Manual Bank */}

                                                            //             {
                                                            //                 // (data.request_identity === "International Send" && (data.request_type === "wallet" || data.request_type === "Google-pay" || data.request_type === "Manual Bank" || data.request_type === "card" || data.request_type === "Easy Bank Manual"))
                                                            //                 // && <div className="user-info">
                                                            //                 //     <span className="tb-lead">
                                                            //                 //         {data.request_type}<span className="dot dot-success d-md-none ms-1" /></span>
                                                            //                 // </div>
                                                            //                 // <div className="user-info">
                                                            //                 //     <span className="tb-lead">{data.ref_id}<span className="dot dot-success d-md-none ms-1" /></span>
                                                            //                 // </div>
                                                            //             }
                                                            //             {/* </div> */}
                                                            //             {/* </a>
                                                            //             </div> */}

                                                            //             {/* 
                                                            //             <div className="nk-tb-col tb-col-lg">
                                                            //                 <a >
                                                            //                     <div className="user-card" >
                                                            //                         {
                                                            //                             data?.transcation?.txn_id == null ? <div className="user-info">
                                                            //                                 <span className="tb-lead" onClick={() => { GoWithdrwal(data) }} style={{ cursor: "pointer" }}>N/A<span className="dot dot-success d-md-none ms-1" /></span>
                                                            //                             </div> : <div className="user-info" style={{ cursor: "pointer", }}>
                                                            //                                 <span className="tb-lead text-primary" ><span onClick={() => { GoWithdrwal(data) }}>{data?.transcation?.txn_id}</span><span><CopyToClipboard text={data?.transaction?.txn_id} style={{ height: '25px', width: '25px', padding: 2 }} >
                                                            //                                     <span className='btn btn-primary btn-sm ms-1' onClick={() => copiedInfo()}><e className="fa fa-copy fa fa-solid text-white" style={{ fontSize: '17px' }}></e></span>
                                                            //                                 </CopyToClipboard> </span>
                                                            //                                 </span>
                                                            //                             </div>
                                                            //                         }
                                                            //                     </div>
                                                            //                 </a>
                                                            //             </div> */}


                                                            //             <div className="nk-tb-col tb-col-lg">
                                                            //                 <ul className="list-status">
                                                            //                     {
                                                            //                         data?.referral_code == null ? <li> <span>N/A</span></li> : <li> <span >{data?.referral_code}</span></li>
                                                            //                     }
                                                            //                     {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}
                                                            //                 </ul>
                                                            //             </div>

                                                            //             <div className="nk-tb-col tb-col-lg">
                                                            //                 <ul className="list-status">
                                                            //                     {
                                                            //                         timeZones == null ? <li> <span>N/A</span></li> : <li> <span >{timeZones}</span></li>

                                                            //                     }
                                                            //                     {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}
                                                            //                 </ul>
                                                            //             </div>

                                                            //             {/* 
                                                            //             <div className="nk-tb-col tb-col-lg">
                                                            //                 <ul className="list-status">
                                                            //                     {
                                                            //                         data?.transcation?.payment_status == "pending" && <span className="badge badge-sm badge-dot has-bg bg-warning d-none d-sm-inline-flex">Pending</span>
                                                            //                     }
                                                            //                     {
                                                            //                         data?.transcation?.payment_status == "success" && <span className="badge badge-sm badge-dot has-bg bg-success d-none d-sm-inline-flex">Completed</span>
                                                            //                     }
                                                            //                     {
                                                            //                         data?.transcation?.payment_status == "failed" && <span className="badge badge-sm badge-dot has-bg bg-danger d-none d-sm-inline-flex">Rejected</span>
                                                            //                     }
                                                            //                 </ul>
                                                            //             </div> */}

                                                            //             {/* 
                                                            //             <div className="nk-tb-col">
                                                            //                 <ul onClick={() => reqmoneystatus(data)}>
                                                            //                     {
                                                            //                         data?.transcation?.payment_status == "pending" && <button className="btn btn-primary" style={{ padding: "4px 15px", fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#modal-report"  ><span>Process</span></button>
                                                            //                     }
                                                            //                     {
                                                            //                         data?.transcation?.payment_status == "success" && <button className="btn btn-primary" style={{ padding: "4px 15px", fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#modal-report" disabled><span>Process</span></button>
                                                            //                     }
                                                            //                     {
                                                            //                         data?.transcation?.payment_status == "failed" && <button className="btn btn-primary" style={{ padding: "4px 15px", fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#modal-report" disabled><span>Process</span></button>
                                                            //                     }
                                                            //                 </ul>
                                                            //             </div> */}




                                                            //             {/* <div className="nk-tb-col ">
                                                            //                 <ul onClick={() => { setid(data.id) }}>
                                                            //                     {
                                                            //                         data?.status == "pending" && <button className="btn btn-primary" style={{ padding: "4px 15px", fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#modal-report"  ><span>Pdfgdg</span></button>
                                                            //                     }

                                                            //                     {
                                                            //                         data?.status == "completed" && <button className="btn btn-primary" style={{ padding: "4px 15px", fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#modal-report" disabled><span>Pdsfsd</span></button>
                                                            //                     }


                                                            //                     {
                                                            //                         data?.status == "rejected" && <button className="btn btn-primary" style={{ padding: "4px 15px", fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#modal-report" disabled><span>Pdfsd</span></button>
                                                            //                     }


                                                            //                 </ul>
                                                            //             </div> */}

                                                            //             {/* ; documentVerifyedstatus(e) */}




                                                            //             {/* <div className="nk-tb-col nk-tb-col-tools">
                                                            //     <ul className="nk-tb-actions gx-1">

                                                            //         <li onClick={() => { setid(data.id) }}>
                                                            //             <div className="drodown"> */}
                                                            //             {/* <a className="dropdown-toggle btn btn-icon btn-trigger"
                                                            //                 data-bs-toggle="dropdown"
                                                            //                 ><em className="icon ni ni-more-h" /></a> */}
                                                            //             {/* <div className="dropdown-menu dropdown-menu-end">
                                                            //                     <ul className="link-list-opt no-bdr"> */}

                                                            //             {/* <li ><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>View Details</span></a></li> */}
                                                            //             {/* <li style={{ color: "blue", cursor: "pointer" }} onClick={getCurrencyDatabyid} data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" ><a ><em className="icon ni ni-edit" /><span style={{ cursor: "pointer" }}>Edit</span></a></li>
                                                            //                         <li onClick={handleDelete} style={{ color: "red", cursor: "pointer" }} ><a ><em className="icon ni ni-trash" /><span>Delete</span></a></li> */}
                                                            //             {/* <li className="divider" />
                                                            //                                     <li><a ><em className="icon ni ni-shield-star" /><span>Reset Pass</span></a></li>
                                                            //                                     <li><a ><em className="icon ni ni-shield-off" /><span>Reset 2FA</span></a></li>
                                                            //                                     <li><a ><em className="icon ni ni-na" /><span>Suspend User</span></a></li> */}
                                                            //             {/* </ul>
                                                            //                 </div> */}
                                                            //             {/* </div>
                                                            //         </li>
                                                            //     </ul>
                                                            // </div> */}
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
                                                                                    <span className="user-avatar bg-success-dim"><e className="icon ni ni-percent">
                                                                                    </e></span>
                                                                                </div>
                                                                                <div className="user-info" style={{ cursor: "pointer", }} >
                                                                                    <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data?.first_name}{data?.middle_name}{data?.last_name} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    <span>{data?.email}</span>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div >
                                                                    {/* <div className="nk-tb-col tb-col-mb">
                                                                        <span className="tb-amount"
                                                                             onClick={() => { GoAllreqTxn(data.id) }}
                                                                            style={{ cursor: "pointer" }}>{data.txn_id} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                        <span className=" tb-status  text-success ">Deposit</span>
                                                                        <span className="tb-amount">{data?.transcation?.txn_id} <span className="currency">USD</span></span>
                                                                    </div> */}
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        <span>  +{data?.phone_code} {data?.phone}</span>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <span>{data?.referral_code}</span>

                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <span>{timeZones}</span>
                                                                    </div>
                                                                    {/* <div className="nk-tb-col tb-col-md">
                                                                        {
                                                                            data?.status == "pending" && <span className="tb-status text-warning">Pending</span>
                                                                        }
                                                                        {
                                                                            data?.status == "completed" && <span className="tb-status text-success">Completed</span>
                                                                        }
                                                                        {
                                                                            data?.status == "rejected" && <span className="tb-status text-danger">Rejected</span>
                                                                        }
                                                                    </div> */}
                                                                    {/* <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1"> */}
                                                                    {/* <li className="nk-tb-action-hidden">
                                                                                <a onClick={() => GoToUserDetail(data.client_id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                                    <em class="icon ni ni-user-alt"></em>
                                                                                </a>
                                                                            </li>
                                                                            <li className="nk-tb-action-hidden">
                                                                                <a onClick={() => GoToUserDetail(data.client_id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                                    <em class="icon ni ni-eye"></em>
                                                                                </a>
                                                                            </li> */}


                                                                    {/* <li>
                                                                                <div className="drodown">
                                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a> */}

                                                                    {/* {
                                                                                        data?.transcation?.payment_status == "pending" && <div className="dropdown-menu dropdown-menu-end">
                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                                <li onClick={() => { GoWithdrwal(data) }} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>

                                                                                                <li class="divider"></li>
                                                                                                <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-check-circle-cut  "></em><span>Confrim</span></a></li>
                                                                                                <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-cross-c"></em><span>Reject</span></a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    }{
                                                                                        (data?.transcation?.payment_status == "failed" || data?.transcation?.payment_status == "success") &&
                                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                                <li onClick={() => { GoWithdrwal(data) }} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    } */}

                                                                    {/* </div>
                                                                            </li> */}
                                                                    {/* </ul>
                                                                    </div> */}
                                                                </div>{/* .nk-tb-item */}
                                                            </>

                                                        )
                                                    })
                                                }
                                            </>
                                    }

                                </div>
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
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default Referrals
