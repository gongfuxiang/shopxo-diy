import vue from '@vitejs/plugin-vue';

import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd());
    return {
        resolve: {
            alias: {
                '@': pathSrc,
            },
        },
        css: {
            // CSS 预处理器
            preprocessorOptions: {
                //define global scss variable
                scss: {
                    javascriptEnabled: true,
                    additionalData: `@use "@/styles/variables.scss" as *;`,
                },
            },
        },
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_APP_PORT),
            open: true, // 运行是否自动打开浏览器
            proxy: {
                // 反向代理解决跨域
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_APP_BASE_API_URL, // 接口地址
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''), // 替换 /dev-api 为 target 接口地址
                },
                // 反向代理解决跨域
                [env.VITE_APP_BASE_API_PHP]: {
                    target: env.VITE_APP_BASE_API_PHP_URL, // 接口地址
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API_PHP), ''), // 替换 /dev-api 为 target 接口地址
                },
            },
        },
        plugins: [
            vue({
                script: {
                    // 开启defineModel配置
                    defineModel: true,
                },
            }),
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ['vue', '@vueuse/core'],
                eslintrc: {
                    enabled: true,
                    filepath: './.eslintrc-auto-import.json',
                    globalsPropValue: true,
                },
                resolvers: [
                    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)------若是没有自动引入，请耐心等待，反应特别慢，希望以后可以优化
                    ElementPlusResolver(),
                ],
                vueTemplate: true,
                // 配置文件生成位置(false:关闭自动生成)
                // dts: false,
                dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
            }),
            Components({
                resolvers: [
                    // 自动导入 Element Plus 组件
                    ElementPlusResolver(),
                ],
                dirs: ['src/**/components'],
                // 配置文件生成位置(false:关闭自动生成)
                // dts:false,
                dts: path.resolve(pathSrc, 'types', 'components.d.ts'), // 指定自动导入组件TS类型声明文件路径
            }),
        ],

        // 构建配置
        build: {
            target: 'esnext',
            // 打包不压缩图片为base64
            assetsInlineLimit: 0,
            // 混淆器设置
            minify: 'terser',
            // 不生成source map文件，默认false
            sourcemap: false,
            // 指定输出路径（相对于项目根目录)，默认dist
            outDir: 'dist',
            // 指定生成静态资源的存放路径，默认assets
            assetsDir: 'assets',
            // chunk大小警告限制，默认500kbs
            chunkSizeWarningLimit: 1500,
            // 是否禁用css拆分(默认true)，设置false时所有CSS将被提取到一个CSS文件中
            cssCodeSplit: true,
            // 简要配置
            terserOptions: {
                compress: {
                    // 移除console
                    drop_console: false,
                    // 移除debugger
                    drop_debugger: true,
                },
                // 保留类名
                keep_classnames: true,
                format: {
                    // 移除所有的注释
                    comments: false,
                },
            },
            // js、css等文件打包到不同文件夹
            rollupOptions: {
                output: {
                    // 自定义 chunk 文件的输出路径和文件名格式
                    chunkFileNames: 'static/diy/js/chunk/[name]-[hash].js',
                    // 自定义 entry chunk 的输出路径和文件名格式
                    entryFileNames: 'static/diy/js/entry/[name]-[hash].js',
                    //非js文件夹，按照文件类型分类css,png,jpg
                    assetFileNames: 'static/diy/[ext]/[name]-[hash].[ext]',
                },
            },
        },
    };
});
