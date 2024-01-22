import React, { useEffect, useState } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
import Container from '../../component/container';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import BaseUrl from '../../API/config';
// import BigLoader from '../Loader/Loader'
import BigLoader from '../Loader/BigLoader';
import { Image } from 'antd';
import { GetTotaluserdata } from '../../API/UserApi/UserApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useRef } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const [isHovered, setHovered] = useState(false);
import { GetGraphdata, Getuser_employeeCount, GetAppointments, GetNotificatation, GetRecentTXN } from '../../API/Dashboard API/DashboardApi';
// import Chart from '../Chart';

// import CanvasJSReact from '@canvasjs/react-charts';

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;



const Dashboard = () => {
    const [graph, setgraph] = useState("true")
    const token = localStorage.getItem("logintoken")
    const [userdata, setuserdata] = useState([])
    const [count, setcount] = useState(0)
    const [id, setid] = useState()
    const [search, setsearch] = useState("")
    const [pageNumber, setPagenumber] = useState(1)
    const [totalSize, setTotalSize] = useState(10)
    const [entries, SetEntries] = useState('10')
    const [example, setExample] = useState(false)
    const [scroll, setscroll] = useState(false)
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const [loader, setloader] = useState(true)
    const [graphMonth, setgraphmonth] = useState("")
    const [graphdata, setgraphdata] = useState([])
    const [usercount, setusercount] = useState(0)
    const [employeecount, setemployeecount] = useState(0)
    const [notificatation, setnotificatation] = useState([])
    const [appointment, setappointment] = useState([])
    const [graphbutton, setgraphbutton] = useState("Last 1 Year")
    // var CanvasJS = CanvasJSReact.CanvasJS;
    // var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [countdays, setcountdays] = useState("")
    const [buttontxt, setbuttontxt] = useState("Total Count")
    const [RecentTxn, setRecentTxn] = useState([])

    const [recentTab, setrecentTab] = useState("All")
    // const { CanvasJSChart } = CanvasJSReact;
    const navigate = useNavigate()
    useEffect(() => {
        setgraph("true")
    }, [])


    const Notificatation = async () => {
        try {
            const totaldata = await GetNotificatation(token)
            console.log(totaldata, "GetTotalCount")
            if (totaldata?.status == true) {
                console.log(totaldata?.data?.rows, "//////////////////")
                setnotificatation(totaldata?.data?.rows)
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
            // console.log(err, "LLLLLLLLLLLLLLLL")
            console.log(err, "ddddddddddddddddddddddddddd")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }
    useEffect(() => {
        Notificatation()
    }, [])



    // const Get_graph_data = async () => {
    //     try {
    //         const totaldata = await GetGraphdata(token, graphMonth)
    //         if (totaldata?.status == true) {
    //             setgraphdata(totaldata?.data)
    //         }
    //         else if (totaldata?.response?.data?.message == "jwt expired") {
    //             localStorage.removeItem('logintoken')
    //             navigate("/")
    //         }
    //         else {

    //         }
    //     }
    //     catch (err) {
    //         console.log(err, "ddddddddddddddddddddddddddd")
    //     }
    // }
    // useEffect(() => {
    //     Get_graph_data()
    // }, [graphMonth])



    const GetTotalUser = async () => {
        try {
            const totaldata = await GetTotaluserdata(token, pageNumber, search, sortedBy, orderBy)

            console.log(totaldata.status, "okkkkkkkkkkk")
            // console.log(totaldata.data.message == "jwt expired")
            if (totaldata?.status == true) {
                setTimeout(() => {
                    const data = totaldata.data.rows
                    const subsetArray = data.slice(0, 5);

                    setuserdata(subsetArray)
                    // {
                    //     if(totaldata.data.rows)
                    // }
                    setcount(totaldata.data.count)
                    setExample(true)
                    console.log(totaldata.data, "dtatatatat")
                    const Count = totaldata.data.count
                    setTotalSize(Count / entries)
                    setloader(false)
                }, 2000);

                setloader(true)
            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                console.log("Adddillll")
                localStorage.removeItem('logintoken')
                navigate("/")
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
            }
            else {
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
                console.log("dkdkdkdkdkdkkdkdkdkdkk")
            }
        }
        catch (err) {
            // console.log(err, "LLLLLLLLLLLLLLLL")
            console.log(err, "ddddddddddddddddddddddddddd")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }

    useEffect(() => {
        GetTotalUser()
    }, [search, pageNumber, orderBy, sortedBy])



    const GetAppointmentsdata = async () => {
        try {
            const totaldata = await GetAppointments(token)

            console.log(totaldata.status, "okkkkkkkkkkk")
            // console.log(totaldata.data.message == "jwt expired")
            if (totaldata?.status == true) {
                setTimeout(() => {
                    const data = totaldata.data.rows
                    setappointment(data)
                    // const subsetArray = data.slice(0, 5);

                    // setuserdata(subsetArray)
                    // {
                    //     if(totaldata.data.rows)
                    // }
                    // setcount(totaldata.data.count)
                    // setExample(true)
                    // console.log(totaldata.data, "dtatatatat")
                    // const Count = totaldata.data.count
                    // setTotalSize(Count / entries)
                    // setloader(false)
                }, 2000);

                // setloader(true)
            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                console.log("Adddillll")
                localStorage.removeItem('logintoken')
                navigate("/")
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
            }
            else {
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
                console.log("dkdkdkdkdkdkkdkdkdkdkk")
            }
        }
        catch (err) {
            // console.log(err, "LLLLLLLLLLLLLLLL")
            console.log(err, "ddddddddddddddddddddddddddd")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }

    const chartRef = useRef(null);


    useEffect(() => {
        GetAppointmentsdata()
    }, []);



    const GetRecentTransactation = async () => {
        try {
            const totaldata = await GetRecentTXN(token)
            console.log(totaldata.status, "okkkkkkkkkkk")
            if (totaldata?.status == true) {
                setTimeout(() => {
                    const data = totaldata.data.rows
                    setRecentTxn(data)
                }, 2000);
            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                console.log("Adddillll")
                localStorage.removeItem('logintoken')
                navigate("/")
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
            }
            else {
                setTimeout(() => {
                    setloader(false)
                }, 2000);
                setloader(true)
                console.log("dkdkdkdkdkdkkdkdkdkdkk")
            }
        }
        catch (err) {
            // console.log(err, "LLLLLLLLLLLLLLLL")
            console.log(err, "ddddddddddddddddddddddddddd")
            setTimeout(() => {
                setloader(false)
            }, 2000);
            setloader(true)
        }
    }

    // const chartRef = useRef(null);


    useEffect(() => {
        // GetAppointmentsdata()
        GetRecentTransactation()
    }, []);





    const setcountmonthdays = () => {
        const currentDate = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        const timeDifference = currentDate - sixMonthsAgo;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setcountdays(daysDifference);
        console.log(daysDifference, "dddddddd")
    }

    console.log(graphdata, "totaldatatotaldata")

    const Custmerdetails = (id) => {
        console.log(id, "iddddddddd send")
        navigate(`/user-details`, { state: id })
    }


    const options = {
        height: 80,
        // width: 100,
        title: {
            text: "" // Empty string to remove the title at the top
        },
        axisX: {
            // title: "",
            // labelFormatter: function () {
            //     return "";
            // },
            // tickLength: 0,
            // gridThickness: 0,
            // lineThickness: 0,
            // // stripLines: false



            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function () {
                return " ";
            },
        },

        axisY: {
            // title: "",
            // gridThickness: 0,
            // tickLength: 0,
            // lineThickness: 0, // Set lineThickness to 0 to remove row side of columns
            // stripLines: false,
            // labelFormatter: function () {
            //     return ""; // Empty string to remove y-axis labels
            // }
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function () {
                return " ";
            },
        },
        data: [
            {
                type: "column",
                dataPointWidth: 20, // Adding the dataPointWidth property

                dataPoints: [
                    { label: "jan", y: 200, indexLabel: " ", color: "silver" },
                    { label: "feb", y: 203, indexLabel: " ", color: "silver" },
                    { label: "March", y: 205, indexLabel: " ", color: "silver" },
                    { label: "aprail", y: 207, indexLabel: " ", color: "silver" },
                    { label: "may", y: 201, indexLabel: " ", color: "silver" },
                    { label: "june", y: 205, indexLabel: " ", color: "green" }
                ],
                lineThickness: 0,
                gridThickness: 0,
                tickLength: 0, // Set lineThickness to 0 to remove lines around columns
            }
        ], dataPointWidth: 10,
    };






    console.log(RecentTxn, "LLLLLLLLLLLLLLL")
    // Now use the options object to create your chart

    const copiedInfo = () => {
        toast.success(" Successful copy ", { autoClose: 1000 })
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
                                        <h3 className="nk-block-title page-title">Main Dashboard</h3>
                                    </div>{/* .nk-block-head-content */}




                                    {loader == false && <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v" /></a>
                                            <div className="toggle-expand-content" data-content="pageMenu">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="drodown">
                                                            <a href="#" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown"><em className="d-none d-sm-inline icon ni ni-calender-date" /><span><span className="d-none d-md-inline">Last</span> 30
                                                                Days</span><em className="dd-indc icon ni ni-chevron-right" /></a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><span>Last 30 Day</span></a>
                                                                    </li>
                                                                    <li><a href="#"><span>Last 6 Months</span></a>
                                                                    </li>
                                                                    <li><a href="#"><span>Last 2 Year</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="nk-block-tools-opt"><a href="#" className="btn btn-primary"><em className="icon ni ni-reports" /><span>Reports</span></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>}
                                </div>{/* .nk-block-between */}
                            </div>{/* .nk-block-head */}

                            {
                                loader == true && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><BigLoader />  </div>
                            }

                            {
                                loader == false && <div className="nk-block">
                                    <div className="row g-gs">
                                        <div className="col-xxl-6">
                                            <div className="row g-gs">
                                                <div className="col-lg-6 col-xxl-12">
                                                    <div className="card">
                                                        <div className="card-inner cardInnerBorder">
                                                            <div className="card-title-group align-start mb-0">
                                                                <div className="card-title">
                                                                    {/* <h6 className="title">Total Deposit</h6> */}
                                                                    <span className="sub-title">Total Deposits</span><br></br>
                                                                    <span className="amount bigAmount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                </div>
                                                                <div className="card-tools">
                                                                    <span className="card-hint" tooltip="Total Deposits" flow="left">
                                                                        <i className="icon ni ni-help-fill"></i>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Month</span>
                                                                        <span className="amount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Week</span>
                                                                        <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4" >
                                                                    {/*<div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                            </div>*/}

                                                                    <CanvasJSChart options={options} />
                                                                </div>
                                                            </div>


                                                            {/* <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">
                                                        <div className="nk-sale-data-group flex-md-nowrap g-4">
                                                        
                                                            <div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                             </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div> 
                                                        </div>
                                                        
                                                    </div>*/}
                                                        </div>
                                                    </div>
                                                </div>{/* .col */}
                                                <div className="col-lg-6 col-xxl-12">
                                                    <div className="card">
                                                        <div className="card-inner cardInnerBorder">
                                                            <div className="card-title-group align-start mb-0">
                                                                <div className="card-title">
                                                                    {/* <h6 className="title">Total Deposit</h6> */}
                                                                    <span className="sub-title">Total Withdraws</span><br></br>
                                                                    <span className="amount bigAmount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                </div>
                                                                <div className="card-tools" >
                                                                    <span className="card-hint" tooltip="Total Withdraws" flow="left">
                                                                        <i className="icon ni ni-help-fill"></i>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Month</span>
                                                                        <span className="amount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Week</span>
                                                                        <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    {/*<div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                            </div>*/}
                                                                    <CanvasJSChart options={options} />

                                                                </div>
                                                            </div>


                                                            {/* <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">
                                                        <div className="nk-sale-data-group flex-md-nowrap g-4">
                                                        
                                                            <div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                             </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div> 
                                                        </div>
                                                        
                                                    </div>*/}



                                                        </div>
                                                    </div>
                                                </div>{/* .col */}

                                                {/* <div className="col-lg-6 col-xxl-12">
                                            <div className="card">
                                                <div className="card-inner">
                                                    <div className="card-title-group align-start mb-2">
                                                        <div className="card-title">
                                                            <h6 className="title">Total Withdraw</h6> */}
                                                {/* <p>In last 30 days revenue from subscription.</p> */}
                                                {/* </div>
                                                        <div className="card-tools">
                                                            <em className="card-hint icon ni ni-help-fill" data-bs-toggle="tooltip" data-bs-placement="left" title="Revenue from subscription" />
                                                        </div>
                                                    </div>
                                                    <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-l-nowrap">
                                                        <div className="nk-sale-data-group flex-md-nowrap g-4">

                                                            <div className="nk-sale-data">
                                                                <span className="amount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>
                                                                <span className="sub-title">This Month</span>
                                                            </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div>
                                                        </div>
                                                        <div className="nk-sales-ck sales-revenue">
                                                            <canvas className="sales-bar-chart" id="salesRevenue" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}


                                            </div>{/* .row */}
                                        </div>{/* .col */}

                                        <div className="col-xxl-6">
                                            <div className="row g-gs">
                                                <div className="col-lg-6 col-xxl-12">
                                                    <div className="card">
                                                        <div className="card-inner cardInnerBorder">
                                                            <div className="card-title-group align-start mb-0">
                                                                <div className="card-title">
                                                                    {/* <h6 className="title">Total Deposit</h6> */}
                                                                    <span className="sub-title">Transfer Summary</span><br></br>
                                                                    <span className="amount bigAmount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                </div>
                                                                <div className="card-tools">
                                                                    <span className="card-hint" tooltip="Transfer Summary" flow="left">
                                                                        <i className="icon ni ni-help-fill"></i>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Month</span>
                                                                        <span className="amount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Week</span>
                                                                        <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    {/*<div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                            </div>*/}
                                                                    {/* <img src="images/grapphc.png" /> */}
                                                                    <CanvasJSChart options={options} />

                                                                </div>
                                                            </div>


                                                            {/* <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">
                                                        <div className="nk-sale-data-group flex-md-nowrap g-4">
                                                        
                                                            <div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                             </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div> 
                                                        </div>
                                                        
                                                    </div>*/}



                                                        </div>
                                                    </div>
                                                </div>{/* .col */}
                                                <div className="col-lg-6 col-xxl-12">
                                                    <div className="card">
                                                        <div className="card-inner cardInnerBorder">
                                                            <div className="card-title-group align-start mb-0">
                                                                <div className="card-title">
                                                                    {/* <h6 className="title">Total Deposit</h6> */}
                                                                    <span className="sub-title">Total Cash Balance in Account</span><br></br>
                                                                    <span className="amount bigAmount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                </div>
                                                                <div className="card-tools">
                                                                    <span className="card-hint" tooltip="Total Cash Balance in Account" flow="left">
                                                                        <i className="icon ni ni-help-fill"></i>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Month</span>
                                                                        <span className="amount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-6 col-md-4">
                                                                    <div className="nk-sale-data">
                                                                        <span className="sub-title">This Week</span>
                                                                        <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    {/*<div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                            </div>*/}
                                                                    {/* <img src="images/grapphc.png" /> */}
                                                                    <CanvasJSChart options={options} />

                                                                </div>
                                                            </div>


                                                            {/* <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">
                                                        <div className="nk-sale-data-group flex-md-nowrap g-4">
                                                        
                                                            <div className="nk-sales-ck sales-revenue">
                                                                <canvas className="sales-bar-chart" id="salesRevenue" />
                                                             </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div> 
                                                        </div>
                                                        
                                                    </div>*/}



                                                        </div>
                                                    </div>
                                                </div>{/* .col */}

                                                {/* <div className="col-lg-6 col-xxl-12">
                                            <div className="card">
                                                <div className="card-inner">
                                                    <div className="card-title-group align-start mb-2">
                                                        <div className="card-title">
                                                            <h6 className="title">Total Withdraw</h6> */}
                                                {/* <p>In last 30 days revenue from subscription.</p> */}
                                                {/* </div>
                                                        <div className="card-tools">
                                                            <em className="card-hint icon ni ni-help-fill" data-bs-toggle="tooltip" data-bs-placement="left" title="Revenue from subscription" />
                                                        </div>
                                                    </div>
                                                    <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-l-nowrap">
                                                        <div className="nk-sale-data-group flex-md-nowrap g-4">

                                                            <div className="nk-sale-data">
                                                                <span className="amount">14,299.59 <span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />16.93%</span></span>
                                                                <span className="sub-title">This Month</span>
                                                            </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div>
                                                            <div className="nk-sale-data">
                                                                <span className="amount">7,299.59 <span className="change up text-success"><em className="icon ni ni-arrow-long-up" />4.26%</span></span>
                                                                <span className="sub-title">This Week</span>
                                                            </div>
                                                        </div>
                                                        <div className="nk-sales-ck sales-revenue">
                                                            <canvas className="sales-bar-chart" id="salesRevenue" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                            </div>{/* .row */}
                                        </div>{/* .col */}


                                        {/* <div className='card card-bordered card-full'>
                                    <div className='card-inner'>
                                        <div className='card-title-group align-start mb-0'>
                                            <div className='card-title'>
                                                <h6 className='subtitle'>dsfds</h6>
                                            </div>
                                            <div className='card-tools'>
                                                dfsd
                                            </div>

                                            <div className='card-amount'>
                                                <span className='amount'>
                                                    56498454
                                                    <span className='currency currency-usd'>edde</span>
                                                </span>

                                                <span class="change up text-danger">
                                                    56498454
                                                    1.93%
                                                </span>
                                            </div>
                                            <div className='invest-data'>
                                                <div className='invest-data-amount g-2'>
                                                    <div className='invest-data-history'>
                                                        <div className='title'>This Month</div>
                                                        <div class="amount">
                                                            2,940.59 <span>usb</span>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className='invest-data-history'>
                                                    <div className='title'>This Month</div>
                                                    <div class="amount">
                                                        2,940.59 <span>usb</span>
                                                    </div>
                                                </div>

                                                <div className='invest-data-history'>
                                                    <div className='title'>This Month</div>
                                                    <div class="amount">
                                                        2,940.59 <span>usb</span>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    </div>

                                </div> */}



                                        <div className="col-xxl-8">
                                            <div className="card card-full">
                                                <div className="card-inner">
                                                    <div className="card-title-group">
                                                        <div className="card-title">
                                                            <h6 className="title"><span className="me-2"> Recent Transactions </span> <a href="#" className="link d-none d-sm-inline">See
                                                                History</a></h6>
                                                        </div>
                                                        <div className="card-tools">
                                                            <ul className="card-tools-nav">
                                                                <li className={recentTab == "paid" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("paid")}><span>Paid</span></a></li>
                                                                <li className={recentTab == "Pending" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("Pending")}><span>Pending</span></a></li>
                                                                <li className={recentTab == "All" ? "active" : ""} style={{ cursor: "pointer" }}><a onClick={() => setrecentTab("All")}><span>All</span></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-inner p-0 border-top">
                                                    <div className="nk-tb-list nk-tb-orders">
                                                        <div className="nk-tb-item nk-tb-head">
                                                            <div className="nk-tb-col tb-col-sm"><span>Customer</span></div>
                                                            <div className="nk-tb-col"><span>Order No.</span></div>
                                                            {/* <div className="nk-tb-col tb-col-md"><span>Date</span></div> */}
                                                            <div className="nk-tb-col"><span>Amount</span></div>
                                                            <div className="nk-tb-col tb-col-lg"><span>Description </span></div>

                                                            <div className="nk-tb-col"><span className="d-none d-sm-inline">Status</span></div>
                                                            <div className="nk-tb-col"><span>&nbsp;</span></div>
                                                        </div>

                                                        {
                                                            RecentTxn.length > 0 &&
                                                            RecentTxn?.map((data) => {
                                                                var stillUtcs = moment.utc(data.created_at).toDate();
                                                                var timeZones = moment(stillUtcs).local().format('YYYY-MM-DD HH:mm:ss A');
                                                                return (
                                                                    <>
                                                                        <div className="nk-tb-item">

                                                                            <div className="nk-tb-col tb-col-sm">
                                                                                <div className="user-card">
                                                                                    <div className="user-avatar user-avatar-sm bg-purple">
                                                                                        <span>AB</span>
                                                                                    </div>
                                                                                    <div className="user-name">
                                                                                        {
                                                                                            // data?.txn_type == "Debit" && 
                                                                                            <div class="user-info" style={{ cursor: "pointer", color: "primary" }}
                                                                                            // onClick={() => GoToUserDetail(data.client_id)}
                                                                                            >
                                                                                                <span class="tb-lead" style={{ textTransform: "capitalize" }}>abu bin istiyak<span class="dot dot-success d-md-none ms-1"></span></span>
                                                                                                <span>{data.sender?.phone}9644940027</span>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="nk-tb-col">
                                                                                <span className="tb-lead text-primary"><a ><span style={{ cursor: "pointer" }}
                                                                                // onClick={() => GoTransDetail(data.id, data.client_id)}
                                                                                >{data?.txn_id}</span>
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
                                                                            {/* <div className="nk-tb-col tb-col-md">
                                                                                <span className="tb-sub">{timeZones}</span>
                                                                            </div> */}

                                                                            <div className="nk-tb-col">
                                                                                <span className="tb-sub tb-amount">{data.currency_symbol}
                                                                                    <span>{data.amount}</span></span>
                                                                            </div>
                                                                            <div className="nk-tb-col tb-col-lg">
                                                                                <span className="tb-sub">{data.title}</span>
                                                                            </div>
                                                                            <div className="nk-tb-col">
                                                                                {
                                                                                    data.payment_status == "pending" && <span className="badge badge-dot badge-dot-xs bg-warning">pending</span>
                                                                                }
                                                                                {
                                                                                    data.payment_status == "success" && <span className="badge badge-dot badge-dot-xs bg-success">success</span>
                                                                                }
                                                                                {
                                                                                    data.payment_status == "failed" && <span className="badge badge-dot badge-dot-xs bg-danger">failed</span>
                                                                                }
                                                                                {/* // <span className="badge badge-dot badge-dot-xs bg-success">Paid</span> */}
                                                                            </div>
                                                                            <div className="nk-tb-col nk-tb-col-action">
                                                                                <div className="dropdown">
                                                                                    <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                                                                        <ul className="link-list-plain">
                                                                                            <li><a href="#">View</a></li>
                                                                                            <li><a href="#">Invoice</a></li>
                                                                                            <li><a href="#">Print</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                )
                                                            })

                                                        }
                                                    </div>
                                                </div>
                                                <div className="card-inner-sm border-top text-center d-sm-none">
                                                    <a href="#" className="btn btn-link btn-block">See History</a>
                                                </div>
                                            </div>{/* .card */}
                                        </div>{/* .col */}
                                        <div className="col-md-6 col-xxl-4">
                                            <div className="card card-full">
                                                <div className="card-inner border-bottom">
                                                    <div className="card-title-group">
                                                        <div className="card-title">
                                                            <h6 className="title">Recent Activities</h6>
                                                        </div>
                                                        <div className="card-tools">
                                                            <ul className="card-tools-nav">
                                                                <li><a href="#"><span>Cancel</span></a></li>
                                                                <li className="active"><a href="#"><span>All</span></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="nk-activity">
                                                    <li className="nk-activity-item">
                                                        <div className="nk-activity-media user-avatar bg-success"><img src="./images/avatar/c-sm.jpg" alt /></div>
                                                        <div className="nk-activity-data">
                                                            <div className="label">Keith Jensen requested to Widthdrawl.
                                                            </div>
                                                            <span className="time">2 hours ago</span>
                                                        </div>
                                                    </li>
                                                    <li className="nk-activity-item">
                                                        <div className="nk-activity-media user-avatar bg-warning">HS</div>
                                                        <div className="nk-activity-data">
                                                            <div className="label">Harry Simpson placed a Order.</div>
                                                            <span className="time">2 hours ago</span>
                                                        </div>
                                                    </li>
                                                    <li className="nk-activity-item">
                                                        <div className="nk-activity-media user-avatar bg-azure">SM</div>
                                                        <div className="nk-activity-data">
                                                            <div className="label">Stephanie Marshall got a huge bonus.
                                                            </div>
                                                            <span className="time">2 hours ago</span>
                                                        </div>
                                                    </li>
                                                    <li className="nk-activity-item">
                                                        <div className="nk-activity-media user-avatar bg-purple"><img src="./images/avatar/d-sm.jpg" alt /></div>
                                                        <div className="nk-activity-data">
                                                            <div className="label">Nicholas Carr deposited funds.</div>
                                                            <span className="time">2 hours ago</span>
                                                        </div>
                                                    </li>
                                                    <li className="nk-activity-item">
                                                        <div className="nk-activity-media user-avatar bg-pink">TM</div>
                                                        <div className="nk-activity-data">
                                                            <div className="label">Timothy Moreno placed a Order.</div>
                                                            <span className="time">2 hours ago</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{/* .card */}
                                        </div>{/* .col */}
                                        <div className="col-md-6 col-xxl-4">
                                            <div className="card card-full">
                                                <div className="card-inner-group">
                                                    <div className="card-inner">
                                                        <div className="card-title-group">
                                                            <div className="card-title">
                                                                <h6 className="title">New Users</h6>
                                                            </div>
                                                            <div className="card-tools">
                                                                <span className="link" onClick={() => { navigate("/users") }} style={{ cursor: "pointer" }}>View
                                                                    All</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        userdata.map((data) => {
                                                            console.log(data, "datat")
                                                            return (
                                                                <>
                                                                    <div className="card-inner card-inner-md">
                                                                        <div className="user-card">
                                                                            <div className="user-avatar bg-primary-dim">
                                                                                <Image src={data?.avatar} />
                                                                            </div>
                                                                            <div className="user-info" onClick={() => { Custmerdetails(data.id) }} style={{ cursor: "pointer" }}>
                                                                                <span className="lead-text">{data?.first_name} {data?.middle_name} {data?.last_name}</span>
                                                                                <span className="sub-text">{data?.email == null ? <span>N/A</span> : data?.email}</span>
                                                                            </div>
                                                                            <div className="user-action">
                                                                                <div className="drodown">
                                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1" data-bs-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h" /></a>
                                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                                        <ul className="link-list-opt no-bdr">
                                                                                            <li onClick={() => { Custmerdetails(data.id) }}><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }}>View Details</span></a></li>
                                                                                            <li><a ><em className="icon ni ni-notify" /><span>Push
                                                                                                Notification</span></a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }


                                                </div>
                                            </div>{/* .card */}
                                        </div>{/* .col */}
                                        <div className="col-lg-6 col-xxl-4">
                                            <div className="card h-100">
                                                <div className="card-inner border-bottom">
                                                    <div className="card-title-group">
                                                        <div className="card-title">
                                                            <h6 className="title">Support Requests</h6>
                                                        </div>
                                                        <div className="card-tools">
                                                            <a href="#" className="link">All Tickets</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="nk-support">
                                                    {
                                                        appointment.length > 0 && appointment.map((data) => {

                                                            // const date = data.date;
                                                            // const time = data.time;
                                                            // const combinedDateTime = `${date}T${time}.000Z`;
                                                            // const combinedDateTimeString1 = String(combinedDateTime);

                                                            // console.log(combinedDateTimeString1, "????????????");
                                                            // Given time
                                                            // const tms = combinedDateTime



                                                            console.log(data, "data")
                                                            return (
                                                                <>
                                                                    <li className="nk-support-item">
                                                                        <div className="user-avatar">
                                                                            <Image src={data?.image} />
                                                                        </div>
                                                                        <div className="nk-support-content">
                                                                            <div className="title">
                                                                                <span>{data?.name} </span>{data.is_complete == 0 ? <span className="badge badge-dot badge-dot-xs bg-warning ms-1">Pending</span> : <span className="badge badge-dot badge-dot-xs bg-success ms-1">Success</span>}
                                                                            </div>
                                                                            <p>{data?.reason}</p>
                                                                            <span className="time">{data?.time}</span>
                                                                        </div>
                                                                    </li>
                                                                </>
                                                            )

                                                        })
                                                    }


                                                </ul>
                                            </div>{/* .card */}
                                        </div>{/* .col */}

                                        <div className="col-lg-6 col-xxl-4">
                                            <div className="card h-100">
                                                <div className="card-inner border-bottom">
                                                    <div className="card-title-group">
                                                        <div className="card-title">
                                                            <h6 className="title">Notifications</h6>
                                                        </div>
                                                        <div className="card-tools">
                                                            <a href="#" className="link">View All</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-inner">
                                                    <div className="timeline">
                                                        <h6 className="timeline-head"> {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h6>
                                                        <ul className="timeline-list">
                                                            {
                                                                notificatation?.map((data) => {
                                                                    console.log(data.created_at)
                                                                    const created_at = new Date(data.created_at);

                                                                    // Get the time in AM/PM format
                                                                    const timeAMPM = created_at.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                                                                    const options = { day: 'numeric', month: 'short' };
                                                                    const formattedDate = created_at.toLocaleDateString(undefined, options);

                                                                    console.log(formattedDate);
                                                                    return (
                                                                        <>
                                                                            <li className="timeline-item">
                                                                                <div className="timeline-status bg-pink" />
                                                                                <div className="timeline-date">{formattedDate} <em className="icon ni ni-alarm-alt" /></div>
                                                                                <div className="timeline-data">
                                                                                    <h6 className="timeline-title">{data?.title}
                                                                                    </h6>
                                                                                    <div className="timeline-des">
                                                                                        <p>{data.body}</p>
                                                                                        <span className="time">{timeAMPM}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </li>

                                                                        </>
                                                                    )
                                                                })
                                                            }


                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>{/* .card */}
                                        </div>{/* .col */}
                                    </div>{/* .row */}
                                </div>
                            }



                        </div>
                    </div>
                </div>
            </div>
        </Container >
    );
}

export default Dashboard;
