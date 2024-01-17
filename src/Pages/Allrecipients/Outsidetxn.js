import React from 'react'
import Container from '../../component/container'
import { Image } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
const Outsidetxn = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const data = location.state
    console.log(data, "LOOOOOOCCCCTTTTTTIIIIOOONNN")

    const Back = () => {
        navigate(-1)
    }


    var stillUtcs = moment.utc(data?.created_at).toDate();
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
                                    <div className="nk-block-head-content"
                                        onClick={Back}>
                                        <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                        <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></a>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            {
                                // (data?.txndata?.txn_type == "Credit" && data?.txndata?.txn_for == "received" && data?.txndata?.identifier == "InternationalTransaction") &&
                                <div classname="nk-block">
                                    <div className="nk-block">
                                        <div className="row g-gs">
                                            <div className="col-md-6 col-xxl-3">
                                                <div className="card card-bordered pricing">
                                                    <div className="pricing-head">
                                                        <div className="pricing-title">
                                                            <h4 className="card-title title">Sender</h4>
                                                            <p className="sub-text">Details of the sender.</p>
                                                        </div>
                                                        {/* <div className="card-text">
                                                            <div className="row"> */}
                                                        {/* <div className="col-6"> */}
                                                        {/* <span className="h4 fw-500"> {sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.amount_before_txncharge}</span> */}
                                                        {/* <span className="sub-text">Debit Amount</span> */}
                                                        {/* </div> */}
                                                        {/* <div className="col-6"> */}
                                                        {/* <Image src={sender?.avatar} height={50} style={{ borderRadius: '20%' }} /> */}
                                                        {/* </div> */}
                                                        {/* </div>
                                                        </div> */}
                                                    </div>
                                                    <div className="pricing-body">
                                                        <ul className="pricing-features">
                                                            <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{data?.client?.first_name}</span></li>
                                                            <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{data?.client?.last_name}</span></li>
                                                            <li><span className="w-50">Email</span> - <span className="ms-auto">{data?.client?.email}</span></li>
                                                            <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">+{data?.client?.phone_code} {data?.client?.phone}</span></li>
                                                            <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.base_currency}</span></li>
                                                            <li><span className="w-50">Debit Amount</span> - <span className="ms-auto">{data?.base_amount} {data?.base_currency}</span></li>
                                                            <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-danger"><div className="tb-status badge rounded-pill bg-danger">Debit</div></span></li>
                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{sender?.currencywallets[0]?.currency?.title} </span></li>
                                            <li><span className="w-50">Currency Icon</span> - <span className="ms-auto"><Image src={sender?.currencywallets[0]?.currency?.icon} height={40} width={70} style={{ borderRadius: '10%' }} /></span></li> */}
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
                                                        {/* <div className="card-text">
                                                            <div className="row">
                                                                <div className="col-6"> */}
                                                        {/* <span className="h4 fw-500">{Recipient?.currencywallets[0]?.currency?.symbol} {data?.txndata?.other_amount}</span> */}
                                                        {/* <span className="sub-text">credit Amount</span> */}
                                                        {/* </div> */}
                                                        {/* <div className="col-6" > */}
                                                        {/* <Image src={Recipient?.avatar} height={50} style={{ borderRadius: '20%' }} /> */}

                                                        {/* </div>
                                                            </div> */}
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="pricing-body">
                                                        <ul className="pricing-features">
                                                            <li><span className="w-50">First Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}>{data?.recipients_outside316?.account_holder_name}</span></li>
                                                            {/* <li><span className="w-50">Last Name</span> - <span className="ms-auto" style={{ textTransform: "capitalize" }}> {Recipient?.last_name}</span></li> */}
                                                            {/* <li><span className="w-50">Email</span> - <span className="ms-auto">{data?.recipients_outside316?.email}</span></li> */}
                                                            {/* <li><span className="w-50">Mobile Number</span> - <span className="ms-auto">m</span></li> */}

                                                            <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.other_currency}</span></li>
                                                            {
                                                                data?.recipients_outside316?.account_number != null && <li><span className="w-50">Account Number</span> - <span className="ms-auto">{data?.recipients_outside316?.account_number}</span></li>
                                                            }
                                                            {
                                                                data?.recipients_outside316?.sort_code != null && <li><span className="w-50">Sort Code</span> - <span className="ms-auto">{data?.recipients_outside316?.sort_code}</span></li>
                                                            }
                                                            {
                                                                data?.recipients_outside316?.iban_number != null && <li><span className="w-50">IBAN No.</span> - <span className="ms-auto">{data?.recipients_outside316?.iban_number}</span></li>
                                                            }
                                                            {
                                                                data?.recipients_outside316?.swift_code != null && <li><span className="w-50">Swift Code</span> - <span className="ms-auto">{data?.recipients_outside316?.swift_code}</span></li>
                                                            }

                                                            {
                                                                data?.recipients_outside316?.ifsc_code != null && <li><span className="w-50">IFSC Code</span> - <span className="ms-auto">{data?.recipients_outside316?.ifsc_code}</span></li>
                                                            }

                                                            {
                                                                data?.recipients_outside316?.upi_id != null && <li><span className="w-50">UPI ID</span> - <span className="ms-auto">{data?.recipients_outside316?.upi_id}</span></li>
                                                            }

                                                            <li><span className="w-50">Credit Amount</span> - <span className="ms-auto">{data?.transfer_amount} {data?.other_currency}</span></li>

                                                            <li><span className="w-50">Transaction Type</span> - <span className="ms-auto tb-status badge rounded-pill bg-primary">
                                                                <div className="tb-status badge rounded-pill bg-primary">Credit</div></span></li>
                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{data?.currency}</span></li> */}
                                                            {/* <li><span className="w-50">Currency</span> - <span className="ms-auto">{Recipient?.currencywallets[0]?.currency?.title}</span></li>
                                            <li><span className="w-50">Currency Icon</span> - <span className="ms-auto">{
                                                data.currency_icon == "null" ?
                                                    <Image src="./images/minilogo.png" height={40} width={70} style={{ borderRadius: '10%' }} /> : <Image src={Recipient?.currencywallets[0]?.currency?.icon} height={40} width={70} style={{ borderRadius: '10%' }} />}</span></li> */}

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
                                                                                            <span className="profile-ud-value">{data?.txn_id}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Closing Balance</span> */}
                                                                                    {/* <span className="profile-ud-value">{sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.closing_balance}</span> */}
                                                                                    {/* </div>
                                                                                    </div> */}
                                                                                    {/* <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Current Balance</span> */}
                                                                                    {/* <span className="profile-ud-value">{sender?.currencywallets[0]?.currency?.symbol} {data?.sender_wallet_current_balance}</span> */}
                                                                                    {/* </div>
                                                                                    </div> */}
                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Transaction Charge %</span>
                                                                                            <span className="profile-ud-value">
                                                                                                {/* {data?.txndata?.txn_charge_percent} % */}0 %
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">TXN Charge Amount</span>
                                                                                            <span className="profile-ud-value">
                                                                                                {/* {sender?.currencywallets[0]?.currency?.symbol} {data?.txndata?.txn_charge_amount}  */}0 {data?.base_currency}
                                                                                            </span>
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
                                                                                            <span className="profile-ud-label">Transaction Type</span>
                                                                                            {
                                                                                                data?.base_currency == data?.other_currency ? <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>Local transaction</span> : <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>International Transaction </span>
                                                                                            }

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
                                                                                            {data?.payment_status == "failed" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span>}
                                                                                            {data?.payment_status == "success" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Sucess</span></span>}
                                                                                            {data?.payment_status == "pending" && <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-warning">Pending</span></span>}
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

export default Outsidetxn;
