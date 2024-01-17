

import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const GetPermissiondata = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}permissions`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}


export const AddPermission = async (data, token) => {
    try {
        const res = await axios.post(`${Base_Url}/permission/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error


    }
}




export const deleteMenudata = async (id, token) => {
    try {
        console.log("menu iddd data", id)
        const res = await axios.delete(`${Base_Url}permission/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log(error)

    }
}


export const getMenuById = async (token, id) => {
    try {
        console.log(token, "this is a token", id, "iddddddddd")
        const res = await axios.get(`${Base_Url}permission/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)

    }
}



export const updateMenu = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}permission/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}