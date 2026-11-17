// Film renderer app: every frame is a pure function of time (see src/lib/time.ts).
// Not part of the website build; it only reuses the site's icon libraries and /public assets.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: __dirname,
  base: './',
  publicDir: path.resolve(__dirname, '../public'),
  plugins: [react()],
  build: { outDir: path.resolve(__dirname, 'dist'), emptyOutDir: true, copyPublicDir: false },
  server: { port: 5190, strictPort: true },
  preview: { port: 5191, strictPort: true },
});
