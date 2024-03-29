import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SingleCustomTransaction } from '../../API/UserApi/CustomTransactionApi'
import { Image } from 'antd'
import moment from 'moment'
import Container from '../../component/container'
export const SingleCustomTran = () => {

    const [data, setdata] = useState()
    const location = useLocation();
    const token = localStorage.getItem("logintoken")
    const navigate = useNavigate();

    const GetSingleCustomtransction = async () => {
        try {
            const totaldata = await SingleCustomTransaction(token, location.state)
            console.log(totaldata?.data, "daatattadsddddddd")
            if (totaldata?.status == true) {
                setdata(totaldata?.data)
                var sender = data.sender
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetSingleCustomtransction()
    }, [])

    const goback = () => {
        navigate(-1)
    }
    var stillUtcs = moment.utc(data?.txndata?.created_at).toDate();
    var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
    console.log(data?.txndata?.txn_type, "llllllllllllll")
    console.log(data?.txndata?.txn_type, "llllllllllllll")

    return (
        <>
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
                                        <div className="nk-block-head-content" onClick={goback} >
                                            <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" onClick={goback} /><span>Back</span></a>
                                            <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none" ><em className="icon ni ni-arrow-left" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div>

                                    {(data?.txndata?.txn_type == "Debit" && data?.txndata?.txn_for == "transfer") &&
                                        <div className="nk-content ">
                                            <div className="nk-content-inner">
                                                <div className="nk-content-body">
                                                    <div style={{
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
                                                                        <div className="card-inner" >
                                                                            <div className="nk-block" >
                                                                                <div className="nk-block-head">
                                                                                    <h5 className="title">Custom Wallet Debit Transaction </h5>
                                                                                </div>
                                                                                <div className="profile-ud-list">
                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Name </span>
                                                                                            <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.sender?.first_name} {data?.sender?.last_name}</span>
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
                                                                                            <span className="profile-ud-value">{data?.sender?.email}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Mobile Number</span>
                                                                                            <span className="profile-ud-value">{data?.sender?.phone}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Customer Image</span>
                                                                                            <span className="profile-ud-value"><Image src={data?.sender?.avatar} height={50} width={70} /> </span>
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
                                                                                            <span className="profile-ud-value"> {data?.sender?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.txndata?.amount}</span>
                                                                                        </div>
                                                                                    </div>



                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Closing Balance</span>
                                                                                            <span className="profile-ud-value"> {data?.sender?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.txndata?.closing_balance}</span>


                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">
                                                                                                Wallet Current
                                                                                                Balance</span>
                                                                                            <span className="profile-ud-value"> {data?.sender?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.sender_wallet_current_balance}</span>
                                                                                        </div>
                                                                                    </div>



                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Debit From</span>
                                                                                            <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.sender?.customwallets[0]?.name} Wallet</span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Debit To</span>
                                                                                            <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>({data?.receiver?.currencywallets[0]?.currency?.short_name}) Wallet</span>
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
                                                                                            <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.sender?.customwallets[0]?.currencywallet?.currency?.title
                                                                                            }</span>

                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Currency Symbol</span>
                                                                                            <span className="profile-ud-value">{data?.sender?.customwallets[0]?.currencywallet?.currency?.symbol}</span>
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
                                                                                            {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Success</span></span>}
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-ud-item">
                                                                                        <div className="profile-ud wider">
                                                                                            <span className="profile-ud-label">Currency Icon</span>
                                                                                            <span className="profile-ud-value"><Image src={data?.sender?.customwallets[0]?.currencywallet?.currency?.icon} height={50} width={70} /></span>
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


                                    {(data?.txndata?.txn_type == "Credit" && data?.txndata?.txn_for == "add") &&
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
                                                                                <h5 className="title">Custom Wallet Credit Transaction </h5>
                                                                            </div>
                                                                            <div className="profile-ud-list">
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Name </span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.receiver?.first_name} {data?.receiver?.last_name}</span>
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
                                                                                        <span className="profile-ud-value">{data?.receiver?.email}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Mobile Number</span>
                                                                                        <span className="profile-ud-value">{data?.receiver?.phone}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Customer Image</span>
                                                                                        <span className="profile-ud-value"><Image src={data?.receiver?.avatar} height={50} width={70} /> </span>
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
                                                                                            Credit Amount </span>
                                                                                        <span className="profile-ud-value"> {data?.receiver?.customwallets[0]?.currencywallet?.currency?.symbol}{data?.txndata?.amount}</span>
                                                                                    </div>
                                                                                </div>




                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Closing Balance</span>
                                                                                        <span className="profile-ud-value">{data?.receiver?.customwallets[0]?.currencywallet?.currency?.symbol}{data?.txndata?.closing_balance}</span>


                                                                                    </div>
                                                                                </div>

                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">
                                                                                            Wallet Current Balance</span>
                                                                                        <span className="profile-ud-value"> {data?.receiver?.customwallets[0]?.currencywallet?.currency?.symbol} {data?.reciever_wallet_current_balance}</span>
                                                                                    </div>
                                                                                </div>


                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Received To</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.receiver?.customwallets[0]?.name} Wallet</span>
                                                                                    </div>
                                                                                </div>


                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Received From</span>
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


                                                                                {/* <div className="profile-ud-item">
                                                                <div className="profile-ud wider">
                                                                    <span className="profile-ud-label">Currency Symbol</span>
                                                                    <span className="profile-ud-value">{data?.sender?.customwallets[0]?.currencywallet?.currency?.symbol}</span>
                                                                </div>
                                                            </div> */}

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
                                                                                        <span className="profile-ud-label" >Currency Name</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.sender?.currencywallets[0]?.currency?.title
                                                                                        }</span>
                                                                                    </div>
                                                                                </div>


                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label" >Currency Symbol</span>
                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}>{data?.receiver?.customwallets[0]?.currencywallet?.currency?.symbol
                                                                                        }</span>

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


                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label">Payment Status</span>
                                                                                        {data?.txndata?.payment_status == "failed" ? <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-danger">Failed</span></span> : <span className="profile-ud-value"><span className="tb-status badge rounded-pill bg-success">Success</span></span>}
                                                                                    </div>
                                                                                </div>


                                                                                <div className="profile-ud-item">
                                                                                    <div className="profile-ud wider">
                                                                                        <span className="profile-ud-label" >Currency Icon</span>

                                                                                        <span className="profile-ud-value" style={{ textTransform: "capitalize" }}><Image src={data?.receiver?.customwallets[0]?.currencywallet?.currency?.icon
                                                                                        } height={40} width={60} /></span>

                                                                                    </div>
                                                                                </div>

                                                                                {/* <div className="profile-ud-item">
                                                                <div className="profile-ud wider">
                                                                    <span className="profile-ud-label">Currency Icon</span>
                                                                    <span className="profile-ud-value"><Image src={data?.sender?.customwallets[0]?.currencywallet?.currency?.icon} height={50} width={70} /></span>
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
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
