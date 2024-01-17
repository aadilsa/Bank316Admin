import React, { useEffect, useState } from 'react'
import Container from '../../component/container'
import { singleEmploye } from '../../API/Employees/Employees'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Image } from 'antd'
const Employe = () => {
    const [userdata, setuserdata] = useState([])
    const [data, setdata] = useState()
    const [count, setcount] = useState()
    const [id, setid] = useState()
    const [search, setsearch] = useState("")
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [loading, setloading] = useState(false)
    // console.log(location.pathname, "locattaion path name")
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const token = localStorage.getItem("logintoken")
    const location = useLocation()
    const navigate = useNavigate()


    console.log(location.state, "locationlocation")
    const GetSingleEmployee = async () => {
        try {
            const totaldata = await singleEmploye(token, location.state)
            console.log(totaldata.data, "total data")
            setdata(totaldata.data)
            // settotal(totaldata.data.count)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetSingleEmployee()
    }, [])

    var stillUtcs = moment.utc(data?.created_at).toDate();
    var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
    return (
        <>
            <Container>
                <div className="nk-content ">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block">
                                    <div className="card">
                                        <div className="card-aside-wrap">
                                            <div className="card-inner card-inner-lg">
                                                <div className="nk-block-head nk-block-head-lg">
                                                    <div className="nk-block-between">
                                                        <div className="nk-block-head-content">
                                                            <h4 className="nk-block-title">Employee Information</h4>
                                                            <div className="nk-block-des">
                                                                <p>Basic info, like your name and address, that you use on Nio Platform.</p>
                                                            </div>
                                                        </div>
                                                        <div className="nk-block-head-content" onClick={() => { navigate(-1) }}>
                                                            <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                                            <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></a>
                                                        </div>
                                                        <div className="nk-block-head-content align-self-start d-lg-none">
                                                            <a className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em className="icon ni ni-menu-alt-r" /></a>
                                                        </div>
                                                    </div>
                                                </div>{/* .nk-block-head */}

                                                <div className="nk-block">
                                                    <div className="nk-data data-list">
                                                        <div className="data-head">
                                                            <h6 className="overline-title">Basics</h6>
                                                        </div>
                                                        <div className="data-item" >
                                                            <div className="data-col">
                                                                <span className="data-label">Full Name</span>
                                                                <span className="data-value"> <div className="user-avatar bg-primary">
                                                                    <span><Image src={data?.avatar} alt='img' /></span>
                                                                </div> </span>
                                                                <h6 style={{ paddingLeft: "10px" }}> {data?.firstname} {data?.lastname}</h6>
                                                            </div>

                                                        </div>{/* data-item */}

                                                        <div className="data-item">
                                                            <div className="data-col">
                                                                <span className="data-label">Email</span>
                                                                <span className="data-value">{data?.email}</span>
                                                            </div>

                                                        </div>{/* data-item */}
                                                        <div className="data-item" >
                                                            <div className="data-col">
                                                                <span className="data-label">Phone Number</span>
                                                                <span className="data-value text-soft">+{data?.phone_code} {data?.phone}</span>
                                                            </div>

                                                        </div>{/* data-item */}
                                                        <div className="data-item" >
                                                            <div className="data-col">
                                                                <span className="data-label">Date of Birth</span>
                                                                {data?.dob == "" ? <span className="data-value">N/A</span> : <span className="data-value">{data?.dob}</span>}
                                                            </div>

                                                        </div>{/* data-item */}
                                                        <div className="data-item">
                                                            <div className="data-col">
                                                                <span className="data-label">Street House Number</span>
                                                                {data?.street_housenumber == "" ? <span className="data-value">N/A,<br /></span> : <span className="data-value">{data?.apartment}  {data?.street_housenumber}<br /></span>}
                                                            </div>
                                                        </div>{/* data-item */}

                                                        <div className="data-item" >
                                                            <div className="data-col">
                                                                <span className="data-label">Country Of Residence</span>
                                                                {data?.country_of_residence == "" ? <span className="data-value">N/A,<br /></span> : <span className="data-value">{data?.country_of_residence
                                                                }<br /></span>}

                                                            </div>

                                                        </div>{/* data-item */}

                                                        <div className="data-item" >
                                                            <div className="data-col">
                                                                <span className="data-label">
                                                                    Created At</span>
                                                                {<span className="data-value">{timeZones}<br /></span>}

                                                            </div>

                                                        </div>{/* data-item */}
                                                        <div className="data-item" >
                                                            <div className="data-col">
                                                                <span className="data-label">
                                                                    Status</span>
                                                                {/* {<span className="data-value">{data?.is_verified_status}<br /></span>} */}
                                                                {
                                                                    data?.is_verified_status == "ACTIVE" ? <div className="user-info">
                                                                        <span className="tb-status badge rounded-pill bg-success">{data?.is_verified_status}</span>

                                                                    </div> : <div className="user-info">
                                                                        <span className="tb-status badge rounded-pill bg-danger">{data?.is_verified_status}</span>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>{/* data-item */}
                                                    </div>{/* data-list */}
                                                    {/* <div className="nk-data data-list">
                                                        <div className="data-head">
                                                            <h6 className="overline-title">Preferences</h6>
                                                        </div>
                                                        <div className="data-item">
                                                            <div className="data-col">
                                                                <span className="data-label">Language</span>
                                                                <span className="data-value">English (United State)</span>
                                                            </div>
                                                            <div className="data-col data-col-end"><a className="link link-primary">Change Language</a></div>
                                                        </div>
                                                        <div className="data-item">
                                                            <div className="data-col">
                                                                <span className="data-label">Date Format</span>
                                                                <span className="data-value">M d, YYYY</span>
                                                            </div>
                                                            <div className="data-col data-col-end"><a className="link link-primary">Change</a></div>
                                                        </div>
                                                        <div className="data-item">
                                                            <div className="data-col">
                                                                <span className="data-label">Timezone</span>
                                                                <span className="data-value">Bangladesh (GMT +6)</span>
                                                            </div>
                                                            <div className="data-col data-col-end"><a className="link link-primary">Change</a></div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                            {/* <div className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" data-toggle-body="true" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                                                <div className="card-inner-group" data-simplebar>
                                                    <div className="card-inner">
                                                        <div className="user-card">
                                                            <div className="user-avatar bg-primary">
                                                                <span><Image src={data?.avatar} alt='img' /></span>
                                                            </div>
                                                            <span><h6>  {data?.firstname} {data?.lastname}</h6></span>
                                                            <div className="user-info">

                                                            </div>
                                                            <div className="user-action">
                                                                <div className="dropdown">
                                                                    <a className="btn btn-icon btn-trigger me-n2" data-bs-toggle="dropdown" href="#"><em className="icon ni ni-more-v" /></a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                            <li><a ><em className="icon ni ni-camera-fill" /><span>Change Photo</span></a></li>
                                                                            <li><a ><em className="icon ni ni-edit-fill" /><span>Update Profile</span></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="card-inner">
                                                        <div className="user-account-info py-0">
                                                            <h6 className="overline-title-alt">Account Balance</h6>
                                                            <div className="user-balance">12000 <small className="currency currency-btc">$</small></div>
                                                            <div className="user-balance-sub">Pending <span>0.3009 <span className="currency currency-btc">USD</span></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="card-inner p-0">
                                                        <ul className="link-list-menu">
                                                            <li><a className="active"><em className="icon ni ni-user-fill-c" /><span>Personal Infomation</span></a></li>
                                                            <li><a ><em className="icon ni ni-bell-fill" /><span>Notifications</span></a></li>
                                                            <li><a ><em className="icon ni ni-activity-round-fill" /><span>Account Activity</span></a></li>
                                                            <li><a ><em className="icon ni ni-lock-alt-fill" /><span>Security Settings</span></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Employe
