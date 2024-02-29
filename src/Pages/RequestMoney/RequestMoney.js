import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { RequestMoneyData, RequestMoneyTxnData } from '../../API/RequestMoneypi/ReqMoneyApi'
import ReactPaginate from 'react-paginate'
import Loader from '../Loader/Loader'
import { ManualBankStatus } from '../../API/RequestMoneypi/ReqMoneyApi'
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../../API/config'

const AddSuccessToast = () => {
    toast.success('Status Change successfully.', { autoClose: 2000 });
}
const addErrorToast = (massage) => {
    toast.error(massage, {
        autoClose: 2000
    });
}

function RequestMoney() {
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
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const token = localStorage.getItem("logintoken")
    const [selectedValue, setSelectedValue] = useState(true)
    const [recentTab, setrecentTab] = useState("")
    const [reqmoneymsg, setreqmoneymsg] = useState("")
    const [comment, setcomment] = useState("")
    const [txnid, settxnid] = useState()
    const [singletxn, setsingletxn] = useState([])
    const [alldata, setalldata] = useState([])
    const navigate = useNavigate()
    const ref2 = useRef()
    const ref1 = useRef()

    const reqmoneystatus = (data) => {
        if (data.req_unique_id != null) {
            setreqmoneymsg("Reqmoney")
        }
        else if ((data.request_identity == "Local Send" || data.request_identity == "International Send") && data.request_type == "wallet") {
            setreqmoneymsg("Wallet")
        }
        else if
            ((data.request_identity == "Local Send" || data.request_identity == "International Send") && data.request_type == "Manual Bank") {
            setreqmoneymsg("ManualBank")
        }
        else {
            setreqmoneymsg("")
            console.log(reqmoneymsg, "kuch bhi nhiiii")
        }
        setid(data.id)
    }
    const signUpSchemas = yup.object({
        ShortName: yup.string().required("Please Enter Massage"),
        role: yup.string().required('Please select Role'),
    });
    const initialValues = {
        ShortName: "",
    }

    const form = useFormik({
        initialValues: {
            ShortName: "",
            role: "",
        },
        validationSchema: signUpSchemas,
        onSubmit: async (values, { resetForm }) => {
            const datas = JSON.stringify({
                "is_request_money": JSON.parse(values.role),
                "comment": values.ShortName
            })
            console.log(reqmoneymsg, "reqmoneymsg")
            const ManualBank = await ManualBankStatus(reqmoneymsg, id, datas, token)
            console.log(ManualBank, "ManualBank")
            if (ManualBank.status == true) {
                ref1.current.click()
                form.resetForm()
                AddSuccessToast()
                GetRequestMoneyData()
            }
            else {
                addErrorToast(ManualBank.message)
                form.resetForm()
                ref2.current.click()
            }
        }
    })
    setTimeout(() => {
        setscroll(true)
    }, 3000);

    const GetRequestMoneyData = async () => {
        try {
            const totaldata = await RequestMoneyData(token,
                // recentTab, sortedBy, orderBy, search, pageNumber
            )
            console.log(totaldata.data.rows, "daatattadsddddddd")
            if (totaldata.status == true) {
                setTimeout(() => {
                    setExample(true)
                    setdata(totaldata?.data.rows)
                    setcount(totaldata?.data.count)
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
        GetRequestMoneyData()
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

    const GoAllreqTxn = (id) => {
        const statadata = {
            id: id,
            token: token
        }
        navigate("/admin/deposits/transactions", { state: statadata })
    }

    const approvedcancell = () => {
        Swal.fire({
            title: 'Cancel Transaction??',
            text: "You cannot revert back this action, so please confirm that you've not received the payment yet and want to cancel.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: 'Yes, Cancel'
        }).then(async (result) => {
            if (result.value) {
                const datas = JSON.stringify({
                    "is_request_money": false,
                    "comment": comment
                })
                const response = await ManualBankStatus(reqmoneymsg, id, datas, token)
                if (response?.status) {
                    Swal.fire(
                        'Transaction Cancelled',
                        'Transaction has been marked as cancelled .',
                    )
                    ref2.current.click()
                    GetRequestMoneyData()
                } else {
                    toast.error("something went wrong")
                    ref2.current.click()
                }
            }
        })
    }


    const ApprovedWidthdrawal = () => {
        Swal.fire({
            title: 'Complete Transaction?',
            text: "Transaction has been marked as Complete ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ee0ac',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancel",
            confirmButtonText: 'Yes Procced'
        }).then(async (result) => {
            if (result.value) {
                const datas = JSON.stringify({
                    "is_request_money": true,
                    "comment": "comment"
                })
                const response = await ManualBankStatus(reqmoneymsg, id, datas, token)
                if (response?.status) {
                    Swal.fire(
                        'Approved!',
                        'Your Deposit Request has been Approved.',
                        'success'
                    )
                    GetRequestMoneyData()
                    ref1.current.click()
                } else {
                    toast.error("something went wrong")
                    ref1.current.click()
                }
            }
        })
    }

    const ReqMoneyTxndata = async (id) => {
        try {
            const totaldata = await RequestMoneyTxnData(token, id)
            console.log(totaldata?.data, "daatattadsddddddd")
            if (totaldata?.status == true) {
                setsingletxn(totaldata?.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    var singlestillUtcs = moment.utc(singletxn?.transaction?.created_at).toDate();
    var singletimeZones = moment(singlestillUtcs).local().format('MMM D, YYYY hh:mm A');
    console.log(singletxn, "singletxn?.transaction?.created_at")
    console.log(singletimeZones, "singletimeZones")
    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h5>Deposits</h5>
                                        <div className="nk-block-des text-soft">
                                            <p>Total <span className='fw-bold'>({count})</span> transactions.</p>
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
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-full">
                                <div className="card-inner" style={{ borderBottom: "1px solid #ddd" }}>
                                    <div className="card-title-group">
                                        <div className="card-tools">
                                            <ul className="card-tools-nav">
                                                <li className={search == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch(""); setTotalSize(0) }}><span >{search == "" ? <b>History</b> : <span>History</span>}</span></a></li>
                                                <li className={search == "pending" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("pending"); setTotalSize(0) }}><span>{search == "pending" ? <b>Pending</b> : <span>Pending</span>}</span></a></li>                                                <li className={search == "completed" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("completed"); setTotalSize(0) }}><span> {search == "completed" ? <b>Completed</b> : <span>Completed</span>}</span></a></li>
                                                <li className={search == "rejected" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("rejected"); setTotalSize(0) }}><span>{search == "rejected" ? <b>Rejected</b> : <span>Rejected</span>}</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text">User {sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-mb"><span className="sub-text">
                                            TXN ID {sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Description {sortedBy == 'phone' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Amount {sortedBy == "amount" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Created At {sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Status {sortedBy == "status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} />}</span></div>
                                        <div className="nk-tb-col nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1 my-n1">
                                                <li>
                                                    <div className="drodown">
                                                        <a className="sub-text" >Action</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {
                                        loader == true ?
                                            <div className="nk-tb-item">
                                                <div className="nk-tb-col "></div>
                                                <div className="nk-tb-col tb-col-mb"></div>
                                                <div className="nk-tb-col tb-col-md"></div>
                                                <div className="nk-tb-col tb-col-lg"> <Loader /> </div>
                                                <div className="nk-tb-col tb-col-lg"></div>
                                                <div className="nk-tb-col tb-col-md">    </div>
                                                <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div>
                                            </div>
                                            :
                                            <>
                                                {
                                                    data.length == 0 &&
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col tb-col-mb"></div>
                                                        <div className="nk-tb-col tb-col-md"></div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                            {scroll == true ? <h6>No Request Money Data Available</h6> : <Loader />}</div>
                                                        <div className="nk-tb-col tb-col-lg"></div>
                                                        <div className="nk-tb-col tb-col-md"></div>
                                                        <div className="nk-tb-col nk-tb-col-tools tb-col-lg"></div>
                                                    </div>
                                                }

                                                {
                                                    data.length > 0 && data.map((data) => {
                                                        console.log(data, "dddddddddd")
                                                        var stillUtcs = moment.utc(data.created_at).toDate();
                                                        var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                                        return (
                                                            <>
                                                                <div className="nk-tb-item" key={data.id}>
                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card">
                                                                                <div className="user-avatar bg-primary">
                                                                                    <span className="user-avatar bg-success-dim"><e className="icon ni ni-arrow-down-left">
                                                                                    </e></span>   <em class="icon ni ni-wallet-fill walletIconNew"></em>
                                                                                </div>
                                                                                <div className="user-info" style={{ cursor: "pointer", }} onClick={() => GoToUserDetail(data.client_id)}>
                                                                                    <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data?.client_name}  <span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    <span>{data?.client_email}</span>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div >
                                                                    <div className="nk-tb-col tb-col-mb">
                                                                        <span className="tb-amount" style={{ cursor: "pointer" }}>{data.txn_id} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                        <span className=" tb-status  text-success ">
                                                                            <em class="icon ni ni-bullet-fill"></em>Deposit
                                                                        </span>                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        <span> {data?.title}</span>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <span> {data.amount} {data.short_name}</span>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        <span>{timeZones}</span>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        {
                                                                            data?.payment_status == "pending" && <span className="tb-status text-warning">Pending</span>
                                                                        }
                                                                        {
                                                                            data?.payment_status == "success" && <span className="tb-status text-success">Completed</span>
                                                                        }
                                                                        {
                                                                            data?.payment_status == "rejected" && <span className="tb-status text-danger">Rejected</span>
                                                                        }
                                                                    </div>
                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">
                                                                            {
                                                                                data?.status == "pending" &&
                                                                                <>
                                                                                    <li className="nk-tb-action-hidden" tooltip="Reject" flow="Top" onClick={() => { setid(data.id); settxnid(data.txn_id) }}>
                                                                                        <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                                            <em class="icon ni ni-cross-fill-c" data-bs-toggle="modal" data-bs-target="#modal-reject"></em>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="nk-tb-action-hidden" tooltip="Confirm" flow="Top" onClick={() => { setid(data.id); settxnid(data.txn_id); setalldata(data) }}>
                                                                                        <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                                            <em class="icon ni ni-check-fill-c" data-bs-toggle="modal" data-bs-target="#modal-report"></em>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="nk-tb-action-hidden" tooltip="Details" flow="Top" >
                                                                                        <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                                            <em class="icon ni ni-eye-fill" onClick={() => { ReqMoneyTxndata(data.id) }} data-bs-toggle="modal" data-bs-target="#modal-viewTxn"></em>
                                                                                        </a>
                                                                                    </li>
                                                                                </>
                                                                            }

                                                                            {
                                                                                (data?.status == "rejected" || data?.status == "completed") &&
                                                                                <>
                                                                                    <li className="nk-tb-action-hidden" tooltip="User Detail" flow="Top">
                                                                                        <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                                            <em class="icon ni ni-user-alt-fill" onClick={() => GoToUserDetail(data.client_id)}></em>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="nk-tb-action-hidden" tooltip="TXN Detail" flow="Top" >
                                                                                        <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                                            <em class="icon ni ni-eye-fill" onClick={() => { ReqMoneyTxndata(data.id) }} data-bs-toggle="modal" data-bs-target="#modal-viewTxn"></em>
                                                                                        </a>
                                                                                    </li>
                                                                                </>
                                                                            }
                                                                            <li >
                                                                                <div className="drodown">
                                                                                    <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                    {
                                                                                        data?.status == "pending" &&
                                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                <li style={{ cursor: "pointer" }} onClick={() => GoToUserDetail(data.client_id)}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                                <li style={{ cursor: "pointer" }} onClick={() => { ReqMoneyTxndata(data.id) }} data-bs-toggle="modal" data-bs-target="#modal-viewTxn" ><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                                                <li class="divider"></li>
                                                                                                <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a onClick={() => { setalldata(data) }}><em class="icon ni ni-check-circle-cut  " ></em><span>Confrim</span></a></li>
                                                                                                <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-reject" onClick={() => approvedcancell()}><a ><em class="icon ni ni-cross-c" ></em><span>Reject</span></a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    }{
                                                                                        (data?.status == "rejected" || data?.status == "completed") &&
                                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                <li style={{ cursor: "pointer" }} onClick={() => GoToUserDetail(data.client_id)}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                                                <li style={{ cursor: "pointer" }} onClick={() => { ReqMoneyTxndata(data.id); }} data-bs-toggle="modal" data-bs-target="#modal-viewTxn"><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className="modal modal-blur fade" id="modal-report" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Deposit ID# <span>{txnid}</span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1} data-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <p>The amount of {alldata.amount} {alldata?.currencyWalletDetail?.currencyDetail?.short_name} to Deposit via {alldata.request_type}.</p>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6 otherLabel">
                                    <label>Payment Amount</label>
                                    <input type="text" className="form-control" placeholder={alldata.amount} />
                                    <span className="labeName">{alldata?.currencyWalletDetail?.currencyDetail?.short_name}</span>
                                    <small style={{ fontSize: '72%', color: '#959595', }}>The payment amount that you received.</small>
                                </div>
                                <div className="col-md-6 otherLabel">
                                    <label>Amount to Credit</label>
                                    <input type="text" className="form-control" placeholder={alldata.amount} />
                                    <span className="labeName">{alldata?.currencyWalletDetail?.currencyDetail?.short_name}</span>
                                    <small style={{ fontSize: '72%', color: '#959595', }}>The amount that ajdust with balance.</small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12 otherLabel">
                                    <label>Note / Remarks</label>
                                    <input type="text" className="form-control" placeholder='Enter remark or note' />
                                    <small style={{ fontSize: '72%', color: '#959595', }}>The note or remarks help to reminder. Only administrator can read from transaction details.</small>
                                </div>
                            </div>
                            <p>Please confirm that you want to APPROVE this DEPOSIT request.</p>
                            <button className="btn btn-primary ms-auto mr-2" onClick={() => { ApprovedWidthdrawal() }}> Confirm Withdraw
                            </button>
                            <a className="cancelbtnwithdraw" style={{ cursor: "pointer" }} data-bs-dismiss="modal" data-dismiss="modal">Cancel</a>
                        </div>
                        <div className="modal-footer" style={{ justifyContent: 'flex-start', }}>
                            <p style={{ fontSize: '79%', color: '#343434', }}><em class="icon ni ni-info"></em> The deposit amount will adjust into user account once you approved.</p>
                            <p className="text-danger" style={{ fontSize: '79%', }}><em class="icon ni ni-alert"></em> You can not undo this action once you you confirm and approved.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-blur fade" id="modal-reject" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cancellation of <span>{txnid}</span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} data-dismiss="modal" />
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <p>Are you sure you want to cancel this deposit request?</p>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12 otherLabel">
                                    <label>Note for User</label>
                                    <input type="text" className="form-control" placeholder='Enter remark or note' onChange={(e) => { setcomment(e.target.value) }} />
                                </div>
                            </div>
                            <p>Please confirm that you want to CANCEL this DEPOSIT request.</p>
                            <button type="submit" className="btn btn-primary ms-auto mr-2" onClick={() => approvedcancell()}> Cancelled Deposite
                            </button>
                            <a className="cancelbtnwithdraw" style={{ cursor: "pointer" }} onClick={() => { ref2.current.click() }}>Return</a>
                        </div>
                        <div className="modal-footer" style={{ justifyContent: 'flex-start', }}>
                            <p style={{ fontSize: '79%', color: '#343434', }}><em class="icon ni ni-info"></em> You can cancel the transaction if you've not received the payment yet.</p>
                            <p className="text-danger" style={{ fontSize: '79%', }}><em class="icon ni ni-alert"></em> You can not undo this action once you confirm and cancelled.</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal modal-blur fade" id="modal-viewTxn" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">


                    {
                        (singletxn?.transaction?.txn_type == "Credit" && singletxn?.transaction?.txn_for == "add" && singletxn?.transaction?.identifier == "CurrencyTransaction") &&
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Deposit ID <span className='greebTxnWithdraw'>#{singletxn?.transaction?.txn_id}</span></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1} data-dismiss="modal" />
                            </div>
                            <form >
                                <div className="modal-body">
                                    <ul class="nk-top-products mb-3">
                                        <li class="item pt-0">
                                            <div class="user-avatar bg-primary mright-2">
                                                <span class="user-avatar bg-success-dim">
                                                    <e class="icon ni ni-arrow-down-left"></e></span>
                                                <em class="icon ni ni-wallet-fill walletIconNew"></em>
                                            </div>
                                            <div class="info"><div class="title"><b>  {singletxn?.transaction?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</b></div>
                                                <div class="price">{singletimeZones}</div>
                                            </div>
                                            {
                                                singletxn?.transaction?.payment_status == "success" && <div class="total badge rounded-pill bg-success">success</div>
                                            }
                                            {
                                                singletxn?.transaction?.payment_status == "pending" && <div class="total badge rounded-pill bg-warning">pending</div>
                                            }
                                            {
                                                singletxn?.transaction?.payment_status == "failed" && <div class="total badge rounded-pill bg-danger">failed</div>
                                            }
                                        </li>
                                    </ul>

                                    <div className="row tableUserModal">
                                        <div className="col-md-6">
                                            <h6 className="mb-3">USER DETAILS</h6>
                                            <ul>
                                                <li className="mb-3">User Account <span className="d-block">{singletxn?.sender?.first_name} {singletxn?.sender?.last_name} <small></small></span></li>
                                                <li className="mb-3">Email <span className="d-block">{singletxn?.sender?.email}</span></li>
                                                <li className="mb-3">Phone Number <span className="d-block">{singletxn?.sender?.phone}</span></li>
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
                                                <li className="mb-3">Deposit Amount <span className="d-block">{singletxn?.transaction?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                                <li className="mb-3">Currency<span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                                <li className="mb-3">Transaction Charge <span className="d-block">{singletxn?.transaction?.txn_charge_amount} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                                <li className="mb-3">Adj Deposit Amount <span className="d-block"> {singletxn?.transaction?.amount} {singletxn?.receiver?.currencywallets[0]?.currency?.short_name}</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Placed by <span className="d-block">UID08124</span></li>
                                                <li className="mb-3">Placed On <span className="d-block">Jan 23, 2024 6:30 PM</span></li>
                                                <li className="mb-3">Payment Method <span className="d-block">{singletxn?.transaction?.payment_method}</span></li>
                                                <li className="mb-3">Wallet Balance after Txn <span className="d-block">{singletxn?.transaction?.other_closing_balance} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="row tableUserModal">
                                        <div className="col-md-12"><h6 className="mb-3">ADDITIONAL DETAILS</h6></div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Transaction type <span className="d-block">{singletxn?.transaction?.txn_type}</span></li>
                                                <li className="mb-3">Transaction Description <span className="d-block">Deposit Via Manual Bank Transfer </span></li>
                                                <li className="mb-3">Payment Gateway <span className="d-block">Manual Bank Transfer</span></li>
                                                {
                                                    singletxn?.transaction?.payment_status !== "pending" && <li className="mb-3">Completed By  <span className="d-block">{singletxn?.transcation?.completed_by}</span></li>
                                                }
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Account Type <span className="d-block">Personal</span></li>
                                                <li className="mb-3">Verification Status <span className="d-block">Verified</span></li>
                                                <li className="mb-3">Transaction Currency <span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                                {
                                                    singletxn?.transaction?.payment_status !== "pending" && <li className="mb-3">Completed On  <span className="d-block">Jan 23 2024, 5:30 PM</span></li>

                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }


                    {/* {

                        (data?.transaction?.txn_type == "Debit" && data?.transaction?.txn_for == "transfer" && data?.transaction?.identifier == "Send Flow") &&
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Deposit ID# <span>{singletxn?.transaction?.txn_id}</span></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1} data-dismiss="modal" />
                            </div>
                            <form >
                                <div className="modal-body">
                                    <ul class="nk-top-products mb-3">
                                        <li class="item pt-0">
                                            <div class="user-avatar bg-primary mright-2">
                                                <span class="user-avatar bg-success-dim">
                                                    <e class="icon ni ni-arrow-down-left"></e></span>
                                                <em class="icon ni ni-wallet-fill walletIconNew"></em>
                                            </div>
                                            <div class="info"><div class="title"><b>  {singletxn?.transaction?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</b></div>
                                                <div class="price">{timeZones}</div>
                                            </div>
                                            {
                                                singletxn?.transaction?.payment_status == "success" && <div class="total badge rounded-pill bg-success">success</div>
                                            }
                                            {
                                                singletxn?.transaction?.payment_status == "pending" && <div class="total badge rounded-pill bg-warning">pending</div>
                                            }
                                            {
                                                singletxn?.transaction?.payment_status == "failed" && <div class="total badge rounded-pill bg-danger">failed</div>
                                            }
                                        </li>
                                    </ul>

                                    <div className="row tableUserModal">
                                        <div className="col-md-6">
                                            <h6 className="mb-3">USER DETAILS</h6>
                                            <ul>
                                                <li className="mb-3">User Account <span className="d-block">{singletxn?.sender?.first_name} {singletxn?.sender?.last_name} <small></small></span></li>
                                                <li className="mb-3">Email <span className="d-block">{singletxn?.sender?.email}</span></li>
                                                <li className="mb-3">Phone Number <span className="d-block">{singletxn?.sender?.phone}</span></li>
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
                                                <li className="mb-3">Deposit Amount <span className="d-block">{singletxn?.transaction?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                                <li className="mb-3">Currency<span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                                <li className="mb-3">Transaction Charge <span className="d-block">{singletxn?.transaction?.txn_charge_amount} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                                <li className="mb-3">Adj Deposit Amount <span className="d-block"> {singletxn?.transaction?.amount} {singletxn?.receiver?.currencywallets[0]?.currency?.short_name}</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Placed by <span className="d-block">UID08124</span></li>
                                                <li className="mb-3">Placed On <span className="d-block">Jan 23, 2024 6:30 PM</span></li>
                                                <li className="mb-3">Payment Method <span className="d-block">{singletxn?.transaction?.payment_method}</span></li>
                                                <li className="mb-3">Wallet Balance after Txn <span className="d-block">{singletxn?.transaction?.other_closing_balance} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="row tableUserModal">
                                        <div className="col-md-12"><h6 className="mb-3">ADDITIONAL DETAILS</h6></div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Transaction type <span className="d-block">{singletxn?.transaction?.txn_type}</span></li>
                                                <li className="mb-3">Transaction Description <span className="d-block">Deposit Via Manual Bank Transfer </span></li>
                                                <li className="mb-3">Payment Gateway <span className="d-block">Manual Bank Transfer</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Account Type <span className="d-block">Personal</span></li>
                                                <li className="mb-3">Verification Status <span className="d-block">Verified</span></li>
                                                <li className="mb-3">Transaction Currency <span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }



                    {
                        (singletxn?.transaction?.txn_type == "Debit" && singletxn?.transaction?.txn_for == "transfer" && singletxn?.transaction?.identifier == "Request Flow") &&
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Deposit ID# <span>{singletxn?.transaction?.txn_id}</span></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1} data-dismiss="modal" />
                            </div>
                            <form >
                                <div className="modal-body">
                                    <ul class="nk-top-products mb-3">
                                        <li class="item pt-0">
                                            <div class="user-avatar bg-primary mright-2">
                                                <span class="user-avatar bg-success-dim">
                                                    <e class="icon ni ni-arrow-down-left"></e></span>
                                                <em class="icon ni ni-wallet-fill walletIconNew"></em>
                                            </div>
                                            <div class="info"><div class="title"><b>  {singletxn?.transaction?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</b></div>
                                                <div class="price">{timeZones}</div>
                                            </div>
                                            {
                                                singletxn?.transaction?.payment_status == "success" && <div class="total badge rounded-pill bg-success">success</div>
                                            }
                                            {
                                                singletxn?.transaction?.payment_status == "pending" && <div class="total badge rounded-pill bg-warning">pending</div>
                                            }
                                            {
                                                singletxn?.transaction?.payment_status == "failed" && <div class="total badge rounded-pill bg-danger">failed</div>
                                            }
                                        </li>
                                    </ul>

                                    <div className="row tableUserModal">
                                        <div className="col-md-6">
                                            <h6 className="mb-3">USER DETAILS</h6>
                                            <ul>
                                                <li className="mb-3">User Account <span className="d-block">{singletxn?.sender?.first_name} {singletxn?.sender?.last_name} <small></small></span></li>
                                                <li className="mb-3">Email <span className="d-block">{singletxn?.sender?.email}</span></li>
                                                <li className="mb-3">Phone Number <span className="d-block">{singletxn?.sender?.phone}</span></li>
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
                                                <li className="mb-3">Deposit Amount <span className="d-block">{singletxn?.transaction?.amount_before_txncharge} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                                <li className="mb-3">Currency<span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                                <li className="mb-3">Transaction Charge <span className="d-block">{singletxn?.transaction?.txn_charge_amount} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                                <li className="mb-3">Adj Deposit Amount <span className="d-block"> {singletxn?.transaction?.amount} {singletxn?.receiver?.currencywallets[0]?.currency?.short_name}</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Placed by <span className="d-block">UID08124</span></li>
                                                <li className="mb-3">Placed On <span className="d-block">Jan 23, 2024 6:30 PM</span></li>
                                                <li className="mb-3">Payment Method <span className="d-block">{singletxn?.transaction?.payment_method}</span></li>
                                                <li className="mb-3">Wallet Balance after Txn <span className="d-block">{singletxn?.transaction?.other_closing_balance} {singletxn?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="row tableUserModal">
                                        <div className="col-md-12"><h6 className="mb-3">ADDITIONAL DETAILS</h6></div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Transaction type <span className="d-block">{singletxn?.transaction?.txn_type}</span></li>
                                                <li className="mb-3">Transaction Description <span className="d-block">Deposit Via Manual Bank Transfer </span></li>
                                                <li className="mb-3">Payment Gateway <span className="d-block">Manual Bank Transfer</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="mb-3">Account Type <span className="d-block">Personal</span></li>
                                                <li className="mb-3">Verification Status <span className="d-block">Verified</span></li>
                                                <li className="mb-3">Transaction Currency <span className="d-block">{singletxn?.sender?.currencywallets[0]?.currency.title}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    } */}
                </div>
            </div>
        </Container >
    )
}
export default RequestMoney