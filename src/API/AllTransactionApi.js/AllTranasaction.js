import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl


export const AllCurrencyData = async (token, search, pageNumber, date, sortedBy, orderBy) => {
    try {
        const res = await axios.get(`${Base_Url}client/all/currency-wallet-transactions?sortby=${sortedBy}&orderby=${orderBy}&page_number=${pageNumber}&search=${search}&size=&start_date=${date}&end_date=`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}


export const AllCustomData = async (token, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}client/all/custom-wallet-transactions?sortby=${sortedBy}&orderby=${orderBy}&page_number=${pageNumber}&search=${search}&size=&start_date=&end_date=`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}