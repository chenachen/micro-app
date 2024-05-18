import { mainRoutes } from './main-vue3'
import { childVue3Routes } from './child-vue3'
import { Route } from './types.ts'

export { mainRoutes, childVue3Routes }

export const routesMap = (() => {
    const map = new Map<string, Route>()

    const allRoutes = [...Object.values(mainRoutes), ...Object.values(childVue3Routes)]

    allRoutes.forEach(route => map.set(route.path, route))

    return map
})()
