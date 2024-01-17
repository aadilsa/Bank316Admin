import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { insideRecipientData, outesideRecipientData } from '../../API/RecipientsAPi/Recipients'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

export const OutsideRecipient = () => {
    const [data, setdata] = useState([])
    const [search, setsearch] = useState("")
    const [count, setcount] = useState(0)
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const [loader, setloader] = useState(true)
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const token = localStorage.getItem("logintoken")
    const navigate = useNavigate()
    const location = useLocation();



    const GetoutesideRecipientData = async () => {
        try {
            const totaldata = await outesideRecipientData(token, location.state, sortedBy, orderBy, search, pageNumber)
            console.log(totaldata.data.rows, "daatatta")
            if (totaldata?.status == true) {
                setTotalSize(0)
                setTimeout(() => {
                    setloader(false)
                    setExample(true)
                    setdata(totaldata?.data?.rows)
                    setcount(totaldata?.data?.count)
                    const Count = totaldata?.data.count
                    setTotalSize(Count / entries)

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
            console.log(err, "errrrrrrr")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }
    setTimeout(() => {
        setscroll(true)
    }, 2000);


    useEffect(() => {
        GetoutesideRecipientData()
    }, [sortedBy, orderBy, search, pageNumber])


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
        // const Comments = await fecthComments(CurrentPage);
        // setGetdata(Comments)
    };

    const OutesideTxn = (id) => {
        // console.log(id, "iddddddddd send")
        {
            navigate("/outside-transactions", { state: id })
            // (get_single_client == true || profile?.user_type == "SUPERADMIN")   && 
            // navigate(`/user-details`, { state: id })
        }

    }
    return (
        <>
            <Container>
                <div className="nk-content ">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h5>Recipients ( Bank Accounts )</h5>
                                            <div className="nk-block-des text-soft">
                                                <p>You have total <span className='fw-bold'>({count})</span> Bank Accounts.</p>
                                            </div>
                                        </div>{/* .nk-block-head-content */}
                                        <div className="nk-block-head-content">
                                            <div className="toggle-wrap nk-block-tools-toggle">
                                                <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v" /></a>
                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                    <ul className="nk-block-tools g-3">
                                                        <li>
                                                            {/* <span className="form-control-wrap">Select date</span> */}
                                                            {/* <div className="form-control-wrap">
                                                            <input type="date" className="form-control" onChange={(e) => { setdate(e.target.value); setPagenumber(1) }} />
                                                        </div> */}

                                                        </li>

                                                        <li>

                                                            <div className="form-control-wrap">
                                                                <div className="form-icon form-icon-right">
                                                                    <em className="icon ni ni-search" />
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Quick search by Name" onChange={(e) => { setsearch(e.target.value); setPagenumber(1) }} />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="nk-block-head-content" onClick={() => { navigate(-1) }}>
                                                                <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                                                <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></a>
                                                            </div>

                                                        </li>

                                                        <li className="nk-block-tools-opt">
                                                            <a className="btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus" /></a>
                                                            <li>
                                                                {/* <a
                                                                href={BaseUrl + `clients/all/custom-wallet-transactions/export`}
                                                                className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a> */}
                                                            </li>

                                                            {/* <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a> */}
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
                                            <div className="nk-tb-col fw-bold"><span>Name  {sortedBy == "account_holder_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("account_holder_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("account_holder_name") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm  fw-bold"><span>Currency  {sortedBy == "other_currency" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("other_currency") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("other_currency") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm fw-bold">Acc No.<span> {sortedBy == "account_number" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("account_number") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("account_number") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm fw-bold">Sort Code<span> {sortedBy == "sort_code" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("sort_code") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("sort_code") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm fw-bold">iban No.<span> {sortedBy == "iban_number" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("iban_number") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("iban_number") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm fw-bold">Swift Code<span> {sortedBy == "swift_code" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("swift_code") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("swift_code") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm fw-bold">IFSC Code<span> {sortedBy == "ifsc_code" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("ifsc_code") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("ifsc_code") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm fw-bold">UPI ID<span> {sortedBy == "upi_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("upi_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("upi_id") }} />}</span></div>
                                            <div className="nk-tb-col tb-col-sm fw-bold"><span> Created At {sortedBy == "created_at" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("created_at") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("created_at") }} />}</span></div>
                                            <div className="nk-tb-col nk-tb-col-tools">
                                                <ul className="nk-tb-actions gx-1 my-n1">
                                                    <li>
                                                        <div className="drodown fw-bold">
                                                            Action
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {
                                            loader == true ?
                                                <div className="nk-tb-item">
                                                    {/* <div className="nk-tb-col"></div> */}
                                                    <div className="nk-tb-col"></div>
                                                    <div className="nk-tb-col"></div>
                                                    <div className="nk-tb-col"></div>
                                                    <div className="nk-tb-col"></div>
                                                    <div className="nk-tb-col">{<Loader />}</div>
                                                    <div className="nk-tb-col"></div>
                                                    <div className="nk-tb-col"></div>
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
                                                            <div className="nk-tb-col">
                                                            </div>
                                                            <div className="nk-tb-col">
                                                            </div>
                                                            <div className="nk-tb-col">
                                                            </div>
                                                            <div className="nk-tb-col"> <h6>No Recipients  Available</h6></div>
                                                            <div className="nk-tb-col"> </div>
                                                            <div className="nk-tb-col"></div>
                                                            <div className="nk-tb-col"></div>
                                                            <div className="nk-tb-col"></div>
                                                            <div className="nk-tb-col"></div>

                                                        </div>
                                                    }

                                                    {
                                                        data.length > 0 && data.map((data) => {
                                                            console.log(data, "data")
                                                            var stillUtcs = moment.utc(data.created_at).toDate();
                                                            var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                                            return (
                                                                <>
                                                                    <div className="nk-tb-item">
                                                                        <div className="nk-tb-col">
                                                                            <div class="user-card">
                                                                                <div class="user-info" style={{ cursor: "pointer" }}
                                                                                // onClick={() => Custmerdetails(data?.other_client_id)}
                                                                                >
                                                                                    <span class="tb-lead" style={{ textTransform: "capitalize" }}>{data?.account_holder_name} <span class="dot dot-success d-md-none ms-1"></span></span>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.other_currency == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {data?.other_currency}</span>
                                                                            }
                                                                        </div>

                                                                        {/* <div className="nk-tb-col tb-col-sm">
                                                                            <span className="tb-sub "> <span>{data?.account_number}</span> </span><br></br>
                                                                        </div> */}

                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.account_number == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {data?.account_number}</span>
                                                                            }
                                                                        </div>

                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.sort_code == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {data?.sort_code}</span>
                                                                            }
                                                                        </div>

                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.iban_number == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {data?.iban_number}</span>
                                                                            }
                                                                        </div>


                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.swift_code == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {data?.swift_code}</span>
                                                                            }
                                                                        </div>


                                                                        {/* <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.swift_code == null ? <span className="tb-sub">N/A</span> : <span className="tb-sub" style={{ textTransform: "capitalize" }}> {data?.swift_code}</span>
                                                                            }
                                                                        </div> */}

                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.ifsc_code == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {data.ifsc_code}</span>
                                                                            }
                                                                        </div>

                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.upi_id == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {data.upi_id}</span>
                                                                            }
                                                                        </div>


                                                                        <div className="nk-tb-col tb-col-sm">
                                                                            {
                                                                                data?.created_at == null ? <span className="tb-sub">N/A</span> : <span className="tb-lead" style={{ textTransform: "capitalize" }}> {timeZones}</span>
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
                                                                                                    onClick={() => OutesideTxn(data?.id)}
                                                                                                    //client idddddd
                                                                                                    // onClick={() => Custmerdetails(data?.other_client_id)}
                                                                                                    style={{ cursor: "pointer" }} ><a ><em className="icon ni ni-eye" /><span>View Transactions</span></a></li>
                                                                                                {/* <li><a ><em className="icon ni ni-truck" /><span>Mark as Delivered</span></a></li>
                                                                           <li><a ><em className="icon ni ni-money" /><span>Mark as Paid</span></a></li>
                                                                           <li><a ><em className="icon ni ni-report-profit" /><span>Send Invoice</span></a></li> */}
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
            </Container>
        </>
    )
}
