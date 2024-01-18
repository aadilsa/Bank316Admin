import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';



const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(true);


    const [activedrop, setActivedrop] = useState(false);
    const [TransDrop, setTransDrop] = useState(false)
    const [DashboardDrop, setDashboardDrop] = useState(false)
    const [Recipients, setRecipients] = useState(false)
    const [rolesDrop, setrolesDrop] = useState(false)
    const [ManagementDrop, setManagementDrop] = useState(false)
    // const [togelltran, setTogellTran] = useState(false);

    const [onboardingSubmenu, setOnboardingSubmenu] = useState(false)

    // const handleSideClick = () => {
    //     setActiveMenu(!activeMenu);
    // };
    const location = useLocation();
    const [tab, settab] = useState("")
    const [recipienttab, setrecipientstab] = useState("")
    const [roletab, setroletab] = useState("")
    // const [tabTrans, settabTrans] = useState("")


    // useEffect(() => {
    //     setTransDrop(true)
    //     setrolesDrop(true)
    // }, [])
    useEffect(() => {
        settab(location.pathname)
    }, [location.pathname])


    useEffect(() => {
        setroletab(location.pathname)
    }, [location.pathname])

    useEffect(() => {
        setrecipientstab(location.pathname)
    }, [location.pathname])

    // useEffect(() => {
    //     settabTrans(location.pathname)
    // }, [location.pathname])

    const [BNPLSubmenu, setBNPLSubmenu] = useState(false);
    const showSubMenuBNPL = async () => {
        var dropdown = document.getElementsByClassName("dropdown-contain");
        let ele = [...dropdown]

        if (ele[0].style.display == "none") {
            dropdown[0].style.display = "block"
            setBNPLSubmenu(true)
        } else {
            dropdown[0].style.display = "none"
            setBNPLSubmenu(false)
        }
    }


    // const toggleDropdown = () => {
    //     setActivedrop(!activedrop);
    // };



    const TransactionDropdown = () => {
        setTransDrop(!TransDrop);
    };

    const DashboardDropdown = () => {
        setDashboardDrop(!DashboardDrop);
    };


    const ManagementDropdown = () => {


        setManagementDrop(!ManagementDrop);
    };

    const RecipientsDropdown = () => {
        setRecipients(!Recipients);
    };

    const RoleactionDropdown = () => {
        setrolesDrop(!rolesDrop);
    };

    // const toggleTransa = () => {
    //     setTogellTran(!togelltran);
    // };


    // useEffect(() => {
    //     setActivedrop(false);
    // }, []);


    // useEffect(() => {
    //     if (tab == "/manage-roles" || tab == "/manage-user") {
    //         setActivedrop(true);
    //     }
    //     else {
    //         setActivedrop(false);
    //     }

    // }, [tab])



    // useEffect(() => {
    //     if (roletab == "/manage-roles" || roletab == "/manage-user") {
    //         setrolesDrop(true);
    //     }
    //     else {
    //         setrolesDrop(false);
    //     }

    // }, [roletab])



    useEffect(() => {
        if (tab == "/admin/dashboard" || tab == "/admin/balance-dashboard" || tab == "/admin/users-dashboard") {
            setDashboardDrop(true);
        }
        else {
            setDashboardDrop(false);
        }
    }, [tab])



    useEffect(() => {
        if (tab == "/admin/currencies" || tab == "/admin/currency-bank" || tab == "/admin/charges" || tab == "/admin/faq") {
            setManagementDrop(true);
        }
        else {
            setManagementDrop(false);
        }
    }, [tab])



    useEffect(() => {
        if (tab == "/admin/allCurrency-transaction" || tab == "/admin/allCustom-transaction") {
            setTransDrop(true);
        }
        else {
            setTransDrop(false);
        }
    }, [tab])



    useEffect(() => {
        if (recipienttab == "/inside-recipients" || recipienttab == "/outside-recipients") {
            setRecipients(true);
        }
        else {
            setRecipients(false);
        }
    }, [recipienttab])

    // useEffect(() => {
    //     if (roletab == "/manage-user") {
    //         setrolesDrop(true);
    //     }
    // }, [roletab])


    useEffect(() => {
        if (roletab == "/manage-roles" || roletab == "/manage-employee") {
            setrolesDrop(true);
        }
        else {
            setrolesDrop(false);

        }

    }, [roletab])


    // useEffect(() => {
    //     if (tab == "/admin/allCurrency-transaction" || tab == "/admin/allCustom-transaction") {
    //         togelltran(true);
    //     }
    //     else {
    //         togelltran(false);
    //     }

    // }, [tab])
    // localStorage.setItem('side', true);

    if (localStorage.getItem('side') === null) {
        localStorage.setItem('side', true);
        // setActiveMenu(true)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('side'));
        setActiveMenu(data)
    }, [])

    const toggle = () => {
        const data = JSON.parse(localStorage.getItem('side'));
        // console.log(data, "daaaaaaaaa");

        // Toggle the value
        localStorage.setItem('side', !data);

        var storedValue = JSON.parse(localStorage.getItem('side'));
        console.log(storedValue, "storedValue")
        setActiveMenu(storedValue)
        // console.log(storedValue, "storedValue get");
    }
    // useEffect(() => {
    // 
    // }, [storedValue])
    // console.log(object)
    console.log(activeMenu, "llllllllll")
    return (



        <div className={activeMenu == true ? "nk-sidebar nk-sidebar-fixed is-light" : "nk-sidebar nk-sidebar-fixed is-light is-compact"} data-content="sidebarMenu">
            <div>{activeMenu == true ? console.log("true") : console.log("false")} </div>
            <div className="nk-sidebar-element nk-sidebar-head">
                <div className="nk-sidebar-brand">
                    <a className="logo-link nk-sidebar-logo">
                        <img className="logo-light logo-img" src="./images/Bank316money.png" srcSet="./images/Bank316money.png" alt="logo" />
                        <img className="logo-dark logo-img" src="./images/Bank316money.png" srcSet="./images/Bank316money.png" alt="lok" />
                        <img className="logo-small logo-img logo-img-small" src="./images/minilogo.png" srcSet="./images/minilogo.png" alt="logo-small" />
                    </a>
                </div>
                <div className="nk-menu-trigger me-n2" >
                    <a className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left" /></a>
                    <a className={activeMenu == true ? "nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex compact active" : "nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex "} data-target="sidebarMenu"><em className="icon ni ni-menu" onClick={toggle} /></a>
                    {/* <div>{activeMenu == true ? console.log("true") : console.log("false")} </div> */}
                </div>
            </div>
            <div className="nk-sidebar-element">
                <div className="nk-sidebar-content">
                    <div className="nk-sidebar-menu" data-simplebar>
                        <ul className="nk-menu">
                            <li className="nk-menu-heading">
                                <h6 className="overline-title text-primary-alt">Menu</h6>
                            </li>

                            {/* <li className={tab == "/dashboard" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/dashboard"} className={location.pathname == "/users" ? "nk-menu-link" : "nk-menu-link active current-page"}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-dashboard-fill"></em></span>
                                    <span className="nk-menu-text">Dashboard</span>
                                </Link>
                            </li> */}


                            {/* <li className={rolesDrop == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={RoleactionDropdown} style={{ cursor: "pointer" }}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-tile-thumb-fill"></em></span>
                                    <span className="nk-menu-text">Manage User</span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: rolesDrop ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className={tab == "/manage-roles" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/manage-roles" className="nk-menu-link"><span className="nk-menu-text">Roles</span></Link>
                                    </li>
                                    <li className={tab == "/manage-employee" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/manage-employee" className="nk-menu-link"><span className="nk-menu-text">Users</span></Link>
                                    </li>
                                </ul>
                            </li> */}


                            <li className={DashboardDrop == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={DashboardDropdown} style={{ cursor: "pointer" }}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-dashboard-fill"></em></span>
                                    <span className="nk-menu-text">Dashboards</span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: DashboardDrop ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className={tab == "/admin/dashboard" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/dashboard" className="nk-menu-link"><span className="nk-menu-text">Main Dashboard</span></Link>
                                    </li>
                                    <li className={tab == "/admin/balance-dashboard" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/balance-dashboard" className="nk-menu-link"><span className="nk-menu-text">Balance Dashboard</span></Link>
                                    </li>

                                    <li className={tab == "/admin/users-dashboard" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/users-dashboard" className="nk-menu-link"><span className="nk-menu-text">Users Dashboard</span></Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={tab == "/admin/deposits" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/admin/deposits"} className={"nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-layers-fill" /></span>
                                    <span className="nk-menu-text">Deposits</span>
                                </Link>
                            </li>

                            <li className={tab == "/admin/withdrawals" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/admin/withdrawals"} className={"nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-layers-fill" /></span>
                                    <span className="nk-menu-text">Withdrawals</span>
                                </Link>
                            </li>
                            {/* 
                            <li className={tab == "/users" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/users"} className={tab == `/users` ? "nk-menu-link active current-page" : "nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-user-list-fill" /></span>
                                    <span className="nk-menu-text">Customers</span>
                                </Link>
                            </li> */}

                            {/* <li className={tab == "/employees" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/employees"} className={tab == "/users" ? "nk-menu-link active" : "nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-users-fill" /></span>
                                    <span className="nk-menu-text">Employees</span>
                                </Link>
                            </li> */}
                            {/* <li className={tab == "/admin/currencies" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/admin/currencies"} className={"nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-coin-alt" /></span>
                                    <span className="nk-menu-text">Currency</span>
                                </Link>
                            </li>

                            <li className={tab == "/admin/currency-bank" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/admin/currency-bank"} className={"nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-money" /></span>
                                    <span className="nk-menu-text"> Bank Account</span>
                                </Link>
                            </li> */}


                            <li className={ManagementDrop == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={ManagementDropdown} style={{ cursor: "pointer" }}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-dashboard-fill"></em></span>
                                    <span className="nk-menu-text">Management</span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: ManagementDrop ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className={tab == "/admin/currencies" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/currencies" className="nk-menu-link"><span className="nk-menu-text">Currencies </span></Link>
                                    </li>
                                    <li className={tab == "/admin/currency-bank" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/currency-bank" className="nk-menu-link"><span className="nk-menu-text">Funding Accounts </span></Link>
                                    </li>
                                    <li className={tab == "/admin/charges" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/charges" className="nk-menu-link"><span className="nk-menu-text">Charges </span></Link>
                                    </li>

                                    <li className={tab == "/admin/faq" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/faq" className="nk-menu-link"><span className="nk-menu-text">FAQs</span></Link>
                                    </li>
                                </ul>
                            </li>


                            {/* 
                            <li className={tab == "/admin/currencies" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/admin/currencies"} className={"nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-cc-alt2-fill" /></span>
                                    <span className="nk-menu-text"> Payment Charges</span>
                                </Link>
                            </li> */}




                            {/* <li className={tab == "/role" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/role"} className={tab == "/role" ? "nk-menu-link active" : "nk-menu-link "}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-block-over"></em></span>
                                    <span className="nk-menu-text">Roles & Permission</span>
                                </Link>
                            </li> */}


                            {/* 
                            <li className={activedrop == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={toggleDropdown}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-tile-thumb-fill"></em></span>
                                    <span className="nk-menu-text">Manage User</span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: activedrop ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className="nk-menu-item">
                                        <Link to="/manage-roles" className="nk-menu-link"><span className="nk-menu-text"> Roles</span></Link>
                                    </li>
                                    <li className="nk-menu-item">
                                        <Link to="/manage-employee" className="nk-menu-link"><span className="nk-menu-text">Users</span></Link>
                                    </li>
                                </ul>
                            </li> */}


                            <li className={rolesDrop == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={RoleactionDropdown} style={{ cursor: "pointer" }}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-tile-thumb-fill"></em></span>
                                    <span className="nk-menu-text">Manage User</span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: rolesDrop ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className={tab == "/manage-roles" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/manage-roles" className="nk-menu-link"><span className="nk-menu-text">Roles</span></Link>
                                    </li>
                                    <li className={tab == "/manage-employee" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/manage-employee" className="nk-menu-link"><span className="nk-menu-text">Users</span></Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={TransDrop == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={TransactionDropdown} style={{ cursor: "pointer" }}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-repeat"></em></span>
                                    <span className="nk-menu-text"> Wallets</span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: TransDrop ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className={tab == "/admin/allCurrency-transaction" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/allCurrency-transaction" className="nk-menu-link"><span className="nk-menu-text">Currency Wallet TXN</span></Link>
                                    </li>
                                    <li className={tab == "/admin/allCustom-transaction" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/admin/allCustom-transaction" className="nk-menu-link"><span className="nk-menu-text">Custom Wallet TXN
                                        </span></Link>
                                    </li>
                                </ul>
                            </li>



                            <li className={Recipients == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={RecipientsDropdown} style={{ cursor: "pointer" }}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-template"></em></span>
                                    <span className="nk-menu-text">All Recipients</span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: Recipients ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className={recipienttab == "/inside-recipients" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/inside-recipients" className="nk-menu-link"><span className="nk-menu-text">Inside Recipients</span></Link>
                                    </li>
                                    <li className={recipienttab == "/outside-recipients" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/outside-recipients" className="nk-menu-link"><span className="nk-menu-text">Outeside Recipients</span></Link>
                                    </li>
                                </ul>
                            </li>



                            <li className={Recipients == true ? "nk-menu-item has-sub active" : "nk-menu-item has-sub"} >
                                <a className="nk-menu-link nk-menu-toggle" onClick={RecipientsDropdown} style={{ cursor: "pointer" }}>
                                    <span className="nk-menu-icon"><em className="icon ni ni-template"></em></span>
                                    <span className="nk-menu-text">Help and Support </span>
                                </a>
                                <ul className="nk-menu-sub dropdown-contain" style={{ display: Recipients ? 'block' : 'none', marginLeft: 10, paddingLeft: 2 }}>
                                    <li className={recipienttab == "/inside-recipients" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/inside-recipients" className="nk-menu-link"><span className="nk-menu-text">Support Chat</span></Link>
                                    </li>
                                    <li className={recipienttab == "/outside-recipients" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                        <Link to="/outside-recipients" className="nk-menu-link"><span className="nk-menu-text">Call Bookings</span></Link>
                                    </li>
                                </ul>
                            </li>
                            {/* 
                            <li className={tab == "/transactions" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/transactions"} className="nk-menu-link ">
                                    <span className="nk-menu-icon"><em className="icon ni ni-opt-alt-fill"></em></span>
                                    <span className="nk-menu-text">All Transaction</span>
                                </Link>
                            </li> */}

                            <li className={tab == "/wallet-icon" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/wallet-icon"} className="nk-menu-link ">
                                    <span className="nk-menu-icon"><em className="icon ni ni-dot-box-fill"></em></span>
                                    <span className="nk-menu-text">Wallet Icon</span>
                                </Link>
                            </li>

                            {/* <li className={tab == "/admin/faq" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/admin/faq"} className="nk-menu-link ">
                                    <span className="nk-menu-icon"><em className="icon ni ni-dot-box-fill"></em></span>
                                    <span className="nk-menu-text">FAQ</span>
                                </Link>
                            </li> */}

                            <li className={tab == "/account-managers" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/account-managers"} className="nk-menu-link ">
                                    <span className="nk-menu-icon"><em className="icon ni ni-dot-box-fill"></em></span>
                                    <span className="nk-menu-text">Account Managers</span>
                                </Link>
                            </li>


                            <li className={tab == "/setting" ? "nk-menu-item active current-page" : "nk-menu-item"}>
                                <Link to={"/setting"} className="nk-menu-link ">
                                    <span className="nk-menu-icon"><em className="icon ni ni-opt-alt-fill"></em></span>
                                    <span className="nk-menu-text">Settings</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div >
        </div >


        // <div className="nk-sidebar nk-sidebar-fixed is-light " data-content="sidebarMenu">
        //     <div className="nk-sidebar-element nk-sidebar-head">
        //         <div className="nk-sidebar-brand">
        //             <a href="html/index.html" className="logo-link nk-sidebar-logo">
        //                 <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
        //                 <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
        //                 <img className="logo-small logo-img logo-img-small" src="./images/logo-small.png" srcSet="./images/logo-small2x.png 2x" alt="logo-small" />
        //             </a>
        //         </div>
        //         <div className="nk-menu-trigger me-n2">
        //             <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left" /></a>
        //             <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em className="icon ni ni-menu" /></a>
        //         </div>
        //     </div>{/* .nk-sidebar-element */}
        //     <div className="nk-sidebar-element">
        //         <div className="nk-sidebar-content">
        //             <div className="nk-sidebar-menu" data-simplebar>
        //                 <ul className="nk-menu">
        //                     <li className="nk-menu-heading">
        //                         <h6 className="overline-title text-primary-alt">Use-Case Preview</h6>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/ecommerce/index.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-bag" /></span>
        //                             <span className="nk-menu-text">E-Commerce Panel</span><span className="nk-menu-badge">HOT</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/lms/index.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-book-read" /></span>
        //                             <span className="nk-menu-text">LMS Panel</span><span className="nk-menu-badge">HOT</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-heading">
        //                         <h6 className="overline-title text-primary-alt">Dashboards</h6>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/index.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-cart-fill" /></span>
        //                             <span className="nk-menu-text">Default</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/index-sales.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-activity-round-fill" /></span>
        //                             <span className="nk-menu-text">Sales</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/index-analytics.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-growth-fill" /></span>
        //                             <span className="nk-menu-text">Analytics</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-heading">
        //                         <h6 className="overline-title text-primary-alt">Applications</h6>
        //                     </li>{/* .nk-menu-heading */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-tile-thumb-fill" /></span>
        //                             <span className="nk-menu-text">Projects</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/project-card.html" className="nk-menu-link"><span className="nk-menu-text">Project Cards</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/project-list.html" className="nk-menu-link"><span className="nk-menu-text">Project List</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-users-fill" /></span>
        //                             <span className="nk-menu-text">User Manage</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/user-list-default.html" className="nk-menu-link"><span className="nk-menu-text">User List - Default</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/user-list-regular.html" className="nk-menu-link"><span className="nk-menu-text">User List - Regular</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/user-list-compact.html" className="nk-menu-link"><span className="nk-menu-text">User List - Compact</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/user-details-regular.html" className="nk-menu-link"><span className="nk-menu-text">User Details - Regular</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/user-profile-regular.html" className="nk-menu-link"><span className="nk-menu-text">User Profile - Regular</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/user-card.html" className="nk-menu-link"><span className="nk-menu-text">User Contact - Card</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-user-list-fill" /></span>
        //                             <span className="nk-menu-text">Customers</span><span className="nk-menu-badge">New</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/customer-list.html" className="nk-menu-link"><span className="nk-menu-text">Customer List</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/customer-details.html" className="nk-menu-link"><span className="nk-menu-text">Customer Details</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-cc-alt2-fill" /></span>
        //                             <span className="nk-menu-text">Orders</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/orders-default.html" className="nk-menu-link"><span className="nk-menu-text">Order List - Default</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/orders-regular.html" className="nk-menu-link"><span className="nk-menu-text">Order List - Regular</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/orders-sales.html" className="nk-menu-link"><span className="nk-menu-text">Order List - Sales</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-grid-alt-fill" /></span>
        //                             <span className="nk-menu-text">Applications</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/apps-messages.html" className="nk-menu-link"><span className="nk-menu-text">Messages</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/apps-inbox.html" className="nk-menu-link"><span className="nk-menu-text">Inbox / Mail</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/apps-file-manager.html" className="nk-menu-link"><span className="nk-menu-text">File Manager</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/apps-chats.html" className="nk-menu-link"><span className="nk-menu-text">Chats / Messenger</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/apps-calendar.html" className="nk-menu-link"><span className="nk-menu-text">Calendar</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/apps-kanban.html" className="nk-menu-link"><span className="nk-menu-text">Kanban Board</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-file-docs" /></span>
        //                             <span className="nk-menu-text">Invoice</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/invoice-list.html" className="nk-menu-link"><span className="nk-menu-text">Invoice List</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/invoice-details.html" className="nk-menu-link"><span className="nk-menu-text">Invoice Details</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-card-view" /></span>
        //                             <span className="nk-menu-text">Products</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/product-list.html" className="nk-menu-link"><span className="nk-menu-text">Product List</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/product-card.html" className="nk-menu-link"><span className="nk-menu-text">Product Card</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/product-details.html" className="nk-menu-link"><span className="nk-menu-text">Product Details</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/pricing-table.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-view-col" /></span>
        //                             <span className="nk-menu-text">Pricing Table</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/gallery.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-img" /></span>
        //                             <span className="nk-menu-text">Image Gallery</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-heading">
        //                         <h6 className="overline-title text-primary-alt">Misc Pages</h6>
        //                     </li>{/* .nk-menu-heading */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-light-fill" /></span>
        //                             <span className="nk-menu-text">Auth Pages</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/auths/auth-login.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login / Signin</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/auths/auth-register.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/auths/auth-reset.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot Password</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/auths/auth-success.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success / Confirm</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Classic Version - v2</span></a>
        //                                 <ul className="nk-menu-sub">
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-login-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login /
        //                                             Signin</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-register-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-reset-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot
        //                                             Password</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-success-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success /
        //                                             Confirm</span></a>
        //                                     </li>
        //                                 </ul>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">No Slider Version - v3</span></a>
        //                                 <ul className="nk-menu-sub">
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-login-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login /
        //                                             Signin</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-register-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-reset-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot
        //                                             Password</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item">
        //                                         <a href="html/pages/auths/auth-success-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success /
        //                                             Confirm</span></a>
        //                                     </li>
        //                                 </ul>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-files-fill" /></span>
        //                             <span className="nk-menu-text">Error Pages</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/errors/404-classic.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">404 Classic</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/errors/504-classic.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">504 Classic</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/errors/404-s1.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">404 Modern</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/errors/504-s1.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">504 Modern</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-files-fill" /></span>
        //                             <span className="nk-menu-text">Other Pages</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/_blank.html" className="nk-menu-link"><span className="nk-menu-text">Blank / Startup</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/admin/faqs.html" className="nk-menu-link"><span className="nk-menu-text">Faqs / Help</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/terms-policy.html" className="nk-menu-link"><span className="nk-menu-text">Terms / Policy</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/regular-v1.html" className="nk-menu-link"><span className="nk-menu-text">Regular Page - v1</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/pages/regular-v2.html" className="nk-menu-link"><span className="nk-menu-text">Regular Page - v2</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-heading">
        //                         <h6 className="overline-title text-primary-alt">Components</h6>
        //                     </li>{/* .nk-menu-heading */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-layers-fill" /></span>
        //                             <span className="nk-menu-text">Ui Elements</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/alerts.html" className="nk-menu-link"><span className="nk-menu-text">Alerts</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/accordions.html" className="nk-menu-link"><span className="nk-menu-text">Accordions</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/avatar.html" className="nk-menu-link"><span className="nk-menu-text">Avatar</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/badges.html" className="nk-menu-link"><span className="nk-menu-text">Badges</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/buttons.html" className="nk-menu-link"><span className="nk-menu-text">Buttons</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/buttons-group.html" className="nk-menu-link"><span className="nk-menu-text">Button Group</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/breadcrumb.html" className="nk-menu-link"><span className="nk-menu-text">Breadcrumb</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/cards.html" className="nk-menu-link"><span className="nk-menu-text">Cards</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/carousel.html" className="nk-menu-link"><span className="nk-menu-text">Carousel</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/list-dropdown.html" className="nk-menu-link"><span className="nk-menu-text">List Dropdown</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/modals.html" className="nk-menu-link"><span className="nk-menu-text">Modals</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/pagination.html" className="nk-menu-link"><span className="nk-menu-text">Pagination</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/popover.html" className="nk-menu-link"><span className="nk-menu-text">Popovers</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/progress.html" className="nk-menu-link"><span className="nk-menu-text">Progress</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/spinner.html" className="nk-menu-link"><span className="nk-menu-text">Spinner</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/tabs.html" className="nk-menu-link"><span className="nk-menu-text">Tabs</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/toast.html" className="nk-menu-link"><span className="nk-menu-text">Toasts</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/tooltip.html" className="nk-menu-link"><span className="nk-menu-text">Tooltip</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/elements/typography.html" className="nk-menu-link"><span className="nk-menu-text">Typography</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Utilities</span></a>
        //                                 <ul className="nk-menu-sub">
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-border.html" className="nk-menu-link"><span className="nk-menu-text">Border</span></a></li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-colors.html" className="nk-menu-link"><span className="nk-menu-text">Colors</span></a></li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-display.html" className="nk-menu-link"><span className="nk-menu-text">Display</span></a></li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-embeded.html" className="nk-menu-link"><span className="nk-menu-text">Embeded</span></a></li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-flex.html" className="nk-menu-link"><span className="nk-menu-text">Flex</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-text.html" className="nk-menu-link"><span className="nk-menu-text">Text</span></a>
        //                                     </li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-sizing.html" className="nk-menu-link"><span className="nk-menu-text">Sizing</span></a></li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-spacing.html" className="nk-menu-link"><span className="nk-menu-text">Spacing</span></a></li>
        //                                     <li className="nk-menu-item"><a href="html/components/elements/util-others.html" className="nk-menu-link"><span className="nk-menu-text">Others</span></a></li>
        //                                 </ul>{/* .nk-menu-sub */}
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-dot-box-fill" /></span>
        //                             <span className="nk-menu-text">Crafted Icons</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/misc/svg-icons.html" className="nk-menu-link">
        //                                     <span className="nk-menu-text">SVG Icon - Exclusive</span>
        //                                 </a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/misc/nioicon.html" className="nk-menu-link">
        //                                     <span className="nk-menu-text">Nioicon - HandCrafted</span>
        //                                 </a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item">
        //                         <a href="html/components/misc/icons.html" className="nk-menu-link">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-menu-circled" /></span>
        //                             <span className="nk-menu-text">Icon Libraries</span>
        //                         </a>
        //                     </li>{/* .nk-menu-item */}
        //                     <li className="nk-menu-item has-sub">
        //                         <a href="#" className="nk-menu-link nk-menu-toggle">
        //                             <span className="nk-menu-icon"><em className="icon ni ni-table-view-fill" /></span>
        //                             <span className="nk-menu-text">Tables</span>
        //                         </a>
        //                         <ul className="nk-menu-sub">
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/tables/table-basic.html" className="nk-menu-link"><span className="nk-menu-text">Basic Tables</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/tables/table-special.html" className="nk-menu-link"><span className="nk-menu-text">Special
        //                                     Tables</span></a>
        //                             </li>
        //                             <li className="nk-menu-item">
        //                                 <a href="html/components/tables/table-datatable.html" className="nk-menu-link"><span className="nk-menu-text">DataTables</span></a>
        //                             </li>
        //                         </ul>{/* .nk-menu-sub */}
        //                     </li>{/* .nk-menu-item */}


        //                 </ul>{/* .nk-menu */}
        //             </div>{/* .nk-sidebar-menu */}
        //         </div>{/* .nk-sidebar-content */}
        //     </div>{/* .nk-sidebar-element */}
        // </div>


    );
}

export default Sidebar;