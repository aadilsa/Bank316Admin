
import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const GetTotalBankdata = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}banks`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}

export const AddBank = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}bank/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error
    }
}

export const deleteBankdata = async (id, token) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}bank/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res
    } catch (error) {
        return error
        console.log(error)

    }
}

export const getBankDataById = async (token, id) => {
    try {
        console.log(token, "this is a token", id, "iddddddddd")
        const res = await axios.get(`${Base_Url}bank/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error
        console.log(error)

    }
}

export const updateBankList = async (token, data, id) => {
    console.log(token, "token", id, "Api data")
    try {
        const res = await axios.post(`${Base_Url}bank/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}
