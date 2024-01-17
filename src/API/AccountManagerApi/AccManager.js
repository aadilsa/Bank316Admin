
import axios from "axios"
// import BaseUrl from "../config"
import { BaseUrl } from "../config"
const Base_Url = BaseUrl



export const GetAccountManager = async (token) => {
    try {
        const res = await axios.get(`https://vehicle99.com:3006/client/account-Managers`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}

export const AddAccountManager = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}create-account-manager`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error


    }
}


export const deleteAccountManager = async (id, token) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}delete-account-manager/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res
    } catch (error) {
        return error
        console.log(error)

    }
}