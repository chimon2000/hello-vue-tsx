const { FuseBox, BabelPlugin, HTMLPlugin, WebIndexPlugin, QuantumPlugin } = require('fuse-box')
const isProduction = !!process.env.NODE_ENV
const buildOnly = !!process.env.BUILD_ONLY

const fuse = FuseBox.init({
    sourceMaps: !isProduction,
    homeDir: './src',
    output: 'dist/$name.js',
    plugins: [
        BabelPlugin({
            config: {
                presets: ['latest'],
                plugins: ['jsx-v-model', 'transform-vue-jsx']
            }
        }),
        WebIndexPlugin({ template: './src/index.html' }),
        isProduction &&
            QuantumPlugin({
                removeExportsInterop: false,
                uglify: true,
                treeshake: true
            })
    ]
})

const vendor = fuse.bundle('vendor').instructions('~ index.ts')
const app = fuse.bundle('app').instructions(`!> [index.ts]`)

if (!buildOnly) {
    fuse.dev()
}

if (!isProduction) {
    app.sourceMaps(true).watch().hmr()
}

fuse.run()
