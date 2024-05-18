import { Route } from './types'
import { AppType } from '../configs/app.ts'

const _childVue3Routes = {
    page1: {
        name: 'Page1',
        path: '/page1',
        meta: {
            title: '子应用 页面1',
            permissions: [],
            type: AppType.CHILD_VUE3,
        },
    },
    page2: {
        name: 'Page2',
        path: '/page2',
        meta: {
            title: '子应用 页面1',
            permissions: [],
            type: AppType.CHILD_VUE3,
        },
    },
}

type keys = keyof typeof _childVue3Routes
export type ChildVue3RoutesType = Record<keys, Route>

export const childVue3Routes: ChildVue3RoutesType = Object.entries(_childVue3Routes).reduce(
    (obj, [key, value]) => {
        obj[key as keys] = {
            ...value,
            meta: {
                ...value.meta,
                type: AppType.CHILD_VUE3,
            },
        }
        return obj
    },
    {} as Record<keys, Route>,
)
