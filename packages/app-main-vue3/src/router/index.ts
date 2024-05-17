import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { childAppConfig } from 'main-vue3/configs/app'

const LayoutContainer = () => import('main-vue3/layouts/index.vue')
const Home = () => import('main-vue3/views/home/index.vue')
const Template = () => import('main-vue3/views/template/index.vue')
const User = () => import('main-vue3/views/user/index.vue')
const UserList = () => import('main-vue3/views/user/user-list/index.vue')
const UserGroup = () => import('main-vue3/views/user/user-group/index.vue')
const ChildVue3 = () => import('main-vue3/views/child-app/ChildVue3.vue')

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: LayoutContainer,
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: Home,
                meta: {
                    title: '主页',
                    isMenu: true,
                },
            },
            {
                path: 'template1',
                component: Template,
                meta: {
                    title: '模板页面1',
                    isMenu: true,
                },
            },
            {
                path: 'template2',
                component: Template,
                meta: {
                    title: '模板页面2, 不展示在菜单',
                    isMenu: false,
                },
            },
            {
                path: 'template3',
                component: Template,
                meta: {
                    title: '模板页面3',
                    isMenu: true,
                },
            },
            {
                path: 'user',
                component: User,
                meta: {
                    title: '用户管理',
                    isMenu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: UserList,
                        meta: {
                            title: '用户列表',
                            isMenu: true,
                        },
                    },
                    {
                        path: 'group',
                        component: UserGroup,
                        meta: {
                            title: '用户组',
                            isMenu: true,
                        },
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
