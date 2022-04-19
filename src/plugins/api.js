import axios from 'axios'
import {router} from '../router'
import { useStore } from '../store/main'

const api = axios.create({
    baseURL: "https://admin.swsreports.app",
})

api.interceptors.request.use(config => {
    const store = useStore()
    store.setLoading(true)
    if (store.isAuthenticated) {
        config.headers['authorization'] = `Bearer ${store.getJwt}`
    }
    return config
})

api.interceptors.response.use(response => {
    const store = useStore()
    store.setLoading(false)
    return response
}, error => {
    const response = error.response

    let query;
    if(response.status >= 400 && response.status < 500) {
        query = 'logout'
    } else {
        query = 'reason'
    }

    if ('errors' in response.data && response.data.errors.length > 0) {
        let code;
        try {
            code = response.data.errors[0].extensions.code
        } catch (error) {
            code = 'CREDENTIALS_EXPIRED'
        }
        router.push({
            name: 'Login',
            query: {
                [query]: code
            }
        })
    }

    return error
})

export default api