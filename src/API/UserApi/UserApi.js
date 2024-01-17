import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl


export const GetTotaluserdata = async (token, pagenumber, search, sortedBy, orderBy) => {
    try {
        const res = await axios.get(`${Base_Url}clients?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pagenumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        return err
    }
}

export const AddUser = async (data, token) => {
    try {
        const res = await axios.post(`${Base_Url}user/create`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error
    }
}




export const deleteUser = async (id, token) => {
    console.log(id, "this ia a  idddd", token, "tokennnnnnnn")
    try {
        const res = await axios.delete(`${Base_Url}client/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log(error)

    }
}




export const UpdateUser = async (data, token, id) => {
    try {

        const res = await axios.post(`${Base_Url}user/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}



