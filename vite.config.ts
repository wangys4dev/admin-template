import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element-plus/index.scss" as *;`,
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
          enabledCollections: ['ep'],
          prefix: 'icon',
        }),
      ],
      types: [],
    }),
    Icons({
      autoInstall: true,
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
})
