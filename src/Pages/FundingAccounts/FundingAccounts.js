import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { AddBankCurrency, SingleCurrencyData, deleteBankCurrency, getCurrencyBank, updateCurrencyBank } from '../../API/CurrencyBank/CurrencyBankApi'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Image } from 'antd';
import Loader from '../Loader/Loader';
import { useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { CurrencyData, CurrencyDataUseSelect, SingleCurrencyBankData } from '../../API/CurrencyAPI/CurrencyApi';
import { GetPermissionData } from '../../API/PermissionApi/Permisson';

const AddToast = (Massage) => {
    toast.success(Massage, { autoClose: 2000 });
}


const UpdateToast = () => {
    toast.success("Account Update successfully", { autoClose: 2000 });
}



const addErrorToast = (massage) => {
    toast.error(massage, {
        autoClose: 2000
    });
}


function FundingAccounts() {

    const [data, setdata] = useState([])
    const [selectdata, setselectdata] = useState([])
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
    const [title, settitle] = useState()
    const [symbol, setsymbol] = useState()
    const [accountnum, setaccountnum] = useState("")
    const [currency, setcurrency] = useState("")
    const [Payee, setPayee] = useState("")
    const [sortcode, setsort_code] = useState("")
    const [bankname, setbankname] = useState("")
    const [address, setaddress] = useState("")
    const [loader, setloader] = useState()
    const [permission, setpermission] = useState([])
    const token = localStorage.getItem("logintoken")
    const ref2 = useRef()
    const ref1 = useRef()
    const navigate = useNavigate()


    // const UpdateinitialValues = {
    //     payee_name: Payee,
    //     sort_code: sortcode,
    //     account_no: accountnum,
    //     bank_name: bankname,
    //     bank_address: address,
    //     Currency: currency,

    // }


    setTimeout(() => {
        setscroll(true)
    }, 3000);


    useEffect(() => {
        updateform.setValues({
            payee_name: Payee,
            sort_code: sortcode,
            account_no: accountnum,
            bank_name: bankname,
            bank_address: address,
            Currency: currency,
        })

    }, [Payee, sortcode, accountnum, bankname, address])

    console.log(Payee, sortcode, accountnum, bankname, address)

    const updatesignUpSchemas = yup.object({
        payee_name: yup.string().min(3).required("Please Enter Payee Name"),
        sort_code: yup.string().min(3).required("Please Enter  Short Code"),
        account_no: yup.string().min(1).required("Please Enter Account number"),
        bank_name: yup.string().min(1).required("Please Enter Bank Name"),
        bank_address: yup.string().min(1).required("Please Enter Bank Address"),
        Currency: yup.string().required('Please select Currency'),
    });

    const updateform = useFormik({
        // initialValues: UpdateinitialValues,
        validationSchema: updatesignUpSchemas,
        onSubmit: async (values, action) => {
            console.log(values, "valuuueueueuuu->>>>>>>>>>>>>>>>>>>")

            try {
                const data = {
                    "currency_id": values.Currency,
                    "payee_name": values.payee_name,
                    "sort_code": values.sort_code,
                    "account_no": values.account_no,
                    "bank_name": values.bank_name,
                    "bank_address": values.bank_address
                }

                console.log(data, "datatatatata===========>>>>>>>")
                const addNewCurrency = await updateCurrencyBank(token, data, id)
                if (addNewCurrency.status == true) {
                    ref2.current.click()

                    UpdateToast(addNewCurrency.message)
                    AddToast()
                    GetCurrencyBankData()
                }
                else {
                    console.log(addNewCurrency, ">>>>>>>>>>>>>>>>>>>>>>>>>???????????")
                    addErrorToast(addNewCurrency.response.data.message)
                    ref2.current.click()
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    })


    const initialValues = {
        payee_name: "",
        sort_code: "",
        account_no: "",
        bank_name: "",
        bank_address: "",
        Currency: "",

    }


    const signUpSchemas = yup.object({
        payee_name: yup.string().min(3).required("Please Enter Payee Name"),
        sort_code: yup.string().min(3).required("Please Enter  Short Code"),
        account_no: yup.string().min(1).required("Please Enter Account number"),
        bank_name: yup.string().min(1).required("Please Enter Bank Name"),
        bank_address: yup.string().min(1).required("Please Enter Bank Address"),
        Currency: yup.string().required('Please select Currency'),
    });


    const form = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchemas,
        onSubmit: async (values, action) => {
            console.log(values, "valuuueueueuuu->>>>>>>>>>>>>>>>>>>")

            try {
                const data = {
                    "currency_id": values.Currency,
                    "payee_name": values.payee_name,
                    "sort_code": values.sort_code,
                    "account_no": values.account_no,
                    "bank_name": values.bank_name,
                    "bank_address": values.bank_address
                }

                console.log(data, "datatatatata===========>>>>>>>")
                const addNewCurrency = await AddBankCurrency(token, data)
                if (addNewCurrency.status == true) {
                    ref2.current.click()
                    action.resetForm()
                    AddToast(addNewCurrency.messaage)
                    GetCurrencyBankData()
                    ref1.current.click()
                }
                else {
                    console.log(addNewCurrency, ">>>>>>>>>>>>>>>>>>>>>>>>>???????????")
                    addErrorToast(addNewCurrency.response.data.message)
                    ref1.current.click()
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    })




    const GetCurrencyBankData = async () => {
        try {
            const totaldata = await getCurrencyBank(token, sortedBy, orderBy, search, pageNumber)
            console.log(totaldata.data.rows, "daatatta")
            if (totaldata.status == true) {
                setTimeout(() => {
                    setExample(true)
                    setdata(totaldata?.data.rows)
                    setcount(totaldata?.data.count)
                    console.log(totaldata?.data.count, 'totaldata')
                    const Count = totaldata?.data.count
                    setTotalSize(Count / entries)
                    setloader(false)
                }, 2000);
                setloader(true)
            }
            else if (totaldata.message == "jwt expired") {
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
        GetCurrencyBankData()
    }, [sortedBy, orderBy, search, pageNumber])




    const GetCurrencyData = async () => {
        try {
            const totaldata = await CurrencyDataUseSelect(token)
            console.log(totaldata.data.rows, "daatatta------------->>>>>>>>>>>>")
            setselectdata(totaldata?.data.rows)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetCurrencyData()
    }, [])



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
                const response = await deleteBankCurrency(token, id)
                if (response?.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Bank Currency has been deleted.',
                        'success'
                    )
                    GetCurrencyBankData()
                }
                else {
                    toast.error("something went wrong")
                }

            }
        })
    }



    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)

    };


    const getCurrencyBankbyid = async () => {
        try {
            const resp = await SingleCurrencyData(token, id)
            console.log(resp?.data, "by id")
            const data = resp?.data
            setaccountnum(data?.account_no)
            setcurrency(data?.currency_id)
            setPayee(data?.payee_name)
            setsort_code(data?.sort_code)
            setbankname(data?.bank_name)
            setaddress(data?.bank_address)
        }
        catch (err) {
            console.log(err)
        }

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

    console.log(permission, "permiddionnnnnn")

    // useEffect(() => {
    //     {
    //         permission?.map((data) => {
    //             console.log(data.key, "ooooooooooo")
    //             if (data.key == "Add_curency") {
    //                 setAdd_curency(true)
    //             }
    //             if (data.key == 'get_all_currency') {
    //                 setget_all_currency(true)
    //             }
    //             if (data.key == "get_single_currency") {
    //                 setget_single_currency(true)
    //             }
    //             if (data.key == "update_currency") {
    //                 setupdate_currency(true)
    //             }
    //             if (data.key == "delete_currency") {
    //                 setdelete_currency(true)
    //             }
    //         })
    //     }
    // }, [permission])


    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        {/* <h3 className="nk-block-title page-title">Bank Account </h3> */}
                                        <h3>Account Details</h3>
                                        <div className="nk-block-des text-soft">
                                            <h6>Payment Account</h6>
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
                                                    {/* <li><a className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li> */}
                                                    <li className="nk-block-tools-opt">
                                                        <div className="drodown">
                                                            <a className="dropdown-toggle btn btn-icon btn-primary"
                                                                data-bs-toggle="modal" data-bs-target="#modal-report"
                                                            ><em className="icon ni ni-plus" /></a>
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

                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">

                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text">Account Number {sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-mb"><span className="sub-text">
                                            Currency {sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Account Balance {sortedBy == 'phone' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('phone') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Marchant Bank {sortedBy == "amount" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} />}</span></div>
                                        {/* <div className="nk-tb-col tb-col-lg"><span className="sub-text">Created At {sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span>
                                        </div> */}
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
                                                <div className="nk-tb-col tb-col-lg">
                                                    <Loader />
                                                </div>
                                                <div className="nk-tb-col tb-col-lg">
                                                </div>
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
                                                        console.log(data, "//////////////////////")
                                                        // var stillUtcs = moment.utc(data.created_at).toDate();
                                                        // var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                                        // console.log(data, "setreqmoneymsgsetreqmoneymsgsetreqmoneymsg")
                                                        return (


                                                            <>
                                                                <div className="nk-tb-item" key={data.id}>

                                                                    <div className="nk-tb-col">
                                                                        <a >
                                                                            <div className="user-card">
                                                                                <div className="user-avatar bg-primary">
                                                                                    <span ><Image src={data.currency.icon} alt='img' width={40} height={40} /></span>
                                                                                </div>
                                                                                <div className="user-info" style={{ cursor: "pointer", }} >
                                                                                    <span className="tb-lead" style={{ textTransform: "capitalize" }}>   {data.account_no == null ? <span>N/A</span> : <span>{data.account_no}</span>} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                                    <span>Account Balance</span>

                                                                                </div>

                                                                            </div>
                                                                        </a>
                                                                    </div >
                                                                    <div className="nk-tb-col tb-col-mb">
                                                                        <span className="tb-amount" style={{ cursor: "pointer" }}>{data.currency?.short_name} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                        <span className=" tb-status   ">{data.currency?.title}
                                                                            {/* <em class="icon ni ni-bullet-fill"></em>Deposit */}
                                                                        </span>
                                                                        {/* <span className="tb-amount">{data?.transcation?.txn_id} <span className="currency">USD</span></span> */}
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        {/* <span> {data?.description}</span> */}
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-lg">
                                                                        {/* <span>{data?.currencyWalletDetail?.currencyDetail?.symbol} {data.amount}</span> */}

                                                                    </div>
                                                                    {/* <div className="nk-tb-col tb-col-lg"> */}
                                                                    {/* <span>{timeZones}</span> */}
                                                                    {/* </div> */}
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        {/* <span className="tb-status text-success">Active</span> */}
                                                                        {/* {
                                                                            data?.status == "pending" && <span className="tb-status text-warning">Pending</span>
                                                                        }
                                                                        {
                                                                            data?.status == "completed" && <span className="tb-status text-success">Completed</span>
                                                                        }
                                                                        {
                                                                            data?.status == "rejected" && <span className="tb-status text-danger">Rejected</span>
                                                                        } */}
                                                                    </div>

                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">
                                                                            {/* 
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
                                                                            } */}

                                                                            {/* {
                                                                                (data?.status == "rejected" || data?.status == "completed") && <>
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
                                                                                </>

                                                                            } */}
                                                                            {/* <li >
                                                                                <div className="drodown">
                                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>

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
                                                                            </li> */}
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

                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text fw-bold">Icon</span></div>
                                        <div className="nk-tb-col"><span className="sub-text fw-bold">Bank Name{sortedBy == "bank_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("bank_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("bank_name") }} />} </span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">Account No {sortedBy == 'account_no' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('account_no') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('account_no') }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">  Payee Name {sortedBy == "payee_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payee_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payee_name") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Sort Code{sortedBy == "sort_code" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("sort_code") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("sort_code") }} />} </span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">Bank Address {sortedBy == 'bank_address' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('bank_address') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('bank_address') }} />}</span></div>
                                        <div className="nk-tb-col text-end"><span className="sub-text fw-bold">Action</span></div>
                                    </div>{/* .nk-tb-item */}


                                    {
                                        loader == true ?

                                            <div className="nk-tb-item">
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col  tb-col-md"></div>
                                                <div className="nk-tb-col tb-col-lg">
                                                </div>
                                                <div className="nk-tb-col ">
                                                    {<Loader />}
                                                </div>
                                                <div className="nk-tb-col nk-tb-col-tools"></div>
                                                <div className="nk-tb-col tb-col-md">
                                                </div>
                                                <div className="nk-tb-col tb-col-md">
                                                </div>
                                            </div>
                                            :
                                            <>
                                                {
                                                    data.length == 0 &&
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col tb-col-md"></div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                        </div>
                                                        <div className="nk-tb-col ">
                                                            {scroll == true ? <h6>No Bank Account Available</h6> : <Loader />}
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools"></div>
                                                        <div className="nk-tb-col tb-col-md">
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                        </div>
                                                    </div>
                                                }


                                                {
                                                    data.length > 0 && data.map((data) => {
                                                        return (
                                                            <div className="nk-tb-item" key={data.id}>
                                                                {/* <div>{userdata.email === null ? <b>Null</b> : <span>{userdata.email}</span>}</div> */}
                                                                {/* <div className="nk-tb-col">
                            <a >
                                <div className="user-card">
                                    <div className="bg-primary">
                                        <span><Image src={data.icon} alt='img' height={30} /></span>
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
                        </div> */}

                                                                <div className="nk-tb-col">
                                                                    <a >
                                                                        <div className="user-card" >
                                                                            <div className="user-avatar bg-white" >
                                                                                <span ><Image src={data.currency.icon} alt='img' width={40} height={40} /></span>
                                                                                {/* <span><img src={data.icon} alt='img' style={{ borderRadius: '100%' }} /></span> */}
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>


                                                                <div className="nk-tb-col">
                                                                    {data.bank_name == null ? <span>N/A</span> : <span>{data.bank_name}</span>}
                                                                </div>

                                                                <div className="nk-tb-col tb-col-md">
                                                                    {data.account_no == null ? <span>N/A</span> : <span>{data.account_no}</span>}
                                                                </div>
                                                                <div className="nk-tb-col tb-col-lg">
                                                                    <ul className="list-status">
                                                                        {
                                                                            data.payee_name == null ? <li> <span>N/A</span></li> : <li> <span >{data.payee_name}</span></li>

                                                                        }
                                                                        {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}
                                                                    </ul>
                                                                </div>
                                                                <div className="nk-tb-col tb-col-lg">
                                                                    <ul className="list-status">
                                                                        {
                                                                            data.sort_code == null ? <li> <span>N/A</span></li> : <li> <span >{data.sort_code}</span></li>

                                                                        }
                                                                        {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}
                                                                    </ul>
                                                                </div>


                                                                <div className="nk-tb-col tb-col-lg">
                                                                    <ul className="list-status" style={{
                                                                        maxWidth: "200px",
                                                                        display: "inline-block",
                                                                        whiteSpace: "break-spaces"
                                                                        //   display: inline-block;
                                                                        //   white-space: break-spaces
                                                                    }}>
                                                                        {
                                                                            data.bank_address == null ? <li> <span>N/A</span></li> : <li> <span >{data.bank_address}</span></li>
                                                                        }
                                                                        {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}
                                                                    </ul>
                                                                </div>

                                                                <div className="nk-tb-col nk-tb-col-tools">
                                                                    <ul className="nk-tb-actions gx-1">
                                                                        <li onClick={() => { setid(data.id) }}>
                                                                            <div className="drodown">
                                                                                <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                                    <ul className="link-list-opt no-bdr">
                                                                                        {/* <li ><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>View Details</span></a></li> */}
                                                                                        <li style={{ color: "blue", cursor: "pointer" }}
                                                                                            onClick={getCurrencyBankbyid}
                                                                                            data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" ><a ><em className="icon ni ni-edit" /><span style={{ cursor: "pointer" }}>Edit</span></a></li>
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
                            </div>.nk-block
                        </div>
                    </div>
                </div>
            </div>




            {/* 

            <div className="modal modal-blur fade" id="modal-report" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Add Currency</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} data-dismiss="modal" />
                        </div>

                        <form onSubmit={form.handleSubmit}>

                            <div className="modal-body">

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Title</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Name"
                                            name="Title" {...form.getFieldProps("Title")}
                                        />
                                        {form.errors.Title && form.touched.Title ? <p className='red' style={{ marginTop: 5 }}>{form.errors.Title}</p> : null}

                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Short Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Short Name"
                                            name="ShortName" {...form.getFieldProps("ShortName")}
                                        />
                                        {form.errors.ShortName && form.touched.ShortName ? <p className='red' style={{ marginTop: 5 }}>{form.errors.ShortName}</p> : null}

                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Symbol</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Symbol"
                                            name="symbol" {...form.getFieldProps("symbol")}
                                        />
                                        {form.errors.symbol && form.touched.symbol ? <p className='red' style={{ marginTop: 5 }}>{form.errors.symbol}</p> : null}

                                    </div>
                                </div>

                              




                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Image</label>
                                    <div className="col" onChange={addimage}>
                                        <input type="file" className="form-control" aria-describedby="emailHelp"

                                            onChange={uploadDocFunc} name="currencyimg"

                                        />
                                        {form.errors.currencyimg ? <p className='red' >{form.errors.currencyimg}</p> : null}

                                    </div>

                                </div>


                            </div>

                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary ms-auto" >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg> Add



                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div> */}




            {/* <div className="modal modal-blur fade" id="modal-reportUpdate" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Update Currency</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary ms-auto" data-bs-dismiss="modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>
                                    Update
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div> */}





            {/* <div className="modal modal-blur fade" id="modal-danger" tabIndex={-1} role="dialog" aria-hidden="true" data-bs-backdrop="static" data-keyboard="false">
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
            </div> */}


            {/* data-bs-toggle="modal" data-bs-target="#modal-report" */}
            <div className="modal modal-blur fade" id="modal-report" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Add Bank Account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1} data-dismiss="modal"
                                onClick={() => form.resetForm()}
                            />
                        </div>

                        <form onSubmit={form.handleSubmit}>

                            <div className="modal-body">


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Select Currency</label>
                                    <div className="col">
                                        {/* <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Name"
                                            name="payee_name" {...form.getFieldProps("payee_name")}
                                        /> */}

                                        <select className="form-control mb-0" name="role" {...form.getFieldProps("Currency")} style={{ height: 40 }}
                                        // onChange={(e) => handleChangeQueryBuilder(e)}
                                        >
                                            <option>Select Currency</option>
                                            {selectdata.map((e) => {

                                                return (
                                                    <option key={e.id} value={e.id}>{e.title}</option>
                                                )
                                            })
                                            }
                                        </select>
                                        {form.errors.Currency && form.touched.Currency ? <p className='red' style={{ marginTop: 5 }}>{form.errors.Currency}</p> : null}

                                    </div>
                                </div>







                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Payee Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Name"
                                            name="payee_name" {...form.getFieldProps("payee_name")}
                                        />
                                        {form.errors.payee_name && form.touched.payee_name ? <p className='red' style={{ marginTop: 5 }}>{form.errors.payee_name}</p> : null}

                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Short Code</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Short Code"
                                            name="sort_code" {...form.getFieldProps("sort_code")}
                                        />
                                        {form.errors.sort_code && form.touched.sort_code ? <p className='red' style={{ marginTop: 5 }}>{form.errors.sort_code}</p> : null}
                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Account No</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Symbol"
                                            name="account_no" {...form.getFieldProps("account_no")}
                                        />
                                        {form.errors.account_no && form.touched.account_no ? <p className='red' style={{ marginTop: 5 }}>{form.errors.account_no}</p> : null}

                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Bank Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Bank Name"
                                            name="bank_name" {...form.getFieldProps("bank_name")}
                                        />
                                        {form.errors.bank_name && form.touched.bank_name ? <p className='red' style={{ marginTop: 5 }}>{form.errors.bank_name}</p> : null}

                                    </div>
                                </div>



                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Bank Address</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Bank Address"
                                            name="bank_address" {...form.getFieldProps("bank_address")}
                                        />
                                        {form.errors.bank_address && form.touched.bank_address ? <p className='red' style={{ marginTop: 5 }}>{form.errors.bank_address}</p> : null}

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




                                {/* 
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Currency Image</label>
                                    <div className="col" onChange={addimage}>
                                        <input type="file" className="form-control" aria-describedby="emailHelp"

                                            onChange={uploadDocFunc} name="currencyimg"

                                        />
                                        {form.errors.currencyimg ? <p className='red' >{form.errors.currencyimg}</p> : null}


                                    </div>

                                </div> */}


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
                            <h5 className="modal-title"> Update Bank Account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} data-dismiss="modal" />
                        </div>

                        <form onSubmit={updateform.handleSubmit}>

                            <div className="modal-body">


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Select Currency</label>
                                    <div className="col">
                                        <select className="form-control mb-0" name="role" {...updateform.getFieldProps("Currency")} style={{ height: 40 }}>
                                            <option>Select Currency</option>
                                            {selectdata.map((e) => {
                                                return (
                                                    <option key={e.id} value={e.id}>{e.title}</option>
                                                )
                                            })
                                            }
                                        </select>
                                        {updateform.errors.Currency && updateform.touched.Currency ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.Currency}</p> : null}

                                    </div>
                                </div>







                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Payee Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Name" value={Payee}
                                            name="payee_name" {...updateform.getFieldProps("payee_name")}
                                        />
                                        {updateform.errors.payee_name && updateform.touched.payee_name ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.payee_name}</p> : null}

                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Short Code</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Short Code"
                                            name="sort_code" {...updateform.getFieldProps("sort_code")}
                                        />
                                        {updateform.errors.sort_code && updateform.touched.sort_code ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.sort_code}</p> : null}
                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Account No</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Currency Symbol"
                                            name="account_no" {...updateform.getFieldProps("account_no")}
                                        />
                                        {updateform.errors.account_no && updateform.touched.account_no ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.account_no}</p> : null}

                                    </div>
                                </div>


                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Bank Name</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Bank Name"
                                            name="bank_name"  {...updateform.getFieldProps("bank_name")}
                                        />
                                        {updateform.errors.bank_name && updateform.touched.bank_name ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.bank_name}</p> : null}

                                    </div>
                                </div>



                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Bank Address</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Bank Address"
                                            name="bank_address" {...updateform.getFieldProps("bank_address")}
                                        />
                                        {updateform.errors.bank_address && updateform.touched.bank_address ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.bank_address}</p> : null}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary ms-auto" > Update
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>







        </Container>
    )
}

export default FundingAccounts
