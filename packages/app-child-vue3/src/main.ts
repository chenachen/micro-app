import { createApp } from 'vue'
import App from './App.vue'
import router, { routes } from './router'

import 'normalize.css'

window.microApp.dispatch({ routes })

createApp(App).use(router).mount('#app')
