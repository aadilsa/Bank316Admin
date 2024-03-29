import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const Getconversions = async (token, recentTab, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}all-conversions?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}

export const GetTransfers = async (token, startDate, endDate, recentTab, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}getTransactionList?status=${recentTab}&startDate=${startDate}&endDate=${endDate}&sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}


// export const TrancferApprove = async (token, id, data) => {
//     console.log(data, "aaaaaaaaaaaaa")
//     // try {
//     //     const res = await axios.post(
//     //         `${Base_Url}send-money/update/status/${id}`,
//     //         data,  // Include your data in the request body
//     //         { headers: { "Authorization": `Bearer ${token}` } }
//     //     );
//     //     return res.data;
//     // } catch (err) {
//     //     console.error(err);
//     //     throw err;  // Rethrow the error so that the calling code can handle it
//     // }
//     try {
//         let requestOptions = {
//             method: 'POST',
//             body: data,
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             redirect: 'follow'
//         };

//         const res = await fetch(`${Base_Url}send-money/update/status/${id}`, requestOptions);
//         const result = await res.json();
//         return result;
//     } catch (error) {
//         console.log("🚀  file: ManualBankStatus.js:26 ~ error:", error)
//     }

// };
