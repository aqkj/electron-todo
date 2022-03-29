import { defineConfig, Plugin  } from 'vite'
import { builtinModules } from 'module'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import resolve from 'vite-plugin-resolve'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  base: './',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ]
})