import axios from "axios";
const baseUrl = "http://localhost:8787/api"

const getOrders = async () => {
    const req = await axios.get(`${baseUrl}/report`)
    return req.data
}

const signOrder = async (orderId, formData) => {
    const res = await axios.put(`${baseUrl}/signature/${orderId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return res
}

const Axios = {
    getOrders,
    signOrder
}

export default Axios