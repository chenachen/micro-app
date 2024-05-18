/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RouteComponent, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
    export interface RouteMeta {
        readonly title: string

        /** 路由访问权限标识 */
        readonly permissions?: string[]
    }
}
