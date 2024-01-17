import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl
export const getCurrencyBank = async (token, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}currencys/bank?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}


export const AddBankCurrency = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}currency/bank/add`, (data), { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json', } })
        return res.data
    } catch (error) {
        return error
    }
}



export const deleteBankCurrency = async (token, id) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}currency/bank/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res

    } catch (error) {
        console.log(error)
        return error
    }
}



export const SingleCurrencyData = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}currency/bank/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}


export const updateCurrencyBank = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}currency/bank/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}