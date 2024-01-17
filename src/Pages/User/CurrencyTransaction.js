import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from '../../component/container';
import ReactPaginate from 'react-paginate';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { currencytransaction } from '../../API/UserApi/currencyTransaction';
import { CurrencyTransaction } from '../../API/UserApi/CurrencyTransactionApi';
import Loader from '../Loader/Loader';
import BaseUrl from '../../API/config';
const Transaction = () => {
    const [data, setdata] = useState([])
    const [search, setsearch] = useState("")
    const [scroll, setscroll] = useState(false)
    const [sortedBy, setSortedBy] = useState("")
    const [orderBy, setOrderBy] = useState('desc')
    const [example, setExample] = useState(false)
    const [count, setcount] = useState()
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [id, setid] = useState()
    const [loader, setloader] = useState(true)
    const location = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem("logintoken")
    const userid = localStorage.getItem('UserID')

    // console.log(location.state, "ooooooooooooooo---------------------------")
    setTimeout(() => {
        setscroll(true)
    }, 3000);
    console.log(pageNumber, "pagenumber")

    const Back = () => {
        navigate(-1)
    }


    const copiedInfo = () => {
        toast.success(" Successful copy ", { autoClose: 1000 })
    }


    // const Previous = () => {
    //     window.history.go(-1);
    // }

    const sortChange = (col) => {
        if (col === sortedBy) {
            setSortedBy(col);
            orderBy === "asc" ? setOrderBy("desc") : setOrderBy("asc")
        } else {
            setSortedBy(col)
            setOrderBy("desc")
        }
    }


    console.log(location.state, "locatationnnnnnn idddd 344444")
    localStorage.setItem('CurrencyTrans', location.state)

    const currencyTransactiondata = async () => {
        try {
            const resp = await CurrencyTransaction(token, location.state, pageNumber, search, sortedBy, orderBy)
            console.log(resp, "reeeeee")
            console.log(resp.data.rows[0].id, "statusddddddddd")
            setid(resp.data.rows[0].id)
            if (resp.status == true) {
                setTimeout(() => {
                    setdata(resp.data?.rows)
                    setcount(resp.data?.count)
                    const Count = resp.data.count
                    console.log(Count, "cOUNTC")
                    setTotalSize(Count / entries)
                    setExample(true)
                    setloader(false)
                }, 2000);
                setloader(true)

            }
            else if (resp?.response?.data?.message == "jwt expired") {
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
            console.log(err, "errr")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }

    }

    useEffect(() => {
        currencyTransactiondata()
    }, [pageNumber, search, sortedBy, orderBy])

    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)

    };


    const GosingleTra = (id, client_id) => {
        const statadata = {
            id: id,
            client_id: client_id
        }
        navigate(`/transaction`, { state: statadata })
    }

    console.log(sortedBy, "soooooosssssosoosoo", orderBy)


    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Currency Transaction</h3>
                                        <div className="nk-block-des text-soft">
                                            <p>You have total {count == null ? (0) : count} Currency Transaction.</p>
                                        </div>
                                    </div>{/* .nk-block-head-content */}
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v" /></a>
                                            <div className="toggle-expand-content" data-content="pageMenu">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search" />
                                                            </div>
                                                            <input type="text" className="form-control" id="default-04" placeholder="Quick search by id" onChange={(e) => { setsearch(e.target.value) }} />
                                                        </div>
                                                    </li>
                                                    {/* <li>
                                                        <div className="drodown">
                                                            <a className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-bs-toggle="dropdown">Status</a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a ><span>On Hold</span></a></li>
                                                                    <li><a ><span>Delivered</span></a></li>
                                                                    <li><a ><span>Rejected</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li> */}
                                                    <li className="nk-block-tools-opt">
                                                        <a className="btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus" /></a>
                                                        <li><a href={BaseUrl + `client/admin/currencies/export?wuid=${location.state}`} className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>

                                                        {/* <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a> */}
                                                    </li>
                                                    <li>
                                                        <li onClick={Back}><a className="btn btn-white btn-outline-primary"><em className="icon ni ni-arrow-left" /><span>Back</span></a></li>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>{/* .nk-block-head-content */}
                                </div>{/* .nk-block-between */}
                            </div>{/* .nk-block-head */}
                            <div className="nk-block">
                                <div className="nk-tb-list is-separate is-medium mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        {/* <div className="nk-tb-col nk-tb-col-check">
                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                <input type="checkbox" className="custom-control-input" id="oid" />
                                                <label className="custom-control-label" htmlFor="oid" />
                                            </div>
                                        </div> */}
                                        <div className="nk-tb-col tb-col-md fw-bold"><span>Name (TXN By) {sortedBy == "name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("name") }} />}</span></div>
                                        <div className="nk-tb-col fw-bold"><span>TXN Info {sortedBy == "txn_type" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_type") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_type") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-sm fw-bold"><span> Amount {sortedBy == "amount" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} />}</span></div>
                                        <div className="nk-tb-col fw-bold" ><span className="d-none d-sm-block">Description {sortedBy == "title" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("title") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("title") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md fw-bold"><span>Status {sortedBy == "payment_status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_status") }} />}</span></div>

                                        <div className="nk-tb-col nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1 my-n1">
                                                <li>
                                                    <div className="drodown fw-bold">
                                                        Action
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>{/* .nk-tb-item */}


                                    {
                                        loader == true ?
                                            <div className="nk-tb-item">
                                                {/* <div className="nk-tb-col"></div> */}
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col">
                                                    <Loader />
                                                </div>
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col"></div>

                                            </div>
                                            :
                                            <>
                                                {
                                                    data.length == 0 &&
                                                    <div className="nk-tb-item">
                                                        {/* <div className="nk-tb-col"></div> */}
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col">
                                                            {scroll == false ? <Loader /> : <h6>No Currency Transaction Available</h6>}

                                                        </div>
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col"></div>

                                                    </div>

                                                }

                                                {
                                                    data.length > 0 && data.map((data) => {
                                                        console.log(data, "data")
                                                        return (
                                                            <>


                                                                <div className="nk-tb-item">
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        <div class="user-card"><div class="user-avatar bg-primary">
                                                                            {
                                                                                data?.txn_type == "Credit" && <span className="user-avatar bg-success-dim"><e className="icon ni ni-arrow-down-left">
                                                                                </e></span>
                                                                            }

                                                                            {
                                                                                data?.txn_type == "Debit" && <span className="user-avatar bg-danger-dim"><e className="icon ni ni-arrow-up-right">
                                                                                </e></span>
                                                                            }
                                                                        </div >
                                                                            <div class="user-info"
                                                                                onClick={Back}
                                                                                style={{ cursor: "pointer" }}
                                                                            >
                                                                                {/* <span class="tb-lead">{data?.sender?.name} <span class="dot dot-success d-md-none ms-1"></span></span>
                                                                                <span>{data.sender?.phone}</span> */}
                                                                                {
                                                                                    data?.txn_type == "Debit" && <div class="user-info" style={{ cursor: "pointer", color: "primary" }}>
                                                                                        <span class="tb-lead" style={{ textTransform: "capitalize" }}>{data.sender?.name} <span class="dot dot-success d-md-none ms-1"></span></span>
                                                                                        <span>{data.sender?.phone}</span>
                                                                                    </div>
                                                                                }

                                                                                {
                                                                                    data?.txn_type == "Credit" && <div class="user-info" style={{ cursor: "pointer", color: "primary" }} >
                                                                                        <span class="tb-lead" style={{ textTransform: "capitalize" }}>{data.recipient?.name} <span class="dot dot-success d-md-none ms-1"></span></span>
                                                                                        <span>{data.recipient?.phone}</span>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="nk-tb-col" >
                                                                        <span className="tb-lead text-primary"><a ><span style={{ cursor: "pointer" }} onClick={() => { GosingleTra(data.id, data.client_id) }}>{data?.txn_id}</span>
                                                                            <CopyToClipboard text={data.txn_id} style={{ height: '25px', width: '25px', padding: 2 }}>
                                                                                <span className='btn btn-primary btn-sm ms-1' onClick={() => copiedInfo()}><e className="fa fa-copy fa fa-solid text-white" style={{ fontSize: '17px' }}></e></span>
                                                                            </CopyToClipboard>
                                                                            <br></br>
                                                                            {
                                                                                data?.txn_type == "Credit" ? <span className="badge badge-dot  bg-success">CREDIT</span> :
                                                                                    <span className="badge badge-dot bg-danger">DEBIT</span>
                                                                            }<br></br>
                                                                        </a></span>
                                                                    </div>

                                                                    <div className="nk-tb-col tb-col-sm">
                                                                        <span className="tb-sub text-black"> <span>{data.currency_symbol}</span>{data.amount} </span><br></br>
                                                                        {/* <span className="tb-sub">  wallet</span> */}

                                                                    </div>



                                                                    <div className="nk-tb-col tb-col-sm">
                                                                        {
                                                                            data?.title == null ? <span className="tb-sub">N/A</span> : <span className="tb-sub"> {data?.title}</span>
                                                                        }


                                                                    </div>



                                                                    <div className="nk-tb-col">
                                                                        {
                                                                            data?.payment_status == "pending" && <span className="badge badge-sm badge-dot has-bg bg-warning d-none d-sm-inline-flex">Pending</span>
                                                                        }
                                                                        {
                                                                            data?.payment_status == "success" && <span className="badge badge-sm badge-dot has-bg bg-success d-none d-sm-inline-flex">Success</span>
                                                                        }
                                                                        {
                                                                            data?.payment_status == "failed" && <span className="badge badge-sm badge-dot has-bg bg-danger d-none d-sm-inline-flex">Failed</span>
                                                                        }
                                                                    </div>


                                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                                        <ul className="nk-tb-actions gx-1">

                                                                            <li>
                                                                                <div className="drodown me-n1">
                                                                                    <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">
                                                                                            <li
                                                                                                onClick={() => { GosingleTra(data.id, data.client_id) }}
                                                                                                style={{ cursor: "pointer" }}>
                                                                                                <a ><em className="icon ni ni-eye" /><span>Transaction Details</span></a></li>

                                                                                            {/* <li><a ><em className="icon ni ni-trash" /><span>Remove Order</span></a></li> */}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div > {/* .nk-tb-item */}
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>

                                    }



                                </div>{/* .nk-tb-list */}
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
                                            </div>{/* .pagination-goto */}
                                        </div>{/* .nk-block-between */}
                                    </div>
                                </div>
                            </div>{/* .nk-block */}








                        </div>
                    </div>
                </div>
            </div>


        </Container >
    );
}

export default Transaction;
