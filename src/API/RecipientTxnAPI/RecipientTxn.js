import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const RecipientTxn = async (token, id, sortedBy, orderBy, search, pageNumber) => {
    console.log(id)
    try {
        const res = await axios.get(`${Base_Url}get-outside-transactions/${id}?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data

    }
    catch (err) {
        return err
        console.log(err)
    }
}
