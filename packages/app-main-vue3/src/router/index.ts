import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { mainRoutes, childAppConfig } from '@common/constant'

const LayoutContainer = () => import('main-vue3/layouts/index.vue')
const Home = () => import('main-vue3/views/home/index.vue')
const Template = () => import('main-vue3/views/template/index.vue')
const User = () => import('main-vue3/views/user/index.vue')
const UserList = () => import('main-vue3/views/user/user-list/index.vue')
const UserGroup = () => import('main-vue3/views/user/user-group/index.vue')
const ChildVue3 = () => import('main-vue3/views/child-app/ChildVue3.vue')

export const routes: RouteRecordRaw[] = [
    {
        path: mainRoutes.base.path,
        component: LayoutContainer,
        redirect: mainRoutes.home.path,
        children: [
            {
                ...mainRoutes.home,
                component: Home,
            },
            {
                ...mainRoutes.template,
                component: Template,
            },
            {
                ...mainRoutes.user,
                component: User,
                children: [
                    {
                        ...mainRoutes.userList,
                        component: UserList,
                    },
                    {
                        ...mainRoutes.userGroup,
                        component: UserGroup,
                    },
                ],
            },
            {
                path: childAppConfig.childVue3.basePath,
                component: ChildVue3,
                meta: {
                    title: '子应用',
                    isMenu: true,
                },
                children: [
                    {
                        path: ':allPage(.*)',
                        component: ChildVue3,
                        meta: {
                            title: '子应用',
                            isMenu: false,
                        },
                    },
                ],
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.meta.name) {
        document.title = to.meta.title
    }
    window['console'].log(to, from)
})

export default router
