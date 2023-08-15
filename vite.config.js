import { resolve } from 'path'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export const viteConfig = {
  plugins: [
    // legacy({
    //   // target is default
    //   // targets: ['last 1 version'],
    //   // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    //   // polyfills: [],
    //   // modernPolyfills: [],
    // }),
  ],
  base:
    process.env.APP_ENV === 'development'
      ? `/wp-content/plugins/goodmotion-cookie-consent/`
      : `/wp-content/plugins/goodmotion-cookie-consent/dist/`,
  root: '',
  css: {
    transformer: 'lightningcss',
  },
  build: {
    cssMinify: 'lightningcss',
    // output dir for production build
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    manifest: true,
    cssCodeSplit: false,
    // override by legacy plugin
    // target: 'es6',
    rollupOptions: {
      input: resolve(__dirname, '/src/main.js'),
    },
  },
  server: {
    cors: true,
    strictPort: true,
    port: 7979,
    // https: true,
    hmr: {
      protocol: 'ws',
      port: 7979,
      // host: 'localhost',
    },
  },
}

export default defineConfig(viteConfig)
