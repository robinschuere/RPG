import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  ssr: {
    noExternal: ['solid-bootstrap'],
  },
});
