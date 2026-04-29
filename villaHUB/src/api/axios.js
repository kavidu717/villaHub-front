import axios from "axios";


// my backend url
const API = axios.create({ 
    baseURL: "http://localhost:3000/api/v1" 
});


// attached the token in the every request headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
})

//  https://villahub.onrender.com/api/v1




export default API