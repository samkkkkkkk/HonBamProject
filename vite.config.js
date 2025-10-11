import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM 환경에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8181',
        changeOrigin: true,
      },
      '/ws-chat': {
        target: 'http://localhost:8181',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  build: { outDir: 'dist' },
  // (선택) .js도 JSX로 파싱하려면 아래 추가
  // esbuild: {
  //   loader: 'jsx',
  //   include: /src\/.*\.[jt]sx?$/,
  // },
});
