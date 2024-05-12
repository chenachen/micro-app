import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    const { VITE_MAIN_PORT } = loadEnv(mode, resolve(__dirname, '../..'))
    return {
        server: {
            port: Number(VITE_MAIN_PORT),
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: ElementPlusResolver(),
            }),
            Components({
                resolvers: ElementPlusResolver(),
            }),
        ],
        resolve: {
            alias: {
                'main-vue3': resolve(__dirname, './src'),
            },
        },
    }
}
