import { defineStore } from 'pinia'
import axios from 'axios'
import { router } from '../router'

export const useStore = defineStore('main', {
    state: () => {
        return {
            jwt: null,
            user: {},
            loading: false,
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getJwt(state) {
            return state.jwt
        },
        isAuthenticated(state) {
            if (state.jwt && state.jwt !== null) {
                return true
            } else {
                return false
            }
        }
    },
    actions: {
        setUser(jwt) {
            this.jwt = jwt
            axios({
                    method: 'GET',
                    url: 'https://admin.swsreports.app/users/me',
                    headers: {
                        authorization: `Bearer ${jwt}`
                    }
                })
                .then((res) => {
                    this.user = res.data.data
                })
        },
        logout(routerArgs = {}) {
            this.$reset()
            localStorage.removeItem('piniaState')
            axios({
                method: 'POST',
                url: 'https://admin.swsreports.app/auth/logout',
                withCredentials: true
            })
            router.push({ 
                name: "Login",
                ...routerArgs 
            })
        },
        setLoading(load = Boolean) {
            this.loading = load
        }
    },
    persist: true
})