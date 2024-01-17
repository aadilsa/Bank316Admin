

import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const GetCountrydata = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}countries`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}



export const AddCountry = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}country/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error
    }
}



export const deleteCountrydata = async (id, token) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}country/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getCountryById = async (token, id) => {
    try {

        const res = await axios.get(`${Base_Url}country/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}


export const updateCountryList = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}country/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}