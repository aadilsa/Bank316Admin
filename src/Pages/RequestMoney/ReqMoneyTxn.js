import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { RequestMoneyTxnData } from '../../API/RequestMoneypi/ReqMoneyApi'
import { useLocation, } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useSelection from 'antd/es/table/hooks/useSelection'
import { Image } from 'antd'
import moment from 'moment'
const ReqMoneyTxn = () => {
    const location = useLocation();
    const [data, setdata] = useState()

    const navigate = useNavigate();
    // console.log(location, "locatatatatataatatatatatiiiiooonnnonn")


    const sender = data?.sender
    const Recipient = data?.receiver


    const ReqMoneyTxndata = async () => {
        try {
            const totaldata = await RequestMoneyTxnData(location?.state?.token, location?.state?.id)
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
        ReqMoneyTxndata()
    }, [])



    const Back = () => {
        navigate(-1)
    }


    console.log(data?.sender?.currencywallets[0]?.currency.symbol, "data")
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
                            {
                                (data?.transaction?.txn_type == "Credit" && data?.transaction?.txn_for == "add" && data?.transaction?.identifier == "CurrencyTransaction") &&
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
                                                                                <span className="profile-ud-label">Transaction Id</span>
                                                                                <span className="profile-ud-value">{data?.transaction?.txn_id}</span>


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
                                                                                <span className="profile-ud-label">Payment Status</span>
                                                                                {data?.transaction?.payment_status == "failed" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span>}
                                                                                {data?.transaction?.payment_status == "success" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Success</span></span>}
                                                                                {data?.transaction?.payment_status == "pending" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-warning">Pending</span></span>}
                                                                            </div>
                                                                        </div>



                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">
                                                                                    Debit Amount </span>
                                                                                <span className="profile-ud-value"> {data?.sender?.currencywallets[0]?.currency.symbol} {data?.transaction?.amount_before_txncharge}</span>
                                                                            </div>
                                                                        </div>


                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">
                                                                                    Credit Amount </span>
                                                                                <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.transaction?.amount}</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">TXN Charge %</span>
                                                                                <span className="profile-ud-value"> {data?.transaction?.txn_charge_percent}%</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">TXN Charge Amt </span>
                                                                                <span className="profile-ud-value"> {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.transaction?.txn_charge_amount}</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Closing Balance</span>
                                                                                <span className="profile-ud-value">
                                                                                    {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.transaction?.closing_balance}</span>
                                                                            </div>
                                                                        </div> */}

                                                                        {/* 
                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Current Balance</span>
                                                                                <span className="profile-ud-value">
                                                                                    {data?.receiver?.currencywallets[0]?.currency?.symbol} {data?.reciever_wallet_current_balance}</span>
                                                                            </div>
                                                                        </div> */}

                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Payment Method</span>
                                                                                <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.transaction?.payment_method}</span>
                                                                            </div>
                                                                        </div>



                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Debit From</span>
                                                                                <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>
                                                                                    {data?.transaction?.payment_method}</span>
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
                                                                                <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.receiver?.currencywallets[0]?.currency?.title
                                                                                }</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Currency Symbol</span>
                                                                                <span className="profile-ud-value">{data?.receiver?.currencywallets[0]?.currency?.symbol}</span>
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
                                                                                <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.transaction?.title}</span>
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
                                                                                <span className="profile-ud-label">Customer Image</span>
                                                                                <span className="profile-ud-value"><Image src={sender?.avatar} height={50} width={70} /> </span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="profile-ud-item">
                                                                            <div className="profile-ud wider">
                                                                                <span className="profile-ud-label">Currency Icon</span>
                                                                                <span className="profile-ud-value"><Image src={data?.receiver?.currencywallets[0]?.currency?.icon} height={40} width={70} /></span>
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
                                (data?.transaction?.txn_type == "Debit" && data?.transaction?.txn_for == "transfer" && data?.transaction?.identifier == "Send Flow") && <div classname="nk-block">
                                    <div className="nk-block">
                                        <div className="row g-gs">
                                            <div className="col-md-6 col-xxl-3">
                                                <div className="card card-bordered pricing">
                                                    <div className="pricing-head">
                                                        <div className="pricing-title">
                                                            <h4 className="card-title title">Sender</h4>
                                                            <p className="sub-text">Details of the sender.</p>
                                                        </div>

                                                    </div>
                                                    <div className="pricing-body">
                                                        <ul className="pricing-features">
                                                            <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.first_name}</span></li>
                                                            <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.last_name}</span></li>
                                                            <li><span className="w-50">Email</span> - <span className="ms-auto">{sender?.email}</span></li>
                                                            <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">{sender?.phone}</span></li>
                                                            <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-danger"><div className="tb-status badge rounded-pill bg-danger">Debit</div></span></li>
                                                            <li><span className="w-50">Debit Amount</span> - <span className="ms-auto">{data?.sender?.currencywallets[0]?.currency.symbol} {data?.transaction?.amount_before_txncharge} </span></li>
                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.currencywallets[0]?.currency?.title} </span></li> */}
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

                                                    </div>
                                                    <div className="pricing-body">
                                                        <ul className="pricing-features">
                                                            <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{Recipient?.account_holder_name}</span></li>
                                                            {/* <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}> {Recipient?.last_name}</span></li> */}

                                                            {
                                                                Recipient.email != <li><span className="w-50">Email</span> - <span className="ms-auto">{Recipient?.email}</span></li>
                                                            }
                                                            {
                                                                Recipient.phone != <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">{Recipient?.phone}</span></li>

                                                            }


                                                            {Recipient.account_number != null ? <li><span className="w-50">Account Number</span> - <span className="ms-auto">{Recipient?.account_number}</span></li> : ''}

                                                            {Recipient.bank_name != null ? <li><span className="w-50">Bank Name</span> - <span className="ms-auto">{Recipient?.bank_name}</span></li> : ''}

                                                            {Recipient.sort_code != null ? <li><span className="w-50">Sort Code</span> - <span className="ms-auto">{Recipient?.sort_code}</span></li> : ''}

                                                            {Recipient.iban_number != null ? <li><span className="w-50">IBAN Number</span> - <span className="ms-auto">{Recipient?.iban_number}</span></li> : ''}

                                                            {Recipient.swift_code != null ? <li><span className="w-50">Swift Code</span> - <span className="ms-auto">{Recipient?.swift_code}</span></li> : ''}

                                                            {Recipient.ifsc_code != null ? <li><span className="w-50">IFSC Code</span> - <span className="ms-auto">{Recipient?.ifsc_code}</span></li> : ''}

                                                            {Recipient.upi_id != null ? <li><span className="w-50">UPI ID</span> - <span className="ms-auto">{Recipient?.upi_id}</span></li> : ''}


                                                            {Recipient.payee_id != null ? <li><span className="w-50">Payee ID</span> - <span className="ms-auto">{Recipient?.payee_id}</span></li> : ''}


                                                            <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-primary">
                                                                <div className="tb-status badge rounded-pill bg-primary">Credit</div></span></li>
                                                            {
                                                                <li><span className="w-50">Credit Amount</span> - <span className="ms-auto">{data?.transaction?.amount_before_txncharge} {data?.other_currency}</span></li>

                                                            }

                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{Recipient?.currencywallets[0]?.currency?.title}</span></li> */}
                                                            {/* <li><span className="w-50">Currency Icon</span> - <span className="ms-auto">{
                                                                data.currency_icon == "null" ?
                                                                    <Image src="./images/minilogo.png" height={40} width={70} style={{ borderRadius: '10%' }} /> : <Image src={Recipient?.currencywallets[0]?.currency?.icon} height={40} width={70} style={{ borderRadius: '10%' }} />}</span></li> */}
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
                                                                                            <span className="profile-ud-value">{data?.transaction?.txn_id}</span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Transaction Charge %</span>
                                                                                            <span className="profile-ud-value">{data?.transaction?.txn_charge_percent} %</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">TXN Charge Amount</span>
                                                                                            <span className="profile-ud-value"> {sender?.currencywallets[0]?.currency?.symbol} {data?.transaction?.txn_charge_amount} </span>
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
                                                                                            <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.transaction?.title}</span>
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
                                                                                            {data?.transaction?.payment_status == "pending" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-warning">pending</span></span>}
                                                                                            {data?.transaction?.payment_status == "failed" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span>}
                                                                                            {data?.transaction?.payment_status == "success" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Success</span></span>}
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
                                (data?.transaction?.txn_type == "Debit" && data?.transaction?.txn_for == "transfer" && data?.transaction?.identifier == "Request Flow") && <div classname="nk-block">
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
                                                                    <span className="h4 fw-500"> {sender?.currencywallets[0]?.currency?.symbol} {data?.transaction?.amount_before_txncharge}</span>
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
                                                                    <span className="h4 fw-500">{Recipient?.currencywallets[0]?.currency?.symbol} {data?.transaction?.other_amount}</span>
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
                                                                                            <span className="profile-ud-value">{data?.transaction?.txn_id}</span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Closing Balance</span>
                                                                                            <span className="profile-ud-value">{sender?.currencywallets[0]?.currency?.symbol} {data?.transaction?.closing_balance}</span>
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
                                                                                            <span className="profile-ud-value">{data?.transaction?.txn_charge_percent} %</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">TXN Charge Amount</span>
                                                                                            <span className="profile-ud-value"> {sender?.currencywallets[0]?.currency?.symbol} {data?.transaction?.txn_charge_amount} </span>
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
                                                                                            <span className="profile-ud-label">Transaction Method</span>
                                                                                            <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.transaction?.identifier}</span>
                                                                                        </div>
                                                                                    </div>


                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Transaction For</span>
                                                                                            <span className="profile-ud-value">{data?.transaction?.reason_name}</span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Transaction By</span>
                                                                                            <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.transaction?.title}</span>
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
                                                                                            {data?.transaction?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Sucess</span></span>}
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

                        </div>
                    </div>
                </div>
            </div>



        </Container >
    )
}

export default ReqMoneyTxn