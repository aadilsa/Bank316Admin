import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl


export const CurrencyTransaction = async (token, id, pageNumber, search, sortedBy, orderBy) => {
    try {
        console.log(token, id, search, pageNumber, "api pagenumber")
        const res = await axios.get(`${Base_Url}client/admin/currencies-transaction/${id}?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}&start_date&end_date`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}



export const SingleCurrencyTransaction = async (token, location) => {
    console.log(location, "THIS IS APIIIIIIIIIIIIIIIIIII", token)

    // if ('client_id' in location) {
    try {

        const res = await axios.get(`${Base_Url}currency-wallet-transaction/detail/${location.id}?clientId=${location.client_id}`,
            {
                headers:
                    { "Authorization": `Bearer ${token}` }
            })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
    // } else {

    //     try {

    //         const res = await axios.get(`${Base_Url}currency-wallet-transaction/detail/${location.id}?walletId=${location.other_wallet_id}`,
    //             {
    //                 headers:
    //                     { "Authorization": `Bearer ${token}` }
    //             })
    //         return res.data
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

}

// export const SingleCurrencywalletTransaction = async (token, id, walletId) => {

//     try {

//         const res = await axios.get(`${Base_Url}currency-wallet-transaction/detail/${id}?walletId=${walletId}`,
//             {
//                 headers:
//                     { "Authorization": `Bearer ${token}` }
//             })
//         return res.data
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

