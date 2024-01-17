import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl
// ?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}
export const PaymentChargeData = async (token, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}charges?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}


export const SinglePaymnetChargeData = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}charge/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}


export const updatePayment = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}update/charge/${id}`, (data), { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json', } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}