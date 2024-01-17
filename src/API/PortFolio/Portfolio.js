import axios from "axios"
import { BaseUrl } from "../config";
const Base_Url = BaseUrl



export const GetPortfoliodata = async (token) => {
    try {
        const res = await axios.get(`${Base_Url}portfolios`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}


export const AddPortfolio = async (token, data) => {
    console.log(token, data, "spiiii")
    try {
        const res = await axios.post(`${Base_Url}portfolio/add`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        return error
    }
}

export const getPortfolioById = async (token, id) => {
    console.log(id, "idddddd")
    try {
        console.log(token, "this is a token", id, "iddddddddd")
        const res = await axios.get(`${Base_Url}portfolio/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)

    }
}

export const updatePortfolio = async (token, data, id) => {
    try {
        console.log(token, "token", data, id, "Api data")
        const res = await axios.post(`${Base_Url}portfolio/update/${id}`, (data), { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}


export const deletePortdata = async (id, token) => {
    try {
        console.log("ppppppppppp", id)
        const res = await axios.delete(`${Base_Url}portfolio/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res

    } catch (error) {
        console.log(error)

    }
}