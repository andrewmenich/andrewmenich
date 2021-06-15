import legacy from '@vitejs/plugin-legacy'
import ViteRestart from 'vite-plugin-restart';

// https://vitejs.dev/config/
export default ({ command }) => ({
  base: command === 'serve' ? '' : '/assets/dist/',
  publicDir: 'banana_ice_cream_yum_yum_yum',
  build: {
    manifest: true,
    outDir: 'public/assets/dist/',
    rollupOptions: {
      input: {
        main: './src/main.js',
      },
      output: {
        sourcemap: true
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
    port: 3000,
    strictPort: true,
    https: false,
    hmr: {
      host: 'andrewmenich.test',
      port: '3000',
      path: '/'
    }
  },
});
