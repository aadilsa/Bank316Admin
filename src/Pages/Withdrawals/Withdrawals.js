import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
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
import Swal from 'sweetalert2';
const AddSuccessToast = () => {
   toast.success('Status Change successfully.', { autoClose: 2000 });
}
const addErrorToast = (massage) => {
   toast.error(massage, {
      autoClose: 2000
   });
}
const Withdrawals = () => {
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
   const [comment, setcomment] = useState("")
   const [txn_id, settxn_id] = useState()
   const [modaldata, setmodaldata] = useState([])
   const navigate = useNavigate()
   const ref2 = useRef()
   const ref1 = useRef()
   const reqmoneystatus = (data) => {
      setid(data?.request_id)
      console.log(id, "dddddddddd")
   }
   console.log("PPPPPPPPP", reqmoneymsg)


   const WithdrawalsTxnData = async () => {
      try {
         const totaldata = await WithdrawalsTxn(token, recentTab, sortedBy, orderBy, search, pageNumber)
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
      WithdrawalsTxnData()
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

   const approvedcancell = () => {
      console.log("------------>>>>>>>>>>>>>>>>>")
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
            const response = await WithdrawalsApprove(token, id, datas)
            if (response?.status) {
               Swal.fire(
                  'Reject!',
                  ' Transaction has been successfully Rejected.',
                  'success'
               )
               ref2.current.click()
               WithdrawalsTxnData()
            } else {
               toast.error("something went wrong")
               ref2.current.click()
            }
         }
      })
   }



   const SuccessApproved = () => {
      Swal.fire({
         title: 'Procced Withdraw?',
         text: "Please confirm that you want to procced the request and send the payment.",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         cancelButtonText: "No",
         confirmButtonText: 'Yes, Cancel'
      }).then(async (result) => {
         // Check if the user clicked "Yes"
         if (result.value) {
            // const datas = {
            //    "is_request_money": cancelreq,
            //    "comment": comment
            // }
            const datas = JSON.stringify({
               "is_request_money": true,
               "comment": comment
            })
            const response = await WithdrawalsApprove(token, id, datas)
            if (response?.status) {
               Swal.fire(
                  'Approved!',
                  ' Transaction has been successfully Approved.',
                  'success'
               )
               ref1.current.click()
               WithdrawalsTxnData()
            } else {
               toast.error("something went wrong")
               ref1.current.click()
            }
         }
      })
   }
   console.log(modaldata, "modaldata")
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
                                 <h5>Withdrawals</h5>
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
                                                {/* 
                                       <div className="dropdown-menu dropdown-menu-end">
                                          <ul className="link-list-opt no-bdr">
                                             <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report" ><a ><span>Add Currency</span></a></li>
                                             <li><a ><span>Add Team</span></a></li>
                                             <li><a ><span>Import customer</span></a></li>
                                          </ul>
                                       </div>
                                       */}
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
                                 {/* 
                     <div className="card-title">
                        <h6 className="title"><span className="me-2"> Recent Transactions </span> <a href="#" className="link d-none d-sm-inline">See
                           History</a>
                        </h6>
                     </div>
                     */}
                                 <div className="card-tools">
                                    <ul className="card-tools-nav">
                                       <li className={search == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch(""); setTotalSize(0) }}><span >{search == "" ? <b>History</b> : <span>History</span>}</span></a></li>
                                       <li className={search == "Pending" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("Pending"); setTotalSize(0) }}><span>{search == "Pending" ? <b>
                                          Pending</b> : <span>
                                          Pending</span>}</span></a></li>
                                       {/* <li className={recentTab == "Oh - hold" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("Oh - hold")}><span>Oh - hold</span></a></li> */}
                                       <li className={search == "Success" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("Success"); setTotalSize(0) }}><span> {search == "Success" ? <b>
                                          Confirmed</b> : <span>
                                          Confirmed</span>}</span></a></li>
                                       <li className={search == "Failed" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setsearch("Failed"); setTotalSize(0) }}><span>{search == "Failed" ? <b>Rejected</b> : <span>Rejected</span>}</span></a></li>
                                       {/* <li className={recentTab == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("")}><span>All</span></a></li> */}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="nk-block">
                           <div className="nk-tb-list is-separate mb-3">
                              {/* 
                  <div className="nk-tb-item nk-tb-head">
                     <div className="nk-tb-col "><span className="sub-text fw-bold">Name{sortedBy == "first_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("first_name") }} />} </span></div>
                     <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">TXN ID{sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />} </span></div>
                     <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Amount{sortedBy == "amount" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("amount") }} />}</span></div>
                     <div className="nk-tb-col tb-col-md"><span className="sub-text fw-bold">Created At{sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span></div>
                     <div className="nk-tb-col tb-col-lg text-center"><span className="sub-text  fw-bold">Status{sortedBy == "status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("status") }} />}</span></div>
                     <div className="nk-tb-col  text-center"><span className="sub-text fw-bold">Action</span></div>
                  </div>
                  */}
                              <div className="nk-tb-item nk-tb-head">
                                 {/* 
                     <div className="nk-tb-col nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                           <input type="checkbox" className="custom-control-input" id="uid" />
                           <label className="custom-control-label" htmlFor="uid" />
                        </div>
                     </div>
                     */}
                                 <div className="nk-tb-col"><span className="sub-text">User {sortedBy == "recipient_name" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("recipient_name") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("recipient_name") }} />}</span></div>
                                 <div className="nk-tb-col tb-col-mb"><span className="sub-text">
                                    TXN ID {sortedBy == "txn_id" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("txn_id") }} />}</span></div>
                                 <div className="nk-tb-col tb-col-md"><span className="sub-text">Description  {sortedBy == 'title' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('title') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('title') }} />}</span></div>
                                 <div className="nk-tb-col tb-col-lg"><span className="sub-text">Amount {sortedBy == "base_amount" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("base_amount") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("base_amount") }} />}</span></div>
                                 <div className="nk-tb-col tb-col-lg"><span className="sub-text">Created At {sortedBy == 'created_at' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('created_at') }} />}</span>
                                 </div>
                                 <div className="nk-tb-col tb-col-md"><span className="sub-text">Status {sortedBy == "payment_status" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_status") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_status") }} />}</span></div>
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
                                             var stillUtcs = moment.utc(data?.transcation?.created_at).toDate();
                                             var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                             return (
                                                <>
                                                   <div className="nk-tb-item">
                                                      <div className="nk-tb-col">
                                                         <a >
                                                            <div className="user-card">
                                                               <div className="user-avatar bg-primary posRealative">
                                                                  <span className="user-avatar bg-warning-dim"><e className="icon ni ni-arrow-up-right">
                                                                  </e></span>
                                                                  <em class="icon ni ni-wallet-fill walletIconNew"></em>
                                                               </div>
                                                               <div className="user-info" style={{ cursor: "pointer", }} onClick={() => GoToUserDetail(data?.transcation?.client_id)}>
                                                                  <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data?.transcation?.recipient_name} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                  <span>{data?.client?.email}</span>
                                                               </div>
                                                            </div>
                                                         </a>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-mb">
                                                         <span className="tb-amount" onClick={() => { GoWithdrwal(data) }} style={{ cursor: "pointer" }}>{data?.transcation?.txn_id} <span className="dot dot-success d-md-none ms-1" /></span>
                                                         <span className=" tb-status  text-warning ">
                                                            <em class="icon ni ni-bullet-fill"></em>Withdraw
                                                         </span>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-md">
                                                         <span> {data?.transcation?.title}</span>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-lg">
                                                         <span>{data?.walletDetails?.currencyDetails?.symbol} {data?.transcation?.base_amount}</span>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-lg">
                                                         <span>{timeZones}</span>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-md">
                                                         {
                                                            data?.transcation?.payment_status == "pending" && <span className="tb-status text-warning">Pending</span>
                                                         }
                                                         {
                                                            data?.transcation?.payment_status == "success" && <span className="tb-status text-success">Completed</span>
                                                         }
                                                         {
                                                            data?.transcation?.payment_status == "failed" && <span className="tb-status text-danger">Rejected</span>
                                                         }
                                                      </div>
                                                      <div className="nk-tb-col nk-tb-col-tools" onClick={() => { reqmoneystatus(data); setmodaldata(data) }}>
                                                         <ul className="nk-tb-actions gx-1">
                                                            {
                                                               data?.transcation?.payment_status == "pending" && <>
                                                                  <li className="nk-tb-action-hidden" tooltip="Reject" flow="Top" onClick={() => { settxn_id(data?.transcation?.txn_id) }}>
                                                                     <a className="btn btn-trigger btn-icon">
                                                                        <em class="icon ni ni-cross-fill-c" data-bs-toggle="modal" data-bs-target="#modal-reject" ></em>
                                                                     </a>
                                                                  </li>
                                                                  <li className="nk-tb-action-hidden" tooltip="Confirm" flow="Top" >
                                                                     <a className="btn btn-trigger btn-icon">
                                                                        <em class="icon ni ni-check-fill-c" data-bs-toggle="modal" data-bs-target="#modal-report"></em>
                                                                     </a>
                                                                  </li>
                                                                  <li className="nk-tb-action-hidden" tooltip="Details" flow="Top">
                                                                     <a className="btn btn-trigger btn-icon">
                                                                        <em class="icon ni ni-eye-fill" onClick={() => { GoWithdrwal(data) }}></em>
                                                                     </a>
                                                                  </li>
                                                               </>
                                                            }
                                                            {
                                                               (data?.transcation?.payment_status == "failed" || data?.transcation?.payment_status == "success") && <>
                                                                  <li className="nk-tb-action-hidden" tooltip="User detail" flow="Top">
                                                                     <a onClick={() => GoToUserDetail(data?.transcation?.client_id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                        <em class="icon ni ni-user-alt-fill"></em>
                                                                     </a>
                                                                  </li>
                                                                  <li className="nk-tb-action-hidden" tooltip="TXN detail" flow="Top">
                                                                     <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                        <em class="icon ni ni-eye-fill" onClick={() => { GoWithdrwal(data) }}></em>
                                                                     </a>
                                                                  </li>
                                                               </>
                                                            }
                                                            <li>
                                                               <div className="drodown">
                                                                  <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                  {
                                                                     data?.transcation?.payment_status == "pending" && <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                           <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                           <li onClick={() => { GoWithdrwal(data) }} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                           <li class="divider"></li>
                                                                           <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-check-circle-cut  "></em><span>Confrim</span></a></li>
                                                                           <li style={{ cursor: "pointer" }} onClick={() => { settxn_id(data?.transcation?.txn_id) }} data-bs-toggle="modal" data-bs-target="#modal-reject"><a ><em class="icon ni ni-cross-c"></em><span>Reject</span></a></li>
                                                                        </ul>
                                                                     </div>
                                                                  }{
                                                                     (data?.transcation?.payment_status == "failed" || data?.transcation?.payment_status == "success") &&
                                                                     <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                           <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                           <li onClick={() => { GoWithdrwal(data) }} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                        </ul>
                                                                     </div>
                                                                  }
                                                               </div>
                                                            </li>
                                                         </ul>
                                                      </div>
                                                   </div >
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
            </div>


            <div className="modal modal-blur fade" id="modal-report" tabIndex={-1} role="dialog" aria-hidden="true">
               <div className="modal-dialog" role="document">
                  <div className="modal-content bgWhiteModalwithdraw">
                     <div className="modal-header">
                        <h5 className="modal-title">Withdraw ID#  <span>{modaldata?.transcation?.txn_id}</span></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1} data-dismiss="modal" />
                     </div >
                     <form >
                        <div className="modal-body bgWhiteModalwithdraw">
                           <div className="mb-3">
                              <p>User <b>{modaldata?.transcation?.recipient_name}</b> request to withdraw <b>{modaldata?.walletDetails?.currencyDetails?.symbol} {modaldata?.transcation?.base_amount}</b> via <b>PayPal.</b> Please check out the details and send payment to user account below.</p>
                           </div>
                           <div className="row mb-3">
                              <div className="col-md-12">
                                 <table class="table table-plain table-borderless table-sm mb-0 withdrawTable">
                                    <tbody>
                                       <tr>
                                          <td><span class="sub-text">Withdraw Amount</span></td>
                                          <td>
                                             <span class="lead-text">{modaldata?.walletDetails?.currencyDetails?.symbol} {modaldata?.transcation?.base_amount}</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td><span class="sub-text">Withdraw Method</span></td>
                                          <td><span class="lead-text">PayPal</span></td>
                                       </tr>
                                       {
                                          modaldata?.transcation?.recipients_outside316?.bank_name != null &&
                                          <>
                                             <tr>
                                                <td><span class="sub-text">Bank Name</span></td>
                                                <td><span class="lead-text">{modaldata?.transcation?.recipients_outside316?.bank_name}</span></td>
                                             </tr>
                                          </>
                                       }

                                       <tr>
                                          <td><span class="sub-text">Payment Information</span></td>
                                          <td>
                                             <div class="label lead-text"></div>
                                             <div class="lead-text">{modaldata?.client?.email}</div>
                                             {
                                                modaldata?.transcation?.recipients_outside316?.account_number != null &&
                                                <>

                                                   <div class="label lead-text">Account No</div>
                                                   <div class="data mb-1">{modaldata?.transcation?.recipients_outside316?.account_number}</div>
                                                </>
                                             }



                                             {
                                                modaldata?.transcation?.recipients_outside316?.sort_code != null &&
                                                <>

                                                   <div class="label lead-text">Sort Code</div>
                                                   <div class="data mb-1">{modaldata?.transcation?.recipients_outside316?.sort_code}</div>
                                                </>
                                             }


                                             {
                                                modaldata?.transcation?.recipients_outside316?.ifsc_code != null &&
                                                <>

                                                   <div class="label lead-text">IFSC Code</div>
                                                   <div class="data mb-1">{modaldata?.transcation?.recipients_outside316?.ifsc_code}</div>
                                                </>
                                             }




                                             {
                                                modaldata?.transcation?.recipients_outside316?.swift_code != null &&
                                                <>

                                                   <div class="label lead-text">IFSC Code</div>
                                                   <div class="data mb-1">{modaldata?.transcation?.recipients_outside316?.swift_code}</div>
                                                </>
                                             }


                                             {
                                                modaldata?.transcation?.recipients_outside316?.payee_id != null &&
                                                <>

                                                   <div class="label lead-text">Payee ID</div>
                                                   <div class="data mb-1">{modaldata?.transcation?.recipients_outside316?.payee_id}</div>
                                                </>
                                             }

                                             {
                                                modaldata?.transcation?.recipients_outside316?.upi_id != null &&
                                                <>

                                                   <div class="label lead-text">UPI ID</div>
                                                   <div class="data mb-1">{modaldata?.transcation?.recipients_outside316?.upi_id}</div>
                                                </>
                                             }

                                             <div class="label lead-text">Account Currency</div>
                                             <div class="data mb-1">( {modaldata?.transcation?.recipients_outside316?.other_currency_symbol} ) {modaldata?.transcation?.recipients_outside316?.other_currency}</div>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td><span class="sub-text">Amount to Debit</span></td>
                                          <td>
                                             <span class="lead-text">{modaldata?.transcation?.recipients_outside316?.other_currency_symbol} {modaldata?.transcation?.transfer_amount}</span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>

                           <p>Please confirm that you want to PROCCED this <b>WITHDRAW</b> request.</p>
                           <button type='button' className="btn btn-primary ms-auto mr-2" onClick={() => { SuccessApproved() }}> Confirm Withdraw
                           </button>
                           <a className="cancelbtnwithdraw" onClick={() => { ref1.current.click() }} style={{ cursor: "pointer" }}>Cancel</a>
                        </div>
                        <div className="modal-footer" style={{ justifyContent: 'flex-start', }}>
                           <p style={{ fontSize: '79%', color: '#343434', }}><em class="icon ni ni-info"></em> You able to complete the withdraw after confirm the withdraw request.</p>
                           <p className="text-danger" style={{ fontSize: '79%', }}><em class="icon ni ni-alert"></em> User unable to cancel the withdraw request once you have confirmed.</p>
                        </div>
                     </form>
                  </div >
               </div >
            </div >

            <div className="modal modal-blur fade" id="modal-reject" tabIndex={-1} role="dialog" aria-hidden="true">
               <div className="modal-dialog" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title">Cancellation of  <span>{txn_id}</span></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref2} data-dismiss="modal" />
                     </div>
                     <form >
                        <div className="modal-body">
                           <div className="mb-3">
                              <p>Are you sure you want to cancel this deposit request?</p>
                           </div>
                           <div className="row mb-3">
                              <div className="col-md-12 otherLabel">
                                 <label>Note for User</label>
                                 <input type="text" className="form-control" placeholder='Enter remark or note'
                                 // onChange={(e) => { setcomment(e.currentTarget.value) }}
                                 />
                                 {/* <small style={{ fontSize: '72%', color: '#959595', }}>The note or remarks help to reminder. Only administrator can read from transaction details.</small> */}
                              </div>
                           </div>
                           <div className="row mb-3">
                              <div className="col-md-12 otherLabel">
                                 <label>Note / Remarks</label>
                                 <input type="text" className="form-control" placeholder='Enter remark or note' />
                                 <small style={{ fontSize: '72%', color: '#959595', }}>The note or remarks help to reminder. Only administrator can read from transaction details.</small>
                              </div>
                           </div>
                           <p>Please confirm that you want to CANCEL this DEPOSIT request.</p>
                           <button type='button' className="btn btn-primary ms-auto mr-2" onClick={() => approvedcancell()}> Cancelled Deposite
                           </button>
                           <a className="cancelbtnwithdraw" onClick={() => { ref2.current.click() }} style={{ cursor: "pointer" }}>Return</a>
                           {/* <div className="form-group mb-3 row">
            <label className="form-label col-3 col-form-label">Status</label>
            <div className="col">
            <select className="form-control mb-0" name="role" {...form.getFieldProps("role")} style={{ height: 40 }}
            // onChange={(e) => handleChangeQueryBuilder(e)}
            >
            <option value="">Select Status</option>
            <option value="true">Complete</option>
            <option value="false">Reject</option>
            </select>
            {form.errors.role && form.touched.role ? <p className='red' style={{ marginTop: 5 }}>{form.errors.role}</p> : null}
            </div>
            </div>
            <div className="form-group mb-3 row">
            <label className="form-label col-3 col-form-label">Message</label>
            <div className="col">
            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Message"
            name="ShortName" {...form.getFieldProps("ShortName")}
            />
            {form.errors.ShortName && form.touched.ShortName ? <p className='red' style={{ marginTop: 5 }}>{form.errors.ShortName}</p> : null}
            </div>
            </div>*/}
                        </div>
                        <div className="modal-footer" style={{ justifyContent: 'flex-start', }}>
                           <p style={{ fontSize: '79%', color: '#343434', }}><em class="icon ni ni-info"></em> You can cancel the transaction if you've not received the payment yet.</p>
                           <p className="text-danger" style={{ fontSize: '79%', }}><em class="icon ni ni-alert"></em> You can not undo this action once you confirm and cancelled.</p>
                        </div>
                     </form>
                  </div>
               </div>
            </div>

         </Container >
      </>
   )
}
export default Withdrawals