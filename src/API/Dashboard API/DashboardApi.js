import axios from "axios";
import { BaseUrl } from "../config";
const Base_Url = BaseUrl

export const Getuser_employeeCount = async (token, countdays) => {
    try {
        const res = await axios.get(`${Base_Url}getcount/user-employee?daysAgo=${countdays}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}



export const GetGraphdata = async (token, month) => {
    try {
        const res = await axios.get(`${Base_Url}getuser-client/graph?time=${month}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const GetAppointments = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}appointment/get`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}


export const GetNotificatation = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}notifications/get`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const GetRecentTXN = async (token, recentTab) => {
    try {
        const res = await axios.get(`${Base_Url}transactions/get?status=${recentTab}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
        return err
    }
}