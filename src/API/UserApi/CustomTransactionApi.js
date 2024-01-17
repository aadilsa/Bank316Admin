import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const CustomTransactions = async (token, id, sortedBy, orderBy, search, pageNumber) => {
    console.log(search, "searchhhhh")
    try {
        const res = await axios.get(`${Base_Url}client/custom-wallet-transaction/${id}?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}&start_date&end_date`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}
export const SingleCustomTransaction = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}custom-wallet-transaction/detail/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}