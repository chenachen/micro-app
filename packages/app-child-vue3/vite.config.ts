import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    const { VITE_CHILD_VUE3_PORT, VITE_CHILD_VUE3_BASE_PATH } = loadEnv(mode, resolve(__dirname, '../..'))

    return {
        base: VITE_CHILD_VUE3_BASE_PATH,
        envDir: '../..',
        server: {
            port: Number(VITE_CHILD_VUE3_PORT),
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: ElementPlusResolver(),
                dts: './src/types/auto-import.d.ts',
            }),
            Components({
                resolvers: ElementPlusResolver(),
                dts: './src/types/components.d.ts',
            }),
        ],
        resolve: {
            alias: {
                'child-vue3': resolve(__dirname, './src'),
            },
        },
    }
}
