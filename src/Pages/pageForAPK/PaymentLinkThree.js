import React from 'react'

const PaymentLinkThree = () => {
    return (
        <div className="nk-wrap ">
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="content-page wide-md m-auto">
                                <div className="nk-block">
                                    <div className="card">
                                        <div className="card-inner p-0 mt-3" >
                                            <table className="email-wraper" style={{ width: '100%', }}>
                                                <tbody><tr>
                                                    <td >
                                                        <table className="email-header" style={{ width: '100%', }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="p-sm-3 pl-0" style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                        paddingLeft: '0px !important',

                                                                    }}>
                                                                        <a ><img className="email-logo" src="./images/minilogo.png" alt="logo" height={50} /></a>
                                                                        <h6><a href="" style={{ color: '#5AAC4E', }}>Cancel</a></h6>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table className="email-body" style={{ width: '100%', }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="" style={{ padding: '0.75rem', paddingRight: "0px", paddingLeft: '0px' }}
                                                                    >
                                                                        <h3 className="mb-5 mt-3"> Download 316 app and register. It takes less than 3 minutes</h3>

                                                                        <a href="">
                                                                            <img style={{
                                                                                width: '350px', display: 'block', margin: '50px auto',
                                                                            }} src="images/globaicon.svg" />
                                                                        </a>

                                                                        <p className="text-center mt-5" style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            gap: '15px',
                                                                        }}>
                                                                            <a href=''><img src="images/appstore.svg" style={{ width: '150px', }} /></a>

                                                                            <a href=''><img src="images/playstore.svg" style={{ width: '150px', }} /></a>
                                                                        </p>

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PaymentLinkThree
