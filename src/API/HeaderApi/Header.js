import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const Getnotifications = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}notifications/get/v1`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const readalldata = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}notifications/read-all`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const readonedata = async (id, token) => {
    try {
        const res = await axios.get(`${Base_Url}notifications/read/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}

