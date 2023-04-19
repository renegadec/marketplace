import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import esbuild from 'esbuild-wasm';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer() 
  ],
  build: {
    esbuild
  },
});
