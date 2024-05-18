import { createApp } from 'vue'
import microApp from '@micro-zoe/micro-app'
import App from './App.vue'
import router from './router'
import { childAppConfig } from '@common/constant'

import 'normalize.css'
import './styles/index.less'

microApp.start({
    'router-mode': 'native',
})
microApp.preFetch(
    Object.values(childAppConfig).map(item => {
        return {
            name: item.name,
            url: item.url,
            iframe: true,
        }
    }),
)

createApp(App).use(router).mount('#app')
