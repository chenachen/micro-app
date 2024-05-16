/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RouteComponent, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
    export interface RouteMeta {
        title: string

        /** 路由访问权限标识 */
        permissions?: string[]

        // 是否作为菜单项
        isMenu: boolean
    }
}
