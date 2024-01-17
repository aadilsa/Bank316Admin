import React from 'react'
import Container from '../../component/container'

const Withdrawals = () => {
    return (
        <div className="nk-body bg-lighter npc-default has-sidebar">
            <div className="nk-app-root">
                {/* main @s */}
                <div className="nk-main ">
                    {/* sidebar @s */}
                    <div className="nk-sidebar nk-sidebar-fixed is-light " data-content="sidebarMenu">
                        <div className="nk-sidebar-element nk-sidebar-head">
                            <div className="nk-sidebar-brand">
                                <a href="html/index.html" className="logo-link nk-sidebar-logo">
                                    <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                    <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                                    <img className="logo-small logo-img logo-img-small" src="./images/logo-small.png" srcSet="./images/logo-small2x.png 2x" alt="logo-small" />
                                </a>
                            </div>
                            <div className="nk-menu-trigger me-n2">
                                <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left" /></a>
                                <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em className="icon ni ni-menu" /></a>
                            </div>
                        </div>{/* .nk-sidebar-element */}
                        <div className="nk-sidebar-element">
                            <div className="nk-sidebar-content">
                                <div className="nk-sidebar-menu" data-simplebar>
                                    <ul className="nk-menu">
                                        <li className="nk-menu-heading">
                                            <h6 className="overline-title text-primary-alt">Use-Case Preview</h6>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/ecommerce/index.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-bag" /></span>
                                                <span className="nk-menu-text">E-Commerce Panel</span><span className="nk-menu-badge">HOT</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/lms/index.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-book-read" /></span>
                                                <span className="nk-menu-text">LMS Panel</span><span className="nk-menu-badge">HOT</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-heading">
                                            <h6 className="overline-title text-primary-alt">Dashboards</h6>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/index.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-cart-fill" /></span>
                                                <span className="nk-menu-text">Default</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/index-sales.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-activity-round-fill" /></span>
                                                <span className="nk-menu-text">Sales</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/index-analytics.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-growth-fill" /></span>
                                                <span className="nk-menu-text">Analytics</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-heading">
                                            <h6 className="overline-title text-primary-alt">Applications</h6>
                                        </li>{/* .nk-menu-heading */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-tile-thumb-fill" /></span>
                                                <span className="nk-menu-text">Projects</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/project-card.html" className="nk-menu-link"><span className="nk-menu-text">Project Cards</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/project-list.html" className="nk-menu-link"><span className="nk-menu-text">Project List</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-users-fill" /></span>
                                                <span className="nk-menu-text">User Manage</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/user-list-default.html" className="nk-menu-link"><span className="nk-menu-text">User List - Default</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/user-list-regular.html" className="nk-menu-link"><span className="nk-menu-text">User List - Regular</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/user-list-compact.html" className="nk-menu-link"><span className="nk-menu-text">User List - Compact</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/user-details-regular.html" className="nk-menu-link"><span className="nk-menu-text">User Details - Regular</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/user-profile-regular.html" className="nk-menu-link"><span className="nk-menu-text">User Profile - Regular</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/user-card.html" className="nk-menu-link"><span className="nk-menu-text">User Contact - Card</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-user-list-fill" /></span>
                                                <span className="nk-menu-text">Customers</span><span className="nk-menu-badge">New</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/customer-list.html" className="nk-menu-link"><span className="nk-menu-text">Customer List</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/customer-details.html" className="nk-menu-link"><span className="nk-menu-text">Customer Details</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-cc-alt2-fill" /></span>
                                                <span className="nk-menu-text">Orders</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/orders-default.html" className="nk-menu-link"><span className="nk-menu-text">Order List - Default</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/orders-regular.html" className="nk-menu-link"><span className="nk-menu-text">Order List - Regular</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/orders-sales.html" className="nk-menu-link"><span className="nk-menu-text">Order List - Sales</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-grid-alt-fill" /></span>
                                                <span className="nk-menu-text">Applications</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/apps-messages.html" className="nk-menu-link"><span className="nk-menu-text">Messages</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/apps-inbox.html" className="nk-menu-link"><span className="nk-menu-text">Inbox / Mail</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/apps-file-manager.html" className="nk-menu-link"><span className="nk-menu-text">File Manager</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/apps-chats.html" className="nk-menu-link"><span className="nk-menu-text">Chats / Messenger</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/apps-calendar.html" className="nk-menu-link"><span className="nk-menu-text">Calendar</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/apps-kanban.html" className="nk-menu-link"><span className="nk-menu-text">Kanban Board</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-file-docs" /></span>
                                                <span className="nk-menu-text">Invoice</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/invoice-list.html" className="nk-menu-link"><span className="nk-menu-text">Invoice List</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/invoice-details.html" className="nk-menu-link"><span className="nk-menu-text">Invoice Details</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-card-view" /></span>
                                                <span className="nk-menu-text">Products</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/product-list.html" className="nk-menu-link"><span className="nk-menu-text">Product List</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/product-card.html" className="nk-menu-link"><span className="nk-menu-text">Product Card</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/product-details.html" className="nk-menu-link"><span className="nk-menu-text">Product Details</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/pricing-table.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-view-col" /></span>
                                                <span className="nk-menu-text">Pricing Table</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/gallery.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-img" /></span>
                                                <span className="nk-menu-text">Image Gallery</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-heading">
                                            <h6 className="overline-title text-primary-alt">Misc Pages</h6>
                                        </li>{/* .nk-menu-heading */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-light-fill" /></span>
                                                <span className="nk-menu-text">Auth Pages</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/auths/auth-login.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login / Signin</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/auths/auth-register.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/auths/auth-reset.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot Password</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/auths/auth-success.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success / Confirm</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Classic Version - v2</span></a>
                                                    <ul className="nk-menu-sub">
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-login-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login /
                                                                Signin</span></a>
                                                        </li>
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-register-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
                                                        </li>
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-reset-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot
                                                                Password</span></a>
                                                        </li>
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-success-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success /
                                                                Confirm</span></a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">No Slider Version - v3</span></a>
                                                    <ul className="nk-menu-sub">
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-login-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login /
                                                                Signin</span></a>
                                                        </li>
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-register-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
                                                        </li>
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-reset-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot
                                                                Password</span></a>
                                                        </li>
                                                        <li className="nk-menu-item">
                                                            <a href="html/pages/auths/auth-success-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success /
                                                                Confirm</span></a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-files-fill" /></span>
                                                <span className="nk-menu-text">Error Pages</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/errors/404-classic.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">404 Classic</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/errors/504-classic.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">504 Classic</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/errors/404-s1.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">404 Modern</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/errors/504-s1.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">504 Modern</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-files-fill" /></span>
                                                <span className="nk-menu-text">Other Pages</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/_blank.html" className="nk-menu-link"><span className="nk-menu-text">Blank / Startup</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/faqs.html" className="nk-menu-link"><span className="nk-menu-text">Faqs / Help</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/terms-policy.html" className="nk-menu-link"><span className="nk-menu-text">Terms / Policy</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/regular-v1.html" className="nk-menu-link"><span className="nk-menu-text">Regular Page - v1</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/pages/regular-v2.html" className="nk-menu-link"><span className="nk-menu-text">Regular Page - v2</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-heading">
                                            <h6 className="overline-title text-primary-alt">Components</h6>
                                        </li>{/* .nk-menu-heading */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-layers-fill" /></span>
                                                <span className="nk-menu-text">Ui Elements</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/alerts.html" className="nk-menu-link"><span className="nk-menu-text">Alerts</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/accordions.html" className="nk-menu-link"><span className="nk-menu-text">Accordions</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/avatar.html" className="nk-menu-link"><span className="nk-menu-text">Avatar</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/badges.html" className="nk-menu-link"><span className="nk-menu-text">Badges</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/buttons.html" className="nk-menu-link"><span className="nk-menu-text">Buttons</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/buttons-group.html" className="nk-menu-link"><span className="nk-menu-text">Button Group</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/breadcrumb.html" className="nk-menu-link"><span className="nk-menu-text">Breadcrumb</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/cards.html" className="nk-menu-link"><span className="nk-menu-text">Cards</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/carousel.html" className="nk-menu-link"><span className="nk-menu-text">Carousel</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/list-dropdown.html" className="nk-menu-link"><span className="nk-menu-text">List Dropdown</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/modals.html" className="nk-menu-link"><span className="nk-menu-text">Modals</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/pagination.html" className="nk-menu-link"><span className="nk-menu-text">Pagination</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/popover.html" className="nk-menu-link"><span className="nk-menu-text">Popovers</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/progress.html" className="nk-menu-link"><span className="nk-menu-text">Progress</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/spinner.html" className="nk-menu-link"><span className="nk-menu-text">Spinner</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/tabs.html" className="nk-menu-link"><span className="nk-menu-text">Tabs</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/toast.html" className="nk-menu-link"><span className="nk-menu-text">Toasts</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/tooltip.html" className="nk-menu-link"><span className="nk-menu-text">Tooltip</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/elements/typography.html" className="nk-menu-link"><span className="nk-menu-text">Typography</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Utilities</span></a>
                                                    <ul className="nk-menu-sub">
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-border.html" className="nk-menu-link"><span className="nk-menu-text">Border</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-colors.html" className="nk-menu-link"><span className="nk-menu-text">Colors</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-display.html" className="nk-menu-link"><span className="nk-menu-text">Display</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-embeded.html" className="nk-menu-link"><span className="nk-menu-text">Embeded</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-flex.html" className="nk-menu-link"><span className="nk-menu-text">Flex</span></a>
                                                        </li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-text.html" className="nk-menu-link"><span className="nk-menu-text">Text</span></a>
                                                        </li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-sizing.html" className="nk-menu-link"><span className="nk-menu-text">Sizing</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-spacing.html" className="nk-menu-link"><span className="nk-menu-text">Spacing</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/elements/util-others.html" className="nk-menu-link"><span className="nk-menu-text">Others</span></a></li>
                                                    </ul>{/* .nk-menu-sub */}
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-dot-box-fill" /></span>
                                                <span className="nk-menu-text">Crafted Icons</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/svg-icons.html" className="nk-menu-link">
                                                        <span className="nk-menu-text">SVG Icon - Exclusive</span>
                                                    </a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/nioicon.html" className="nk-menu-link">
                                                        <span className="nk-menu-text">Nioicon - HandCrafted</span>
                                                    </a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/components/misc/icons.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-menu-circled" /></span>
                                                <span className="nk-menu-text">Icon Libraries</span>
                                            </a>
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-table-view-fill" /></span>
                                                <span className="nk-menu-text">Tables</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/components/tables/table-basic.html" className="nk-menu-link"><span className="nk-menu-text">Basic Tables</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/tables/table-special.html" className="nk-menu-link"><span className="nk-menu-text">Special
                                                        Tables</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/tables/table-datatable.html" className="nk-menu-link"><span className="nk-menu-text">DataTables</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-view-group-fill" /></span>
                                                <span className="nk-menu-text">Forms</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/form-elements.html" className="nk-menu-link"><span className="nk-menu-text">Form Elements</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/checkbox-radio.html" className="nk-menu-link"><span className="nk-menu-text">Checkbox
                                                        Radio</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/advanced-controls.html" className="nk-menu-link"><span className="nk-menu-text">Advanced
                                                        Controls</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/input-group.html" className="nk-menu-link"><span className="nk-menu-text">Input Group</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/form-upload.html" className="nk-menu-link"><span className="nk-menu-text">Form Upload</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/datetime-picker.html" className="nk-menu-link"><span className="nk-menu-text">Date &amp; Time
                                                        Picker</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/number-spinner.html" className="nk-menu-link"><span className="nk-menu-text">Number
                                                        Spinner</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/nouislider.html" className="nk-menu-link"><span className="nk-menu-text">noUiSlider</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/form-layouts.html" className="nk-menu-link"><span className="nk-menu-text">Form Layouts</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/forms/form-validation.html" className="nk-menu-link"><span className="nk-menu-text">Form
                                                        Validation</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Wizard</span></a>
                                                    <ul className="nk-menu-sub">
                                                        <li className="nk-menu-item"><a href="html/components/forms/form-wizard.html" className="nk-menu-link"><span className="nk-menu-text">Basic
                                                            Demo</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/forms/wizard/create-project.html" className="nk-menu-link"><span className="nk-menu-text">Create
                                                            Project</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/forms/wizard/create-profile.html" className="nk-menu-link"><span className="nk-menu-text">Create
                                                            Profile</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/forms/wizard/two-factor-auth.html" className="nk-menu-link"><span className="nk-menu-text">Two Factor
                                                            Auth</span></a></li>
                                                        <li className="nk-menu-item"><a target="_blank" href="html/components/forms/wizard/survey-v1.html" className="nk-menu-link"><span className="nk-menu-text">Survey</span></a></li>
                                                        <li className="nk-menu-item"><a target="_blank" href="html/components/forms/wizard/survey-v2.html" className="nk-menu-link"><span className="nk-menu-text">Survey
                                                            v2</span></a></li>
                                                    </ul>{/* .nk-menu-sub */}
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Rich Editor</span></a>
                                                    <ul className="nk-menu-sub">
                                                        <li className="nk-menu-item"><a href="html/components/forms/form-summernote.html" className="nk-menu-link"><span className="nk-menu-text">Summernote</span></a></li>
                                                        <li className="nk-menu-item"><a href="html/components/forms/form-quill.html" className="nk-menu-link"><span className="nk-menu-text">Quill</span></a>
                                                        </li>
                                                        <li className="nk-menu-item"><a href="html/components/forms/form-tinymce.html" className="nk-menu-link"><span className="nk-menu-text">Tinymce</span></a></li>
                                                    </ul>{/* .nk-menu-sub */}
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-pie-fill" /></span>
                                                <span className="nk-menu-text">Charts</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/components/charts/chartjs.html" className="nk-menu-link"><span className="nk-menu-text">Chart JS</span></a>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <a href="html/components/charts/knob.html" className="nk-menu-link"><span className="nk-menu-text">Knob JS</span></a>
                                                </li>
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-puzzle-fill" /></span>
                                                <span className="nk-menu-text">Widgets</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/components/widgets/cards.html" className="nk-menu-link"><span className="nk-menu-text">Card Widgets</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/widgets/charts.html" className="nk-menu-link"><span className="nk-menu-text">Chart Widgets</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/widgets/ratings.html" className="nk-menu-link"><span className="nk-menu-text">Ratings Widgets</span><span className="nk-menu-badge">New</span></a>
                                                </li>{/* .nk-menu-item */}
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item has-sub">
                                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                                <span className="nk-menu-icon"><em className="icon ni ni-block-over" /></span>
                                                <span className="nk-menu-text">Miscellaneous</span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/slick-sliders.html" className="nk-menu-link"><span className="nk-menu-text">Slick Slider</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/toastr.html" className="nk-menu-link"><span className="nk-menu-text">Toastr</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/sweet-alert.html" className="nk-menu-link"><span className="nk-menu-text">Sweet Alert</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/js-tree.html" className="nk-menu-link"><span className="nk-menu-text">jsTree</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/dual-listbox.html" className="nk-menu-link"><span className="nk-menu-text">Dual Listbox</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/dragula.html" className="nk-menu-link"><span className="nk-menu-text">Dragula</span><span className="nk-menu-badge">New</span></a>
                                                </li>{/* .nk-menu-item */}
                                                <li className="nk-menu-item">
                                                    <a href="html/components/misc/map.html" className="nk-menu-link"><span className="nk-menu-text">Google Map</span><span className="nk-menu-badge">New</span></a>
                                                </li>{/* .nk-menu-item */}
                                            </ul>{/* .nk-menu-sub */}
                                        </li>{/* .nk-menu-item */}
                                        <li className="nk-menu-item">
                                            <a href="html/email-templates.html" className="nk-menu-link">
                                                <span className="nk-menu-icon"><em className="icon ni ni-tag-alt-fill" /></span>
                                                <span className="nk-menu-text">Email Template</span>
                                            </a>
                                        </li>
                                    </ul>{/* .nk-menu */}
                                </div>{/* .nk-sidebar-menu */}
                            </div>{/* .nk-sidebar-content */}
                        </div>{/* .nk-sidebar-element */}
                    </div>
                    {/* sidebar @e */}
                    {/* wrap @s */}
                    <div className="nk-wrap ">
                        {/* main header @s */}
                        <div className="nk-header nk-header-fixed is-light">
                            <div className="container-fluid">
                                <div className="nk-header-wrap">
                                    <div className="nk-menu-trigger d-xl-none ms-n1">
                                        <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em className="icon ni ni-menu" /></a>
                                    </div>
                                    <div className="nk-header-brand d-xl-none">
                                        <a href="html/index.html" className="logo-link">
                                            <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                            <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                                        </a>
                                    </div>{/* .nk-header-brand */}
                                    <div className="nk-header-search ms-3 ms-xl-0">
                                        <em className="icon ni ni-search" />
                                        <input type="text" className="form-control border-transparent form-focus-none" placeholder="Search anything" />
                                    </div>{/* .nk-header-news */}
                                    <div className="nk-header-tools">
                                        <ul className="nk-quick-nav">
                                            <li className="dropdown language-dropdown d-none d-sm-block me-n1">
                                                <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                                    <div className="quick-icon border border-light">
                                                        <img className="icon" src="./images/flags/english-sq.png" alt />
                                                    </div>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end dropdown-menu-s1">
                                                    <ul className="language-list">
                                                        <li>
                                                            <a href="#" className="language-item">
                                                                <img src="./images/flags/english.png" alt className="language-flag" />
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
                                                <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                                    <div className="icon-status icon-status-info"><em className="icon ni ni-bell" />
                                                    </div>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                                                    <div className="dropdown-head">
                                                        <span className="sub-title nk-dropdown-title">Notifications</span>
                                                        <a href="#">Mark All as Read</a>
                                                    </div>
                                                    <div className="dropdown-body">
                                                        <div className="nk-notification">
                                                            <div className="nk-notification-item dropdown-inner">
                                                                <div className="nk-notification-icon">
                                                                    <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                                                                </div>
                                                                <div className="nk-notification-content">
                                                                    <div className="nk-notification-text">You have requested to
                                                                        <span>Widthdrawl</span>
                                                                    </div>
                                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-notification-item dropdown-inner">
                                                                <div className="nk-notification-icon">
                                                                    <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                                                                </div>
                                                                <div className="nk-notification-content">
                                                                    <div className="nk-notification-text">Your <span>Deposit
                                                                        Order</span> is placed</div>
                                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-notification-item dropdown-inner">
                                                                <div className="nk-notification-icon">
                                                                    <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                                                                </div>
                                                                <div className="nk-notification-content">
                                                                    <div className="nk-notification-text">You have requested to
                                                                        <span>Widthdrawl</span>
                                                                    </div>
                                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-notification-item dropdown-inner">
                                                                <div className="nk-notification-icon">
                                                                    <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                                                                </div>
                                                                <div className="nk-notification-content">
                                                                    <div className="nk-notification-text">Your <span>Deposit
                                                                        Order</span> is placed</div>
                                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-notification-item dropdown-inner">
                                                                <div className="nk-notification-icon">
                                                                    <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                                                                </div>
                                                                <div className="nk-notification-content">
                                                                    <div className="nk-notification-text">You have requested to
                                                                        <span>Widthdrawl</span>
                                                                    </div>
                                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-notification-item dropdown-inner">
                                                                <div className="nk-notification-icon">
                                                                    <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                                                                </div>
                                                                <div className="nk-notification-content">
                                                                    <div className="nk-notification-text">Your <span>Deposit
                                                                        Order</span> is placed</div>
                                                                    <div className="nk-notification-time">2 hrs ago</div>
                                                                </div>
                                                            </div>
                                                        </div>{/* .nk-notification */}
                                                    </div>{/* .nk-dropdown-body */}
                                                    <div className="dropdown-foot center">
                                                        <a href="#">View All</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="dropdown user-dropdown">
                                                <a href="#" className="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                                                    <div className="user-toggle">
                                                        <div className="user-avatar sm">
                                                            <em className="icon ni ni-user-alt" />
                                                        </div>
                                                        <div className="user-info d-none d-xl-block">
                                                            <div className="user-status user-status-unverified">Unverified</div>
                                                            <div className="user-name dropdown-indicator">Abu Bin Ishityak</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
                                                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                                        <div className="user-card">
                                                            <div className="user-avatar">
                                                                <span>AB</span>
                                                            </div>
                                                            <div className="user-info">
                                                                <span className="lead-text">Abu Bin Ishtiyak</span>
                                                                <span className="sub-text">info@softnio.com</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown-inner">
                                                        <ul className="link-list">
                                                            <li><a href="html/user-profile-regular.html"><em className="icon ni ni-user-alt" /><span>View
                                                                Profile</span></a></li>
                                                            <li><a href="html/user-profile-setting.html"><em className="icon ni ni-setting-alt" /><span>Account
                                                                Setting</span></a></li>
                                                            <li><a href="html/user-profile-activity.html"><em className="icon ni ni-activity-alt" /><span>Login
                                                                Activity</span></a></li>
                                                            <li><a className="dark-switch" href="#"><em className="icon ni ni-moon" /><span>Dark Mode</span></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="dropdown-inner">
                                                        <ul className="link-list">
                                                            <li><a href="#"><em className="icon ni ni-signout" /><span>Sign
                                                                out</span></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>{/* .nk-header-wrap */}
                            </div>{/* .container-fliud */}
                        </div>
                        {/* main header @e */}
                        {/* content @s */}
                        <div className="nk-content ">
                            <div className="container-fluid">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div className="nk-block-head nk-block-head-sm">
                                            <div className="nk-block-between">
                                                <div className="nk-block-head-content">
                                                    <h3 className="nk-block-title page-title">Dashboard</h3>
                                                </div>{/* .nk-block-head-content */}
                                                <div className="nk-block-head-content">
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
                                                                                <li><a href="#"><span>Last 30 Days</span></a>
                                                                                </li>
                                                                                <li><a href="#"><span>Last 6 Months</span></a>
                                                                                </li>
                                                                                <li><a href="#"><span>Last 1 Years</span></a>
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
                                                </div>{/* .nk-block-head-content */}
                                            </div>{/* .nk-block-between */}
                                        </div>{/* .nk-block-head */}
                                        <div className="nk-block">
                                            <div className="row g-gs">
                                                <div className="col-xxl-3 col-sm-6">
                                                    <div className="card">
                                                        <div className="nk-ecwg nk-ecwg6">
                                                            <div className="card-inner">
                                                                <div className="card-title-group">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Today Orders</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="data">
                                                                    <div className="data-group">
                                                                        <div className="amount">1,945</div>
                                                                        <div className="nk-ecwg6-ck">
                                                                            <canvas className="ecommerce-line-chart-s3" id="todayOrders" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="info"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up" />4.63%</span><span>
                                                                        vs. last week</span></div>
                                                                </div>
                                                            </div>{/* .card-inner */}
                                                        </div>{/* .nk-ecwg */}
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                                <div className="col-xxl-3 col-sm-6">
                                                    <div className="card">
                                                        <div className="nk-ecwg nk-ecwg6">
                                                            <div className="card-inner">
                                                                <div className="card-title-group">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Today Revenue</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="data">
                                                                    <div className="data-group">
                                                                        <div className="amount">$2,338</div>
                                                                        <div className="nk-ecwg6-ck">
                                                                            <canvas className="ecommerce-line-chart-s3" id="todayRevenue" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="info"><span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />2.34%</span><span>
                                                                        vs. last week</span></div>
                                                                </div>
                                                            </div>{/* .card-inner */}
                                                        </div>{/* .nk-ecwg */}
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                                <div className="col-xxl-3 col-sm-6">
                                                    <div className="card">
                                                        <div className="nk-ecwg nk-ecwg6">
                                                            <div className="card-inner">
                                                                <div className="card-title-group">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Today Customers</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="data">
                                                                    <div className="data-group">
                                                                        <div className="amount">847</div>
                                                                        <div className="nk-ecwg6-ck">
                                                                            <canvas className="ecommerce-line-chart-s3" id="todayCustomers" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="info"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up" />4.63%</span><span>
                                                                        vs. last week</span></div>
                                                                </div>
                                                            </div>{/* .card-inner */}
                                                        </div>{/* .nk-ecwg */}
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                                <div className="col-xxl-3 col-sm-6">
                                                    <div className="card">
                                                        <div className="nk-ecwg nk-ecwg6">
                                                            <div className="card-inner">
                                                                <div className="card-title-group">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Today Visitors</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="data">
                                                                    <div className="data-group">
                                                                        <div className="amount">23,485</div>
                                                                        <div className="nk-ecwg6-ck">
                                                                            <canvas className="ecommerce-line-chart-s3" id="todayVisitors" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="info"><span className="change down text-danger"><em className="icon ni ni-arrow-long-down" />2.34%</span><span>
                                                                        vs. last week</span></div>
                                                                </div>
                                                            </div>{/* .card-inner */}
                                                        </div>{/* .nk-ecwg */}
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                                <div className="col-xxl-6">
                                                    <div className="card card-full">
                                                        <div className="nk-ecwg nk-ecwg8 h-100">
                                                            <div className="card-inner">
                                                                <div className="card-title-group mb-3">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Sales Statistics</h6>
                                                                    </div>
                                                                    <div className="card-tools">
                                                                        <div className="dropdown">
                                                                            <a href="#" className="dropdown-toggle link link-light link-sm dropdown-indicator" data-bs-toggle="dropdown">Weekly</a>
                                                                            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                                                <ul className="link-list-opt no-bdr">
                                                                                    <li><a href="#"><span>Daily</span></a></li>
                                                                                    <li><a href="#" className="active"><span>Weekly</span></a>
                                                                                    </li>
                                                                                    <li><a href="#"><span>Monthly</span></a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ul className="nk-ecwg8-legends">
                                                                    <li>
                                                                        <div className="title">
                                                                            <span className="dot dot-lg sq" data-bg="#6576ff" />
                                                                            <span>Total Order</span>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="title">
                                                                            <span className="dot dot-lg sq" data-bg="#eb6459" />
                                                                            <span>Cancelled Order</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                                <div className="nk-ecwg8-ck">
                                                                    <canvas className="ecommerce-line-chart-s4" id="salesStatistics" />
                                                                </div>
                                                                <div className="chart-label-group ps-5">
                                                                    <div className="chart-label">01 Jul, 2020</div>
                                                                    <div className="chart-label">30 Jul, 2020</div>
                                                                </div>
                                                            </div>{/* .card-inner */}
                                                        </div>
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                                <div className="col-xxl-3 col-md-6">
                                                    <div className="card card-full overflow-hidden">
                                                        <div className="nk-ecwg nk-ecwg7 h-100">
                                                            <div className="card-inner flex-grow-1">
                                                                <div className="card-title-group mb-4">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Order Statistics</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="nk-ecwg7-ck">
                                                                    <canvas className="ecommerce-doughnut-s1" id="orderStatistics" />
                                                                </div>
                                                                <ul className="nk-ecwg7-legends">
                                                                    <li>
                                                                        <div className="title">
                                                                            <span className="dot dot-lg sq" data-bg="#816bff" />
                                                                            <span>Completed</span>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="title">
                                                                            <span className="dot dot-lg sq" data-bg="#13c9f2" />
                                                                            <span>Processing</span>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="title">
                                                                            <span className="dot dot-lg sq" data-bg="#ff82b7" />
                                                                            <span>Cancelled</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>{/* .card-inner */}
                                                        </div>
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                                <div className="col-xxl-3 col-md-6">
                                                    <div className="card h-100">
                                                        <div className="card-inner">
                                                            <div className="card-title-group mb-2">
                                                                <div className="card-title">
                                                                    <h6 className="title">Store Statistics</h6>
                                                                </div>
                                                            </div>
                                                            <ul className="nk-store-statistics">
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Orders</div>
                                                                        <div className="count">1,795</div>
                                                                    </div>
                                                                    <em className="icon bg-primary-dim ni ni-bag" />
                                                                </li>
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Customers</div>
                                                                        <div className="count">2,327</div>
                                                                    </div>
                                                                    <em className="icon bg-info-dim ni ni-users" />
                                                                </li>
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Products</div>
                                                                        <div className="count">674</div>
                                                                    </div>
                                                                    <em className="icon bg-pink-dim ni ni-box" />
                                                                </li>
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Categories</div>
                                                                        <div className="count">68</div>
                                                                    </div>
                                                                    <em className="icon bg-purple-dim ni ni-server" />
                                                                </li>
                                                            </ul>
                                                        </div>{/* .card-inner */}
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                                <div className="col-xxl-8">
                                                    <div className="card card-full">
                                                        <div className="card-inner">
                                                            <div className="card-title-group">
                                                                <div className="card-title">
                                                                    <h6 className="title">Recent Orders</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-list mt-n2">
                                                            <div className="nk-tb-item nk-tb-head">
                                                                <div className="nk-tb-col"><span>Order No.</span></div>
                                                                <div className="nk-tb-col tb-col-sm"><span>Customer</span></div>
                                                                <div className="nk-tb-col tb-col-md"><span>Date</span></div>
                                                                <div className="nk-tb-col"><span>Amount</span></div>
                                                                <div className="nk-tb-col"><span className="d-none d-sm-inline">Status</span></div>
                                                            </div>
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-lead"><a href="#">#95954</a></span>
                                                                </div>
                                                                <div className="nk-tb-col tb-col-sm">
                                                                    <div className="user-card">
                                                                        <div className="user-avatar sm bg-purple-dim">
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
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-sub tb-amount">4,596.75
                                                                        <span>USD</span></span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                    <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-lead"><a href="#">#95850</a></span>
                                                                </div>
                                                                <div className="nk-tb-col tb-col-sm">
                                                                    <div className="user-card">
                                                                        <div className="user-avatar sm bg-azure-dim">
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
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-sub tb-amount">596.75
                                                                        <span>USD</span></span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                    <span className="badge badge-dot badge-dot-xs bg-danger">Cancelled</span>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-lead"><a href="#">#95812</a></span>
                                                                </div>
                                                                <div className="nk-tb-col tb-col-sm">
                                                                    <div className="user-card">
                                                                        <div className="user-avatar sm bg-warning-dim">
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
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-sub tb-amount">199.99
                                                                        <span>USD</span></span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                    <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-lead"><a href="#">#95256</a></span>
                                                                </div>
                                                                <div className="nk-tb-col tb-col-sm">
                                                                    <div className="user-card">
                                                                        <div className="user-avatar sm bg-purple-dim">
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
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-sub tb-amount">1099.99
                                                                        <span>USD</span></span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                    <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-item">
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-lead"><a href="#">#95135</a></span>
                                                                </div>
                                                                <div className="nk-tb-col tb-col-sm">
                                                                    <div className="user-card">
                                                                        <div className="user-avatar sm bg-success-dim">
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
                                                                <div className="nk-tb-col">
                                                                    <span className="tb-sub tb-amount">1099.99
                                                                        <span>USD</span></span>
                                                                </div>
                                                                <div className="nk-tb-col">
                                                                    <span className="badge badge-dot badge-dot-xs bg-warning">Due</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/* .card */}
                                                </div>
                                                <div className="col-xxl-4 col-md-8 col-lg-6">
                                                    <div className="card h-100">
                                                        <div className="card-inner">
                                                            <div className="card-title-group mb-2">
                                                                <div className="card-title">
                                                                    <h6 className="title">Top products</h6>
                                                                </div>
                                                                <div className="card-tools">
                                                                    <div className="dropdown">
                                                                        <a href="#" className="dropdown-toggle link link-light link-sm dropdown-indicator" data-bs-toggle="dropdown">Weekly</a>
                                                                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                                            <ul className="link-list-opt no-bdr">
                                                                                <li><a href="#"><span>Daily</span></a></li>
                                                                                <li><a href="#" className="active"><span>Weekly</span></a>
                                                                                </li>
                                                                                <li><a href="#"><span>Monthly</span></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ul className="nk-top-products">
                                                                <li className="item">
                                                                    <div className="thumb">
                                                                        <img src="./images/product/a.png" alt />
                                                                    </div>
                                                                    <div className="info">
                                                                        <div className="title">Pink Fitness Tracker</div>
                                                                        <div className="price">$99.00</div>
                                                                    </div>
                                                                    <div className="total">
                                                                        <div className="amount">$990.00</div>
                                                                        <div className="count">10 Sold</div>
                                                                    </div>
                                                                </li>
                                                                <li className="item">
                                                                    <div className="thumb">
                                                                        <img src="./images/product/b.png" alt />
                                                                    </div>
                                                                    <div className="info">
                                                                        <div className="title">Purple Smartwatch</div>
                                                                        <div className="price">$99.00</div>
                                                                    </div>
                                                                    <div className="total">
                                                                        <div className="amount">$990.00</div>
                                                                        <div className="count">10 Sold</div>
                                                                    </div>
                                                                </li>
                                                                <li className="item">
                                                                    <div className="thumb">
                                                                        <img src="./images/product/c.png" alt />
                                                                    </div>
                                                                    <div className="info">
                                                                        <div className="title">Black Smartwatch</div>
                                                                        <div className="price">$99.00</div>
                                                                    </div>
                                                                    <div className="total">
                                                                        <div className="amount">$990.00</div>
                                                                        <div className="count">10 Sold</div>
                                                                    </div>
                                                                </li>
                                                                <li className="item">
                                                                    <div className="thumb">
                                                                        <img src="./images/product/d.png" alt />
                                                                    </div>
                                                                    <div className="info">
                                                                        <div className="title">Black Headphones</div>
                                                                        <div className="price">$99.00</div>
                                                                    </div>
                                                                    <div className="total">
                                                                        <div className="amount">$990.00</div>
                                                                        <div className="count">10 Sold</div>
                                                                    </div>
                                                                </li>
                                                                <li className="item">
                                                                    <div className="thumb">
                                                                        <img src="./images/product/e.png" alt />
                                                                    </div>
                                                                    <div className="info">
                                                                        <div className="title">iPhone 7 Headphones</div>
                                                                        <div className="price">$99.00</div>
                                                                    </div>
                                                                    <div className="total">
                                                                        <div className="amount">$990.00</div>
                                                                        <div className="count">10 Sold</div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>{/* .card-inner */}
                                                    </div>{/* .card */}
                                                </div>{/* .col */}
                                            </div>{/* .row */}
                                        </div>{/* .nk-block */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content @e */}
                        {/* footer @s */}
                        <div className="nk-footer">
                            <div className="container-fluid">
                                <div className="nk-footer-wrap">
                                    <div className="nk-footer-copyright"> © 2023 DashLite. Template by <a href="https://softnio.com" target="_blank">Softnio</a>
                                    </div>
                                    <div className="nk-footer-links">
                                        <ul className="nav nav-sm">
                                            <li className="nav-item dropup">
                                                <a href="#" className="dropdown-toggle dropdown-indicator has-indicator nav-link text-base" data-bs-toggle="dropdown" data-offset="0,10"><span>English</span></a>
                                                <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                    <ul className="language-list">
                                                        <li>
                                                            <a href="#" className="language-item">
                                                                <span className="language-name">English</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="language-item">
                                                                <span className="language-name">Español</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="language-item">
                                                                <span className="language-name">Français</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="language-item">
                                                                <span className="language-name">Türkçe</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a data-bs-toggle="modal" href="#region" className="nav-link"><em className="icon ni ni-globe" /><span className="ms-1">Select
                                                    Region</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* footer @e */}
                    </div>
                    {/* wrap @e */}
                </div>
                {/* main @e */}
            </div>
            {/* app-root @e */}
            {/* select region modal */}
            <div className="modal fade" tabIndex={-1} role="dialog" id="region">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <a href="#" className="close" data-bs-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                        <div className="modal-body modal-body-md">
                            <h5 className="title mb-4">Select Your Country</h5>
                            <div className="nk-country-region">
                                <ul className="country-list text-center gy-2">
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/arg.png" alt className="country-flag" />
                                            <span className="country-name">Argentina</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/aus.png" alt className="country-flag" />
                                            <span className="country-name">Australia</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/bangladesh.png" alt className="country-flag" />
                                            <span className="country-name">Bangladesh</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/canada.png" alt className="country-flag" />
                                            <span className="country-name">Canada <small>(English)</small></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/china.png" alt className="country-flag" />
                                            <span className="country-name">Centrafricaine</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/china.png" alt className="country-flag" />
                                            <span className="country-name">China</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/french.png" alt className="country-flag" />
                                            <span className="country-name">France</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/germany.png" alt className="country-flag" />
                                            <span className="country-name">Germany</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/iran.png" alt className="country-flag" />
                                            <span className="country-name">Iran</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/italy.png" alt className="country-flag" />
                                            <span className="country-name">Italy</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/mexico.png" alt className="country-flag" />
                                            <span className="country-name">México</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/philipine.png" alt className="country-flag" />
                                            <span className="country-name">Philippines</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/portugal.png" alt className="country-flag" />
                                            <span className="country-name">Portugal</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/s-africa.png" alt className="country-flag" />
                                            <span className="country-name">South Africa</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/spanish.png" alt className="country-flag" />
                                            <span className="country-name">Spain</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/switzerland.png" alt className="country-flag" />
                                            <span className="country-name">Switzerland</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/uk.png" alt className="country-flag" />
                                            <span className="country-name">United Kingdom</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="country-item">
                                            <img src="./images/flags/english.png" alt className="country-flag" />
                                            <span className="country-name">United State</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>{/* .modal-content */}
                </div>{/* .modla-dialog */}
            </div>{/* .modal */}

            {/* <script src="./assets/js/bundle.js?ver=3.2.1"></script>
            <script src="./assets/js/scripts.js?ver=3.2.1"></script>
            <script src="./assets/js/charts/chart-ecommerce.js?ver=3.2.1"></script> */}
        </div>

    )
}

export default Withdrawals
