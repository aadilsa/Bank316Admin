import React, { useEffect, useState } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
import Container from '../../component/container';
import axios from 'axios';
import BaseUrl from '../../API/config';
// import BigLoader from '../Loader/Loader'
import BigLoader from '../Loader/BigLoader';
import { Image } from 'antd';
import { GetTotaluserdata } from '../../API/UserApi/UserApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useRef } from 'react';
// const [isHovered, setHovered] = useState(false);
import { GetGraphdata, Getuser_employeeCount, GetAppointments } from '../../API/Dashboard API/DashboardApi';
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

    const [appointment, setappointment] = useState([])
    const [graphbutton, setgraphbutton] = useState("Last 1 Year")
    // var CanvasJS = CanvasJSReact.CanvasJS;
    // var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [countdays, setcountdays] = useState("")
    const [buttontxt, setbuttontxt] = useState("Total Count")


    // const { CanvasJSChart } = CanvasJSReact;
    const navigate = useNavigate()
    useEffect(() => {
        setgraph("true")
    }, [])


    const GetTotalCount = async () => {
        try {
            const totaldata = await Getuser_employeeCount(token, countdays)
            console.log(totaldata, "GetTotalCount")
            if (totaldata?.status == true) {
                setloader(true)
                setusercount(totaldata?.Totaluser)
                setemployeecount(totaldata?.TotalEmployee)
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
        GetTotalCount()
    }, [countdays])



    const Get_graph_data = async () => {
        try {
            const totaldata = await GetGraphdata(token, graphMonth)
            if (totaldata?.status == true) {
                setgraphdata(totaldata?.data)
            }
            else if (totaldata?.response?.data?.message == "jwt expired") {
                localStorage.removeItem('logintoken')
                navigate("/")
            }
            else {

            }
        }
        catch (err) {
            console.log(err, "ddddddddddddddddddddddddddd")
        }
    }
    useEffect(() => {
        Get_graph_data()
    }, [graphMonth])



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
                    { label: "Apple", y: 10, indexLabel: " ", color: "silver" },
                    { label: "Orange", y: 15, indexLabel: " ", color: "silver" },
                    { label: "Banana", y: 25, indexLabel: " ", color: "silver" },
                    { label: "Mango", y: 30, indexLabel: " ", color: "silver" },
                    { label: "Grape", y: 28, indexLabel: " ", color: "silver" },
                    { label: "man", y: 38, indexLabel: " ", color: "green" }
                ],
                lineThickness: 0,
                gridThickness: 0,
                tickLength: 0, // Set lineThickness to 0 to remove lines around columns
            }
        ], dataPointWidth: 10,
    };







    // Now use the options object to create your chart



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
                                                                    <em className="card-hint icon ni ni-help-fill" data-bs-toggle="tooltip" data-bs-placement="left" title="Revenue from subscription" />
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
                                                                    <em className="card-hint icon ni ni-help-fill" data-bs-toggle="tooltip" data-bs-placement="left" title="Revenue from subscription" />
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
                                                                    <em className="card-hint icon ni ni-help-fill" data-bs-toggle="tooltip" data-bs-placement="left" title="Revenue from subscription" />
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
                                                                    <em className="card-hint icon ni ni-help-fill" data-bs-toggle="tooltip" data-bs-placement="left" title="Revenue from subscription" />
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
                                                                <li><a href="#"><span>Paid</span></a></li>
                                                                <li><a href="#"><span>Pending</span></a></li>
                                                                <li className="active"><a href="#"><span>All</span></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-inner p-0 border-top">
                                                    <div className="nk-tb-list nk-tb-orders">
                                                        <div className="nk-tb-item nk-tb-head">
                                                            <div className="nk-tb-col"><span>Order No.</span></div>
                                                            <div className="nk-tb-col tb-col-sm"><span>Customer</span></div>
                                                            <div className="nk-tb-col tb-col-md"><span>Date</span></div>
                                                            <div className="nk-tb-col tb-col-lg"><span>Ref</span></div>
                                                            <div className="nk-tb-col"><span>Amount</span></div>
                                                            <div className="nk-tb-col"><span className="d-none d-sm-inline">Status</span></div>
                                                            <div className="nk-tb-col"><span>&nbsp;</span></div>
                                                        </div>
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead"><a href="#">#95954</a></span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-sm">
                                                                <div className="user-card">
                                                                    <div className="user-avatar user-avatar-sm bg-purple">
                                                                        <span>AB</span>
                                                                    </div>
                                                                    <div className="user-name">
                                                                        <span className="tb-lead">Abu Bin Ishtiyak</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub">02/11/2020</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-lg">
                                                                <span className="tb-sub text-primary">SUB-2309232</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-sub tb-amount">4,596.75
                                                                    <span>USD</span></span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
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
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead"><a href="#">#95850</a></span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-sm">
                                                                <div className="user-card">
                                                                    <div className="user-avatar user-avatar-sm bg-azure">
                                                                        <span>DE</span>
                                                                    </div>
                                                                    <div className="user-name">
                                                                        <span className="tb-lead">Desiree Edwards</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub">02/02/2020</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-lg">
                                                                <span className="tb-sub text-primary">SUB-2309154</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-sub tb-amount">596.75
                                                                    <span>USD</span></span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="badge badge-dot badge-dot-xs bg-danger">Canceled</span>
                                                            </div>
                                                            <div className="nk-tb-col nk-tb-col-action">
                                                                <div className="dropdown">
                                                                    <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                                                        <ul className="link-list-plain">
                                                                            <li><a href="#">View</a></li>
                                                                            <li><a href="#">Remove</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead"><a href="#">#95812</a></span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-sm">
                                                                <div className="user-card">
                                                                    <div className="user-avatar user-avatar-sm bg-warning">
                                                                        <img src="./images/avatar/b-sm.jpg" alt />
                                                                    </div>
                                                                    <div className="user-name">
                                                                        <span className="tb-lead">Blanca Schultz</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub">02/01/2020</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-lg">
                                                                <span className="tb-sub text-primary">SUB-2309143</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-sub tb-amount">199.99
                                                                    <span>USD</span></span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
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
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead"><a href="#">#95256</a></span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-sm">
                                                                <div className="user-card">
                                                                    <div className="user-avatar user-avatar-sm bg-purple">
                                                                        <span>NL</span>
                                                                    </div>
                                                                    <div className="user-name">
                                                                        <span className="tb-lead">Naomi Lawrence</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub">01/29/2020</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-lg">
                                                                <span className="tb-sub text-primary">SUB-2305684</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-sub tb-amount">1099.99
                                                                    <span>USD</span></span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
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
                                                        <div className="nk-tb-item">
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead"><a href="#">#95135</a></span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-sm">
                                                                <div className="user-card">
                                                                    <div className="user-avatar user-avatar-sm bg-success">
                                                                        <span>CH</span>
                                                                    </div>
                                                                    <div className="user-name">
                                                                        <span className="tb-lead">Cassandra Hogan</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub">01/29/2020</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-lg">
                                                                <span className="tb-sub text-primary">SUB-2305564</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-sub tb-amount">1099.99
                                                                    <span>USD</span></span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="badge badge-dot badge-dot-xs bg-warning">Due</span>
                                                            </div>
                                                            <div className="nk-tb-col nk-tb-col-action">
                                                                <div className="dropdown">
                                                                    <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                                                        <ul className="link-list-plain">
                                                                            <li><a href="#">View</a></li>
                                                                            <li><a href="#">Invoice</a></li>
                                                                            <li><a href="#">Notify</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                            console.log(data, "data")
                                                            return (
                                                                <>
                                                                    <li className="nk-support-item">
                                                                        <div className="user-avatar">
                                                                            <Image src={data.avatar} />
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
                                                            {/* <h6 className="title">Notifications</h6> */}
                                                        </div>
                                                        <div className="card-tools">
                                                            <a href="#" className="link">View All</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="card-inner">
                                            <div className="timeline">
                                                <h6 className="timeline-head">November, 2019</h6>
                                                <ul className="timeline-list">
                                                    <li className="timeline-item">
                                                        <div className="timeline-status bg-primary is-outline">
                                                        </div>
                                                        <div className="timeline-date">13 Nov <em className="icon ni ni-alarm-alt" /></div>
                                                        <div className="timeline-data">
                                                            <h6 className="timeline-title">Submitted KYC Application
                                                            </h6>
                                                            <div className="timeline-des">
                                                                <p>Re-submitted KYC Application form.</p>
                                                                <span className="time">09:30am</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="timeline-item">
                                                        <div className="timeline-status bg-primary" />
                                                        <div className="timeline-date">13 Nov <em className="icon ni ni-alarm-alt" /></div>
                                                        <div className="timeline-data">
                                                            <h6 className="timeline-title">Submitted KYC Application
                                                            </h6>
                                                            <div className="timeline-des">
                                                                <p>Re-submitted KYC Application form.</p>
                                                                <span className="time">09:30am</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="timeline-item">
                                                        <div className="timeline-status bg-pink" />
                                                        <div className="timeline-date">13 Nov <em className="icon ni ni-alarm-alt" /></div>
                                                        <div className="timeline-data">
                                                            <h6 className="timeline-title">Submitted KYC Application
                                                            </h6>
                                                            <div className="timeline-des">
                                                                <p>Re-submitted KYC Application form.</p>
                                                                <span className="time">09:30am</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
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
