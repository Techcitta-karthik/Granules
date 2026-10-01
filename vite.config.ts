import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function resolveChatbotTarget(env: Record<string, string>): string {
  const configured = env.CHATBOT_API_TARGET?.trim();
  if (configured) return configured;

  return 'https://d33jq5pa6sscaw.cloudfront.net';
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

function rewriteDevSessionCookie(setCookie: string): string {
  const parts = setCookie.split(';').map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return setCookie;

  const [pair, ...attrs] = parts;
  const kept = attrs.filter((attr) => {
    const name = attr.split('=')[0]?.trim().toLowerCase();
    return name !== 'domain' && name !== 'secure' && name !== 'samesite';
  });
  const hasPath = kept.some((attr) => attr.split('=')[0]?.trim().toLowerCase() === 'path');

  return [pair, ...kept, ...(hasPath ? [] : ['Path=/']), 'SameSite=Lax'].join('; ');
}

function readUpstreamCookies(headers: Headers): string[] {
  if (typeof headers.getSetCookie === 'function') {
    return headers.getSetCookie();
  }

  const single = headers.get('set-cookie');
  return single ? [single] : [];
}

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

          const requestCookie = req.headers.cookie;
          const upstream = await fetch(`${target.replace(/\/$/, '')}/ask`, {
            method: 'POST',
            headers: {
              'Content-Type': req.headers['content-type'] ?? 'application/json',
              Accept: 'application/json',
              ...(requestCookie ? { Cookie: requestCookie } : {}),
              ...(apiKey ? { 'X-API-Key': apiKey } : {}),
              ...(target.includes('ngrok') ? { 'ngrok-skip-browser-warning': 'true' } : {}),
            },
            body: Buffer.concat(chunks),
          });

          const text = await upstream.text();
          const setCookies = readUpstreamCookies(upstream.headers).map(rewriteDevSessionCookie);
          res.statusCode = upstream.status;
          res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json');
          if (setCookies.length > 0) {
            res.setHeader('Set-Cookie', setCookies);
          }
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
        '**/project_work_reports/**',
        '**/scratch/**',
        '**/*.zip',
        '**/*.xlsx',
        '**/*.csv',
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
