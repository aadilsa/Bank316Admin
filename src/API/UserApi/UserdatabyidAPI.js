import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl


export const getUserById = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}client/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}



export const getcurrencycustom = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}client/custom-wallets/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error
        console.log(error)
    }
}


export const docVerify = async (token, id, data) => {
    console.log(token, id, "idddddddd")
    try {
        const res = await axios.get(`${Base_Url}client/update-status/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}



export const VerifyDocStatus = async (token, id, data) => {
    console.log(token, "vaeriidididi", id,)

    // const res = await axios.post(`${Base_Url}user/create`, (data), { headers: { "Authorization": `Bearer ${token}` } })
    // return res.data

    try {
        const res = await axios.post(`${Base_Url}client/update-status/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const Verifyemail = async (token, id, data) => {
    try {
        const res = await axios.post(`${Base_Url}client/update-email/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}