import react from '@vitejs/plugin-react'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'formatjs',
            {
              idInterpolationPattern: '[sha512:contenthash:base64:6]',
              ast: true
            }
          ]
        ]
      }
    }),
    UnoCSS(),
    Pages({
      extensions: ['tsx'],
      exclude: ['**/components/**/*.*', '**/blocks/**/*.*', '**/hooks/**/*.*', '**/_*.*'],
      routeStyle: 'next',
      importMode: 'async',
      dirs: 'src/pages',
      resolver: 'react'
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_']
  // build: {
  //   // Tauri uses Chromium on Windows and WebKit on macOS and Linux
  //   target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
  //   // produce sourcemaps for debug builds
  //   sourcemap: !!process.env.TAURI_DEBUG,
  //   // don't minify for debug builds
  //   minify: !process.env.TAURI_DEBUG ? 'esbuild' : false
  // }
}))
