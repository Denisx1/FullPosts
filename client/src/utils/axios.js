import axios from 'axios'

const instatance = axios.create({
   baseURL: process.env.REACT_APP_API_URL
})

instatance.interceptors.request.use(config=>{
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instatance