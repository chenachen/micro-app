import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    const { VITE_CHILD_VUE3_PORT, VITE_CHILD_VUE3_BASE_PATH } = loadEnv(mode, resolve(__dirname, '../..'))

    return {
        base: VITE_CHILD_VUE3_BASE_PATH,
        envDir: '../..',
        server: {
            port: Number(VITE_CHILD_VUE3_PORT),
        },
        plugins: [vue()],
        resolve: {
            alias: {
                'child-vue3': resolve(__dirname, './src'),
            },
        },
    }
}
