import axios from "axios"
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: process.env. NEXT_PUBLIC_SERVER_URL
})

const token = Cookies.get('auth_token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}