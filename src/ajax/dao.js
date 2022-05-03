import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({});

const baseUrl = process.env.BE_SERVER_BASE_URL;

const getOrders = async () => {
    const req = await axios.get(`${baseUrl}/report`);
    return req.data;
}

const signOrder = async (orderId, formData) => {
    const res = await axios.put(`${baseUrl}/signature/${orderId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res;
}

const dao = {
    getOrders,
    signOrder
}

export default dao;      
// DAO stands for "data access object", our way to the business data model, 
// this time via ajax to the backend