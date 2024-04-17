import axios from 'axios'
const API = axios.create({baseURL:'https://admin-hotel-management-app.onrender.com/api/v1'})
export default API;