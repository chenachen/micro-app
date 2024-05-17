import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const Page1 = () => import('child-vue3/views/child-page1/index.vue')
const Page2 = () => import('child-vue3/views/child-page1/index.vue')

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: 'page1',
        children: [
            {
                path: 'page1',
                component: Page1,
                meta: {
                    title: '子应用页面一',
                    isMenu: true,
                },
            },
            {
                path: 'page2',
                component: Page2,
                meta: {
                    title: '子应用页面二',
                    isMenu: true,
                },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || '/'),
    routes,
})

router.beforeEach((to, from) => {
    if (to.meta.name) {
        document.title = to.meta.title
    }
    window['console'].log(to, from)
})

export default router
