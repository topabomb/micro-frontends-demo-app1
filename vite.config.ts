import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vitePluginSingleSpa from 'vite-plugin-single-spa'
const port = 4101
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: port,
      spaEntryPoints: 'src/main.ts',
      projectId: 'app1',
    }),
  ],
  server: { port },
  preview: { port },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
