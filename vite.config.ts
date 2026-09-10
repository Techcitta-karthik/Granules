import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function servePublicAssetsPlugin(): Plugin {
  return {
    name: 'serve-public-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.method === 'GET' && !req.url.startsWith('/@') && !req.url.startsWith('/src/')) {
          try {
            const cleanUrl = decodeURI(req.url.split('?')[0]);
            const ext = path.extname(cleanUrl).toLowerCase();
            if (MIME_TYPES[ext]) {
              const filePath = path.join(process.cwd(), 'public', cleanUrl);
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                res.setHeader('Content-Type', MIME_TYPES[ext]);
                res.setHeader('Cache-Control', 'no-cache');
                return fs.createReadStream(filePath).pipe(res);
              }
            }
          } catch {}
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), servePublicAssetsPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: [
        '**/public/**',
        '**/dist/**',
        '**/.git/**',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.webp',
        '**/*.svg',
        '**/*.pdf',
      ],
    },
  },
});
