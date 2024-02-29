import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../API/config';
import axios from 'axios';
import { date } from 'yup';

import { useDispatch, useSelector } from 'react-redux';
// import { setHeaderState } from "../Services/store"
import { setHeaderState } from '../Services/reducers';
import { Getnotifications, readalldata, readonedata } from '../API/HeaderApi/Header';
const Header = () => {
  const [data, setdata] = useState([])
  const [count, setcount] = useState(0)
  const [user_type, setuser_type] = useState(null)


  const [isFullScreen, setIsFullScreen] = useState(false);


  const dispatch = useDispatch();

  // Use useSelector to access the header state from the Redux store
  // const headerState = useSelector((state) => state.app.header);

  const token = localStorage.getItem('logintoken')
  const Profile = JSON.parse(localStorage.getItem("Profiledata"))
  const navigate = useNavigate()

  const LogoutToast = () => {
    toast.success('Logout successfully.', { autoClose: 2000 });
  }


  const LogOut = () => {
    localStorage.removeItem('logintoken')
    LogoutToast()
    setTimeout(() => {
      navigate("/")
    }, 3000)
  }


  const ChangePass = () => {
    navigate("/change-password")
  }

  const ProfilePage = () => {
    navigate("/profile")
  }




  const headerState = useSelector((state) => state.app.header);
  console.log(headerState, "Headr redux store")

  const toggle = () => {
    // Toggle the value of isOpen
    const newHeaderState = {
      isOpen: !headerState.isOpen,
    };

    // Dispatch the action to update the Redux state
    dispatch(setHeaderState(newHeaderState));
  }




  const toggleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    if (!isFullScreen) {
      const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;

      if (requestFullScreen) {
        requestFullScreen.call(docEl);
        setIsFullScreen(true);
      }
    } else {
      const cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen;

      if (cancelFullScreen) {
        cancelFullScreen.call(doc);
        setIsFullScreen(false);
      }
    }
  };


  const NotificationData = async () => {
    try {
      const resp = await Getnotifications(token)
      console.log(resp, "respppp")
      if (resp?.status) {
        setdata(resp?.data?.rows)
        setcount(resp?.data?.unreadCount)
      }
      else {
        console.log("errrrr")
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    NotificationData()
  }, [])

  console.log(data, "aoododo")


  const readAll = async () => {
    try {
      const resp = await readalldata(token)
      if (resp?.success) {
        NotificationData()
      }
      else {
        console.log("errrrr")
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  const readOne = async (id) => {
    console.log(id, "iddddddddddddddd", token)
    try {
      const resp = await readonedata(id, token)
      if (resp?.status) {
        NotificationData()
      }
      else {
        console.log("errrrr")
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          {/* <div className="nk-menu-trigger d-xl-none ms-n1">
            <a className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em className="icon ni ni-menu"  /></a>
          </div> */}
          <div class="nk-menu-trigger d-xl-none ms-n1">
            <a class="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em class="icon ni ni-menu" onClick={toggle}></em></a>
          </div>
          <div className="nk-header-brand d-xl-none">
            <a className="logo-link">
              <img className="logo-light logo-img" src="./images/Bank316money.png" srcSet="./images/Bank316money.png" alt="logo" />
              <img className="logo-dark logo-img" src="./images/Bank316money.png" srcSet="./images/Bank316money.png" alt="logo-dark" />
            </a>
          </div>{/* .nk-header-brand */}
          <div className="nk-header-search ms-3 ms-xl-0">
            <em className="icon ni ni-search" />
            <input type="text" className="form-control border-transparent form-focus-none" placeholder="Search anything" />
          </div>{/* .nk-header-news */}
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">


              {/* <li>
                <div className="icon-status icon-status-na"><em class="icon ni ni-maximize" onClick={() => { toggleFullScreen() }}></em></div>
              </li> */}
              <li className="dropdown chats-dropdown hide-mb-xs" onClick={toggleFullScreen}>
                <a className="dropdown-toggle nk-quick-nav-icon" >
                  <div className="icon-status icon-status-na">
                    <em class="icon ni ni-maximize" ></em>
                  </div>
                </a>
              </li>

              <li className="dropdown chats-dropdown hide-mb-xs">
                <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                  <div className="icon-status icon-status-na"><em class="icon ni ni-grid-fill" ></em></div>
                </a>
                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                  <div class="row g-0 siXicon">
                    <div class="col">
                      <a class="dropdown-icon-item" href="https://wise.com/login" target="_blank">
                        <img src="./images/d1.png" alt="" /><span>Wise</span></a>
                    </div>

                    <div class="col"><a class="dropdown-icon-item" href="https://login.mailchimp.com" target="_blank">
                      <img src="./images/d2.png" alt="" /><span>MailChamp</span></a>
                    </div>

                    <div class="col"><a class="dropdown-icon-item" href="https://www.google.com" target="_blank">
                      <img src="./images/d3.png" alt="" /><span>Google Drive</span></a>
                    </div>
                  </div>
                  <div class="row g-0 siXicon">
                    <div class="col">
                      <a class="dropdown-icon-item" href="https://dashboard.stripe.com/login" target="_blank">
                        <img src="./images/d4.png" alt="" /><span>Stripe</span></a>
                    </div>

                    <div class="col"><a class="dropdown-icon-item" href="https://signin.aws.amazon.com" target="_blank">
                      <img src="./images/d5.png" alt="" /><span>AWS</span></a>
                    </div>
                    <div class="col"><a class="dropdown-icon-item" href="https://316startups.com" target="_blank">
                      <img src="./images/banklogo.png" alt="" /><span>316 Trade</span></a>
                    </div>
                  </div>
                  <div class="row g-0 siXicon">

                    <div class="col"><a class="dropdown-icon-item" href="https://account-app.brevo.com" target="_blank">
                      <img src="./images/d6.png" alt="" /><span>Brevo</span></a>
                    </div>
                    <div class="col-4"><a class="dropdown-icon-item" href="https://phone.brevo.com" target="_blank">
                      <img src="./images/d6.png" alt="" /><span>Brevo Phone</span></a>
                    </div>
                    <div class="col-4"><a class="dropdown-icon-item" href="https://app.brevo.com/meetings/appointments" target="_blank">
                      <img src="./images/d6.png" alt="" /><span>Brevo Meeting</span></a>
                    </div>
                  </div>
                  <div class="row g-0 siXicon">

                    <div class="col-4"><a class="dropdown-icon-item" href="https://slack.com" target="_blank">
                      <img src="./images/d9.png" alt="" /><span>Slack</span></a>
                    </div>
                    <div class="col-4"><a class="dropdown-icon-item" href="https://github.com" target="_blank">
                      <img src="./images/d8.png" alt="" /><span>GitHub</span></a>
                    </div>
                  </div>
                </div>
              </li>


              <li className="dropdown language-dropdown d-none d-sm-block me-n1">
                <a className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                  <div className="quick-icon border border-light">
                    <img className="icon" src="./images/us flage.png" alt />
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-s1">
                  <ul className="language-list">
                    <li>
                      <a href="#" className="language-item">
                        <img src="./images/download.png" alt className="language-flag" />
                        <span className="language-name">English</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="language-item">
                        <img src="./images/flags/spanish.png" alt className="language-flag" />
                        <span className="language-name">Español</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="language-item">
                        <img src="./images/flags/french.png" alt className="language-flag" />
                        <span className="language-name">Français</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="language-item">
                        <img src="./images/flags/turkey.png" alt className="language-flag" />
                        <span className="language-name">Türkçe</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>{/* .dropdown */}
              <li className="dropdown chats-dropdown hide-mb-xs">
                <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                  <div className="icon-status icon-status-na"><em className="icon ni ni-comments" /></div>
                </a>
                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                  <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">Recent Chats</span>
                    <a href="#">Setting</a>
                  </div>
                  <div className="dropdown-body">
                    <ul className="chat-list">
                      <li className="chat-item">
                        <a className="chat-link" href="html/apps-chats.html">
                          <div className="chat-media user-avatar">
                            <span>IH</span>
                            <span className="status dot dot-lg dot-gray" />
                          </div>
                          <div className="chat-info">
                            <div className="chat-from">
                              <div className="name">Iliash Hossain</div>
                              <span className="time">Now</span>
                            </div>
                            <div className="chat-context">
                              <div className="text">You: Please confrim if you got my
                                last messages.</div>
                              <div className="status delivered">
                                <em className="icon ni ni-check-circle-fill" />
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>{/* .chat-item */}
                      <li className="chat-item is-unread">
                        <a className="chat-link" href="html/apps-chats.html">
                          <div className="chat-media user-avatar bg-pink">
                            <span>AB</span>
                            <span className="status dot dot-lg dot-success" />
                          </div>
                          <div className="chat-info">
                            <div className="chat-from">
                              <div className="name">Abu Bin Ishtiyak</div>
                              <span className="time">4:49 AM</span>
                            </div>
                            <div className="chat-context">
                              <div className="text">Hi, I am Ishtiyak, can you help me
                                with this problem ?</div>
                              <div className="status unread">
                                <em className="icon ni ni-bullet-fill" />
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>{/* .chat-item */}
                      <li className="chat-item">
                        <a className="chat-link" href="html/apps-chats.html">
                          <div className="chat-media user-avatar">
                            <img src="./images/avatar/b-sm.jpg" alt />
                          </div>
                          <div className="chat-info">
                            <div className="chat-from">
                              <div className="name">George Philips</div>
                              <span className="time">6 Apr</span>
                            </div>
                            <div className="chat-context">
                              <div className="text">Have you seens the claim from
                                Rose?</div>
                            </div>
                          </div>
                        </a>
                      </li>{/* .chat-item */}
                      <li className="chat-item">
                        <a className="chat-link" href="html/apps-chats.html">
                          <div className="chat-media user-avatar user-avatar-multiple">
                            <div className="user-avatar">
                              <img src="./images/avatar/c-sm.jpg" alt />
                            </div>
                            <div className="user-avatar">
                              <span>AB</span>
                            </div>
                          </div>
                          <div className="chat-info">
                            <div className="chat-from">
                              <div className="name">Softnio Group</div>
                              <span className="time">27 Mar</span>
                            </div>
                            <div className="chat-context">
                              <div className="text">You: I just bought a new computer
                                but i am having some problem</div>
                              <div className="status sent">
                                <em className="icon ni ni-check-circle" />
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>{/* .chat-item */}
                      <li className="chat-item">
                        <a className="chat-link" href="html/apps-chats.html">
                          <div className="chat-media user-avatar">
                            <img src="./images/avatar/a-sm.jpg" alt />
                            <span className="status dot dot-lg dot-success" />
                          </div>
                          <div className="chat-info">
                            <div className="chat-from">
                              <div className="name">Larry Hughes</div>
                              <span className="time">3 Apr</span>
                            </div>
                            <div className="chat-context">
                              <div className="text">Hi Frank! How is you doing?</div>
                            </div>
                          </div>
                        </a>
                      </li>{/* .chat-item */}
                      <li className="chat-item">
                        <a className="chat-link" href="html/apps-chats.html">
                          <div className="chat-media user-avatar bg-purple">
                            <span>TW</span>
                          </div>
                          <div className="chat-info">
                            <div className="chat-from">
                              <div className="name">Tammy Wilson</div>
                              <span className="time">27 Mar</span>
                            </div>
                            <div className="chat-context">
                              <div className="text">You: I just bought a new computer
                                but i am having some problem</div>
                              <div className="status sent">
                                <em className="icon ni ni-check-circle" />
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>{/* .chat-item */}
                    </ul>{/* .chat-list */}
                  </div>{/* .nk-dropdown-body */}
                  <div className="dropdown-foot center">
                    <a href="html/apps-chats.html">View All</a>
                  </div>
                </div>
              </li>
              <li className="dropdown notification-dropdown">
                <a className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                  {/* <div className="icon-status icon-status-info"><em className="icon ni ni-bell" /> */}
                  {/* {
                    count !== 0 && <div class=""><span className="countbadge">{count > 9 ? <span>{count}</span> : <span>0{count}</span>}</span><em class="icon ni ni-bell"></em></div>

                  } */}


                  {
                    count == 0 && <div className="icon-status icon-status-info"><em className="icon ni ni-bell" /></div>
                  }
                  {
                    count > 9 && <div class=""><span className="countbadge">{count}</span><em class="icon ni ni-bell"></em></div>
                  }
                  {
                    (count <= 9 && count !== 0) && <div class=""><span className="countbadge">0{count}</span><em class="icon ni ni-bell"></em></div>
                  }

                </a>
                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                  <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">Notifications</span>
                    <a style={{ cursor: "pointer", color: "green" }} onClick={() => { readAll() }}>Mark All as Read</a>
                  </div>
                  <div className="dropdown-body">
                    <div className="nk-notification">
                      {
                        data.map((data) => {
                          return (
                            <>
                              <div className="nk-notification-item dropdown-inner">
                                <div className="nk-notification-icon">
                                  <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                                </div>
                                <div className="nk-notification-content" onClick={() => { readOne(data.id) }}>
                                  <div className="nk-notification-text" >
                                    <span >{data?.body}</span>
                                  </div>
                                  <div className="nk-notification-time">2 hrs ago</div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }



                    </div>{/* .nk-notification */}
                  </div>{/* .nk-dropdown-body */}
                  <div className="dropdown-foot center">
                    <a href="#">View All</a>
                  </div>
                </div>
              </li>
              {/* <li className="dropdown notification-dropdown">
                <a className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                  <div className="icon-status icon-status-info"><em className="icon ni ni-bell" /></div>
                </a>
                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                  <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">Notifications</span>
                    <a >Mark All as Read</a>
                  </div>
                  <div className="dropdown-body">
                    <div className="nk-notification">
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-foot center">
                    <a >View All</a>
                  </div>
                </div>
              </li> */}
              <li className="dropdown user-dropdown">
                <a className="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt" />
                    </div>
                    <div className="user-info d-none d-xl-block">
                      {/* <div className="user-status user-status-unverified">316Bank</div> */}
                      <div className="user-name dropdown-indicator">{Profile.user_type}</div>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        <span style={{ backgroundcolor: "#163300" }}>M.J</span>
                      </div>
                      <div className="user-info">
                        <span className="lead-text">{Profile.firstname} {Profile.lastname}</span>
                        <span className="sub-text">{Profile.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li onClick={ProfilePage}><a style={{ cursor: 'pointer' }}><em className="icon ni ni-user-alt" /><span>View Profile</span></a></li>
                      <li onClick={ChangePass}><a style={{ cursor: 'pointer' }}><em className="icon ni ni-setting-alt" /><span>Change Password</span></a></li>
                      {/* <li><a ><em className="icon ni ni-activity-alt" /><span>Login Activity</span></a></li>
                      <li><a className="dark-switch" ><em className="icon ni ni-moon" /><span>Dark Mode</span></a></li> */}
                      <li onClick={LogOut}><a style={{ cursor: 'pointer' }}><em className="icon ni ni-signout" /><span>Sign out</span></a></li>
                    </ul>
                  </div>

                </div>
              </li>
            </ul>

            <ul className="nk-quick-nav">

            </ul>

          </div>
        </div > {/* .nk-header-wrap */}
      </div > {/* .container-fliud */}
      < ToastContainer />
    </div >
  );
}

export default Header;
