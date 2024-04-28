import vuePlugin from 'rollup-plugin-vue'
import { resolve, dirname } from 'path'
import typescript from 'rollup-plugin-typescript2'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const input = resolve(__dirname, './src/index.ts')

export default [
    {
        input,
        output: [
            {
                file: resolve(__dirname, './dist/index.esm-bundler.js'),
                format: 'esm',
            },
            {
                file: resolve(__dirname, './dist/index.d.ts'),
                format: 'esm',
            },
        ],
        plugins: [
            typescript({
                abortOnError: false,
            }),
            vuePlugin({}),
        ],
    },
]
