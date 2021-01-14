import axios from "axios"

let env = require("dotenv-safe").config

const api = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3"
})

// api.interceptors.request.use(async config => {
//     config.headers.Authorization = `Bearer ${process.env.API_KEY}`
//     return config
// })

export default api