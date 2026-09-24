import type { AskApiResponse, ChatbotApiHandler } from './types';
import { formatChatbotAnswer } from './formatChatbotAnswer';

const DEFAULT_API_URL = '/api/ask';
const DEFAULT_TOP_K = 5;

function resolveTopK(): number {
  const raw = import.meta.env.VITE_CHATBOT_TOP_K as string | undefined;
  if (!raw) return DEFAULT_TOP_K;

  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return DEFAULT_TOP_K;

  return Math.min(10, Math.max(1, parsed));
}

function resolveApiUrl(): string {
  if (import.meta.env.DEV) {
    return DEFAULT_API_URL;
  }

  const configured = import.meta.env.VITE_CHATBOT_API_URL as string | undefined;
  return configured?.trim() || DEFAULT_API_URL;
}

function shouldAttachClientApiKey(apiUrl: string): boolean {
  return Boolean(
    (import.meta.env.VITE_CHATBOT_API_KEY as string | undefined)?.trim()
    && !apiUrl.startsWith('/'),
  );
}

/**
 * POST { question, top_k? } to the Granules RAG /ask endpoint.
 *
 * Dev: defaults to `/api/ask` (Vite proxy → CHATBOT_API_TARGET/ask).
 * Prod: set VITE_CHATBOT_API_URL (default Cloudflare tunnel /ask endpoint).
 *
 * Env:
 * - VITE_CHATBOT_API_URL  (optional, default `/api/ask`)
 * - VITE_CHATBOT_API_KEY  (required for direct calls; dev proxy uses CHATBOT_API_KEY)
 * - VITE_CHATBOT_TOP_K    (optional, 1–10, default 5)
 * - CHATBOT_API_KEY       (optional, used by Vite dev proxy only)
 */
export const defaultChatbotApiHandler: ChatbotApiHandler = async ({ message }) => {
  const apiUrl = resolveApiUrl();
  const apiKey = (import.meta.env.VITE_CHATBOT_API_KEY as string | undefined)?.trim();
  const topK = resolveTopK();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (shouldAttachClientApiKey(apiUrl) && apiKey) {
    headers['X-API-Key'] = apiKey;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      question: message,
      top_k: topK,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Chatbot API rejected the request. Check your API key.');
    }

    throw new Error(`Chatbot API error (${response.status})`);
  }

  const data = (await response.json()) as AskApiResponse;

  if (typeof data.answer !== 'string' || !data.answer.trim()) {
    throw new Error('Chatbot API returned an empty answer');
  }

  return formatChatbotAnswer(data.answer.trim());
};
