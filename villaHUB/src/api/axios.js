import axios from "axios";


// my backend url
const API = axios.create({ 
    baseURL: "https://villa-hub-8en5.vercel.app/api/v1" 
});


// attached the token in the every request headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
})






export default API