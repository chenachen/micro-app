import { AppType } from '../configs/app.ts'

export interface Route {
    name: string
    path: string
    meta: {
        title: string
        permissions?: string[]
        type: AppType
    }
}
