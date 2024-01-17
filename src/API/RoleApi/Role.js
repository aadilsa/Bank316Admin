
import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl
export const GetRoledata = async (token, sortedBy, orderBy, search, pageNumber) => {
    try {
        const res = await axios.get(`${Base_Url}roles?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}


export const GetRoledatatitle = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}roles`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}



export const AddRoles = async (data, token) => {
    try {
        const res = await axios.post(`${Base_Url}role/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error


    }
}


export const deleteRoledata = async (id, token) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}role/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res

    } catch (error) {
        console.log(error)

    }
}



export const getRoleById = async (token, id) => {
    console.log(token, "this is a token", id, "iddddddddd")
    try {

        const res = await axios.get(`${Base_Url}role/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)

    }
}

export const updateRole = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}role/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}



