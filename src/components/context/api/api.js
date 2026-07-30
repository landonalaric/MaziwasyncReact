// create a reusable axios instance 

import axios from "axios";

// this prevents us repeating the api url in every request 
const api=axios.create({
    baseURL:"https://klaus.alwaysdata.net/api/",
    headers:{
        // tell the backend that we are sending JSON data
        "Content-Type":"application/json"
    }
})

// inteceptor run before every request 
// here we automatically attach the JWT access_token 
// so protected endpoints can identify the logged in user 
api.interceptors.request.use((config)=>{
    // extract the access token 
    const access_token=localStorage.getItem("access")
    if (access_token  && config.url !== "core/auth/login/"){
        config.headers.Authorization=`Bearer ${access_token}`
    }
    return config
})
export default api;