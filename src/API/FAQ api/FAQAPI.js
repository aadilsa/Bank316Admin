import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const AddFAQ = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}faq/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error

    }
}


export const GetFaqdata = async (token, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}faqs?search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}


export const GetsingleFaqdata = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}faqs/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}


export const deleteFAQdata = async (id, token) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}faq/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}