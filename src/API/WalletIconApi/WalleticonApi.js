import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl


export const getWalletIcon = async (token, sortedBy, orderBy, search, pageNumber) => {
    try {
        // console.log(token, id, search, pageNumber, "api pagenumber")
        const res = await axios.get(`${Base_Url}walleticons?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}



export const AddWalletIcon = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}walleticon/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error


    }
}





export const SingleWalletData = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}walleticon/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}



export const updateWallet = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}walleticon/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}



export const deleteWalletdata = async (token, id) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}walleticon/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res

    } catch (error) {
        console.log(error)

    }
}