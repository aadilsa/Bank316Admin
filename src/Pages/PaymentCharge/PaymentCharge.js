import React, { useDebugValue, useEffect, useState } from 'react'
import Container from '../../component/container'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Image } from 'antd';
import Loader from '../Loader/Loader';
import { useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import { PaymentChargeData, SinglePaymnetChargeData, updatePayment } from '../../API/PaymentChargeApi/PaymentChargeApi'


// import { ToastContainer, toast } from 'react-toastify';
// import Swal from 'sweetalert2';
// import 'react-toastify/dist/ReactToastify.css';


const Updatesucess = () => {
    toast.success('Update successfully.', { autoClose: 2000 });
}


const PaymentCharge = () => {

    const [data, setdata] = useState([])
    const [count, setcount] = useState(0)
    const [id, setid] = useState("")
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
    const [loader, setloader] = useState(true)
    const [Alias, setAlias] = useState("")
    const [Charge, setCharge] = useState("")
    const [ChargeType, setChargeType] = useState("")
    const [PaymentGateway, setPaymentGateway] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem("logintoken")

    useEffect(() => {
        updateform.setValues({
            Alias: Alias,
            Charge: Charge,
            ChargeType: ChargeType,
            PaymentGateway: PaymentGateway,

        })

    }, [Alias, Charge, ChargeType, PaymentGateway])

    console.log(Alias, Charge, ChargeType, PaymentGateway)

    const updatesignUpSchemas = yup.object({
        Alias: yup.string().min(3).required("Please Enter Alias"),
        Charge: yup.string().max(4).required("Please Enter Payment Charge"),
        ChargeType: yup.string().required("Please Enter Charge Type"),
        PaymentGateway: yup.string().min(1).required("Please Enter Payment Gateway"),
    });

    const updateform = useFormik({
        // initialValues: UpdateinitialValues,
        validationSchema: updatesignUpSchemas,
        onSubmit: async (values, e) => {
            console.log(values, "valuuueueueuuu->>>>>>>>>>>>>>>>>>>")
            try {
                const data = {
                    "alias": values.Alias,
                    "charge": values.Charge,
                    "charge_type": values.ChargeType,
                    "payment_gateway": values.PaymentGateway,

                }

                const update = await updatePayment(token, data, id)
                console.log(update, "updddpdpddp")
                if (update.status == true) {
                    GetChargesData()
                    Updatesucess()
                }
                else {
                    console.log("dddddd")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    })




    const GetChargesData = async () => {
        try {
            const totaldata = await PaymentChargeData(token, sortedBy, orderBy, search, pageNumber)

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
        GetChargesData()
    }, [sortedBy, orderBy, search, pageNumber])


    setTimeout(() => {
        setscroll(true)
    }, 3000);


    const PaymentChargeDatabyid = async () => {
        try {
            const resp = await SinglePaymnetChargeData(token, id)

            const data = resp?.data
            console.log(data, "resp")
            setAlias(data.alias)
            setCharge(data.charge)
            setChargeType(data.charge_type)
            setPaymentGateway(data.payment_gateway)


        }
        catch (err) {
            console.log(err)
        }

    }


    const updatePaymentdata = async (e) => {
        e.preventDefault();
        try {
            const data = {
                "alias": Alias,
                "charge": Charge,
                "payment_gateway": PaymentGateway,
                "charge_type": ChargeType,

            }
            const update = await updatePayment(token, data, id)

            if (update.status == true) {
                GetChargesData()
                Updatesucess()
            }
        }
        catch (err) {
            console.log(err)
        }
    }


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



    const handleDelete = () => {
        // console.log("------------>>>>>>>>>>>>>>>>>")
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            // if (result.isConfirmed) {
            //     const response = await deleteWalletdata(token, id)
            //     if (response?.status) {
            //         Swal.fire(
            //             'Deleted!',
            //             'Your Wallet icon has been deleted.',
            //             'success'
            //         )
            //         GetChargesData()
            //     }
            //     else {
            //         toast.error("something went wrong")
            //     }

            // }
        })
    }
    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h5 >Payment Charge</h5>
                                        <div className="nk-block-des text-soft">
                                            <p>You have total <span className='fw-bold'>({count})</span> Payment Charge.</p>
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
                                                    <li><a className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>
                                                    {/* <li className="nk-block-tools-opt">
                                                        <div className="drodown">
                                                            <a className="dropdown-toggle btn btn-icon btn-primary"
                                                            // data-bs-toggle="dropdown"
                                                            ><em className="icon ni ni-plus" /></a>               
                                                        </div>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text fw-bold">Alias {sortedBy == "alias" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("alias") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("alias") }} />} </span></div>
                                        <div className="nk-tb-col "><span className="sub-text fw-bold">Charge {sortedBy == 'charge' && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange('charge') }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange('charge') }} />}</span></div>
                                        <div className="nk-tb-col "><span className="sub-text fw-bold">Charge Type {sortedBy == "charge_type" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("charge_type") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("charge_type") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text fw-bold">Payment Gateway         {sortedBy == "payment_gateway" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_gateway") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("payment_gateway") }} />}</span></div>
                                        <div className="nk-tb-col text-end"><span className="sub-text fw-bold">Action</span></div>
                                    </div>{/* .nk-tb-item */}

                                    {
                                        loader == true ?
                                            <div className="nk-tb-item">
                                                <div className="nk-tb-col"></div>
                                                <div className="nk-tb-col "></div>
                                                <div className="nk-tb-col ">
                                                    <Loader />
                                                </div>
                                                <div className="nk-tb-col tb-col-lg">
                                                </div>
                                                <div className="nk-tb-col nk-tb-col-tools"></div>
                                                {/* <div className="nk-tb-col nk-tb-col-tools"></div> */}
                                            </div>
                                            :
                                            <>
                                                {
                                                    data.length == 0 &&
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col"></div>
                                                        <div className="nk-tb-col "></div>
                                                        <div className="nk-tb-col ">
                                                            {scroll == true ? <h6>No Payment Charge Data Available</h6> : <Loader />}
                                                        </div>
                                                        <div className="nk-tb-col tb-col-lg">
                                                        </div>
                                                        <div className="nk-tb-col nk-tb-col-tools"></div>
                                                    </div>
                                                }


                                                {
                                                    data.length > 0 && data.map((data) => {
                                                        return (
                                                            <div className="nk-tb-item" key={data.id}>
                                                                <div className="nk-tb-col">
                                                                    <a>
                                                                        <div className="user-card" >
                                                                            {
                                                                                data.alias == null ? <div className="user-info">
                                                                                    <span className="tb-lead">N/A<span className="dot dot-success d-md-none ms-1" /></span>
                                                                                </div> : <div className="user-info">
                                                                                    <span className="tb-lead" style={{ textTransform: "capitalize" }} >{data.alias}<span className="dot dot-success d-md-none ms-1" /></span>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                    {data.charge == null ? <span>N/A</span> : <span>{data.charge} %</span>}
                                                                </div>

                                                                <div className="nk-tb-col ">
                                                                    <ul className="list-status">
                                                                        {
                                                                            data.charge_type == null ? <li> <span>N/A</span></li> : <li> <span >{data.charge_type}</span></li>
                                                                        }
                                                                    </ul>
                                                                </div>
                                                                <div className="nk-tb-col tb-col-lg">
                                                                    <ul className="list-status">
                                                                        {
                                                                            data.payment_gateway == null ? <li> <span>N/A</span></li> : <li> <span style={{ textTransform: "capitalize" }}>{data.payment_gateway}</span></li>
                                                                        }

                                                                        {/* <li><em className="icon ni ni-alert-circle" /> <span>KYC</span></li> */}
                                                                    </ul>
                                                                </div>
                                                                <div className="nk-tb-col nk-tb-col-tools">
                                                                    <ul className="nk-tb-actions gx-1">
                                                                        <li
                                                                            onClick={() => setid(data.id)}>
                                                                            <div className="drodown">
                                                                                <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                                    <ul className="link-list-opt no-bdr">
                                                                                        {/* <li ><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>View Details</span></a></li> */}
                                                                                        <li style={{ color: "blue", cursor: "pointer" }}
                                                                                            onClick={PaymentChargeDatabyid}
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
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div>






            <div className="modal modal-blur fade" id="modal-reportUpdate" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Update Payment Charge</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form onSubmit={updateform.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Alias</label>

                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Charge Type"
                                            {...updateform.getFieldProps("Alias")}
                                        />
                                        {updateform.errors.Alias && updateform.touched.Alias ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.Alias}</p> : null}

                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">Payment Charge</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Charge Type"
                                            {...updateform.getFieldProps("Charge")}
                                        />
                                        {updateform.errors.Charge && updateform.touched.Charge ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.Charge}</p> : null}

                                    </div>
                                </div>



                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">	Payment Type</label>
                                    <div className="col">

                                        <select className="form-control mb-0"  {...updateform.getFieldProps("ChargeType")} style={{ height: 40 }} >
                                            <option value="">Select Currency</option>
                                            <option value="P">P (percentage)</option>
                                            <option value="F">F (Fixed)</option>

                                        </select>
                                        {updateform.errors.ChargeType && updateform.touched.ChargeType ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.ChargeType}</p> : null}

                                    </div>
                                </div>

                                <div className="form-group mb-3 row">
                                    <label className="form-label col-3 col-form-label">	Payment Gateway</label>
                                    <div className="col">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Charge Type"
                                            {...updateform.getFieldProps("PaymentGateway")}
                                        />
                                        {updateform.errors.PaymentGateway && updateform.touched.PaymentGateway ? <p className='red' style={{ marginTop: 5 }}>{updateform.errors.PaymentGateway}</p> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary ms-auto" data-bs-dismiss="modal">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default PaymentCharge
