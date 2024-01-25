import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Image } from 'antd'
import moment from 'moment'
import { SingleCurrencyTransaction } from '../../API/UserApi/CurrencyTransactionApi'

const SingleCurrencyTran = () => {
    const [data, setdata] = useState()
    const [Apicondition, setApicondition] = useState()
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.state, "total dataidddddddddd")
    const token = localStorage.getItem("logintoken")
    // const data = location?.state[0]
    const sender = data?.sender
    const Recipient = data?.receiver

    // if (location.state.client_id) {
    //     setApicondition(true)
    //     console.log("client_idclient_idclient_idclient_idclient_idclient_idclient_id")
    // }
    // else {
    //     setApicondition(false)
    //     console.log("/////////")
    // }

    // console.log(location.state, "LOOOOOOCCCCTTTTTTIIIIOOONNN")

    const GetSingletransctionData = async () => {
        try {
            const totaldata = await SingleCurrencyTransaction(token, location.state)
            console.log(totaldata?.data, "daatattadsddddddd")
            if (totaldata?.status == true) {
                setdata(totaldata?.data)
            }

        }
        catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        GetSingletransctionData()
    }, [])




    const Back = () => {
        navigate(-1)
    }

    console.log(data?.txndata?.txn_type, "Ddddddddd")
    console.log(data?.txndata?.txn_for, "aaaaaaaaaaaaaaaaaaaaa")

    var stillUtcs = moment.utc(data?.txndata?.created_at).toDate();
    var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');

    return (
        <Container>
            <div className="nk-content ">
                <div className="container">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between g-3">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Transaction Details</h3>

                                    </div>
                                    <div className="nk-block-head-content" onClick={Back}>
                                        <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                        <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></a>
                                    </div>
                                </div>
                            </div>
                            <div>

                                {
                                    (data?.txndata?.txn_type == "Debit" && data?.txndata?.txn_for == "transfer" && data?.txndata?.identifier == "CurrencyTransaction") && <div classname="nk-block">
                                        <div className="nk-block">
                                            <div className="row g-gs">

                                                <div className="col-md-6 col-xxl-3">
                                                    <div className="card card-bordered pricing">
                                                        <div className="pricing-head">
                                                            <div className="pricing-title">
                                                                <h4 className="card-title title">Sender</h4>
                                                                <p className="sub-text">Details of the sender.</p>
                                                            </div>
                                                            <div className="card-text">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <span className="h4 fw-500"> {sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                        <span className="sub-text">Debit Amount</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <Image src={sender?.avatar} height={50} style={{ borderRadius: '20%' }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pricing-body">
                                                            <ul className="pricing-features">
                                                                <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.first_name}</span></li>
                                                                <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.last_name}</span></li>
                                                                <li><span className="w-50">Email</span> - <span className="ms-auto">{sender?.email}</span></li>
                                                                <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">{sender?.phone}</span></li>

                                                                <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-danger"><div className="tb-status badge rounded-pill bg-danger">Debit</div></span></li>
                                                                {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                                <li><span className="w-50">Currency</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.currencywallets[0]?.currency?.title} </span></li>
                                                                <li><span className="w-50">Currency Icon</span> - <span className="ms-auto"><Image src={sender?.currencywallets[0]?.currency?.icon} height={40} width={70} style={{ borderRadius: '10%' }} /></span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-md-6 col-xxl-3">
                                                    <div className="card card-bordered pricing">
                                                        <div className="pricing-head">
                                                            <div className="pricing-title">
                                                                <h4 className="card-title title">Recipient</h4>
                                                                <p className="sub-text">Details of the Recipient.</p>
                                                            </div>
                                                            <div className="card-text">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <span className="h4 fw-500">{Recipient?.currencywallets[0]?.currency?.symbol} {data?.txndata?.other_amount}</span>
                                                                        <span className="sub-text">credit Amount</span>
                                                                    </div>
                                                                    <div className="col-6" >
                                                                        <Image src={Recipient?.avatar} height={50} style={{ borderRadius: '20%' }} />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pricing-body">
                                                            <ul className="pricing-features">
                                                                <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{Recipient?.first_name}</span></li>
                                                                <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}> {Recipient?.last_name}</span></li>
                                                                <li><span className="w-50">Email</span> - <span className="ms-auto">{Recipient?.email}</span></li>
                                                                <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">{Recipient?.phone}</span></li>

                                                                <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-primary">
                                                                    <div className="tb-status badge rounded-pill bg-primary">Credit</div></span></li>
                                                                {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                                <li><span className="w-50">Currency</span> - <span className="ms-auto">{Recipient?.currencywallets[0]?.currency?.title}</span></li>
                                                                <li><span className="w-50">Currency Icon</span> - <span className="ms-auto">{
                                                                    data.currency_icon == "null" ?
                                                                        <Image src="./images/minilogo.png" height={40} width={70} style={{ borderRadius: '10%' }} /> : <Image src={Recipient?.currencywallets[0]?.currency?.icon} height={40} width={70} style={{ borderRadius: '10%' }} />}</span></li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="nk-content ">
                                                    <div className="nk-content-inner card card-bordered pricing">
                                                        <div className="nk-content-body">
                                                            <div className="nk-block">
                                                                <div className="card">
                                                                    <div className="card-aside-wrap">
                                                                        <div className="card-content">
                                                                            <div className="card-inner">
                                                                                <div className="nk-block">
                                                                                    <div className="nk-block-head">
                                                                                        <h5 className="title">Order Details</h5>
                                                                                    </div>
                                                                                    <div className="profile-ud-list">
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction ID</span>
                                                                                                <span className="profile-ud-value">{data?.txndata?.txn_id}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Closing Balance</span>
                                                                                                <span className="profile-ud-value">{sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.closing_balance}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Current Balance</span>
                                                                                                <span className="profile-ud-value">{sender?.currencywallets[0]?.currency?.symbol} {data?.sender_wallet_current_balance}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction Charge</span>
                                                                                                <span className="profile-ud-value">{data?.txndata?.txn_charge_percent} %</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">TXN Charge Amount</span>
                                                                                                <span className="profile-ud-value"> {sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.txn_charge_amount} </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction Time</span>
                                                                                                <span className="profile-ud-value">{timeZones}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction For</span>
                                                                                                <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.title}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Payment Status</span>
                                                                                                {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="tb-status badge rounded-pill bg-success">Sucess</span>}

                                                                                            </div>
                                                                                        </div> */}

                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Payment Status</span>
                                                                                                {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Sucess</span></span>}
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Payment Status</span>
                                                                                                <span className="profile-ud-value">{data?.txndata?.payment_status}</span>
                                                                                            </div>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                }

                                {(data?.txndata?.txn_type == "Debit" && data?.txndata?.txn_for == "received" && data?.txndata?.identifier == "CurrencyTransaction") &&
                                    <div className="nk-content ">
                                        <div className="nk-content-inner">
                                            <div className="nk-content-body" style={{
                                                border: "1px solid silver",
                                                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                cursor: "pointer"
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.01)";
                                                    e.currentTarget.style.boxShadow = "0 12px 18px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)";
                                                }}>
                                                <div className="nk-block">
                                                    <div className="card">
                                                        <div className="card-aside-wrap">
                                                            <div className="card-content">
                                                                <div className="card-inner">
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head">
                                                                            <h5 className="title">Transaction From ({data?.sender?.currencywallets[0]?.currency?.short_name}) Wallet to  ({data?.receiver?.currencywallets[0].currency.short_name}) Wallet</h5>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Name</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{sender?.first_name} {sender?.last_name}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Last Name</span>
                                                                                    <span className="profile-ud-value"></span>
                                                                                </div>
                                                                            </div> */}

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Email</span>
                                                                                    <span className="profile-ud-value">{sender?.email}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Mobile Number</span>
                                                                                    <span className="profile-ud-value">{sender?.phone}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Customer Image</span>
                                                                                    <span className="profile-ud-value"><Image src={sender?.avatar} height={50} width={70} /> </span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Order Details</h6>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Id</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.txn_id}</span>


                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Debit Amount </span>
                                                                                    <span className="profile-ud-value"> {sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.other_amount}</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Credit Amount </span>
                                                                                    <span className="profile-ud-value"> {Recipient?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge % </span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.txn_charge_percent}%</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Charge Amount </span>
                                                                                    <span className="profile-ud-value"> {sender?.currencywallets[0]?.currency?.symbol}  {data?.txndata?.txn_charge_amount}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">{data?.sender?.currencywallets[0]?.currency?.short_name} Wallet Current balance</span>
                                                                                    <span className="profile-ud-value"> {sender?.currencywallets[0]?.currency?.symbol}  {data?.sender_wallet_current_balance}</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">{data?.receiver?.currencywallets[0]?.currency?.short_name} Wallet Current balance</span>
                                                                                    <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol}  {data?.reciever_wallet_current_balance}</span>
                                                                                </div>
                                                                            </div>

                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Method</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div> */}

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Method</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Additional Details</h6>
                                                                        </div>

                                                                        <div className="profile-ud-list">

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Name</span>
                                                                                    <span className="profile-ud-value">{data?.sender?.currencywallets[0]?.currency?.title
                                                                                    }</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Symbol</span>
                                                                                    <span className="profile-ud-value">{data?.sender?.currencywallets[0]?.currency?.symbol}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.currency_icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div> */}
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency</span>
                                                                                    <span className="profile-ud-value">{data?.currency}</span>

                                                                                </div>
                                                                            </div> */}


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction From</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.sender?.currencywallets[0]?.currency?.short_name}  Wallet ({data?.sender?.currencywallets[0]?.currency?.symbol})</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction To</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.receiver?.currencywallets[0]?.currency?.short_name}  Wallet ({data?.receiver?.currencywallets[0]?.currency?.symbol})</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Time</span>
                                                                                    <span className="profile-ud-value">{timeZones}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.receiver?.currencywallets[0]?.currency?.icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Status</span>
                                                                                    {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Sucess</span></span>}
                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                }

                                {(data?.txndata?.txn_type == "Credit" && data?.txndata?.txn_for == "add" && data?.txndata?.identifier == "CustomTransaction") &&
                                    <div className="nk-content ">
                                        <div className="nk-content-inner">
                                            <div className="nk-content-body" style={{
                                                border: "1px solid silver",
                                                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                cursor: "pointer"
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.01)";
                                                    e.currentTarget.style.boxShadow = "0 12px 18px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)";
                                                }}>
                                                <div className="nk-block">
                                                    <div className="card">
                                                        <div className="card-aside-wrap">
                                                            <div className="card-content">
                                                                <div className="card-inner">
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head">
                                                                            <h5 className="title">Wallet Credit Transaction </h5>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Name</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{sender?.first_name} {sender?.last_name}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Last Name</span>
                                                                                    <span className="profile-ud-value"></span>
                                                                                </div>
                                                                            </div> */}

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Email</span>
                                                                                    <span className="profile-ud-value">{sender?.email}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Mobile Number</span>
                                                                                    <span className="profile-ud-value">{sender?.phone}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Customer Image</span>
                                                                                    <span className="profile-ud-value"><Image src={sender?.avatar} height={50} width={70} /> </span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Order Details</h6>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Id</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.txn_id}</span>


                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Debit Amount </span>
                                                                                    <span className="profile-ud-value"> {sender?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Credit Amount </span>
                                                                                    <span className="profile-ud-value"> {Recipient?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge % </span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.txn_charge_percent}%</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Charge Amount </span>
                                                                                    <span className="profile-ud-value"> {Recipient?.currencywallets[0]?.currency?.symbol} {data?.txndata?.txn_charge_amount}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Method</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div>



                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Additional Details</h6>
                                                                        </div>

                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Name</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.currencywallet?.currency?.title
                                                                                    }</span>

                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Symbol</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.currencywallet?.currency?.symbol}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.currency_icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div> */}
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency</span>
                                                                                    <span className="profile-ud-value">{data?.currency}</span>

                                                                                </div>
                                                                            </div> */}
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Time</span>
                                                                                    <span className="profile-ud-value">{timeZones}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction For</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.title}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Status</span>
                                                                                    {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Sucess</span></span>}
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.txndata?.currencywallet?.currency?.icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                }

                                {(data?.txndata?.txn_type == "Debit" && data?.txndata?.txn_for == "transfer" && data?.txndata?.identifier == "CustomTransaction") &&
                                    <div className="nk-content ">
                                        <div className="nk-content-inner">
                                            <div className="nk-content-body" style={{
                                                border: "1px solid silver",
                                                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                cursor: "pointer"
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.01)";
                                                    e.currentTarget.style.boxShadow = "0 12px 18px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)";
                                                }}>
                                                <div className="nk-block">
                                                    <div className="card">
                                                        <div className="card-aside-wrap">
                                                            <div className="card-content">
                                                                <div className="card-inner">
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head">
                                                                            <h5 className="title">Wallet Debit Transaction </h5>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Name </span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{sender?.first_name} {sender?.last_name}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Last Name</span>
                                                                                    <span className="profile-ud-value">{sender?.last_name}</span>
                                                                                </div>
                                                                            </div> */}

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Email</span>
                                                                                    <span className="profile-ud-value">{sender?.email}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Mobile Number</span>
                                                                                    <span className="profile-ud-value">{sender?.phone}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Customer Image</span>
                                                                                    <span className="profile-ud-value"><Image src={sender?.avatar} height={50} width={70} /> </span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Order Details</h6>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Id</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.txn_id}</span>


                                                                                </div>
                                                                            </div>

                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Debit Amount </span>
                                                                                    <span className="profile-ud-value"> {sender?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                                </div>
                                                                            </div> */}

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Debit Amount </span>
                                                                                    <span className="profile-ud-value"> {data?.sender?.currencywallets[0]?.currency.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Credit Amount </span>
                                                                                    <span className="profile-ud-value"> {data?.receiver?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.txndata?.amount}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge %</span>
                                                                                    <span className="profile-ud-value"> {data?.txndata?.txn_charge_percent}%</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge Amt </span>
                                                                                    <span className="profile-ud-value"> {data?.receiver?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.txndata?.txn_charge_percent}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label" >Payment Method</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label" >Debit From</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}> ( {data?.sender?.currencywallets[0]?.currency?.short_name} ){data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label" >Received To
                                                                                    </span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>( {data?.txndata?.title} ) Wallet</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Additional Details</h6>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label" >Currency Name</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.currencywallet?.currency?.title
                                                                                    }</span>

                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Symbol</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.currencywallet?.currency?.symbol}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.currency_icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div> */}
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency</span>
                                                                                    <span className="profile-ud-value">{data?.currency}</span>

                                                                                </div>
                                                                            </div> */}
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Time</span>
                                                                                    <span className="profile-ud-value">{timeZones}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction For</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.title}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Status</span>
                                                                                    {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Sucess</span></span>}
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.txndata?.currencywallet?.currency?.icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }


                                {
                                    (data?.txndata?.txn_type == "Credit" && data?.txndata?.txn_for == "Received" && data?.txndata?.identifier == "RequestCurrencyTransaction") && <div classname="nk-block">
                                        <div className="nk-block">
                                            <div className="row g-gs">
                                                <div className="col-md-6 col-xxl-3">
                                                    <div className="card card-bordered pricing">
                                                        <div className="pricing-head">
                                                            <div className="pricing-title">
                                                                <h4 className="card-title title">Sender</h4>
                                                                <p className="sub-text">Details of the sender.</p>
                                                            </div>
                                                            <div className="card-text">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <span className="h4 fw-500"> {sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                        <span className="sub-text">Debit Amount</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <Image src={sender?.avatar} height={50} style={{ borderRadius: '20%' }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pricing-body">
                                                            <ul className="pricing-features">
                                                                <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.first_name}</span></li>
                                                                <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.last_name}</span></li>
                                                                <li><span className="w-50">Email</span> - <span className="ms-auto">{sender?.email}</span></li>
                                                                <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">{sender?.phone}</span></li>
                                                                <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-danger"><div className="tb-status badge rounded-pill bg-danger">Debit</div></span></li>
                                                                {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                                <li><span className="w-50">Currency</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.currencywallets[0]?.currency?.title} </span></li>
                                                                <li><span className="w-50">Currency Icon</span> - <span className="ms-auto"><Image src={sender?.currencywallets[0]?.currency?.icon} height={40} width={70} style={{ borderRadius: '10%' }} /></span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-xxl-3">
                                                    <div className="card card-bordered pricing">
                                                        <div className="pricing-head">
                                                            <div className="pricing-title">
                                                                <h4 className="card-title title">Recipient</h4>
                                                                <p className="sub-text">Details of the Recipient.</p>
                                                            </div>
                                                            <div className="card-text">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <span className="h4 fw-500">{Recipient?.currencywallets[0]?.currency?.symbol} {data?.txndata?.other_amount}</span>
                                                                        <span className="sub-text">credit Amount</span>
                                                                    </div>
                                                                    <div className="col-6" >
                                                                        <Image src={Recipient?.avatar} height={50} style={{ borderRadius: '20%' }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pricing-body">
                                                            <ul className="pricing-features">
                                                                <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{Recipient?.first_name}</span></li>
                                                                <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}> {Recipient?.last_name}</span></li>
                                                                <li><span className="w-50">Email</span> - <span className="ms-auto">{Recipient?.email}</span></li>
                                                                <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">{Recipient?.phone}</span></li>
                                                                <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-primary">
                                                                    <div className="tb-status badge rounded-pill bg-primary">Credit</div></span></li>
                                                                {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                                <li><span className="w-50">Currency</span> - <span className="ms-auto">{Recipient?.currencywallets[0]?.currency?.title}</span></li>
                                                                <li><span className="w-50">Currency Icon</span> - <span className="ms-auto">{
                                                                    data.currency_icon == "null" ?
                                                                        <Image src="./images/minilogo.png" height={40} width={70} style={{ borderRadius: '10%' }} /> : <Image src={Recipient?.currencywallets[0]?.currency?.icon} height={40} width={70} style={{ borderRadius: '10%' }} />}</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="nk-content ">
                                                    <div className="nk-content-inner">
                                                        <div className="nk-content-body">
                                                            <div className="nk-block">
                                                                <div className="card">
                                                                    <div className="card-aside-wrap">
                                                                        <div className="card-content">
                                                                            <div className="card-inner">
                                                                                <div className="nk-block">
                                                                                    <div className="nk-block-head">
                                                                                        <h5 className="title">Order Details</h5>
                                                                                    </div>
                                                                                    <div className="profile-ud-list">
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction ID</span>
                                                                                                <span className="profile-ud-value">{data?.txndata?.txn_id}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Closing Balance</span>
                                                                                                <span className="profile-ud-value">{sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.closing_balance}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Current Balance</span>
                                                                                                <span className="profile-ud-value">{sender?.currencywallets[0]?.currency?.symbol} {data?.sender_wallet_current_balance}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction Charge</span>
                                                                                                <span className="profile-ud-value">{data?.txndata?.txn_charge_percent} %</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">TXN Charge Amount</span>
                                                                                                <span className="profile-ud-value"> {sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.txn_charge_amount} </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction Time</span>
                                                                                                <span className="profile-ud-value">{timeZones}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Transaction For</span>
                                                                                                <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.title}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Payment Status</span>
                                                                                                {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="tb-status badge rounded-pill bg-success">Sucess</span>}

                                                                                            </div>
                                                                                        </div> */}

                                                                                        <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Payment Status</span>
                                                                                                {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Sucess</span></span>}
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* <div className="profile-ud-item">
                                                                                            <div className="profile-ud wider">
                                                                                                <span className="profile-ud-label">Payment Status</span>
                                                                                                <span className="profile-ud-value">{data?.txndata?.payment_status}</span>
                                                                                            </div>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    (data?.txndata?.txn_type == "Credit" && data?.txndata?.txn_for == "received" && data?.txndata?.identifier == "InternationalTransaction") && <div classname="nk-block">
                                        <div className="nk-content ">
                                            <div className="nk-content-inner">
                                                <div className="nk-content-body" style={{
                                                    border: "1px solid silver",
                                                    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)",
                                                    transition: "transform 0.3s, box-shadow 0.3s",
                                                    cursor: "pointer"
                                                }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = "scale(1.01)";
                                                        e.currentTarget.style.boxShadow = "0 12px 18px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = "scale(1)";
                                                        e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)";
                                                    }}>
                                                    <div className="nk-block">
                                                        <div className="card">
                                                            <div className="card-aside-wrap">
                                                                <div className="card-content">
                                                                    <div className="card-inner">
                                                                        <div className="nk-block">
                                                                            <div className="nk-block-head">
                                                                                <h5 className="title">Money added to {data?.receiver?.currencywallets[0]?.currency?.short_name} wallet </h5>
                                                                            </div>
                                                                            <div className="profile-ud-list">
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Name </span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{sender?.first_name} {sender?.last_name}</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Email</span>
                                                                                        <span className="profile-ud-value">{sender?.email}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Mobile Number</span>
                                                                                        <span className="profile-ud-value">{sender?.phone}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Customer Image</span>
                                                                                        <span className="profile-ud-value"><Image src={sender?.avatar} height={50} width={70} /> </span>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <hr style={{ color: 'black' }}></hr>
                                                                        <div className="nk-block">
                                                                            <div className="nk-block-head nk-block-head-line">
                                                                                <h6 className="title overline-title text-base">Order Details</h6>
                                                                            </div>
                                                                            <div className="profile-ud-list">
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Transaction Id</span>
                                                                                        <span className="profile-ud-value">{data?.txndata?.txn_id}</span>


                                                                                    </div>
                                                                                </div>



                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">
                                                                                            Debit Amount </span>
                                                                                        <span className="profile-ud-value"> {data?.sender?.currencywallets[0]?.currency.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                                    </div>
                                                                                </div>


                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">
                                                                                            Credit Amount </span>
                                                                                        <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount}</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">TXN Charge %</span>
                                                                                        <span className="profile-ud-value"> {data?.txndata?.txn_charge_percent}%</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">TXN Charge Amt </span>
                                                                                        <span className="profile-ud-value"> {data?.sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.txn_charge_amount}</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Closing Balance</span>
                                                                                        <span className="profile-ud-value">
                                                                                            {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.closing_balance}</span>
                                                                                    </div>
                                                                                </div>


                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Current Balance</span>
                                                                                        <span className="profile-ud-value">
                                                                                            {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.reciever_wallet_current_balance}</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Payment Method</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.payment_method}</span>
                                                                                    </div>
                                                                                </div>



                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Debit From</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>
                                                                                            {data?.txndata?.payment_method}</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Received To</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>( {data?.receiver?.currencywallets[0]?.currency?.short_name} ) Wallet</span>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <hr style={{ color: 'black' }}></hr>
                                                                        <div className="nk-block">
                                                                            <div className="nk-block-head nk-block-head-line">
                                                                                <h6 className="title overline-title text-base">Additional Details</h6>
                                                                            </div>

                                                                            <div className="profile-ud-list">
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Currency Name</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.currencywallet?.currency?.title
                                                                                        }</span>

                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Currency Symbol</span>
                                                                                        <span className="profile-ud-value">{data?.txndata?.currencywallet?.currency?.symbol}</span>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.currency_icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div> */}
                                                                            </div>
                                                                            <div className="profile-ud-list">
                                                                                {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency</span>
                                                                                    <span className="profile-ud-value">{data?.currency}</span>

                                                                                </div>
                                                                            </div> */}
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Transaction Time</span>
                                                                                        <span className="profile-ud-value">{timeZones}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Transaction</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.title}</span>
                                                                                    </div>
                                                                                </div>

                                                                                {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Received To</span>
                                                                                    <span className="profile-ud-value">( {data?.receiver?.currencywallets[0]?.currency?.short_name} ) Wallet</span>
                                                                                </div>
                                                                            </div> */}

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Payment Status</span>
                                                                                        {data?.txndata?.payment_status == "failed" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span>}
                                                                                        {data?.txndata?.payment_status == "success" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Success</span></span>}
                                                                                        {data?.txndata?.payment_status == "pending" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-warning">Pending</span></span>}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Currency Icon</span>
                                                                                        <span className="profile-ud-value"><Image src={data?.txndata?.currencywallet?.currency?.icon} height={40} width={70} /></span>
                                                                                    </div>
                                                                                </div>




                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                }


                                {(data?.txndata?.txn_type == "Credit" && data?.txndata?.txn_for == "add" && data?.txndata?.identifier == "CurrencyTransaction") &&
                                    <div className="nk-content ">
                                        <div className="nk-content-inner">
                                            <div className="nk-content-body" style={{
                                                border: "1px solid silver",
                                                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                cursor: "pointer"
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.01)";
                                                    e.currentTarget.style.boxShadow = "0 12px 18px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)";
                                                }}>
                                                <div className="nk-block">
                                                    <div className="card">
                                                        <div className="card-aside-wrap">
                                                            <div className="card-content">
                                                                <div className="card-inner">
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head">
                                                                            <h5 className="title">Currency Wallet Credit Transaction </h5>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Name </span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{sender?.first_name} {sender?.last_name}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Email</span>
                                                                                    <span className="profile-ud-value">{sender?.email}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Mobile Number</span>
                                                                                    <span className="profile-ud-value">{sender?.phone}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Customer Image</span>
                                                                                    <span className="profile-ud-value"><Image src={sender?.avatar} height={50} width={70} /> </span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Order Details</h6>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Id</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.txn_id}</span>


                                                                                </div>
                                                                            </div>



                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Debit Amount </span>
                                                                                    <span className="profile-ud-value"> {data?.sender?.currencywallets[0]?.currency.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Credit Amount </span>
                                                                                    <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge %</span>
                                                                                    <span className="profile-ud-value"> {data?.txndata?.txn_charge_percent}%</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge Amt </span>
                                                                                    <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.txn_charge_amount}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Closing Balance</span>
                                                                                    <span className="profile-ud-value">
                                                                                        {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.closing_balance}</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Current Balance</span>
                                                                                    <span className="profile-ud-value">
                                                                                        {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.reciever_wallet_current_balance}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Method</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div>



                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Debit From</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>
                                                                                        {data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Received To</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>( {data?.sender?.currencywallets[0]?.currency?.short_name} ) Wallet</span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Additional Details</h6>
                                                                        </div>

                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Name</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.currencywallet?.currency?.title
                                                                                    }</span>

                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Symbol</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.currencywallet?.currency?.symbol}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.currency_icon} height={50} width={70} /></span>
                                                                                </div>
                                                                            </div> */}
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency</span>
                                                                                    <span className="profile-ud-value">{data?.currency}</span>

                                                                                </div>
                                                                            </div> */}
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Time</span>
                                                                                    <span className="profile-ud-value">{timeZones}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.title}</span>
                                                                                </div>
                                                                            </div>

                                                                            {/* <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Received To</span>
                                                                                    <span className="profile-ud-value">( {data?.receiver?.currencywallets[0]?.currency?.short_name} ) Wallet</span>
                                                                                </div>
                                                                            </div> */}

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Status</span>
                                                                                    {data?.txndata?.payment_status == "failed" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span>}
                                                                                    {data?.txndata?.payment_status == "success" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Success</span></span>}
                                                                                    {data?.txndata?.payment_status == "pending" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-warning">Pending</span></span>}
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.txndata?.currencywallet?.currency?.icon} height={40} width={70} /></span>
                                                                                </div>
                                                                            </div>




                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                }


                                {
                                    (data?.txndata?.txn_type == "Credit" && data?.txndata?.txn_for == "received" && data?.txndata?.identifier == "CurrencyTransaction") &&
                                    <div className="nk-content ">
                                        <div className="nk-content-inner">
                                            <div className="nk-content-body" style={{
                                                border: "1px solid silver",
                                                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                cursor: "pointer"
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.01)";
                                                    e.currentTarget.style.boxShadow = "0 12px 18px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)";
                                                }}>
                                                <div className="nk-block">
                                                    <div className="card">
                                                        <div className="card-aside-wrap">
                                                            <div className="card-content">
                                                                <div className="card-inner">
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head">
                                                                            <h5 className="title"> Moved ( {data?.sender?.currencywallets[0]?.currency.short_name} ) To ( {data?.receiver?.currencywallets[0]?.currency?.short_name} ) Currency  Transaction </h5>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Name </span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{sender?.first_name} {sender?.last_name}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Email</span>
                                                                                    <span className="profile-ud-value">{sender?.email}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Mobile Number</span>
                                                                                    <span className="profile-ud-value">{sender?.phone}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Customer Image</span>
                                                                                    <span className="profile-ud-value"><Image src={sender?.avatar} height={50} width={70} /> </span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Order Details</h6>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Id</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.txn_id}</span>
                                                                                </div>
                                                                            </div>



                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Debit Amount </span>
                                                                                    <span className="profile-ud-value"> {data?.sender?.currencywallets[0]?.currency.symbol} {data?.txndata?.amount_before_txncharge}</span>
                                                                                </div>
                                                                            </div>


                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">
                                                                                        Credit Amount </span>
                                                                                    <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge %</span>
                                                                                    <span className="profile-ud-value"> {data?.txndata?.txn_charge_percent}%</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">TXN Charge Amt </span>
                                                                                    <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.txn_charge_amount}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Closing Balance</span>
                                                                                    <span className="profile-ud-value">
                                                                                        {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.txndata?.closing_balance}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Current Balance</span>
                                                                                    <span className="profile-ud-value">
                                                                                        {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.reciever_wallet_current_balance}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Method</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.payment_method}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Debit From</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>
                                                                                        ( {data?.sender?.currencywallets[0]?.currency.short_name} ) wallet</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Received To</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>( {data?.receiver?.currencywallets[0]?.currency?.short_name} ) Wallet</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ color: 'black' }}></hr>
                                                                    <div className="nk-block">
                                                                        <div className="nk-block-head nk-block-head-line">
                                                                            <h6 className="title overline-title text-base">Additional Details</h6>
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Name</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.currencywallet?.currency?.title
                                                                                    }</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Symbol</span>
                                                                                    <span className="profile-ud-value">{data?.txndata?.currencywallet?.currency?.symbol}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Currency Icon</span>
                                                                                <span className="profile-ud-value"><Image src={data?.currency_icon} height={50} width={70} /></span>
                                                                            </div>
                                                                        </div> */}
                                                                        </div>
                                                                        <div className="profile-ud-list">
                                                                            {/* <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Currency</span>
                                                                                <span className="profile-ud-value">{data?.currency}</span>

                                                                            </div>
                                                                        </div> */}
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction Time</span>
                                                                                    <span className="profile-ud-value">{timeZones}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Transaction</span>
                                                                                    <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.txndata?.title}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Received To</span>
                                                                                <span className="profile-ud-value">( {data?.receiver?.currencywallets[0]?.currency?.short_name} ) Wallet</span>
                                                                            </div>
                                                                        </div> */}
                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Payment Status</span>
                                                                                    {data?.txndata?.payment_status == "failed" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span>}
                                                                                    {data?.txndata?.payment_status == "success" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Success</span></span>}
                                                                                    {data?.txndata?.payment_status == "pending" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-warning">Pending</span></span>}
                                                                                </div>
                                                                            </div>

                                                                            <div className="profile-ud-item">
                                                                                <div className="profile-ud wider">
                                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                                    <span className="profile-ud-value"><Image src={data?.txndata?.currencywallet?.currency?.icon} height={40} width={70} /></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default SingleCurrencyTran
