import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import pinia from './store'


/* add icons to the library */
library.add(fas, far, faMicrosoft)
/* add font awesome icon component */


createApp(App)
.component('fa-icon', FontAwesomeIcon)
.use(router)
.use(pinia)
.mount('#app')
