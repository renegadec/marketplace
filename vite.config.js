import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import esbuild from 'esbuild-wasm';
import { visualizer } from 'rollup-plugin-visualizer';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    // commonjs(),
    // resolve()
  ],
  build: {
    esbuild,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
});
