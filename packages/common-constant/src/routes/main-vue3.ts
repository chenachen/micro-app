import { Route } from './types'
import { AppType } from '../configs/app.ts'

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
        name: 'UserGroup',
        path: '/user/group',
        meta: {
            title: '用户组',
            permissions: [],
        },
    },
}

type keys = keyof typeof _mainRoutes
export type MainRoutesType = Record<keys, Route>

export const mainRoutes = Object.entries(_mainRoutes).reduce((obj, [key, value]) => {
    obj[key as keys] = {
        ...value,
        meta: {
            ...value.meta,
            type: AppType.MAIN_VUE3,
        },
    }

    return obj
}, {} as MainRoutesType)
