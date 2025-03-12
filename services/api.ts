import axios from 'axios';

export const api = axios.create({
    baseURL: "http://10.107.160.195:3333"
    })