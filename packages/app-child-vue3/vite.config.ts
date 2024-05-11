import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    const { VITE_CHILD_PORT } = loadEnv(mode, resolve(__dirname, '../..'))

    return {
        server: {
            port: Number(VITE_CHILD_PORT),
        },
        plugins: [vue()],
        resolve: {
            alias: {
                src: resolve(__dirname, './src'),
            },
        },
    }
}
