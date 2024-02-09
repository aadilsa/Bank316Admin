import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { GetFaqdata, deleteFAQdata } from '../../API/FAQ api/FAQAPI'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader'


const FAQ = () => {
    const [data, setdata] = useState([])
    const [totaldata, settotal] = useState()

    // const [id, setid] = useState()
    const [count, setcount] = useState(0)
    const [search, setsearch] = useState("")
    const [loader, setloader] = useState(true)
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const token = localStorage.getItem("logintoken")
    const [faqType, setFaqType] = useState('Hotspots');

    const navigate = useNavigate()

    const GetCountry = async () => {
        try {
            const totaldata = await GetFaqdata(token, faqType, pageNumber)
            setdata(totaldata.data.rows)
            settotal(totaldata.data.count)
            console.log(totaldata.data)

            if (totaldata.status == true) {
                setTimeout(() => {
                    setloader(false)
                    setExample(true)
                    setdata(totaldata?.data.rows)
                    setcount(totaldata?.data.count)
                    console.log(totaldata?.data.count, 'totaldata')
                    const Count = totaldata?.data.count
                    setTotalSize(Count / entries)

                }, 2000);
                setloader(true)
            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                localStorage.removeItem('logintoken')
                navigate("/")

            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetCountry()
    }, [faqType, pageNumber])




    // const totaldata = await CurrencyData(token, sortedBy, orderBy, search, pageNumber)
    // console.log(totaldata, "?????????????????")
    // if (totaldata.status == true) {
    //     setTimeout(() => {
    //         setloader(false)
    //         setExample(true)
    //         setdata(totaldata?.data.rows)
    //         setcount(totaldata?.data.count)
    //         console.log(totaldata?.data.count, 'totaldata')
    //         const Count = totaldata?.data.count
    //         setTotalSize(Count / entries)

    //     }, 2000);
    //     setloader(true)
    // }
    // else if (totaldata?.response?.data?.message == "jwt expired") {
    //     localStorage.removeItem('logintoken')
    //     navigate("/")

    // }






    const GoToAddFAQ = () => {
        console.log("GO ASDDDDD")
        navigate("/create-faq")
    }

    const GoEditFAQ = (data) => {
        console.log("EDIT")
        navigate("/edit-faq", { state: data })
    }


    const handleDelete = (id) => {
        console.log("------------>>>>>>>>>>>>>>>>>")
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteFAQdata(id, token)
                if (response?.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your FAQ has been deleted.',
                        'success'
                    )
                    GetCountry()
                }
                else {
                    // toast.error("something went wrong")
                }

            }
        })
    }



    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)

    };

    return (
        <>
            <Container>
                <div className="nk-content " >
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div >
                                    <div>
                                        <div className="nk-app-root">
                                            <div className="nk-main ">
                                                <div className="nk-wrap ">
                                                    <div className="nk-content " style={{ padding: '5px 22px' }}>
                                                        <div className="container-fluid">
                                                            <div className="nk-content-inner">
                                                                <div className="nk-content-body">
                                                                    <div className="content-page wide-sm m-auto">
                                                                        <div className="nk-block-head nk-block-head-lg wide-xs mx-auto">
                                                                            <div className="nk-block-head-content text-center">
                                                                                {/* <div className="nk-block-head-sub"><span>FAQs</span></div> */}
                                                                                <h2 className="nk-block-title fw-normal">Frequently Asked Questions</h2>
                                                                                <div className="nk-block-des">
                                                                                    <p className="lead">Got a question? Can't find the answer you're looking for? Don't worry, drop us a line on our <a >contact page</a>.</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="nk-block-head nk-block-head-sm">
                                                                            <div className="nk-block-between">
                                                                                <div className="nk-block-head-content">
                                                                                    <h5>FAQ</h5>
                                                                                    <div className="nk-block-des text-soft">
                                                                                        <p>You have total <span className='fw-bold'>({count})</span> FAQ.</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="nk-block-head-content">
                                                                                    <div className="toggle-wrap nk-block-tools-toggle">
                                                                                        <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>
                                                                                        <div className="toggle-expand-content" data-content="pageMenu">
                                                                                            <ul className="nk-block-tools g-3">
                                                                                                <li>
                                                                                                    <div className="form-wrap w-150px">
                                                                                                        <select
                                                                                                            className="form-select js-select2"
                                                                                                            data-search="off"
                                                                                                            value={faqType}  // Set the selected value from the state
                                                                                                            onChange={(e) => { setFaqType(e.target.value) }} // Handle the change event
                                                                                                        >
                                                                                                            <option value="Hotspots">Hotspots</option>
                                                                                                            <option value="MarketPlace">MarketPlace</option>
                                                                                                            <option value="Business">Business</option>
                                                                                                            <option value="Invest">Invest</option>
                                                                                                            <option value="Remit">Remit</option>
                                                                                                            <option value="Account">Account</option>
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </li>

                                                                                                <li><a className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>
                                                                                                <li className="nk-block-tools-opt">
                                                                                                    <div className="drodown">
                                                                                                        <button type="submit" onClick={GoToAddFAQ} className="btn btn-primary ms-auto" >
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon " width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>&nbsp;<p> Add</p>
                                                                                                        </button>                                                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                                                            <ul className="link-list-opt no-bdr">
                                                                                                                <li><a ><span>Add Employees</span></a></li>
                                                                                                                <li><a ><span>Add Team</span></a></li>
                                                                                                                <li><a ><span>Import Employees</span></a></li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div >
                                                                            <h5><span>N/A</span></h5>
                                                                        </div> */}
                                                                        <div className="nk-block">
                                                                            <div className="card">
                                                                                <div id="faqs" className="accordion " >
                                                                                    {loader == true ? <div className="accordion-item" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

                                                                                        <div>
                                                                                            <br></br>
                                                                                            <h6 style={{ textAlign: 'center' }}><Loader /></h6>
                                                                                            <br></br>
                                                                                        </div>
                                                                                    </div> :
                                                                                        <>
                                                                                            {data.length > 0 && data.map((data, index) => {
                                                                                                console.log(data, "datatatatatatat")
                                                                                                return (
                                                                                                    <>
                                                                                                        <div className="accordion-item" key={index}>
                                                                                                            <a className="accordion-head collapsed" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                                                                                                                <h6 className="title"> Q.{index + 1}  {data.question != "" ? data.question : <span>N/A</span>}  </h6>
                                                                                                                <a className="accordion-icon" data-bs-toggle="collapse" data-bs-target={"#faq-q" + index} style={{ right: '6.5rem', cursor: "pointer" }} />
                                                                                                                {/* <button style={{ float: "right", marginLeft: "90px" }} onClick={() => handleDelete(data.id)}> edit</button> */}
                                                                                                                <div style={{ display: 'flex', gap: '10px', }}>
                                                                                                                    <a onClick={() => GoEditFAQ(data)} style={{ display: 'inline-block', padding: '4px 10px', background: '#004ba7', color: '#fff', borderRadius: '5px', fontSize: '12px', height: '30px', lineHeight: '20px', cursor: "pointer" }}><em class="icon ni ni-pen-fill"></em></a>
                                                                                                                    <a onClick={() => handleDelete(data.id)} style={{ display: 'inline-block', padding: '4px 10px', background: 'rgb(237 27 36)', color: '#fff', borderRadius: '5px', fontSize: '12px', height: '30px', lineHeight: '25px', cursor: "pointer" }}><em class="icon ni ni-trash-fill"></em></a>
                                                                                                                </div>
                                                                                                            </a>
                                                                                                            <div className="accordion-body collapse" id={"faq-q" + index} data-bs-parent="#faqs">
                                                                                                                <div className="accordion-inner">

                                                                                                                    {
                                                                                                                        <p>  {(data.answer != "" && data.answer != null) && <span>Ans.{index + 1} {data.answer}</span>}</p>

                                                                                                                    }
                                                                                                                    {
                                                                                                                        <p>  {data.answer == null && <span></span>}</p>

                                                                                                                    }
                                                                                                                    {
                                                                                                                        <p>  {(data.answer == "") && <span></span>}</p>

                                                                                                                    }

                                                                                                                    {data.sub_freq_askeds.length > 0 && data.sub_freq_askeds.map((data, index) => {
                                                                                                                        console.log(data, "vvvvvvvvvvvvvvvvvvvvvvvvv")
                                                                                                                        return (
                                                                                                                            <>
                                                                                                                                <div className="accordion-item" key={index}>
                                                                                                                                    <div >
                                                                                                                                        <h5>{data.sub_question != "" ? data.sub_question : <span>N/A</span>}</h5>
                                                                                                                                    </div>
                                                                                                                                    <div >
                                                                                                                                        <p >{data.sub_answer != "" ? data.sub_answer : <span>N/A</span>}</p>
                                                                                                                                    </div>
                                                                                                                                    {
                                                                                                                                        <p>{data.title == null && <div >
                                                                                                                                        </div>}</p>}
                                                                                                                                    {
                                                                                                                                        (data.title != "" && data.title != null) && <div style={{ listStyleType: 'disc' }} >
                                                                                                                                            <li><b>{data.title}</b></li>
                                                                                                                                        </div>}

                                                                                                                                    {data.title == "" && <div>
                                                                                                                                    </div>
                                                                                                                                    }
                                                                                                                                    <div >
                                                                                                                                        <p>{(data.content != "" && data.content != null) && data.content}</p>
                                                                                                                                        <p>{data.content == "" && <span></span>}</p>
                                                                                                                                        <p>{data.content == null && <span></span>}</p>

                                                                                                                                    </div>


                                                                                                                                    {
                                                                                                                                        data?.sub_sub_titles?.length > 0 &&

                                                                                                                                        data?.sub_sub_titles.map((data) => {
                                                                                                                                            return (
                                                                                                                                                <>

                                                                                                                                                    {
                                                                                                                                                        <p>{data.title == null && <div >
                                                                                                                                                        </div>}</p>}
                                                                                                                                                    {
                                                                                                                                                        (data.title != "" && data.title != null) && <div style={{ listStyleType: 'disc' }} >
                                                                                                                                                            <li><b>{data.title}</b></li>
                                                                                                                                                        </div>}

                                                                                                                                                    {data.title == "" && <div>
                                                                                                                                                    </div>
                                                                                                                                                    }


                                                                                                                                                    <div >
                                                                                                                                                        <p>{(data.content != "" && data.content != null) && data.content}</p>
                                                                                                                                                        <p>{data.content == "" && <span></span>}</p>
                                                                                                                                                        <p>{data.content == null && <span></span>}</p>
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        })

                                                                                                                                    }


                                                                                                                                </div>

                                                                                                                            </>

                                                                                                                        )

                                                                                                                    })

                                                                                                                    }

                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                            })}

                                                                                            {
                                                                                                data.length == 0 && <div className="accordion-item">
                                                                                                    <div><br></br>
                                                                                                        <h6 style={{ textAlign: "center" }}>No data available</h6>
                                                                                                        <br></br>
                                                                                                    </div>
                                                                                                </div>
                                                                                            }



                                                                                        </>


                                                                                    }

                                                                                </div>{/* .accordion */}
                                                                            </div>{/* .card */}
                                                                        </div>{/* .nk-block */}
                                                                        <div className="nk-block">
                                                                            <div className="card">
                                                                                <div className="card-inner">
                                                                                    <div className="align-center flex-wrap flex-md-nowrap g-4">
                                                                                        <div className="nk-block-content flex-shrink-0">
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
                                                                                </div>{/* .card-inner */}
                                                                            </div>{/* .card */}
                                                                        </div>{/* .nk-block */}
                                                                    </div>{/* .content-page */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                {/* wrap @e */}
                                            </div>
                                            {/* main @e */}
                                        </div>
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

export default FAQ

