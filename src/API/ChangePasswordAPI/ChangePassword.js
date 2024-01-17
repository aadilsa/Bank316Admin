
import axios from "axios"
import { BaseUrl } from "../config";
export const ChangePasswordAdmin = async (data, token) => {
    console.log(data, "data", "token", token)
    try {
        const res = await axios.post(`${BaseUrl}change/password`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error


    }
}