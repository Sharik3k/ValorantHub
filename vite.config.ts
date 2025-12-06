import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import chatHandler from './api/chat';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const localApiPlugin = () => ({
  name: 'valorant-hub-local-api',
  configureServer(server: any) {
    server.middlewares.use('/api/chat', async (req: any, res: any) => {
      const buffers: Uint8Array[] = [];
      req.on('data', (chunk: Uint8Array) => buffers.push(chunk));
      req.on('end', async () => {
        try {
          const bodyString = Buffer.concat(buffers).toString();
          const body = bodyString ? JSON.parse(bodyString) : {};

          const vercelReq = {
            method: req.method,
            query: parse(req.url || '', true).query,
            headers: req.headers,
            body,
          } as VercelRequest;

          const vercelRes: Partial<VercelResponse> = {
            status(code: number) {
              res.statusCode = code;
              return vercelRes as VercelResponse;
            },
            json(payload: any) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(payload));
              return vercelRes as VercelResponse;
            },
            setHeader(name: string, value: string | string[]) {
              res.setHeader(name, value as string);
              return vercelRes as VercelResponse;
            },
          };

          await chatHandler(vercelReq, vercelRes as VercelResponse);
        } catch (error: any) {
          console.error('[Local API] chat error:', error?.message || error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Local API error', details: error?.message }));
        }
      });
    });
  },
});

export default defineConfig({
  plugins: [react(), localApiPlugin()],
  server: {
    port: 5173,
  },
});
