import axios from 'axios'
import { useStore } from '../store/main'

const api = axios.create({
    baseURL: "https://admin.swsreports.app",
})

api.interceptors.request.use(config => {
    const store = useStore()
    store.setLoading(true)
    if(store.isAuthenticated) {
        config.headers['authorization'] = `Bearer ${store.getJwt}`
    }
    return config
})

api.interceptors.response.use(response => {
    const store = useStore()
    store.setLoading(false)
    return response
})

export default api