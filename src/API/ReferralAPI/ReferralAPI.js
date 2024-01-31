import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const GetReferrals = async (token, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}all-referrals?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
        console.log(err)
    }
}