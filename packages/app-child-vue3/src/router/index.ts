import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { AppType, routesMap } from '@common/constant'

const Page1 = () => import('child-vue3/views/child-page1/index.vue')
const Page2 = () => import('child-vue3/views/child-page2/index.vue')

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

export function useCustomRouterPush(path: string) {
    const { meta } = routesMap.get(path)!

    if (meta.type === AppType.CHILD_VUE3) {
        router.push(path)
    } else if (meta.type === AppType.MAIN_VUE3) {
        const baseRouter = window.microApp.router.getBaseAppRouter() as Router
        baseRouter.push(path)
    } else {
        window.microApp.router.push({ name: meta.type, path })
    }
}

export default router
