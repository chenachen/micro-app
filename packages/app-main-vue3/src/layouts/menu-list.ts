import { AppType, childAppConfig, childVue3Routes, mainRoutes } from '@common/constant'

export interface MenuType {
    label: string
    path: string
    type: AppType
    children?: MenuType[]
}

const ChildVue3BasePath = childAppConfig.childVue3.basePath

export const MenuList: MenuType[] = [
    {
        label: mainRoutes.home.meta.title,
        path: mainRoutes.home.path,
        type: AppType.MAIN_VUE3,
    },
    {
        label: mainRoutes.template.meta.title,
        path: mainRoutes.template.path,
        type: AppType.MAIN_VUE3,
    },
    {
        label: mainRoutes.user.meta.title,
        path: mainRoutes.user.path,
        type: AppType.MAIN_VUE3,
        children: [
            {
                label: mainRoutes.userList.meta.title,
                path: mainRoutes.userList.path,
                type: AppType.MAIN_VUE3,
            },
            {
                label: mainRoutes.userGroup.meta.title,
                path: mainRoutes.userGroup.path,
                type: AppType.MAIN_VUE3,
            },
        ],
    },
    {
        label: 'child vue3',
        path: ChildVue3BasePath,
        type: AppType.CHILD_VUE3,
        children: [
            {
                label: childVue3Routes.page1.meta.title,
                path: ChildVue3BasePath + childVue3Routes.page1.path,
                type: AppType.CHILD_VUE3,
            },
            {
                label: childVue3Routes.page2.meta.title,
                path: ChildVue3BasePath + childVue3Routes.page2.path,
                type: AppType.CHILD_VUE3,
            },
        ],
    },
] as const
