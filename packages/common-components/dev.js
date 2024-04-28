const { exec } = require('child_process')

function dev() {
    exec('npx tsc -p ./tsconfig.dts.json --watch')
    exec('rollup -c ./rollup.config.mjs --watch')
}

dev()
