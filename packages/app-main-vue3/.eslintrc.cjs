const path = require('path')

module.exports = {
    root: false,
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['src', path.resolve(__dirname, './src')],
                ],
                extensions: ['.ts', '.js', '.json', '.vue'],
            },
        },
    },
}
