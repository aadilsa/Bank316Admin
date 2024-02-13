import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../../component/container';
import { Switch } from 'antd';
// import { getUserById } from '../../API/UserApi/UserApi';
import { getUserById, docVerify, VerifyDocStatus, getcurrencycustom } from '../../API/UserApi/UserdatabyidAPI';
import { Image } from 'antd';
// import { docVerify } from '../../API/UserApi/UserApi';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';


const StatusToast = (e) => {
    toast.success(e, { autoClose: 1000 });
}


const UserDetail = () => {
    const [name, setname] = useState()
    const [middname, setmiddname] = useState()
    const [lastname, setlastname] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()
    const [address, setaddress] = useState()
    const [phoncode, setphoncode] = useState()
    const [emailVarified, setemailVarified] = useState()
    const [isverifieddoc, setisverifieddoc] = useState()
    const [totalwallet, settotalwallet] = useState([])
    const [ReferralId, setReferralId] = useState()
    const [wuid, setwuid] = useState()
    const [currency, setCurrency] = useState()
    const [balance, setbalance] = useState()
    const [count, setcount] = useState(0)
    const [Country, setCountry] = useState()
    const [dob, setdob] = useState();
    const [custom_wallets, setcustom_wallets] = useState([])
    const [image, setimage] = useState()
    const [scroll, setscroll] = useState(false)
    const [amount, setamount] = useState()
    const [currecyicon, setcurrecyicon] = useState()
    const [toggle, setToggle] = useState()
    const [addresss, setaddresss] = useState()
    const [refral, setrefral] = useState([])
    const [refreldata, setrefraldata] = useState()
    const [status, setstatus] = useState()
    const [currencycustom, setcurrencycustom] = useState([])
    const [modalloader, setmodalloader] = useState(true)
    const [card, setcard] = useState([])

    const [customWallets_transaction, setcustomWallets_transaction] = useState([])

    const [verification_doc_image, setverification_doc_image] = useState()
    const [verification_id, setverification_id] = useState()

    const token = localStorage.getItem("logintoken")
    const id = localStorage.getItem('UserID')
    const location = useLocation();

    const ref2 = useRef()

    const navigate = useNavigate()


    // useEffect(async () => {
    //     try {
    //         const res = await axios.get(`${Base_Url}client/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
    //         return res.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [])

    // const documentVerifyed = async () => {
    //     try {
    //         const responce = await docVerify(token, location.state)
    //         console.log(responce, "VEIFFFFFFFYYYY")
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     documentVerifyed()
    // }, [])


    const documentVerifyedstatus = async (e) => {
        const value = e.target.value
        const val = JSON.parse(value)
        console.log(value, "valueeee")
        const data = {
            "is_doc_verified": val
        }

        try {
            const responce = await VerifyDocStatus(token, location.state, data)
            if (responce.status == true) {
                console.log(responce.message, ".................")
                StatusToast(responce.message)
                UserDatabyId()
            }



        }
        catch (err) {
            console.log(err)
        }
    }

    const UserDatabyId = async () => {
        try {
            const resp = await getUserById(token, location.state)

            if (resp.status == true) {
                // console.log(resp.data, "respppp")
                const id = resp.data.profile.id
                localStorage.setItem('UserID', id)
                const data = resp?.data?.profile
                // console.log(data.email_verified_at, " Profilllelele Dttatatatatat")
                // console.log(data.addresses[0], "resppppp")
                setname(data?.first_name)
                setstatus(data?.doc_verified_status)
                setmiddname(data?.middle_name)
                setlastname(data?.last_name)
                setphone(data?.phone)
                setemail(data?.email)
                setaddress(data?.address)
                setaddresss(data?.addresses[0])
                setdob(data?.date_of_birth)
                setphoncode(data?.phone_code)
                setimage(data?.avatar)
                setReferralId(data?.my_referral_id)
                setCountry(data?.country_of_residence)
                setemailVarified(data?.email_verified_at)
                setisverifieddoc(data?.doc_verified_status)
                setverification_doc_image(data?.verification_doc_image)
                setverification_id(data?.verification_doc_id)
                const walletinfo = resp?.data?.currency_wallets_info

                setamount(resp.data?.currency_wallets_info[0]?.balance)
                setcurrecyicon(resp.data?.currency_wallets_info[0]?.currency.symbol)
                settotalwallet(walletinfo)
                setcustom_wallets(resp.data.custom_wallets)
                setcard(resp?.data?.cards)
                setrefral(resp?.data?.referalTo)
                setrefraldata(resp?.data?.referal_data)
                setcustomWallets_transaction(resp?.data?.custom_wallets_transaction)
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        UserDatabyId()
    }, [toggle, location.state])


    const CurrencyCustomWallet = async (id) => {
        try {
            const resp = await getcurrencycustom(token, id)
            setTimeout(() => {
                setcurrencycustom(resp?.data)
                // console.log(resp.data, "llllllllll")
                // console.log(resp.data, "respogetcurrencycustom   getcurrencycustom")
                setmodalloader(false)
            }, 2000);
            setmodalloader(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    const currencytransaction = (wuid) => {
        navigate(`/currency-transaction`, { state: wuid })
    }

    const customtransaction = (wuid) => {
        navigate('/custom-transaction', { state: wuid })

        ref2.current.click()
    }
    // useEffect(()=>{
    setTimeout(() => {
        setscroll(true)
    }, 3000);
    // },)


    // let handleButtonClick
    // useEffect(() => {
    const handleButtonClick = () => {
        // Set the state to an empty array when the button is clicked
        setTimeout(() => {
            setcurrencycustom([]);
        }, 1000);
    };
    // }, [currencycustom])setscroll

    useEffect(() => {
        console.log(currencycustom, "currenenenenenenenenene")
    }, [currencycustom])



    return (
        <Container>
            <div className="nk-content ">
                <div className="container">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between g-3">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Customer Details</h3>
                                        <div className="nk-block-des text-soft">
                                        </div>
                                    </div>
                                    <div className="nk-block-head-content" onClick={() => { navigate(-1) }}>
                                        <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                        <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></a>
                                    </div>
                                </div>
                            </div>{/* .nk-block-head */}

                            <div className="nk-block">
                                <div className="row g-gs">
                                    <div className="col-lg-4 col-xl-4 col-xxl-3">
                                        <div className="card">
                                            <div className="card-inner-group">
                                                <div className="card-inner">
                                                    <div className="user-card user-card-s2">
                                                        <div className="user-avatar lg ">
                                                            {
                                                                // image == null ? <img src="./images/avatar/b-sm.jpg" alt="img" /> : <img src={image} alt="img" />
                                                                image == null ? <Image src="./images/avatar/b-sm.jpg" alt="img" width={80} height={80} style={{ objectFit: 'cover' }} /> : <Image src={image} alt="img" width={80} height={80} style={{ objectFit: 'cover' }} />
                                                            }
                                                        </div>
                                                        <div className="user-info">
                                                            {/* <div className="badge bg-light rounded-pill ucap">Platinam</div> */}
                                                            <h5 style={{ textTransform: "capitalize" }} >{name} {lastname}</h5>
                                                            <span className="sub-text">{email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="card-inner card-inner-sm"> */}
                                                {/* <ul className="btn-toolbar justify-center gx-1">
                                                        <li><a className="btn btn-trigger btn-icon"><em className="icon ni ni-shield-off" /></a></li>
                                                        <li><a className="btn btn-trigger btn-icon"><em className="icon ni ni-mail" /></a></li>
                                                        <li><a className="btn btn-trigger btn-icon"><em className="icon ni ni-bookmark" /></a></li>
                                                        <li><a className="btn btn-trigger btn-icon text-danger"><em className="icon ni ni-na" /></a></li>
                                                    </ul> */}
                                                {/* </div> */}
                                                {/* <div className="card-inner">
                                                    <div className="row text-center">
                                                        <div className="col-4">
                                                            <div className="profile-stats">
                                                                <span className="amount">0</span>
                                                                <span className="sub-text">Total transaction</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="profile-stats">
                                                                <span className="amount">0</span>
                                                                <span className="sub-text">Complete</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="profile-stats">
                                                                <span className="amount">0</span>
                                                                <span className="sub-text">Progress</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="card-inner">
                                                    <h6 className="overline-title mb-2">Short Details</h6>
                                                    <div className="row g-3">
                                                        <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold" style={{ textTransform: "capitalize" }}>Customer Name:</span>
                                                            <span>{name}</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold">Customer Email:</span>
                                                            {
                                                                email == null ? <span>N/A</span> : <span>{email}</span>
                                                            }
                                                        </div>

                                                        <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold" style={{ textTransform: "capitalize" }}> Address:</span>
                                                            {
                                                                addresss?.street == null ? <span>N/A</span> : <span>{addresss?.house_number} {addresss?.apartment} {addresss?.street},{addresss?.city},{addresss?.state}</span>
                                                            }
                                                        </div>
                                                        {/* <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold">Language:</span>
                                                            <span>English</span>
                                                        </div> */}

                                                        {
                                                            Country == null ? <div className="col-sm-6 col-md-4 col-lg-12">
                                                                <span className="sub-text fw-bold">Country :</span>
                                                                <span >N/A</span>
                                                            </div> : <div className="col-sm-6 col-md-4 col-lg-12">
                                                                <span className="sub-text fw-bold">Country :</span>
                                                                <span style={{ textTransform: "capitalize" }}>{Country}</span>
                                                            </div>
                                                        }


                                                        <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold">Date Of Birth:</span>
                                                            {
                                                                (dob == null || dob == "") ? <span>N/A</span> : <span>{dob}</span>
                                                            }
                                                        </div>

                                                        <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold">Phone:</span>
                                                            {
                                                                phone == null ? <span>N/A</span> : <span>+{phoncode} {phone}</span>
                                                            }
                                                        </div>
                                                        <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold">Email Verify Status:</span>
                                                            {
                                                                emailVarified == null ? <span className="badge badge-dim bg-warning"><span>Pending Verify </span></span> : <span className="badge badge-dim bg-success"><span>Success Verify</span></span>
                                                            }
                                                        </div>
                                                        <div className="col-sm-6 col-md-4 col-lg-12 fw-bold ">
                                                            <span>Document Image</span><br></br>
                                                            {
                                                                verification_doc_image == "null" ? <Image src="./images/imagesnot found.jpg" height={100} width={180} style={{ objectFit: 'cover' }} /> :
                                                                    <Image src={verification_doc_image} height={100} width={180} style={{ objectFit: 'cover' }} />
                                                            }
                                                            <br></br><br></br>

                                                            <span>Verification Image </span><br></br>
                                                            {
                                                                verification_id == "null" ? <Image src="./images/imagesnot found.jpg" height={100} width={180} style={{ objectFit: 'cover' }} /> :
                                                                    <Image src={verification_id} height={100} width={180} style={{ objectFit: 'cover' }} />
                                                            }
                                                            <br></br><br></br>
                                                            <span className="sub-text">Document Verify Status</span>
                                                            {
                                                                status == "approved" && <span className="badge badge-dim bg-success"><span>Approved</span></span>
                                                            }

                                                            {
                                                                status == "pending" && <span className="badge badge-dim bg-warning"><span>Pending</span></span>
                                                            }

                                                            {
                                                                status == "rejected" && <span className="badge badge-dim bg-danger"><span>Rejected</span></span>
                                                            }


                                                            {
                                                                status == "Not_applied" && <span className="badge badge-dim bg-danger"><span>Not Applied</span></span>
                                                            }
                                                            <br></br>
                                                            {
                                                                verification_doc_image == "null" || verification_id == "null" ?
                                                                    <div className="form-group mb-3 row">
                                                                        <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} >
                                                                            <select className="form-control mb-0" disabled>
                                                                                <option value={false} ><span style={{ color: "red" }}> Not Applied</span></option>
                                                                                <option value={false}>Rejected</option>
                                                                                <option value={true} >Approved</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    // <Switch checkedChildren="Not applied" unCheckedChildren="Not applied" disabled
                                                                    //     onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />
                                                                    :
                                                                    <span>
                                                                        {isverifieddoc == "rejected" &&
                                                                            <div className="form-group mb-3 row">
                                                                                <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }}>
                                                                                    <select className="form-control mb-0" >
                                                                                        <option value={false}>Rejected</option>
                                                                                        <option value={true} >Approved</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        }


                                                                        {isverifieddoc == "pending" &&
                                                                            <div className="form-group mb-3 row">
                                                                                <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }}>
                                                                                    <select className="form-control mb-0" >
                                                                                        <option>Select Status</option>
                                                                                        <option value={true} >Approved</option>
                                                                                        <option value={false}>Rejected</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {/* {

                                                                            isverifieddoc == "rejected" &&
                                                                            <Switch checkedChildren="Rejected" unCheckedChildren="Approved"
                                                                                onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />

                                                                        } */}
                                                                        {isverifieddoc == "approved" &&
                                                                            <div className="form-group mb-3 row">
                                                                                <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }}>
                                                                                    <select className="form-control mb-0" >
                                                                                        <option value={true}>Approved</option>
                                                                                        <option value={false}>Rejected</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {/* 
                                                                        {
                                                                            isverifieddoc == "approved" &&
                                                                            <Switch checkedChildren="Rejected" unCheckedChildren="Approved" defaultChecked
                                                                                onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />

                                                                        } */}

                                                                        {/* 
                                                                        {
                                                                            isverifieddoc == "approved" &&
                                                                            <Switch checkedChildren="Rejected" unCheckedChildren="Approved" defaultChecked
                                                                                onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />

                                                                        } */}
                                                                    </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>{/* .col */}
                                    <div className="col-lg-8 col-xl-8 col-xxl-9">
                                        <div className="card">
                                            <div className="card-inner">
                                                <div className="nk-block">
                                                    <div className="overline-title-alt mb-2 mt-2">Cash Balance</div>
                                                    <div className="profile-balance">
                                                        <div className="profile-balance-group gx-4">
                                                            <div className="profile-balance-sub">
                                                                <div className="profile-balance-amount">
                                                                    <div className="number">{currecyicon} {amount == "NAN" ? 0 : amount} <small className="currency currency-usd"></small></div>
                                                                </div>
                                                                <div className="profile-balance-subtitle">Wallet Balance</div>
                                                            </div>
                                                            <div className="profile-balance-sub">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="nk-block">
                                                    <h6 className="lead-text mb-3">Currency Wallets</h6>
                                                    <div className="nk-tb-list nk-tb-ulist is-compact card">
                                                        <div className="nk-tb-item nk-tb-head">
                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold ">Icon</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Name</span>
                                                            </div>
                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Currency Type</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-xxl">
                                                                <span className="sub-text fw-bold">Total Price</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Balance</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Transaction</span>
                                                            </div>
                                                        </div>

                                                        {totalwallet.length == 0 &&
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col ">
                                                                    <span className="tb-product">
                                                                        {
                                                                            scroll == false ? <Loader /> : <h6>No Currency Wallets Available</h6>
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            totalwallet.length > 0 && totalwallet.map((data) => {

                                                                return (
                                                                    <>
                                                                        <div className="nk-tb-item " >
                                                                            <div className="nk-tb-col" data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" style={{ cursor: "pointer" }} onClick={() => { CurrencyCustomWallet(data.id); setmodalloader(true) }}>
                                                                                <span className="tb-product">
                                                                                    {
                                                                                        data.currency.icon == null ? <img src="./images/product/c.png" alt="img" className="thumb" /> : <img src={data.currency.icon} alt="img" className="thumb" height={27} />
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="nk-tb-col" data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" style={{ cursor: "pointer" }} onClick={() => { CurrencyCustomWallet(data.id); setmodalloader(true) }}>
                                                                                {
                                                                                    data.currency.short_name == null ? <a><span className="fw-bold">N/A</span></a> : <a><span className="fw-bold" style={{ textTransform: "capitalize" }}>{data.currency.short_name}</span></a>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col" data-bs-toggle="modal" data-bs-target="#modal-reportUpdate" style={{ cursor: "pointer" }} onClick={() => { CurrencyCustomWallet(data.id); setmodalloader(true) }}>
                                                                                {
                                                                                    data.currency.title == null ? <span className="title">N/A</span> : <span className="title" style={{ textTransform: "capitalize" }}>{data.currency.title}</span>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col" >
                                                                                {
                                                                                    data.balance == null ? <span className="sub-text" >0</span> : <span className="sub-text" style={{ display: "flex", justifyContent: "center" }}> {data.currency.symbol} {Number(data.balance.toFixed(2))}</span>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col" onClick={() => { currencytransaction(data.wuid) }}>
                                                                                <div className="tb-odr-btns d-none d-sm-inline">

                                                                                    <a className="btn btn-dim btn-sm btn-primary" >View TXN</a>
                                                                                </div>
                                                                                <a className="btn btn-pd-auto d-sm-none" style={{ display: "flex", justifyContent: "center" }}><em className="icon ni ni-eye"></em></a>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }

                                                    </div>{/* .nk-tb-list */}
                                                </div>


                                                <div className="nk-block">
                                                    <h6 className="lead-text mb-3">Custom Wallets</h6>
                                                    <div className="nk-tb-list nk-tb-ulist is-compact card">
                                                        <div className="nk-tb-item nk-tb-head">
                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Icon</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Name</span>
                                                            </div>
                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Currency Type</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-xxl">
                                                                <span className="sub-text fw-bold">Total Price</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Balance</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Transaction</span>
                                                            </div>
                                                        </div>

                                                        {custom_wallets.length == 0 &&
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col ">
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-product">
                                                                        {
                                                                            scroll == false ? <Loader /> : <h6>No Custom Wallets Available</h6>
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                            </div>
                                                        }


                                                        {
                                                            custom_wallets.length > 0 && custom_wallets.map((data) => {
                                                                // console.log(data, "custom wallet")
                                                                return (
                                                                    <>
                                                                        <div className="nk-tb-item">
                                                                            <div className="nk-tb-col">
                                                                                <span className="tb-product">
                                                                                    {
                                                                                        data.currency.icon == null ? <img src="./images/product/c.png" alt="img" className="thumb" /> : <img src={data.currency.icon} alt="img" className="thumb" height={27} />
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.name == null ? <a><span className="fw-bold">N/A</span></a> : <a><span className="fw-bold" style={{ textTransform: "capitalize" }}>{data.name}</span></a>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.currency.title == null ? <span className="title">N/A</span> : <span className="title" style={{ textTransform: "capitalize" }}>{data.currency.title}</span>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col" >
                                                                                {
                                                                                    data.balance == null ? <span className="sub-text">{data.currency.symbol} 0</span> : <span className="sub-text"> {data.currency.symbol} {data.balance}</span>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col" onClick={() => { customtransaction(data.wuid) }}>
                                                                                <div className="tb-odr-btns d-none d-sm-inline">
                                                                                    <a className="btn btn-dim btn-sm btn-primary" >View TXN</a>
                                                                                </div>
                                                                                <a className="btn btn-pd-auto d-sm-none" style={{ display: "flex", justifyContent: "center" }}><em className="icon ni ni-eye"></em></a>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>{/* .nk-tb-list */}
                                                </div>

                                                <div className="nk-block">
                                                    <h6 className="lead-text mb-3">Cards</h6>
                                                    <div className="nk-tb-list nk-tb-ulist is-compact card">



                                                        <div className="nk-tb-item nk-tb-head">
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Card number</span>
                                                            </div>



                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Expiry Month</span>
                                                            </div>

                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Expiry Year</span>
                                                            </div>




                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">CVC</span>
                                                            </div>


                                                        </div>

                                                        {card.length == 0 &&
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                </div>

                                                                <div className="nk-tb-col ">
                                                                    <span className="tb-product">
                                                                        {
                                                                            scroll == false ? <Loader /> : <h6>No Card Available</h6>
                                                                        }
                                                                        {/* <Loader /><br></br> */}

                                                                    </span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">

                                                                </div>
                                                            </div>
                                                        }



                                                        {
                                                            card.length > 0 && card.map((data) => {
                                                                // console.log(data, "custom wallet")
                                                                return (
                                                                    <>
                                                                        <div className="nk-tb-item">
                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.card_number == null ? <a><span className="fw-bold">N/A</span></a> : <a><span className="fw-bold">{data.card_number}</span></a>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.expiry_month == null ? <span className="title">N/A</span> : <span className="title">{data.expiry_month}</span>
                                                                                }
                                                                            </div>


                                                                            <div className="nk-tb-col" >
                                                                                {
                                                                                    data.expiry_year == null ? <span className="sub-text"> N/A</span> : <span className="sub-text"> {data.expiry_year} </span>
                                                                                }


                                                                            </div>


                                                                            <div className="nk-tb-col" >
                                                                                {
                                                                                    data.cvc == null ? <span className="sub-text">N/A</span> : <span className="sub-text"> {data.cvc} </span>
                                                                                }


                                                                            </div>


                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }




                                                    </div>{/* .nk-tb-list */}
                                                </div>


                                                <div className="nk-block">
                                                    <h6 className="lead-text mb-3"> Referal By</h6>
                                                    <div className="nk-tb-list nk-tb-ulist is-compact card">
                                                        <div className="nk-tb-item nk-tb-head">
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Name</span>
                                                            </div>
                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Email</span>
                                                            </div>

                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Phone Num</span>
                                                            </div>


                                                            <div className="nk-tb-col tb-col-xxl">
                                                                <span className="sub-text fw-bold">DOB</span>
                                                            </div>

                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Country</span>
                                                            </div>




                                                        </div>

                                                        {refreldata == null &&
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col ">
                                                                    <span className="tb-product">
                                                                        {
                                                                            scroll == false ? <Loader /> : <h6>No Data Available</h6>
                                                                        }
                                                                        {/* <Loader /><br></br> */}

                                                                    </span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">

                                                                </div>
                                                            </div>
                                                        }

                                                        {
                                                            refreldata != null &&
                                                            <>

                                                                <div className="nk-tb-item">
                                                                    <div className="nk-tb-col">
                                                                        {
                                                                            refreldata.first_name == null ? <a><span className="fw-bold">N/A</span></a> : <a><span className="fw-bold" style={{ textTransform: "capitalize" }}>{refreldata.first_name}{refreldata.last_name}</span></a>
                                                                        }

                                                                    </div>
                                                                    <div className="nk-tb-col">
                                                                        {
                                                                            refreldata.email == null ? <a><span className="sub-text">N/A</span></a> : <a><span className="sub-text" style={{ textTransform: "capitalize" }}>{refreldata.email}</span></a>
                                                                        }

                                                                    </div>

                                                                    <div className="nk-tb-col">
                                                                        {
                                                                            refreldata.phone_code == null ? <span className="title">N/A</span> : <span className="title">+{refreldata.phone_code} {refreldata.phone}</span>
                                                                        }

                                                                    </div>


                                                                    <div className="nk-tb-col" >
                                                                        {
                                                                            refreldata.citizenship_country == null ? <span className="sub-text" >0</span> : <span className="sub-text" style={{ display: "flex", justifyContent: "center" }}> {refreldata.citizenship_country} </span>
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </>

                                                        }

                                                    </div>{/* .nk-tb-list */}
                                                </div>



                                                <div className="nk-block">
                                                    <h6 className="lead-text mb-3">My Referal</h6>
                                                    <div className="nk-tb-list nk-tb-ulist is-compact card">

                                                        <div className="nk-tb-item nk-tb-head">
                                                            <div className="nk-tb-col">
                                                                <span className="sub-text fw-bold">Name</span>
                                                            </div>

                                                            <div className="nk-tb-col ">
                                                                <span className="sub-text fw-bold">Email</span>
                                                            </div>

                                                            <div className="nk-tb-col tb-col-lg">
                                                                <span className="sub-text fw-bold">Phone Num</span>
                                                            </div>
                                                        </div>

                                                        {refral.length == 0 &&
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                </div>

                                                                <div className="nk-tb-col ">
                                                                    <span className="tb-product">
                                                                        {
                                                                            scroll == false ? <Loader /> : <h6>No Card Available</h6>
                                                                        }
                                                                        {/* <Loader /><br></br> */}

                                                                    </span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">

                                                                </div>
                                                            </div>
                                                        }

                                                        {
                                                            refral.length > 0 && refral.map((data) => {
                                                                // console.log(data, "custom wallet")
                                                                return (
                                                                    <>
                                                                        <div className="nk-tb-item">
                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.first_name == null ? <a><span className="fw-bold">N/A</span></a> : <a><span className="fw-bold">{data.first_name}{data.last_name}</span></a>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.email == null ? <span className="title">N/A</span> : <span className="title">{data.email}</span>
                                                                                }
                                                                            </div>
                                                                            <div className="nk-tb-col tb-col-lg" >
                                                                                {
                                                                                    data.phone_code == null ? <span className="sub-text"> N/A</span> : <span className="sub-text"> +{data.phone_code} {data.phone}</span>
                                                                                }
                                                                            </div>

                                                                            {/* 
                                                                            <div className="nk-tb-col" >
                                                                                {
                                                                                    data.cvc == null ? <span className="sub-text">N/A</span> : <span className="sub-text"> {data.cvc} </span>
                                                                                }


                                                                            </div> */}
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>{/* .nk-tb-list */}
                                                </div>
                                            </div>
                                        </div>{/* .card */}
                                    </div>{/* .col */}
                                </div>{/* .row */}
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div>






            <div className="modal modal-blur fade" id="modal-reportUpdate" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Custom Wallets</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} onClick={handleButtonClick} />
                        </div>

                        <div className="modal-body">
                            <div className="form-group mb-3 row">
                                <div className="col">
                                    <div className="nk-block">
                                        <div className="nk-tb-list nk-tb-ulist is-compact card">
                                            <div className="nk-tb-item nk-tb-head">
                                                <div className="nk-tb-col ">
                                                    <span className="sub-text fw-bold">Icon</span>
                                                </div>
                                                <div className="nk-tb-col">
                                                    <span className="sub-text fw-bold">Name</span>
                                                </div>
                                                <div className="nk-tb-col ">
                                                    <span className="sub-text fw-bold">Currency Type</span>
                                                </div>


                                                <div className="nk-tb-col tb-col-xxl">
                                                    <span className="sub-text fw-bold">Total Price</span>
                                                </div>

                                                <div className="nk-tb-col">
                                                    <span className="sub-text fw-bold">Balance</span>
                                                </div>

                                                <div className="nk-tb-col">
                                                    <span className="sub-text fw-bold">Transaction</span>
                                                </div>
                                            </div>

                                            {
                                                modalloader == true ?
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                        </div>
                                                        <div className="nk-tb-col">
                                                        </div>
                                                        <div className="nk-tb-col ">
                                                            <Loader />
                                                        </div>
                                                        <div className="nk-tb-col">
                                                        </div>
                                                    </div> :
                                                    <>
                                                        {currencycustom.length == 0 &&
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col ">
                                                                    <span className="tb-product">
                                                                        {
                                                                            scroll == false ? <Loader /> : <span style={{ color: "black", fontSize: 14 }}>No Custom Wallets Available</span>
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                </div>
                                                                {/* <div className="nk-tb-col">
                                                                </div> */}
                                                            </div>
                                                        }

                                                        {
                                                            currencycustom.length > 0 && currencycustom.map((data) => {

                                                                return (
                                                                    <>
                                                                        <div className="nk-tb-item">
                                                                            <div className="nk-tb-col">
                                                                                <span className="tb-product">
                                                                                    {
                                                                                        data.currency.icon == null ? <img src="./images/product/c.png" alt="img" className="thumb" /> : <img src={data.currency.icon} alt="img" className="thumb" height={27} />
                                                                                    }


                                                                                </span>
                                                                            </div>

                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.name == null ? <a><span className="fw-bold">N/A</span></a> : <a><span className="fw-bold" style={{ textTransform: "capitalize" }}>{data.name}</span></a>
                                                                                }
                                                                            </div>

                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.currency.title == null ? <span className="title">N/A</span> : <span className="title" style={{ textTransform: "capitalize" }}>{data.currency.title}</span>
                                                                                }
                                                                            </div>


                                                                            <div className="nk-tb-col" >
                                                                                {
                                                                                    data.balance == null ? <span className="sub-text">{data.currency.symbol} 0</span> : <span className="sub-text"> {data.currency.symbol} {data.balance}</span>
                                                                                }
                                                                            </div>

                                                                            <div className="nk-tb-col" onClick={() => { customtransaction(data.wuid) }}>
                                                                                <div className="tb-odr-btns d-none d-sm-inline">
                                                                                    <a className="btn btn-dim btn-sm btn-primary" >View TXN</a>
                                                                                </div>
                                                                                <a className="btn btn-pd-auto d-sm-none" style={{ display: "flex", justifyContent: "center" }}><em className="icon ni ni-eye"></em></a>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }


                                        </div>{/* .nk-tb-list */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-primary " data-bs-dismiss="modal" onClick={handleButtonClick}>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg> */}
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>





            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head">
                                <div className="nk-block-head-content">
                                    <h3 className="nk-block-title page-title">Instructor/ <strong className="text-primary small">Abu Bin Ishtiyak</strong></h3>
                                </div>
                            </div>
                            <div className="nk-block nk-block-lg">
                                <div className="card card-stretch">
                                    <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-bs-toggle="tab" href="#personal-info"><em className="icon ni ni-user-circle-fill" /><span>Personal
                                                information</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#profile-overview"><em className="icon ni ni-eye-fill" /><span>Overview</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#profile-courses"><em className="icon ni ni-book-fill" /><span>Courses</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#profile-review"><em className="icon ni ni-thumbs-up" /><span>Review</span> </a>
                                        </li>
                                        <li className="nav-item nav-item-trigger">
                                            <a href="#" className="btn btn-icon btn-trigger"><em className="icon ni ni-edit" /></a>
                                        </li>
                                    </ul>
                                    <div className="card-inner">
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="personal-info">
                                                <div className="nk-block">
                                                    <div className="profile-ud-list">
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Title</span>
                                                                <span className="profile-ud-value">Mr.</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Full Name</span>
                                                                <span className="profile-ud-value">Abu Bin
                                                                    Ishtiyak</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Date of Birth</span>
                                                                <span className="profile-ud-value">10 Aug, 1980</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Surname</span>
                                                                <span className="profile-ud-value">IO</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Mobile Number</span>
                                                                <span className="profile-ud-value">+811
                                                                    758-756433</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Email Address</span>
                                                                <span className="profile-ud-value">info@softnio.com</span>
                                                            </div>
                                                        </div>
                                                    </div>{/* .profile-ud-list */}
                                                </div>{/* .nk-block */}
                                                <div className="col-lg-4 col-xl-4 col-xxl-3">
                                                    <div className="card">
                                                        <div className="card-inner-group">
                                                            <div className="card-inner">
                                                                <div className="user-card user-card-s2">
                                                                    <div className="user-avatar lg ">
                                                                        {
                                                                            // image == null ? <img src="./images/avatar/b-sm.jpg" alt="img" /> : <img src={image} alt="img" />
                                                                            image == null ? <Image src="./images/avatar/b-sm.jpg" alt="img" width={80} height={80} style={{ objectFit: 'cover' }} /> : <Image src={image} alt="img" width={80} height={80} style={{ objectFit: 'cover' }} />
                                                                        }
                                                                    </div>
                                                                    <div className="user-info">
                                                                        {/* <div className="badge bg-light rounded-pill ucap">Platinam</div> */}
                                                                        <h5 style={{ textTransform: "capitalize" }} >{name} {lastname}</h5>
                                                                        <span className="sub-text">{email}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="card-inner card-inner-sm"> */}
                                                            {/* <ul className="btn-toolbar justify-center gx-1">
                                                        <li><a className="btn btn-trigger btn-icon"><em className="icon ni ni-shield-off" /></a></li>
                                                        <li><a className="btn btn-trigger btn-icon"><em className="icon ni ni-mail" /></a></li>
                                                        <li><a className="btn btn-trigger btn-icon"><em className="icon ni ni-bookmark" /></a></li>
                                                        <li><a className="btn btn-trigger btn-icon text-danger"><em className="icon ni ni-na" /></a></li>
                                                    </ul> */}
                                                            {/* </div> */}
                                                            {/* <div className="card-inner">
                                                    <div className="row text-center">
                                                        <div className="col-4">
                                                            <div className="profile-stats">
                                                                <span className="amount">0</span>
                                                                <span className="sub-text">Total transaction</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="profile-stats">
                                                                <span className="amount">0</span>
                                                                <span className="sub-text">Complete</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="profile-stats">
                                                                <span className="amount">0</span>
                                                                <span className="sub-text">Progress</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                            <div className="card-inner">
                                                                <h6 className="overline-title mb-2">Short Details</h6>
                                                                <div className="row g-3">
                                                                    <div className="col-sm-6 col-md-4 col-lg-12">
                                                                        <span className="sub-text fw-bold" style={{ textTransform: "capitalize" }}>Customer Name:</span>
                                                                        <span>{name}</span>
                                                                    </div>
                                                                    <div className="col-sm-6 col-md-4 col-lg-12">
                                                                        <span className="sub-text fw-bold">Customer Email:</span>
                                                                        {
                                                                            email == null ? <span>N/A</span> : <span>{email}</span>
                                                                        }
                                                                    </div>

                                                                    <div className="col-sm-6 col-md-4 col-lg-12">
                                                                        <span className="sub-text fw-bold" style={{ textTransform: "capitalize" }}> Address:</span>
                                                                        {
                                                                            addresss?.street == null ? <span>N/A</span> : <span>{addresss?.house_number} {addresss?.apartment} {addresss?.street},{addresss?.city},{addresss?.state}</span>
                                                                        }
                                                                    </div>
                                                                    {/* <div className="col-sm-6 col-md-4 col-lg-12">
                                                            <span className="sub-text fw-bold">Language:</span>
                                                            <span>English</span>
                                                        </div> */}

                                                                    {
                                                                        Country == null ? <div className="col-sm-6 col-md-4 col-lg-12">
                                                                            <span className="sub-text fw-bold">Country :</span>
                                                                            <span >N/A</span>
                                                                        </div> : <div className="col-sm-6 col-md-4 col-lg-12">
                                                                            <span className="sub-text fw-bold">Country :</span>
                                                                            <span style={{ textTransform: "capitalize" }}>{Country}</span>
                                                                        </div>
                                                                    }


                                                                    <div className="col-sm-6 col-md-4 col-lg-12">
                                                                        <span className="sub-text fw-bold">Date Of Birth:</span>
                                                                        {
                                                                            (dob == null || dob == "") ? <span>N/A</span> : <span>{dob}</span>
                                                                        }
                                                                    </div>

                                                                    <div className="col-sm-6 col-md-4 col-lg-12">
                                                                        <span className="sub-text fw-bold">Phone:</span>
                                                                        {
                                                                            phone == null ? <span>N/A</span> : <span>+{phoncode} {phone}</span>
                                                                        }
                                                                    </div>
                                                                    <div className="col-sm-6 col-md-4 col-lg-12">
                                                                        <span className="sub-text fw-bold">Email Verify Status:</span>
                                                                        {
                                                                            emailVarified == null ? <span className="badge badge-dim bg-warning"><span>Pending Verify </span></span> : <span className="badge badge-dim bg-success"><span>Success Verify</span></span>
                                                                        }
                                                                    </div>
                                                                    <div className="col-sm-6 col-md-4 col-lg-12 fw-bold ">
                                                                        <span>Document Image</span><br></br>
                                                                        {
                                                                            verification_doc_image == "null" ? <Image src="./images/imagesnot found.jpg" height={100} width={180} style={{ objectFit: 'cover' }} /> :
                                                                                <Image src={verification_doc_image} height={100} width={180} style={{ objectFit: 'cover' }} />
                                                                        }
                                                                        <br></br><br></br>

                                                                        <span>Verification Image </span><br></br>
                                                                        {
                                                                            verification_id == "null" ? <Image src="./images/imagesnot found.jpg" height={100} width={180} style={{ objectFit: 'cover' }} /> :
                                                                                <Image src={verification_id} height={100} width={180} style={{ objectFit: 'cover' }} />
                                                                        }
                                                                        <br></br><br></br>
                                                                        <span className="sub-text">Document Verify Status</span>
                                                                        {
                                                                            status == "approved" && <span className="badge badge-dim bg-success"><span>Approved</span></span>
                                                                        }

                                                                        {
                                                                            status == "pending" && <span className="badge badge-dim bg-warning"><span>Pending</span></span>
                                                                        }

                                                                        {
                                                                            status == "rejected" && <span className="badge badge-dim bg-danger"><span>Rejected</span></span>
                                                                        }


                                                                        {
                                                                            status == "Not_applied" && <span className="badge badge-dim bg-danger"><span>Not Applied</span></span>
                                                                        }
                                                                        <br></br>
                                                                        {
                                                                            verification_doc_image == "null" || verification_id == "null" ?
                                                                                <div className="form-group mb-3 row">
                                                                                    <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} >
                                                                                        <select className="form-control mb-0" disabled>
                                                                                            <option value={false} ><span style={{ color: "red" }}> Not Applied</span></option>
                                                                                            <option value={false}>Rejected</option>
                                                                                            <option value={true} >Approved</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                // <Switch checkedChildren="Not applied" unCheckedChildren="Not applied" disabled
                                                                                //     onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />
                                                                                :
                                                                                <span>
                                                                                    {isverifieddoc == "rejected" &&
                                                                                        <div className="form-group mb-3 row">
                                                                                            <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }}>
                                                                                                <select className="form-control mb-0" >
                                                                                                    <option value={false}>Rejected</option>
                                                                                                    <option value={true} >Approved</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    }


                                                                                    {isverifieddoc == "pending" &&
                                                                                        <div className="form-group mb-3 row">
                                                                                            <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }}>
                                                                                                <select className="form-control mb-0" >
                                                                                                    <option>Select Status</option>
                                                                                                    <option value={true} >Approved</option>
                                                                                                    <option value={false}>Rejected</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                    {/* {

                                                                            isverifieddoc == "rejected" &&
                                                                            <Switch checkedChildren="Rejected" unCheckedChildren="Approved"
                                                                                onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />

                                                                        } */}
                                                                                    {isverifieddoc == "approved" &&
                                                                                        <div className="form-group mb-3 row">
                                                                                            <div className="col" onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }}>
                                                                                                <select className="form-control mb-0" >
                                                                                                    <option value={true}>Approved</option>
                                                                                                    <option value={false}>Rejected</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                    {/* 
                                                                        {
                                                                            isverifieddoc == "approved" &&
                                                                            <Switch checkedChildren="Rejected" unCheckedChildren="Approved" defaultChecked
                                                                                onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />

                                                                        } */}

                                                                                    {/* 
                                                                        {
                                                                            isverifieddoc == "approved" &&
                                                                            <Switch checkedChildren="Rejected" unCheckedChildren="Approved" defaultChecked
                                                                                onChange={(e) => { setToggle(e); documentVerifyedstatus(e) }} style={{ backgroundColor: '#1a48aa' }} />

                                                                        } */}
                                                                                </span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{/* .col */}
                                                <div className="nk-block">
                                                    <div className="nk-block-head nk-block-head-line">
                                                        <h6 className="title overline-title text-base">Additional
                                                            Information</h6>
                                                    </div>{/* .nk-block-head */}
                                                    <div className="profile-ud-list">
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Joining Date</span>
                                                                <span className="profile-ud-value">08-16-2018
                                                                    09:04PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Reg Method</span>
                                                                <span className="profile-ud-value">Email</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Country</span>
                                                                <span className="profile-ud-value">United State</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Nationality</span>
                                                                <span className="profile-ud-value">United State</span>
                                                            </div>
                                                        </div>
                                                    </div>{/* .profile-ud-list */}
                                                </div>{/* .nk-block */}
                                                <div className="nk-divider divider md" />

                                            </div>{/* tab pane */}





                                            <div className="tab-pane active" id="personal-info">
                                                <div className="nk-block">
                                                    <div className="profile-ud-list">
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Title</span>
                                                                <span className="profile-ud-value">Mr.</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Full Name</span>
                                                                <span className="profile-ud-value">Abu Bin
                                                                    Ishtiyak</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Date of Birth</span>
                                                                <span className="profile-ud-value">10 Aug, 1980</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Surname</span>
                                                                <span className="profile-ud-value">IO</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Mobile Number</span>
                                                                <span className="profile-ud-value">+811
                                                                    758-756433</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Email Address</span>
                                                                <span className="profile-ud-value">info@softnio.com</span>
                                                            </div>
                                                        </div>
                                                    </div>{/* .profile-ud-list */}
                                                </div>{/* .nk-block */}
                                                <div className="nk-block">
                                                    <div className="nk-block-head nk-block-head-line">
                                                        <h6 className="title overline-title text-base">Additional
                                                            Information</h6>
                                                    </div>{/* .nk-block-head */}
                                                    <div className="profile-ud-list">
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Joining Date</span>
                                                                <span className="profile-ud-value">08-16-2018
                                                                    09:04PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Reg Method</span>
                                                                <span className="profile-ud-value">Email</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Country</span>
                                                                <span className="profile-ud-value">United State</span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-ud-item">
                                                            <div className="profile-ud wider">
                                                                <span className="profile-ud-label">Nationality</span>
                                                                <span className="profile-ud-value">United State</span>
                                                            </div>
                                                        </div>
                                                    </div>{/* .profile-ud-list */}
                                                </div>{/* .nk-block */}
                                                <div className="nk-divider divider md" />

                                            </div>{/* tab pane */}



                                            <div className="tab-pane" id="profile-overview">
                                                <div className="nk-block-head nk-block-head-md">
                                                    <div className="nk-block-between">
                                                        <div className="nk-block-head-content">
                                                            <h5 className="nk-block-title">Profile Overview</h5>
                                                        </div>{/* .nk-block-head-content */}
                                                        <div className="nk-block-head-content">
                                                            <div className="toggle-wrap nk-block-tools-toggle">
                                                                <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v" /></a>
                                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                                    <ul className="nk-block-tools g-3">
                                                                        <li>
                                                                            <div className="drodown">
                                                                                <a href="#" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown"><em className="d-none d-sm-inline icon ni ni-calender-date" /><span><span className="d-none d-md-inline">Last</span>
                                                                                    30 Days</span><em className="dd-indc icon ni ni-chevron-right" /></a>
                                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                                    <ul className="link-list-opt no-bdr">
                                                                                        <li><a href="#"><span>Last
                                                                                            30
                                                                                            Days</span></a>
                                                                                        </li>
                                                                                        <li><a href="#"><span>Last 6
                                                                                            Months</span></a>
                                                                                        </li>
                                                                                        <li><a href="#"><span>Last 1
                                                                                            Years</span></a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>{/* .toggle-wrap */}
                                                        </div>{/* .nk-block-head-content */}
                                                    </div>
                                                </div>{/* .nk-block-head */}
                                                <div className="nk-block">
                                                    <div className="row g-gs">
                                                        <div className="col-xxl-8 col-lg-12">
                                                            <div className="card card-full card-bordered border-light">
                                                                <div className="nk-ecwg nk-ecwg5">
                                                                    <div className="card-inner">
                                                                        <div className="card-title-group align-start pb-3 g-2">
                                                                            <div className="card-title">
                                                                                <h6 className="title">Total Earning</h6>
                                                                            </div>
                                                                            <div className="card-tools">
                                                                                <em className="card-hint icon ni ni-help" data-bs-toggle="tooltip" data-bs-placement="left" title="Revenu of this month" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="data-group">
                                                                            <div className="data">
                                                                                <div className="title">Monthly</div>
                                                                                <div className="amount amount-sm">9.28K
                                                                                </div>
                                                                                <div className="change up"><em className="icon ni ni-arrow-long-up" />4.63%
                                                                                </div>
                                                                            </div>
                                                                            <div className="data">
                                                                                <div className="title">Weekly</div>
                                                                                <div className="amount amount-sm">2.69K
                                                                                </div>
                                                                                <div className="change down"><em className="icon ni ni-arrow-long-down" />1.92%
                                                                                </div>
                                                                            </div>
                                                                            <div className="data">
                                                                                <div className="title">Daily (Avg)</div>
                                                                                <div className="amount amount-sm">0.94K
                                                                                </div>
                                                                                <div className="change up"><em className="icon ni ni-arrow-long-up" />3.45%
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="nk-ecwg5-ck">
                                                                            <canvas className="lms-line-chart-s4" id="storeVisitors" />
                                                                        </div>
                                                                        <div className="chart-label-group">
                                                                            <div className="chart-label">01 Jul, 2020
                                                                            </div>
                                                                            <div className="chart-label">30 Jul, 2020
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>{/* .card */}
                                                        </div>{/* .col */}
                                                        <div className="col-xxl-4">
                                                            <div className="row g-gs">
                                                                <div className="col-xxl-12 col-md-6">
                                                                    <div className="card card-full card-bordered border-light">
                                                                        <div className="nk-ecwg nk-ecwg3">
                                                                            <div className="card-inner pb-2">
                                                                                <div className="card-title-group">
                                                                                    <div className="card-title">
                                                                                        <h6 className="title"><a href>Active
                                                                                            Students</a></h6>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="data">
                                                                                    <div className="data-group">
                                                                                        <div className="amount">329
                                                                                        </div>
                                                                                        <div className="info text-end">
                                                                                            <span className="change up text-danger"><em className="icon ni ni-arrow-long-up" />4.63%</span><br /><span>vs.
                                                                                                last week</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>{/* .card-inner */}
                                                                            <div className="nk-ck-wrap mt-auto overflow-hidden rounded-bottom">
                                                                                <div className="nk-ecwg3-ck">
                                                                                    <canvas className="lms-line-chart-s1" id="activeStudents" />
                                                                                </div>
                                                                            </div>
                                                                        </div>{/* .nk-ecwg */}
                                                                    </div>{/* .card */}
                                                                </div>{/* .col */}
                                                                <div className="col-xxl-12 col-md-6">
                                                                    <div className="card card-full card-bordered border-light">
                                                                        <div className="nk-ecwg nk-ecwg3">
                                                                            <div className="card-inner pb-2">
                                                                                <div className="card-title-group">
                                                                                    <div className="card-title">
                                                                                        <h6 className="title"><a href>New
                                                                                            Enrolment</a></h6>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="data">
                                                                                    <div className="data-group">
                                                                                        <div className="amount">194
                                                                                        </div>
                                                                                        <div className="info text-end">
                                                                                            <span className="change up text-danger"><em className="icon ni ni-arrow-long-up" />4.63%</span><br /><span>vs.
                                                                                                Yesterday</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>{/* .card-inner */}
                                                                            <div className="nk-ck-wrap mt-auto overflow-hidden rounded-bottom">
                                                                                <div className="nk-ecwg3-ck">
                                                                                    <canvas className="lms-line-chart-s1" id="newStudents" />
                                                                                </div>
                                                                            </div>
                                                                        </div>{/* .nk-ecwg */}
                                                                    </div>{/* .card */}
                                                                </div>{/* .col */}
                                                            </div>{/* .row */}
                                                        </div>{/* .col */}
                                                    </div>{/* .row */}
                                                </div>{/* .nk-block */}
                                            </div>{/*tab pane*/}
                                            <div className="tab-pane" id="profile-courses">
                                                <div className="nk-tb-list border border-light rounded overflow-hidden is-compact">
                                                    <div className="nk-tb-item nk-tb-head">
                                                        <div className="nk-tb-col">
                                                            <span className="lead-text">#</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="lead-text">Courses List</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="lead-text d-none d-sm-inline">Status</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <span className="lead-text">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"> 1 </div>
                                                        <div className="nk-tb-col"> Learn Android Development with
                                                            project </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-success">Active</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1">
                                                                <li>
                                                                    <a href="#" className="btn btn-sm btn-icon btn-trigger me-n1"><em className="icon ni ni-trash-alt text-danger" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"> 2 </div>
                                                        <div className="nk-tb-col"> Learn Android Development with
                                                            project </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-warning">Pending</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1">
                                                                <li>
                                                                    <a href="#" className="btn btn-sm btn-icon btn-trigger me-n1"><em className="icon ni ni-trash-alt text-danger" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"> 3 </div>
                                                        <div className="nk-tb-col"> Learn Android Development with
                                                            project </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-danger">Canceled</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1">
                                                                <li>
                                                                    <a href="#" className="btn btn-sm btn-icon btn-trigger me-n1"><em className="icon ni ni-trash-alt text-danger" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>{/*tab pane*/}
                                            <div className="tab-pane" id="profile-review">
                                                <div className="nk-tb-list border border-light rounded overflow-hidden">
                                                    <div className="nk-tb-item nk-tb-head">
                                                        <div className="nk-tb-col nk-tb-col-check">
                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" className="custom-control-input" id="uid" />
                                                                <label className="custom-control-label" htmlFor="uid" />
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col"><span className="lead-text">Student</span></div>
                                                        <div className="nk-tb-col tb-col-sm"><span className="lead-text">Course name</span></div>
                                                        <div className="nk-tb-col tb-col-md"><span className="lead-text">Rating</span></div>
                                                        <div className="nk-tb-col tb-col-lg"><span className="lead-text">Review</span></div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1 my-n1">
                                                                <li>
                                                                    <div className="drodown">
                                                                        <a href="#" className="dropdown-toggle btn btn-sm btn-icon btn-trigger me-n1" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <ul className="link-list-opt no-bdr">
                                                                                <li><a href="#"><em className="icon ni ni-mail" /><span>Send
                                                                                    Email to All</span></a>
                                                                                </li>
                                                                                <li><a href="#"><em className="icon ni ni-na" /><span>Suspend
                                                                                    Selected</span></a></li>
                                                                                <li><a href="#"><em className="icon ni ni-trash" /><span>Delete
                                                                                    All</span></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* .nk-tb-item */}
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col nk-tb-col-check">
                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" className="custom-control-input" id="uid1" />
                                                                <label className="custom-control-label" htmlFor="uid1" />
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <div className="user-card">
                                                                <div className="user-avatar bg-primary">
                                                                    <span>AB</span>
                                                                </div>
                                                                <div className="user-info">
                                                                    <span className="tb-lead">Abu Bin Ishtiyak</span>
                                                                    <span>info@softnio.com</span>
                                                                    <ul className="d-flex d-md-none text-warning">
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <span>UI/UX Design with Adobe XD</span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <ul className="d-flex text-warning">
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                            </ul>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                            <span>The instructor was very knowledgable, worked at a
                                                                good peace.</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1">
                                                                <li>
                                                                    <a href="#" className="btn btn-sm btn-icon btn-trigger me-n1"><em className="icon ni ni-trash-alt text-danger" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* .nk-tb-item */}
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col nk-tb-col-check">
                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" className="custom-control-input" id="uid7" />
                                                                <label className="custom-control-label" htmlFor="uid7" />
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <div className="user-card">
                                                                <div className="user-avatar bg-warning">
                                                                    <span>VL</span>
                                                                </div>
                                                                <div className="user-info">
                                                                    <span className="tb-lead">Victoria Lynch</span>
                                                                    <span>victoria@example.com</span>
                                                                    <ul className="d-flex d-md-none text-warning">
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <span>UI/UX Design with Adobe XD</span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <ul className="d-flex text-warning">
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                            </ul>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                            <span> I will highly recommend this type of
                                                                instructor.</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1">
                                                                <li>
                                                                    <a href="#" className="btn btn-sm btn-icon btn-trigger me-n1"><em className="icon ni ni-trash-alt text-danger" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* .nk-tb-item */}
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col nk-tb-col-check">
                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" className="custom-control-input" id="uid8" />
                                                                <label className="custom-control-label" htmlFor="uid8" />
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <div className="user-card">
                                                                <div className="user-avatar bg-success">
                                                                    <span>PN</span>
                                                                </div>
                                                                <div className="user-info">
                                                                    <span className="tb-lead">Patrick Newman</span>
                                                                    <span>patrick@example.com</span>
                                                                    <ul className="d-flex d-md-none text-warning">
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <span>Learn Android Development with project</span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <ul className="d-flex text-warning">
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                            </ul>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                            <span>I look forward to taking more classes from
                                                                here.</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1">
                                                                <li>
                                                                    <a href="#" className="btn btn-sm btn-icon btn-trigger me-n1"><em className="icon ni ni-trash-alt text-danger" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* .nk-tb-item */}
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col nk-tb-col-check">
                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" className="custom-control-input" id="uid9" />
                                                                <label className="custom-control-label" htmlFor="uid9" />
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <div className="user-card">
                                                                <div className="user-avatar">
                                                                    <img src="./images/avatar/d-sm.jpg" alt />
                                                                </div>
                                                                <div className="user-info">
                                                                    <span className="tb-lead">Jane Harris</span>
                                                                    <span>harris@example.com</span>
                                                                    <ul className="d-flex d-md-none text-warning">
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                        <li><em className="icon ni ni-star-fill" />
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <span>Learn Android Development with project</span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <ul className="d-flex text-warning">
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                                <li><em className="icon ni ni-star-fill" /></li>
                                                            </ul>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                            <span>This was my first time it far exceeded my
                                                                expectations.</span>
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools">
                                                            <ul className="nk-tb-actions gx-1">
                                                                <li>
                                                                    <a href="#" className="btn btn-sm btn-icon btn-trigger me-n1"><em className="icon ni ni-trash-alt text-danger" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>


                                                    </div>
                                                    {/* .nk-tb-item */}
                                                </div>
                                            </div>{/*tab pane*/}
                                        </div>{/*tab content*/}
                                    </div>{/*card inner*/}
                                </div>{/*card*/}
                            </div>{/*nk block lg*/}












                        </div>
                    </div>
                </div>
            </div>


        </Container>
    );
}

export default UserDetail;





