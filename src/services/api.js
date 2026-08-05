import axios from "axios";

const api = axios.create({
    baseURL: "https://klaus.alwaysdata.net/api/",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("access")
    if (access_token && config.url !== "core/auth/login/") {
        config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
})

export default api;