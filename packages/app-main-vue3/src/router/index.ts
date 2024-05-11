import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const LayoutContainer = () => import('main-vue3/layouts/index.vue')
const Home = () => import('main-vue3/views/home/index.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: LayoutContainer,
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: Home,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    window['console'].log(to, from)
})

export default router
