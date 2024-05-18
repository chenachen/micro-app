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
        envDir: '../..',
        server: {
            port: Number(VITE_MAIN_PORT),
        },
        plugins: [
            vue({
                template: {
                    compilerOptions: {
                        isCustomElement: tag => tag === 'micro-app',
                    },
                },
            }),
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
                'main-vue3': resolve(__dirname, './src'),
            },
        },
    }
}
