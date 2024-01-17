
import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const GetEmployeesdata = async (token, search, pageNumber, sortedBy, orderBy) => {
    try {
        const res = await axios.get(`${Base_Url}employees?sortby=${sortedBy}&orderby=${orderBy}&search=${search}&page_number=${pageNumber}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}







export const AddEmployee = async (token, data) => {
    try {
        const res = await axios.post(`${Base_Url}employee/create`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error
    }
}




export const singleEmploye = async (token, id) => {
    try {
        const res = await axios.get(`${Base_Url}employee/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const updateEmployee = async (token, data, id) => {
    try {
        // console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}update-employee/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteemployee = async (token, id) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}employee/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res

    } catch (error) {
        return error
        console.log(error)

    }
}


export const EmployeeStatus = async (token, id, event) => {
    // console.log(data, "idddddddddddddddddd")
    try {
        const res = await axios.post(`${Base_Url}employee/update-status/${id}`, ({ "is_verified_status": event }), {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}