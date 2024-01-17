import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const GetPermissionData = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}my-permission`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}