export const childAppConfig = {
    childVue3: {
        name: 'childVue3',
        url: import.meta.env.VITE_CHILD_VUE3_URL,
        basePath: import.meta.env.VITE_CHILD_VUE3_BASE_PATH,
    },
} as const
