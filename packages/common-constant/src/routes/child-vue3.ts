import { Route } from './types'

const _childVue3Routes: Record<string, Route> = {
    page1: {
        name: 'Page1',
        path: '/page1',
        meta: {
            title: '子应用 页面1',
            permissions: [],
        },
    },
    page2: {
        name: 'Page2',
        path: '/page2',
        meta: {
            title: '子应用 页面1',
            permissions: [],
        },
    },
}

export type ChildVue3RoutesType = Readonly<Record<keyof typeof _childVue3Routes, Route>>

export const childVue3Routes = _childVue3Routes as ChildVue3RoutesType
