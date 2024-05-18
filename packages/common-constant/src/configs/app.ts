export const childAppConfig = {
    childVue3: {
        name: 'childVue3',
        url: import.meta.env.VITE_CHILD_VUE3_URL,
        basePath: import.meta.env.VITE_CHILD_VUE3_BASE_PATH,
    },
} as const

/*
 * 枚举值不能用计算值，所以这里的映射必须和上面childAppConfig每个子项的name值对应 ts:18033
 * https://github.com/microsoft/TypeScript/issues/40793
 * */
export enum AppType {
    MAIN_VUE3 = 'main',
    CHILD_VUE3 = 'childVue3',
}
