
import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl
export const GetLavelInvestdata = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}levels`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}



export const AddLavel = async (data, token) => {
    try {
        const res = await axios.post(`${Base_Url}level/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error


    }
}




export const getLavelById = async (token, id) => {
    try {
        console.log(token, "this is a token", id, "iddddddddd")
        const res = await axios.get(`${Base_Url}level/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)

    }
}


export const updateLavel = async (token, data, id) => {
    try {
        console.log(data, "ddddaaaattatatatata")
        const res = await axios.post(`${Base_Url}level/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}


export const deletelaveldata = async (id, token) => {
    try {
        const res = await axios.delete(`${Base_Url}level/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}