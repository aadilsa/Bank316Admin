import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import ReactPaginate from 'react-paginate'
import Loader from '../Loader/Loader'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { WithdrawalsTxn } from '../../API/Withdrawals/WithdrawalsAPI'
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../../API/config'
import { WithdrawalsApprove } from '../../API/Withdrawals/WithdrawalsAPI'
import Swal from 'sweetalert2';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';

const AddSuccessToast = () => {
   toast.success('Status Change successfully.', { autoClose: 2000 });
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
   const [singletxn, setsingletxn] = useState()
   const [startDate, setstartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const navigate = useNavigate()
   const ref2 = useRef()
   const ref3 = useRef()

   const reqmoneystatus = (data) => {
      setid(data?.request_id)
      console.log(id, "dddddddddd")
   }

   const WithdrawalsTxnData = async () => {
      try {
         const totaldata = await WithdrawalsTxn(token, recentTab, sortedBy, orderBy, search, pageNumber)
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
      WithdrawalsTxnData()
   }, [sortedBy, orderBy, search, pageNumber, recentTab, startDate, endDate])



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

   const GoToUserDetail = (id) => {
      console.log(id, "iddddddddddddddddd")
      navigate("/user-details", { state: id })
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
         if (result.value) {
            const datas = JSON.stringify({
               "is_request_money": true,
               "comment": comment
            })
            const response = await WithdrawalsApprove(token, id, datas)
            if (response?.status) {
               ref3.current.click()
               Swal.fire(
                  'Approved!',
                  ' Transaction has been successfully Approved.',
                  'success'
               )
               WithdrawalsTxnData()
            } else {
               ref3.current.click()
               toast.error("something went wrong")
            }
         }
      })
   }


   const handleCallbackOnCancel = (event, picker) => {
      picker.element.val('');
      setstartDate('')
      setEndDate('')
   }

   function handleCallback(event, picker) {
      const startDate = picker.startDate.format('YYYY-MM-DD');
      const endDate = picker.endDate.format('YYYY-MM-DD');
      setstartDate(startDate)
      setEndDate(endDate)
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
   }


   var singlestillUtcs = moment.utc(modaldata?.transcation?.created_at).toDate();
   var singletimeZones = moment(singlestillUtcs).local().format('MMM D, YYYY hh:mm A');
   var completed_on = moment.utc(modaldata?.transcation?.completed_on).toDate();
   var singlecompleted_on = moment(completed_on).local().format('MMM D, YYYY hh:mm A');
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
                                                <DateRangePicker
                                                   onApply={handleCallback}
                                                   onCancel={handleCallbackOnCancel}
                                                   initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: 'Clear' } }}>
                                                   <input
                                                      placeholder="Search By Date"
                                                      className="form-control fc-datepicker hasDatepicker"
                                                      type="text" defaultValue=""
                                                      style={{ cursor: 'pointer' }}
                                                   />
                                                </DateRangePicker>                                                            </div>
                                          </li>
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
                                       <li className={recentTab == "" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab(""); setTotalSize(0) }}><span >{recentTab == "" ? <b>All</b> : <span>All</span>}</span></a></li>
                                       <li className={recentTab == "pending" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("pending"); setTotalSize(0) }}><span>{recentTab == "pending" ? <b>
                                          Pending</b> : <span>
                                          Pending</span>}</span></a></li>
                                       <li className={recentTab == "success " ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("success"); setTotalSize(0) }}><span> {recentTab == "success" ? <b>
                                          Completed</b> : <span>
                                          Completed</span>}</span></a></li>
                                       <li className={recentTab == "failed" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => { setrecentTab("failed"); setTotalSize(0) }}><span>{recentTab == "failed" ? <b>Rejected</b> : <span>Rejected</span>}</span></a></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="nk-block">
                           <div className="nk-tb-list is-separate mb-3">
                              <div className="nk-tb-item nk-tb-head">
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
                                       <div className="nk-tb-col tb-col-md"></div>
                                       <div className="nk-tb-col tb-col-lg"><Loader /></div>
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
                                                <h6>No Request Money Data Available</h6>
                                             </div>
                                             <div className="nk-tb-col tb-col-lg">
                                             </div>
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
                                                                  <span className="tb-lead" style={{ textTransform: "capitalize" }}>{data?.client_name} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                  <span>{data?.client_email}</span>
                                                               </div>
                                                            </div>
                                                         </a>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-mb">
                                                         <span className="tb-amount" style={{ cursor: "pointer" }}>{data?.txn_id} <span className="dot dot-success d-md-none ms-1" /></span>
                                                         <span className=" tb-status  text-warning ">
                                                            <em class="icon ni ni-bullet-fill"></em>Withdraw
                                                         </span>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-md">
                                                         <span> {data?.title}</span>
                                                      </div>
                                                      <div className="nk-tb-col tb-col-lg">
                                                         <span>{data?.amount} {data?.short_name}</span>
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
                                                            data?.payment_status == "failed" && <span className="tb-status text-danger">Rejected</span>
                                                         }
                                                      </div>
                                                      <div className="nk-tb-col nk-tb-col-tools" onClick={() => { reqmoneystatus(data); setmodaldata(data) }}>
                                                         <ul className="nk-tb-actions gx-1">
                                                            {
                                                               data?.payment_status == "pending" && <>
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
                                                                  <li className="nk-tb-action-hidden" tooltip="Details" flow="Top" onClick={() => { setsingletxn(data) }}>
                                                                     <a className="btn btn-trigger btn-icon">
                                                                        <em class="icon ni ni-eye-fill" data-bs-toggle="modal" data-bs-target="#modal-txn"></em>
                                                                     </a>
                                                                  </li>
                                                               </>
                                                            }
                                                            {
                                                               (data?.payment_status == "failed" || data?.payment_status == "success") && <>
                                                                  <li className="nk-tb-action-hidden" tooltip="User detail" flow="Top">
                                                                     <a onClick={() => GoToUserDetail(data?.transcation?.client_id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                                                        <em class="icon ni ni-user-alt-fill"></em>
                                                                     </a>
                                                                  </li>
                                                                  <li className="nk-tb-action-hidden" tooltip="TXN detail" flow="Top">
                                                                     <a className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                                                        <em class="icon ni ni-eye-fill" data-bs-toggle="modal" data-bs-target="#modal-txn"></em>
                                                                     </a>
                                                                  </li>
                                                               </>
                                                            }
                                                            <li>
                                                               <div className="drodown">
                                                                  <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                  {
                                                                     data?.payment_status == "pending" && <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                           <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                           <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-txn"><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                           <li class="divider"></li>
                                                                           <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-report"><a ><em class="icon ni ni-check-circle-cut  "></em><span>Confrim</span></a></li>
                                                                           <li style={{ cursor: "pointer" }} onClick={() => { settxn_id(data?.transcation?.txn_id) }} data-bs-toggle="modal" data-bs-target="#modal-reject"><a ><em class="icon ni ni-cross-c"></em><span>Reject</span></a></li>
                                                                        </ul>
                                                                     </div>
                                                                  }{
                                                                     (data?.payment_status == "failed" || data?.payment_status == "success") &&
                                                                     <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                           <li onClick={() => GoToUserDetail(data?.transcation?.client_id)} style={{ cursor: "pointer" }}><a ><em class="icon ni ni-user-alt"></em><span>User Profile</span></a></li>
                                                                           <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modal-txn"><a ><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
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
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref3} data-dismiss="modal" />
                     </div >
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
                        <a className="cancelbtnwithdraw" onClick={() => { ref3.current.click() }} style={{ cursor: "pointer" }} >Cancel</a>
                     </div>
                     <div className="modal-footer" style={{ justifyContent: 'flex-start', }}>
                        <p style={{ fontSize: '79%', color: '#343434', }}><em class="icon ni ni-info"></em> You able to complete the withdraw after confirm the withdraw request.</p>
                        <p className="text-danger" style={{ fontSize: '79%', }}><em class="icon ni ni-alert"></em> User unable to cancel the withdraw request once you have confirmed.</p>
                     </div>
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
                                 />
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
                        </div>
                        <div className="modal-footer" style={{ justifyContent: 'flex-start', }}>
                           <p style={{ fontSize: '79%', color: '#343434', }}><em class="icon ni ni-info"></em> You can cancel the transaction if you've not received the payment yet.</p>
                           <p className="text-danger" style={{ fontSize: '79%', }}><em class="icon ni ni-alert"></em> You can not undo this action once you confirm and cancelled.</p>
                        </div>
                     </form>
                  </div>
               </div>
            </div>

            <div className="modal modal-blur fade" id="modal-txn" tabIndex={-1} role="dialog" aria-hidden="true">
               <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title">Withdrawal ID
                           <span className="greebTxnWithdraw"> #{modaldata?.transcation?.txn_id}</span></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" data-dismiss="modal" />
                     </div>
                     <div className="modal-body">
                        <ul class="nk-top-products mb-3">
                           <li class="item pt-0">
                              <div class="user-avatar bg-primary mright-2">
                                 <span class="user-avatar bg-warning-dim">
                                    <e class="icon ni ni-arrow-up-right"></e></span>
                                 <em class="icon ni ni-wallet-fill walletIconNew"></em>
                              </div>
                              <div class="info"><div class="title"><b>  {modaldata?.transcation?.base_amount} {modaldata?.client?.currencywallets[0]?.currency.short_name} </b></div>
                                 <div class="price">{singletimeZones}</div>
                              </div>
                              {
                                 modaldata?.transcation?.payment_status == "success" && <div class="total badge rounded-pill bg-success">success</div>
                              }
                              {
                                 modaldata?.transcation?.payment_status == "pending" && <div class="total badge rounded-pill bg-warning">pending</div>
                              }
                              {
                                 modaldata?.transcation?.payment_status == "failed" && <div class="total badge rounded-pill bg-danger">failed</div>
                              }
                           </li>
                        </ul>
                        <div className="row tableUserModal">
                           <div className="col-md-6">
                              <h6 className="mb-3">USER DETAILS</h6>
                              <ul>
                                 <li className="mb-3">User Account <span className="d-block">{modaldata?.client?.first_name} {modaldata?.client?.last_name} <small></small></span></li>
                                 <li className="mb-3">Email <span className="d-block">{modaldata?.client?.email}</span></li>
                                 <li className="mb-3">Phone Number <span className="d-block">{modaldata?.client?.phone}</span></li>
                              </ul>
                           </div>
                           <div className="col-md-6">
                              <h6 className="mb-3">ACCOUNT DETAILS</h6>
                              <ul>
                                 <li className="mb-3">Cash Balance <span className="d-block">{modaldata?.cash_balance} {modaldata?.client?.currencywallets[0]?.currency.short_name} </span></li>
                                 <li className="mb-3">Default Wallet <span className="d-block">{modaldata?.client?.currencywallets[0]?.currency.short_name} Wallet</span></li>
                                 <li className="mb-3">Country <span className="d-block">United Kingdom</span></li>
                              </ul>
                           </div>
                        </div>
                        <div className="row tableUserModal">
                           <div className="col-md-12"><h6 className="mb-3">TRANSACTION DETAILS</h6></div>
                           <div className="col-md-6">
                              <ul>
                                 <li className="mb-3">Withdrawal  Amount  <span className="d-block"> {modaldata?.transcation?.base_amount} {modaldata?.client?.currencywallets[0]?.currency.short_name} </span></li>
                                 <li className="mb-3"> Payout Currency<span className="d-block">{modaldata?.transcation?.other_currency}</span></li>
                                 <li className="mb-3">Transaction Charge <span className="d-block">{modaldata?.transcation?.txn_charge_amount} {modaldata?.client?.currencywallets[0]?.currency.short_name}</span></li>
                                 <li className="mb-3">Exchange Rate <span className="d-block">{modaldata?.transcation?.txn_charge_amount} {modaldata?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                                 <li className="mb-3">Adj Withdrawal Amount <span className="d-block"> {modaldata?.transcation?.amount} {modaldata?.receiver?.currencywallets[0]?.currency?.short_name}</span></li>
                              </ul>
                           </div>
                           <div className="col-md-6">
                              <ul>
                                 <li className="mb-3">Placed by <span className="d-block">UID08124</span></li>
                                 <li className="mb-3">Placed On <span className="d-block">Jan 23, 2024 6:30 PM</span></li>
                                 <li className="mb-3">Conversion Charge Applied <span className="d-block">Jan 23, 2024 6:30 PM</span></li>
                                 <li className="mb-3">Converted Amount <span className="d-block">{modaldata?.transcation?.payment_method}</span></li>
                                 <li className="mb-3">Wallet Balance after Txn <span className="d-block">{modaldata?.transcation?.other_closing_balance} {modaldata?.sender?.currencywallets[0]?.currency.short_name}</span></li>
                              </ul>
                           </div>
                        </div>

                        <div className="row tableUserModal">
                           <div className="col-md-12"><h6 className="mb-3">RECIPIENT ACCOUNT  DETAILS</h6></div>
                           <div className="col-md-6">
                              <ul>
                                 <li className="mb-3">Account holder Name  <span className="d-block">{modaldata?.transcation?.recipients_outside316?.account_holder_name}</span></li>
                                 {
                                    modaldata?.transcation?.recipients_outside316?.account_number !== null && <li className="mb-3">Account Number   <span className="d-block">{modaldata?.transcation?.recipients_outside316?.account_number} </span></li>
                                 }
                                 {
                                    modaldata?.transcation?.recipients_outside316?.ifsc_code !== null &&
                                    <li className="mb-3">IFSC Code <span className="d-block">{modaldata?.transcation?.recipients_outside316?.ifsc_code}</span></li>
                                 }
                                 {
                                    modaldata?.transcation?.recipients_outside316?.payee_id !== null &&
                                    <li className="mb-3">Payee Id<span className="d-block">{singletxn?.transcation?.recipients_outside316?.payee_id}</span></li>
                                 }
                                 {
                                    modaldata?.transcation?.recipients_outside316?.iban_number !== null &&
                                    <li className="mb-3">IBAN Number<span className="d-block">{modaldata?.transcation?.recipients_outside316?.iban_number}</span></li>
                                 }
                                 {
                                    modaldata?.transcation?.recipients_outside316?.sort_code !== null &&
                                    <li className="mb-3">Sort Code <span className="d-block">{modaldata?.transcation?.recipients_outside316?.sort_code}</span></li>
                                 }
                                 {
                                    modaldata?.transcation?.recipients_outside316?.swift_code !== null &&
                                    <li className="mb-3">Swift Code <span className="d-block">{modaldata?.transcation?.recipients_outside316?.swift_code}</span></li>
                                 }
                                 {
                                    modaldata?.transcation?.recipients_outside316?.upi_id !== null &&
                                    <li className="mb-3">UPI Id <span className="d-block">{modaldata?.transcation?.recipients_outside316?.upi_id}</span></li>
                                 }
                              </ul>
                           </div>
                           <div className="col-md-6">
                              <ul>
                                 <li className="mb-3">Payment Currency  <span className="d-block">Personal</span></li>
                                 <li className="mb-3">Payment Amount <span className="d-block">Verified</span></li>
                                 <li className="mb-3">Funding Method  <span className="d-block">{modaldata?.transcation?.payment_method}</span></li>
                              </ul>
                           </div>
                        </div>
                        <div className="row tableUserModal">
                           <div className="col-md-12"><h6 className="mb-3">ADDITIONAL DETAILS</h6></div>
                           <div className="col-md-6">
                              <ul>
                                 <li className="mb-3">Transaction type <span className="d-block">{modaldata?.transcation?.txn_type}</span></li>
                                 <li className="mb-3">Withdrawal  Limit  <span className="d-block">Deposit Via Manual Bank Transfer </span></li>
                                 <li className="mb-3">Transaction Description <span className="d-block">{modaldata?.transcation?.title}</span></li>
                                 <li className="mb-3">Payment Gateway <span className="d-block">Manual Bank Transfer</span></li>
                                 {
                                    modaldata?.transaction?.payment_status !== "pending" && <li className="mb-3">Completed By  <span className="d-block">{modaldata?.transcation?.completed_by}</span></li>
                                 }
                              </ul>
                           </div>
                           <div className="col-md-6">
                              <ul>
                                 <li className="mb-3">Account Type <span className="d-block">Personal</span></li>
                                 <li className="mb-3">Verification Status <span className="d-block">Verified</span></li>
                                 <li className="mb-3">Default Currency Wallet <span className="d-block">{modaldata?.transcation?.other_currency}</span></li>
                                 <li className="mb-3">Transaction Status <span className="d-block">{modaldata?.transcation?.payment_status}</span></li>
                                 {
                                    modaldata?.transaction?.payment_status !== "pending" && <li className="mb-3">Completed On  <span className="d-block">{singlecompleted_on}</span></li>
                                 }
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container >
      </>
   )
}
export default Withdrawals