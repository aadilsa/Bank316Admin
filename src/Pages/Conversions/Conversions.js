import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { Getconversions } from '../../API/TransferAPi/TransferAPI'
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
import { WithdrawalsApprove } from '../../API/Withdrawals/WithdrawalsAPI'

const AddSuccessToast = () => {
    toast.success('Status Change successfully.', { autoClose: 2000 });
}

const addErrorToast = (massage) => {
    toast.error(massage, {
        autoClose: 2000
    });
}

const Conversions = () => {
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
    const [singletxn, setsingletxn] = useState([])

    const navigate = useNavigate()
    const ref2 = useRef()
    const ref1 = useRef()


    const reqmoneystatus = (data) => {
        // console.log(data, "datatatatatatatatatatatatatatatatat")
        // if (data.req_unique_id != null) {
        //     setreqmoneymsg("Reqmoney")
        // }
        // else if ((data.request_identity == "Local Send" || data.request_identity == "International Send") && data.request_type == "wallet") {
        //     setreqmoneymsg("Wallet")
        // }
        // else if
        //     ((data.request_identity == "Local Send" || data.request_identity == "International Send") && data.request_type == "Manual Bank") {
        //     setreqmoneymsg("ManualBank")
        //     // console.log(reqmoneymsg)
        //     // alert("aadil")
        // }
        // else {
        //     setreqmoneymsg("")
        //     console.log(reqmoneymsg, "kuch bhi nhiiii")
        // }
        setid(data?.walletDetails?.request_id)
    }

    console.log("PPPPPPPPP", reqmoneymsg)

    const signUpSchemas = yup.object({
        ShortName: yup.string().required("Please Enter Massage"),
        role: yup.string().required('Please select Role'),
    });
    const initialValues = {
        ShortName: "",
    }

    // const form = useFormik({
    //     initialValues: {
    //         ShortName: "",
    //         role: "",

    //     },
    //     validationSchema: signUpSchemas,
    //     onSubmit: async (values, { resetForm }) => {
    //         // console.log(values.role, "is_request_money")
    //         const datas = JSON.stringify({
    //             "is_request_money": JSON.parse(values.role),
    //             "comment": values.ShortName
    //         })
    //         console.log(datas, "..............")
    //         // console.log(datas, "datatatat??????????")
    //         const ManualBank = await WithdrawalsApprove(token, id, datas)
    //         console.log(ManualBank, "ManualBank")
    //         if (ManualBank.status == true) {
    //             ref2.current.click()
    //             form.resetForm()
    //             AddSuccessToast()
    //             WithdrawalsTxnData()
    //             // setSelectedValue(true)
    //         }
    //         else {
    //             addErrorToast(ManualBank.message)
    //             form.resetForm()
    //             ref2.current.click()
    //             // setSelectedValue(true)
    //         }
    //     }
    // })
    setTimeout(() => {
        setscroll(true)
    }, 3000);


    const ConversionsData = async () => {
        try {
            const totaldata = await Getconversions(token, recentTab, sortedBy, orderBy, search, pageNumber)
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
        ConversionsData()
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



    const handleSelect = (e) => {
        const selectedOption = e.target.value;
        setSelectedValue(selectedOption);
    };


    const GoToUserDetail = (id) => {
        console.log(id, "iddddddddddddddddd")
        navigate("/user-details", { state: id })
    }
    const copiedInfo = () => {
        toast.success(" Successful copy ", { autoClose: 1000 })
    }




    const GoWithdrwal = (data) => {
        // navigate(`/transaction`, { state: statadata })
        navigate("/admin/withdrawal", { state: data })
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
                                        <h5>Conversions</h5>
                                        <div className="nk-block-des text-soft">
                                            <p>Total <span className='fw-bold'>({count})</span> transactions  </p>
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
                                                <li className={recentTab == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab(""); setTotalSize(0) }}><span >{recentTab == "" ? <b>History</b> : <span>History</span>}</span></a></li>
                                                <li className={recentTab == "Pending" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("Pending"); setTotalSize(0) }}><span>{recentTab == "Pending" ? <b>
                                                    Pending</b> : <span>
                                                    Pending</span>}</span></a></li>
                                                {/* <li className={recentTab == "Oh - hold" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("Oh - hold")}><span>Oh - hold</span></a></li> */}
                                                <li className={recentTab == "Success" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("Success"); setTotalSize(0) }}><span> {recentTab == "Success" ? <b>
                                                    Confirmed</b> : <span>
                                                    Confirmed</span>}</span></a></li>
                                                <li className={recentTab == "Failed" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("Failed"); setTotalSize(0) }}><span>{recentTab == "Failed" ? <b>Rejected</b> : <span>Rejected</span>}</span></a></li>

                                                {/* <li className={recentTab == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("")}><span>All</span></a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">

                                    {/* <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col "><span className="sub-text fw-bold">Name{sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} />} </span></div>
                                    <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">TXN ID{sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />} </span></div>
                                    <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Amount{sortedBy == "amount" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} />}</span></div>
                                    <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">Created At{sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span></div>
                                    <div className="nk-tb-col tb-col-lg text-center"><span className="sub-text  fw-bold">Status{sortedBy == "status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} />}</span></div>
                                    <div className="nk-tb-col  text-center"><span className="sub-text fw-bold">Action</span></div>
                                </div> */}
                                    <div className="nk-tb-item nk-tb-head">
                                        {/* <div className="nk-tb-col nk-tb-col-check">
                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                            <input type="checkbox" className="custom-control-input" id="uid" />
                                            <label className="custom-control-label" htmlFor="uid" />
                                        </div>
                                    </div> */}
                                        <div className="nk-tb-col"><span className="sub-text">User {sortedBy == "recipient_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("recipient_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("recipient_name") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-mb"><span className="sub-text">
                                            TXN ID {sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">From {sortedBy == 'base_amount' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('base_amount') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('base_amount') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">TO {sortedBy == "converted_amount" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("converted_amount") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("converted_amount") }} />}</span></div>

                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Current Rate {sortedBy == "converted_currency_rate" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("converted_currency_rate") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("converted_currency_rate") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Created At {sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span>
                                        </div>
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
                                                <div className="nk-tb-col tb-col-lg">
                                                    <Loader />
                                                </div>
                                                <div className="nk-tb-col tb-col-lg"></div>
                                                <div className="nk-tb-col tb-col-md"></div>
                                                <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div>

                                            </div>
                                            :
                                            <>
                                                {
                                                    data.length == 0 &&
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col tb-col-mb"></div>
                                                        <div className="nk-tb-col tb-col-md">

                                                        </div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                            {scroll == true ? <h6>No Request Money Data Available</h6> : <Loader />}</div>

                                                        <div className="nk-tb-col tb-col-lg"></div>
                                                        <div className="nk-tb-col tb-col-md"></div>
                                                        <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div>

                                                    </div>



                                                }


                                                {
                                                    data.length > 0 && data.map((data) => {
                                                        // console.log(data, "setreqmoneymsgsetreqmoneymsgsetreqmoneymsg")
                                                        var stillUtcs = moment.utc(data?.created_at).toDate();
                                                        var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                                        return (

                                                            <>
                                                                <div className="nk-tb-item">
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
                                                                                    <span className="user-avatar bg-warning-dim"><e className="icon ni ni-tranx" style={{ fontSize: '24px' }}>
                                                                                    </e></span>
                                                                                </div>
                                                                                <div className="user-info" style={{ cursor: "pointer", }}
                                                                                //  onClick={() => GoToUserDetail(data?.transcation?.client_id)}
                                                                                >
                                                                                    <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data?.transcation?.recipient_name}yogesh Gurjar <span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    <span>{data?.client?.email}yogesh@gmail.com</span>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-mb">
                                                                        <span className="tb-amount"
                                                                            // onClick={() => { GoWithdrwal(data) }} 
                                                                            style={{ cursor: "pointer" }}>{data?.transcation?.txn_id}298564449038112<span className="dot dot-success d-md-none ms-1" /></span>
                                                                        {/* <span className=" tb-status  text-success "></span> */}
                                                                        <span className=" tb-status  text-success ">
                                                                            <em class="icon ni ni-bullet-fill"></em>{data.txn_type}
                                                                        </span>
                                                                        {/* <span className="tb-amount">{data?.transcation?.txn_id} <span className="currency">USD</span></span> */}
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        <span> {data?.base_amount} {data?.base_currency}</span>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <span>{data?.converted_amount} {data?.converted_currency}</span>

                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        <span>{data.converted_currency_rate}</span>

                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <span>{timeZones}</span>
                                                                    </div>

                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">
                                                                            <li className="nk-tb-action-hidden">
                                                                                <a onClick={() => GoToUserDetail(data?.transcation?.client_id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                                    <em class="icon ni ni-user-alt-fill"></em>
                                                                                </a>
                                                                            </li>
                                                                            <li className="nk-tb-action-hidden" data-bs-toggle="modal" data-bs-target="#modal-txn">
                                                                                <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                                    <em class="icon ni ni-eye-fill" ></em>
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <div className="drodown">
                                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">
                                                                                            <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                            <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-txn"><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>

                                                                                            {/* <li class="divider"></li>
                                                                                            <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-check-circle-cut  "></em><span>Confrim</span></a></li>
                                                                                            <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-cross-c"></em><span>Reject</span></a></li> */}
                                                                                        </ul>
                                                                                    </div>

                                                                                    {/* {
                                                                                        (data?.transcation?.payment_status == "failed" || data?.transcation?.payment_status == "success") &&
                                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                                <li onClick={() => { GoWithdrwal(data) }} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
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




            <div className="modal modal-blur fade" id="modal-txn" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Conversion ID# <span>{singletxn?.transcation?.txn_id}</span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1} data-dismiss="modal" />
                        </div>
                        <form >
                            <div className="modal-body">
                                <ul class="nk-top-products mb-3">
                                    <li class="item pt-0">
                                        <div class="user-avatar bg-primary mright-2">
                                            <span class="user-avatar bg-warning-dim">
                                                <e class="icon ni ni-arrow-up-right"></e></span>
                                            <em class="icon ni ni-wallet-fill walletIconNew"></em>
                                        </div>
                                        <div class="info"><div class="title"><b>  {singletxn?.transaction?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</b></div>
                                            {/* <div class="price">{timeZones}</div> */}
                                        </div>
                                        {
                                            singletxn?.transcation?.payment_status == "success" && <div class="total badge rounded-pill bg-success">success</div>
                                        }
                                        {
                                            singletxn?.transcation?.payment_status == "pending" && <div class="total badge rounded-pill bg-warning">pending</div>
                                        }
                                        {
                                            singletxn?.transcation?.payment_status == "failed" && <div class="total badge rounded-pill bg-danger">failed</div>
                                        }
                                    </li>
                                </ul>

                                <div className="row tableUserModal">
                                    <div className="col-md-6">
                                        <h6 className="mb-3">USER DETAILS</h6>
                                        <ul>
                                            <li className="mb-3">User Account <span className="d-block">{singletxn?.sender?.first_name} {singletxn?.sender?.last_name} <small></small></span></li>
                                            <li className="mb-3">Email <span className="d-block">{singletxn?.sender?.email}</span></li>
                                            <li className="mb-3">Mobile Number  <span className="d-block">{singletxn?.sender?.phone}</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="mb-3">ACCOUNT DETAILS</h6>
                                        <ul>
                                            <li className="mb-3">Cash Balance <span className="d-block">2,459 GBP</span></li>
                                            <li className="mb-3">Default Wallet <span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                            <li className="mb-3">Country <span className="d-block">United Kingdom</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row tableUserModal">
                                    <div className="col-md-12"><h6 className="mb-3">TRANSACTION DETAILS</h6></div>
                                    <div className="col-md-6">
                                        <ul>
                                            <li className="mb-3">From   <span className="d-block">{singletxn?.transcation?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                            <li className="mb-3">Transaction  Amount <span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                            <li className="mb-3">Conversion charge applied <span className="d-block">{singletxn?.transcation?.txn_charge_amount} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                            <li className="mb-3">Total Amount Converted  <span className="d-block">{singletxn?.transcation?.txn_charge_amount} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                            {/* <li className="mb-3">Adj Transfer Amount <span className="d-block"> {singletxn?.transcation?.amount} {singletxn?.receiver?.currencywallets[0]?.currency?.short_name}</span></li> */}
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul>
                                            <li className="mb-3">To <span className="d-block">UID08124</span></li>
                                            <li className="mb-3">EURO Balance <span className="d-block">Jan 23, 2024 6:30 PM</span></li>
                                            <li className="mb-3">Exchange Rate <span className="d-block">Jan 23, 2024 6:30 PM</span></li>
                                            <li className="mb-3">Converted Amount <span className="d-block">{singletxn?.transcation?.payment_method}</span></li>
                                            {/* <li className="mb-3">Wallet Balance after Txn <span className="d-block">{singletxn?.transcation?.other_closing_balance} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li> */}
                                        </ul>
                                    </div>
                                </div>


                                <div className="row tableUserModal">
                                    <div className="col-md-12"><h6 className="mb-3">ADDITIONAL  DETAILS</h6></div>
                                    <div className="col-md-6">
                                        <ul>
                                            <li className="mb-3">Transaction type    <span className="d-block">{singletxn?.transcation?.txn_type}</span></li>
                                            <li className="mb-3">Status    <span className="d-block">Deposit Via Manual Bank Transfer </span></li>
                                            <li className="mb-3">Converted On   <span className="d-block">Manual Bank Transfer</span></li>
                                            {/* <li className="mb-3">Account Sort Code   <span className="d-block">Manual Bank Transfer</span></li> */}

                                            {/* <li className="mb-3">Payment Gateway <span className="d-block">Manual Bank Transfer</span></li> */}
                                            {/* {
                                       singletxn?.transaction?.payment_status !== "pending" && <li className="mb-3">Completed By  <span className="d-block">Aadil Mansuri</span></li>
                                    } */}

                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul>
                                            <li className="mb-3">Account Type   <span className="d-block">Personal</span></li>
                                            <li className="mb-3">Verification Status <span className="d-block">Verified</span></li>
                                            <li className="mb-3">Default Currency Wallet  <span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                            {/* <li className="mb-3">Transaction Status <span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li> */}
                                            {/* {
                                       singletxn?.transaction?.payment_status !== "pending" && <li className="mb-3">Completed On  <span className="d-block">Jan 23 2024, 5:30 PM</span></li>

                                    } */}

                                        </ul>
                                    </div>
                                </div>



                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default Conversions
