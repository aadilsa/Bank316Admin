import React, { useEffect, useState } from 'react';
import Container from '../../component/container';
import { AdminProfiledata } from '../../API/ProfileApi/ProfileApi';


const Profile = () => {
    const [data, setdata] = useState()

    const token = localStorage.getItem("logintoken")
    const Profiledata = async () => {
        const responce = await AdminProfiledata(token)
        if (responce?.status == true) {
            setdata(responce?.data)
        }
        console.log(responce?.data, "profileresponce")
    }
    useEffect(() => {
        Profiledata()
    }, [])


    return (
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
                                                        <h4 className="nk-block-title">Admin Information</h4>
                                                        {/* <div className="nk-block-des">
                                                            <p>Basic info, like your name and address, that you use on Nio Platform.</p>
                                                        </div> */}
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
                                                            <span className="data-value" style={{ textTransform: "capitalize" }}>{data?.firstname} {data?.lastname} </span>
                                                        </div>

                                                    </div>{/* data-item */}
                                                    <div className="data-item" >
                                                        <div className="data-col">
                                                            <span className="data-label">Display Name</span>
                                                            <span className="data-value">{data?.user_type}</span>
                                                        </div>

                                                    </div>{/* data-item */}
                                                    <div className="data-item">
                                                        <div className="data-col">
                                                            <span className="data-label">Email</span>
                                                            <span className="data-value">{data?.email}</span>
                                                        </div>

                                                    </div>{/* data-item */}
                                                    <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                                                        <div className="data-col">
                                                            <span className="data-label">Phone Number</span>
                                                            <span className="data-value text-soft">+{data?.phone_code}{data?.phone}</span>
                                                        </div>

                                                    </div>{/* data-item */}
                                                    <div className="data-item" >
                                                        <div className="data-col">
                                                            <span className="data-label">Date of Birth</span>
                                                            {data?.dob == "" ? <span className="data-value">N/A</span> : <span className="data-value">{data?.dob}</span>}

                                                        </div>

                                                    </div>{/* data-item */}
                                                    <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit" data-tab-target="#address">
                                                        <div className="data-col">
                                                            <span className="data-label">Address</span>
                                                            {data?.street_housenumber == "" ? <span className="data-value">N/A,<br /></span> : <span className="data-value">{data?.street_housenumber}<br /></span>}

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
                                            </div>{/* .nk-block */}
                                        </div>
                                        <div className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" data-toggle-body="true" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                                            <div className="card-inner-group" data-simplebar>
                                                <div className="card-inner">
                                                    <div className="user-card">
                                                        <div className="user-avatar bg-primary">
                                                            <span>AB</span>
                                                        </div>
                                                        <div className="user-info">
                                                            <span className="lead-text">{data?.firstname} {data?.lastname}</span>
                                                            <span className="sub-text">{data?.email}</span>
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
                                                    </div>{/* .user-card */}
                                                </div>{/* .card-inner */}
                                                <div className="card-inner">
                                                    <div className="user-account-info py-0">
                                                        <h6 className="overline-title-alt">Account Balance</h6>
                                                        <div className="user-balance">12000 <small className="currency currency-btc">$</small></div>
                                                        <div className="user-balance-sub">Pending <span>0.3009 <span className="currency currency-btc">USD</span></span></div>
                                                    </div>
                                                </div>{/* .card-inner */}
                                                <div className="card-inner p-0">
                                                    <ul className="link-list-menu">
                                                        <li><a className="active"><em className="icon ni ni-user-fill-c" /><span>Personal Infomation</span></a></li>
                                                        <li><a ><em className="icon ni ni-bell-fill" /><span>Notifications</span></a></li>
                                                        <li><a ><em className="icon ni ni-activity-round-fill" /><span>Account Activity</span></a></li>
                                                        <li><a ><em className="icon ni ni-lock-alt-fill" /><span>Security Settings</span></a></li>
                                                    </ul>
                                                </div>{/* .card-inner */}
                                            </div>{/* .card-inner-group */}
                                        </div>{/* card-aside */}
                                    </div>{/* .card-aside-wrap */}
                                </div>{/* .card */}
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    );
}

export default Profile;
