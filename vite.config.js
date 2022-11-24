import { defineConfig, loadEnv } from 'vite'
// @vitejs/plugin-legacy 版本（最新的是2.0.0版本，需要vite3.0.0支持）
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
const HOST = '0.0.0.0'
const CWD = process.cwd()
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
      // proxy: {
      //   // 为开发服务器配置自定义代理规则
      //   // 字符串简写写法
      //   '/foo': 'http://192.168.xxx.xxx:xxxx',
      //   // 选项写法
      //   '/api': {
      //     target: 'http://192.168.xxx.xxx:xxxx', //代理接口
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
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
        '@': path.resolve(__dirname, './src'), // 这里是将src目录配置别名为@方便在项目中导入src目录下的文件
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '/images': 'src/assets/images' // <img src="/images/logo.png" alt="" />
      },
      // 导入时想要省略的扩展名列表,引入文件未带后缀时，依次查找数组里面配置的后缀文件
      // 不建议使用 .vue 影响IDE和类型支持
      // 在Vite中，不建议（实测还是可以配置的）忽略自定义扩展名，因为会影响IDE和类型支持。因此需要完整书写
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] //默认支持
    },

    css: {
      // 指定传递给CSS预处理器的选项
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/index.less";',
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      createVuePlugin({
        jsx: true
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        // Define which polyfills your legacy bundle needs. They will be loaded
        // from the Polyfill.io server. See the "Polyfills" section for more info.
        polyfills: [
          // Empty by default
        ],
        // Toggles whether or not browserslist config sources are used.
        // https://babeljs.io/docs/en/babel-preset-env#ignorebrowserslistconfig
        ignoreBrowserslistConfig: false,
        // When true, core-js@3 modules are inlined based on usage.
        // When false, global namespace APIs (eg: Object.entries) are loaded
        // from the Polyfill.io server.
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
      }),
      // 处理svg
      viteSvgIcons({
        iconDirs: [path.resolve('src/icons/svg')],
        symbolId: 'icon-[name]'
      })
    ],
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        //  '@iconify/iconify',
        //  'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        //  'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu'
      ]
      // exclude: ['vue-demi', 'consolidate'],
    }
  })
}
