import { routes } from 'main-vue3/router'
import { RouteRecordRaw } from 'vue-router'

export interface MenuType {
    label: string
    path: string
    children: MenuType[] | null
}

export function getMenuList() {
    const traverse = (rows: RouteRecordRaw[], parentPath: string = '') => {
        const menuList: MenuType[] = []

        rows.forEach(item => {
            const { title, isMenu } = item.meta!
            if (!isMenu) {
                return
            }
            const path = item.path.startsWith('/') ? item.path : `${parentPath}/${item.path}`
            menuList.push({
                label: title,
                path,
                children: item.children ? traverse(item.children, path) : null,
            })
        })

        return menuList
    }

    return traverse(routes[0].children!)
}
