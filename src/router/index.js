import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.json'
import {useStore} from '../store/main'


const globImport = import.meta.glob('../views/*.vue')

const components = {}

for(const path in globImport) {
    const name = path.replace(/\.\.\/views\/|View\.vue/gi, '')
    components[name] = globImport[path]
}

for(const i in routes) {
    const route = routes[i]
    routes[i]['component'] = components[route.name]
}

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach(route => {
    const store = useStore()
    if('authRequired' in route.meta && !store.isAuthenticated) {
        return {
            name: 'Login',
        }
    }
})

export { router }