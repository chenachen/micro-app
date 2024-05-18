import { Route } from './types'

const _mainRoutes = {
    base: {
        name: 'Base',
        path: '/',
        meta: {
            title: '',
        },
    },
    home: {
        name: 'Home',
        path: '/home',
        meta: {
            title: '主页',
            permissions: [],
        },
    },
    template: {
        name: 'Template',
        path: '/template',
        meta: {
            title: '模板页面1',
            permissions: [],
        },
    },
    user: {
        name: 'User',
        path: '/user',
        meta: {
            title: '用户管理',
            permissions: [],
        },
    },
    userList: {
        name: 'UserList',
        path: '/user/list',
        meta: {
            title: '用户列表',
            permissions: [],
        },
    },
    userGroup: {
        name: 'UserList',
        path: '/user/group',
        meta: {
            title: '用户组',
            permissions: [],
        },
    },
}

export type MainRoutesType = Readonly<Record<keyof typeof _mainRoutes, Route>>

export const mainRoutes = _mainRoutes as MainRoutesType
