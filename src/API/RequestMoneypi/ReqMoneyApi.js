import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const RequestMoneyData = async (token, recentTab, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}request-moneys?status=${recentTab}&sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}
// export const ManualBankStatus = async (id, data, token) => {
//     try {
//         console.log(data, "this is data", id, "ssssssssssssssssssssssssssssssssssssss->>>>>>>>>>>>>>>>>>>>>>")
//         const res = await axios.post(`${Base_Url}request-money/update/status/${id}`, (data), { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json', } })
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

export const ManualBankStatus = async (reqmoneymsg, id, data, token) => {
    let api
    if (reqmoneymsg == "Reqmoney") {
        api = `${Base_Url}send-money/requested/update/status/${id}`
    }
    else if (reqmoneymsg == "Wallet") {
        api = `${Base_Url}send-money/update/wallet-manual/status/${id}`
    }
    else if (reqmoneymsg == "ManualBank") {
        api = `${Base_Url}send-money/update/status/${id}`
    }
    else if (reqmoneymsg == "") {
        api = `${Base_Url}request-money/update/status/${id}`
    }
    // else {
    //     api = `${Base_Url}request-money/update/status/${id}`
    // }
    try {
        let requestOptions = {
            method: 'POST',
            body: data,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        const res = await fetch(api, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀  file: ManualBankStatus.js:26 ~ error:", error)
    }
}


export const RequestMoneyTxnData = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}request-money/client/detail/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}
