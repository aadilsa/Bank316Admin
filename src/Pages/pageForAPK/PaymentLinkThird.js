
import React from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentLinkThird = () => {
    const navigate = useNavigate()

    return (
        // <div className="nk-wrap ">
        //     <div className="nk-content ">
        //         <div className="container-fluid">
        //             <div className="nk-content-inner">
        //                 <div className="nk-content-body">
        //                     <div className="content-page wide-md m-auto">
        //                         <div className="nk-block">
        //                             <div className="card">
        //                                 <div className="card-inner p-0 mt-3" >
        //                                     <table className="email-wraper" style={{ width: '100%', }}>
        //                                         <tbody><tr>
        //                                             <td >
        //                                                 <table className="email-header" style={{ width: '100%', }}>
        //                                                     <tbody>
        //                                                         <tr>
        //                                                             <td className="p-sm-3 pl-0" style={{
        //                                                                 display: 'flex',
        //                                                                 alignItems: 'center',
        //                                                                 justifyContent: 'space-between',
        //                                                                 paddingLeft: '0px !important',

        //                                                             }}>
        //                                                                 <a ><img className="email-logo" src="./images/minilogo.png" alt="logo" height={50} /></a>
        //                                                                 <h6><a href='/payment-link/options'
        //                                                                     // onClick={() => { navigate(-1) }}
        //                                                                     style={{ color: '#5AAC4E', cursor: 'pointer' }}>Cancel</a></h6>
        //                                                             </td>
        //                                                         </tr>
        //                                                     </tbody>
        //                                                 </table>
        //                                                 <table className="email-body" style={{ width: '100%', }}>
        //                                                     <tbody>
        //                                                         <tr>
        //                                                             <td className="" style={{ padding: '0.75rem', paddingRight: "0px", paddingLeft: '0px' }}
        //                                                             >
        //                                                                 <h3 className="mb-5 mt-3"> Download 316 app and register. It takes less than 3 minutes</h3>

        //                                                                 <a >
        //                                                                     <img style={{
        //                                                                         width: '350px', display: 'block', margin: '50px auto',
        //                                                                     }} src="images/circle logo.png" />
        //                                                                 </a>

        //                                                                 <p className="text-center mt-5" style={{
        //                                                                     display: 'flex',
        //                                                                     alignItems: 'center',
        //                                                                     justifyContent: 'center',
        //                                                                     gap: '15px',
        //                                                                 }}>
        //                                                                     <a href=''><img src="images/Applogo.png" style={{ width: '150px', }} /></a>

        //                                                                     <a href=''><img src="images/googlepay logo.png" style={{ width: '150px', }} /></a>
        //                                                                 </p>

        //                                                             </td>
        //                                                         </tr>
        //                                                     </tbody>
        //                                                 </table>
        //                                             </td>
        //                                         </tr>
        //                                         </tbody>
        //                                     </table>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // </div>
        <>
            <div className="bankTemplate316" style={{ width: '100%', display: 'block', margin: '0px auto', background: '#fff', padding: '0px' }}>
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span><img src="./images/minilogo.png" style={{ width: '50px' }} alt="Bank Logo" /></span>
                        {/* <span><a href="" style={{ color: '#5AAC4E', textDecoration: 'none', fontWeight: 600 }}>Get 316</a></span> */}
                    </div>

                    <div style={{ margin: '50px 0px', marginBottom: '20px' }}>
                        <h2 style={{ marginTop: '0px' }}>Download 316 app and register. It takes less than 3 minutes</h2>
                    </div>

                    <a href="" style={{ margin: '100px 0px', display: 'block' }}>
                        <span><img src="./images/circle logo.png" style={{ display: 'block', margin: '0px auto' }} alt="Global Icon" /></span>
                    </a>

                    <div style={{ textAlign: 'center', marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <a href=""><img src="./images/Applogo.png" alt="App Store" /></a>
                        <a href="https://play.google.com/store/apps/details?id=com.example.bank316"><img src="./images/googlepay logo.png" alt="Play Store" /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentLinkThird
