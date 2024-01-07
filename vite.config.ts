import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "@/assets/styles/element-plus/index.scss" as *;
              @use "@/assets/styles/variables.scss" as *;
            `,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      Components({
        dirs: [],
        dts: './components.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          IconsResolver({
            customCollections: ['custom'],
            enabledCollections: ['ep'],
            prefix: 'icon',
          }),
        ],
        types: [],
      }),
      Icons({
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader('./src/assets/icons'),
        },
      }),
      viteMockServe({
        enable:
          command === 'serve' &&
          mode === 'development' &&
          env.VITE_ENABLE_MOCK === 'true',
        // 与正则表达式逻辑相反，https://github.com/vbenjs/vite-plugin-mock/issues/125
        // ignore: (fileName) => !fileName.endsWith('.mock.ts'),
        ignore: /^.*(?<!\.mock)\.ts$/,
        mockPath: './mocks',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      open: true,
    },
  }
})
