import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PaymentLinkData } from '../../API/Payment-LinkAPK/Payment_Link';
// import ApiHtmlResponse from './ApiHtmlResponse';
const PaymentLinkFirst = () => {
    const [data, setdata] = useState()
    const navigate = useNavigate()
    const containerStyle = {
        backgroundColor: '#fff',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '100%',
        fontWeight: 400,
        lineHeight: 1.4,
        color: '#000',
        margin: '0px',
    };

    const templateStyle = {
        width: '600px',
        display: 'block',
        margin: '0px auto',
        background: '#fff',
        padding: '20px',
    };

    const responsiveStyle = {
        width: '89%',
        display: 'block',
        margin: '0px auto',
        background: '#fff',
        padding: '20px',
    };
    const gotosecondpage = () => {
        navigate("/payment-link/options")
    }

    const GetPaymentLinkData = async () => {
        try {
            const totaldata = await PaymentLinkData()
            setdata(totaldata)

            // settotal(totaldata.data.count)
            // console.log(totaldata)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetPaymentLinkData()
    }, [])

    // console.log(, "data?.status")
    return (
        <>
            {
                data?.response?.data?.status != false ? <div dangerouslySetInnerHTML={{ __html: data }} /> : <h1>ooooo</h1>
            }
        </>
    )
}

export default PaymentLinkFirst