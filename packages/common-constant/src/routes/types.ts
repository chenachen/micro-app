export interface Route {
    name: string
    path: string
    meta: {
        title: string
        permissions?: string[]
    }
}
