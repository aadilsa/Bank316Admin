import axios from "axios"
import BaseUrlClients from "../Client-Config";
const Base_Url = BaseUrlClients
// ?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}
// export const PaymentLinkData = async () => {
//     try {
//         const res = await axios.get(`${Base_Url}payment-link/request/7148069421052960`, { headers: { "Authorization": `Bearer ${}` } })
//         return res.data
//     }
//     catch (err) {
//         return err
//         console.log(err)
//     }
// }

export const PaymentLinkData = async () => {
    try {
        const res = await axios.get(`${Base_Url}payment-link/request/7148069421052960`);
        return res.data;
    } catch (err) {
        console.error(err);
        return err
        console.log(err)
    }
};

export const PaymentLinksecondui = async () => {
    try {
        const res = await axios.get(`${Base_Url}/payment-link/options/7148069421052960`);
        return res.data;
    } catch (err) {
        console.error(err);
        return err
        console.log(err)
    }
}