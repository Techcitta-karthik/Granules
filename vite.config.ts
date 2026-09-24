import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import os from 'os';

function getLocalIPv4(): string | null {
  for (const interfaces of Object.values(os.networkInterfaces())) {
    for (const net of interfaces ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }

  return null;
}

function resolveChatbotTarget(env: Record<string, string>): string {
  const configured = env.CHATBOT_API_TARGET?.trim();
  if (configured) return configured;

  // api.py binds 0.0.0.0:8000; another local service may own 127.0.0.1:8000.
  const lanIp = getLocalIPv4();
  if (lanIp) return `http://${lanIp}:8000`;

  return 'http://127.0.0.1:8000';
}

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

function chatbotAskProxyPlugin(target: string, apiKey: string): Plugin {
  return {
    name: 'chatbot-ask-proxy',
    configureServer(server) {
      server.middlewares.use('/api/ask', async (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          }

          const upstream = await fetch(`${target.replace(/\/$/, '')}/ask`, {
            method: 'POST',
            headers: {
              'Content-Type': req.headers['content-type'] ?? 'application/json',
              Accept: 'application/json',
              ...(apiKey ? { 'X-API-Key': apiKey } : {}),
            },
            body: Buffer.concat(chunks),
          });

          const text = await upstream.text();
          res.statusCode = upstream.status;
          res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json');
          res.end(text);
        } catch {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ detail: 'Chatbot API proxy failed' }));
        }
      });
    },
  };
}

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const chatbotApiKey = env.CHATBOT_API_KEY || env.VITE_CHATBOT_API_KEY || '';
  const chatbotTarget = resolveChatbotTarget(env);

  return {
  plugins: [react(), chatbotAskProxyPlugin(chatbotTarget, chatbotApiKey), servePublicAssetsPlugin()],
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
        '**/friend/**',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.webp',
        '**/*.svg',
        '**/*.pdf',
      ],
    },
  },
};
});
