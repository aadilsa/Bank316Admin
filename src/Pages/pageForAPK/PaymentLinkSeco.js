
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PaymentLinksecondui } from '../../API/Payment-LinkAPK/Payment_Link';
const PaymentLinkSeco = () => {
    const [data, setdata] = useState()

    const navigate = useNavigate()


    const GoToThirdPage = () => {
        navigate("/payment-link/ok")
    }


    const Get_Payment_Link_secondui = async () => {
        try {
            const totaldata = await PaymentLinksecondui()
            setdata(totaldata)

            // settotal(totaldata.data.count)
            // console.log(totaldata)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        Get_Payment_Link_secondui()
    }, [])

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
        //                                                             <td className="p-sm-3" style={{
        //                                                                 display: 'flex',
        //                                                                 alignItems: 'center',
        //                                                                 justifyContent: 'space-between',
        //                                                                 paddingLeft: '0px !important',

        //                                                             }}>
        //                                                                 <a ><img className="email-logo" src="./images/minilogo.png" alt="logo" height={50} /></a>
        //                                                                 <h6 style={{ color: '#5AAC4E', }}> Get 316 .</h6>
        //                                                             </td>
        //                                                         </tr>
        //                                                     </tbody>
        //                                                 </table>
        //                                                 <table className="email-body" style={{ width: '100%', }}>
        //                                                     <tbody>
        //                                                         <tr>
        //                                                             <td className="" style={{ padding: '0.75rem', paddingRight: "0px", paddingLeft: '0px' }}
        //                                                             >
        //                                                                 <h3 className="mb-5"> Select how you want to pay?</h3>

        //                                                                 <a href="/payment-link/ok"
        //                                                                     // onClick={GoToThirdPage} 
        //                                                                     className="" style={{
        //                                                                         display: 'flex',
        //                                                                         alignItems: 'center',
        //                                                                         justifyContent: 'flex-start',
        //                                                                         gap: '25px',
        //                                                                         cursor: "pointer"
        //                                                                     }}
        //                                                                 >
        //                                                                     <span>
        //                                                                         <img style={{
        //                                                                             width: '40px',
        //                                                                         }} src="./images/paylogo.png" />
        //                                                                     </span>
        //                                                                     <h6>Pay with 316 <br />
        //                                                                         <small>Login and pay directly from your 316 account.</small>
        //                                                                     </h6>
        //                                                                     <span><em class="icon ni ni-arrow-right" style={{
        //                                                                         color: '#000', fontSize: '20px',
        //                                                                     }}></em></span>
        //                                                                 </a>
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
            {/* <div className="bankTemplate316" style={{ width: '100%', display: 'block', margin: '0px auto', background: '#fff', padding: '0px' }}>
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span><img src="./images/minilogo.png" style={{ width: '50px' }} alt="Bank Logo" /></span>
                        <span><a href="/payment-link/ok" style={{ color: '#5AAC4E', textDecoration: 'none', fontWeight: 600 }}>Get 316 </a></span>
                    </div>

                    <div style={{ margin: '50px 0px', marginBottom: '20px' }}>
                        <h2 style={{ marginTop: '0px' }}>Select how you want to pay?</h2>
                    </div>

                    <a href="/payment-link/ok" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px', textDecoration: 'none' }}>
                        <span><img src="./images/paylogo.png" alt="Wallet Icon" /></span>
                        <div>
                            <h5 style={{ fontSize: '18px', fontWeight: 700, color: '#000' }}>
                                Pay with 316
                                <small style={{ color: '#676767', fontSize: '12px', display: 'block' }}>Login and pay directly from your 316 account.</small>
                            </h5>
                        </div>
                        <span><img src="./images/arrow_upward.svg" alt="Arrow Icon" /></span>
                    </a>
                </div>
            </div> */}

            {
                data?.response?.data?.status != false ? <div dangerouslySetInnerHTML={{ __html: data }} /> : ''
            }
        </>
    )
}

export default PaymentLinkSeco
