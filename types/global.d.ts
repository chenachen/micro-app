import { EventCenterForMicroApp, MicroApp } from '@micro-zoe/micro-app'

declare global {
    interface Window {
        __MICRO_APP_ENVIRONMENT__: boolean
        __MICRO_APP_NAME__: string
        __MICRO_APP_PUBLIC_PATH__: string
        __MICRO_APP_BASE_ROUTE__: string
        __MICRO_APP_BASE_APPLICATION__: string
        microApp: EventCenterForMicroApp & MicroApp
    }
}

export {}
