import { resolve, sep } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import liveReload from 'vite-plugin-live-reload'
// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: './node_modules/.vite/admin-app',
  plugins: [
    vue(),
    liveReload([
      __dirname + '/**/*.php',
      // __dirname + '/**/*.twig'
    ]),
    // legacy({
    //   targets: ['defaults'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    //   polyfills: [],
    //   modernPolyfills: [],
    // }),
  ],
  base:
    process.env.APP_ENV === 'development'
      ? `/wp-content/plugins/goodmotion-cookie-consent/admin-app`
      : `/wp-content/plugins/goodmotion-cookie-consent/admin-app/`,
  root: '',
  // css: {
  //   transformer: 'lightningcss',
  // },
  build: {
    cssMinify: 'lightningcss',
    // output dir for production build
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    manifest: true,
    cssCodeSplit: false,
    // target: 'es6',
    rollupOptions: {
      input: resolve(__dirname, 'src/main.js'),
    },
  },
  optimizeDeps: {
    // exclude: ['vue'],
  },
  server: {
    cors: true,
    strictPort: true,
    port: 7980,
    https: false,
    hmr: {
      protocol: 'ws',
      port: 7980,
      // host: 'localhost',
    },
  },
})
