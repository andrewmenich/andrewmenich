import legacy from '@vitejs/plugin-legacy'
import ViteRestart from 'vite-plugin-restart';

// https://vitejs.dev/config/
export default ({ command }) => ({
  base: command === 'serve' ? '' : '/assets/dist/',
  publicDir: 'non-existent-path',
  build: {
    manifest: true,
    outDir: './public/assets/dist/',
    rollupOptions: {
      input: {
        main: './src/main.js',
      }
    },
  },
  plugins: [
    legacy({
      targets: ['defaults', 'IE 11']
    }),
    ViteRestart({
      reload: [
        './templates/**/*',
      ],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3002,
    strictPort: true,
    https: false,
    hmr: {
      host: 'localhost',
      port: 3002,
      path: '/'
    }
  },
});
