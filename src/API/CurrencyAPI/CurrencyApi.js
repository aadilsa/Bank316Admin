import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl
export const CurrencyData = async (token, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}currencies?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}


export const CurrencyDataUseSelect = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}currencies`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}



export const SingleCurrencyData = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}currency/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}



export const AddCurrency = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}currency/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error


    }
}


export const updateCurrency = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}currency/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}


export const deleteCurrency = async (token, id) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}currency/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res

    } catch (error) {
        return error
        console.log(error)

    }
}