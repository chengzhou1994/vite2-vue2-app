import { defineConfig, loadEnv } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
const HOST = '0.0.0.0'
const CWD = process.cwd()
const resolve = (dir) => path.resolve(__dirname, dir)
export default ({ mode }) => {
  const { VITE_ENV } = loadEnv(mode, CWD)
  const data = loadEnv(mode, CWD)
  const isProd = ['development', 'test', 'production'].includes(VITE_ENV)
  return defineConfig({
    base: '/',
    server: {
      cors: true, // 为开发服务器配置CORS。默认启用并允许任何源
      https: false, // 是否开启https
      strictPort: false, // 设为false时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      host: HOST,
      port: process.env.PORT
    },

    build: {
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      },
      brotliSize: false, // 是否开启brotli压缩
      emptyOutDir: true, //默认true 默认情况下，若outDir在root目录下，则Vite会在构建时清空该目录。
      outDir: 'dist', // 指定输出路径 默认dist
      mainfest: false, // 是否产出maifest.json, 用于打包分析
      reportCompressedSize: false, // 取消计算文件大小，加快打包速度
      sourcemap: true, // 是否产出sourcemap.json
      assetsDir: 'assets', //默认assets
      cssCodeSplit: true, //启用/禁用 CSS 代码拆分默认true
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      // 自定义底层的 Rollup 打包配置。将与Vite 的内部Rollup选项合并。
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@styles': resolve('src/styles'),
        '@router': resolve('src/router'),
        '@views': resolve('src/views'),
        '@components': resolve('src/components'),
        '@utils': resolve('src/utils'),
        '@assets': resolve('src/assets')
      },
      // 导入时想要省略的扩展名列表,引入文件未带后缀时，依次查找数组里面配置的后缀文件
      // 不建议使用 .vue 影响IDE和类型支持
      // 在Vite中，不建议（实测还是可以配置的）忽略自定义扩展名，因为会影响IDE和类型支持。因此需要完整书写
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] //默认支持
    },
    plugins: [
      createVuePlugin(),
      //按需导入组件
      Components({
        //在此列表中的组件也会按需自动导入和注册
        // dirs: ['./src/components'],
        //此UI库的组件也会自动导入和注册（element-ui对应ElementUiResolver，Naive UI对应NaiveUiResolver，vant对应VantResolver，iview对应ViewUiResolver等等）
        // 配置之后，无需在 main.js 引入 element-ui 了,想要使用element-ui 哪个组件，可直接在 template 中引入
        resolvers: [ElementUiResolver()]
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        polyfills: [
          // Empty by default
        ],
        ignoreBrowserslistConfig: false,
        corejs: true
      }),
      // 生成gzip
      viteCompression({
        //生成压缩包gz
        verbose: true, //默认true
        disable: false, //默认false
        threshold: 10240, //默认1025
        algorithm: 'gzip', //默认gzip
        ext: '.gz' //默认gz
      })
    ]
  })
}
