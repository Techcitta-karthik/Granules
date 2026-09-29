import type { AskApiResponse, AskApiSource, AskQuota, ChatbotApiHandler } from './types';
import { formatChatbotAnswer } from './formatChatbotAnswer';

export class ChatbotSessionLimitError extends Error {
  readonly quota: AskQuota;

  constructor(message: string, quota: AskQuota) {
    super(message);
    this.name = 'ChatbotSessionLimitError';
    this.quota = quota;
  }
}

const DEFAULT_API_URL = '/api/ask';
const DEFAULT_PROD_API_URL = 'https://api.techcitta-works.com/ask';
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

  // Host builds were injecting a stale VITE_CHATBOT_API_URL and skipping this endpoint.
  return DEFAULT_PROD_API_URL;
}

function shouldAttachClientApiKey(apiUrl: string): boolean {
  return Boolean(
    (import.meta.env.VITE_CHATBOT_API_KEY as string | undefined)?.trim()
    && !apiUrl.startsWith('/'),
  );
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeSources(sources: AskApiResponse['sources']): AskApiSource[] {
  if (!Array.isArray(sources)) return [];

  const seen = new Set<string>();
  const result: AskApiSource[] = [];

  for (const source of sources) {
    const title = typeof source?.title === 'string' ? source.title.trim() : '';
    const url = typeof source?.url === 'string' ? source.url.trim() : '';
    if (!title || !isHttpUrl(url) || seen.has(url)) continue;

    seen.add(url);
    result.push({ title, url });
  }

  return result;
}

function unwrapQuotaPayload(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== 'object') return null;

  const record = data as Record<string, unknown>;
  const detail = record.detail;
  if (detail && typeof detail === 'object' && !Array.isArray(detail)) {
    return detail as Record<string, unknown>;
  }

  return record;
}

function readQuota(data: unknown): AskQuota | null {
  const payload = unwrapQuotaPayload(data);
  if (!payload) return null;

  const used = payload.used;
  const limit = payload.limit;
  const resetsInSeconds = payload.resets_in_seconds;
  if (typeof used !== 'number' || typeof limit !== 'number' || typeof resetsInSeconds !== 'number') {
    return null;
  }
  if (!Number.isFinite(used) || !Number.isFinite(limit) || !Number.isFinite(resetsInSeconds)) {
    return null;
  }

  return {
    used: Math.max(0, Math.floor(used)),
    limit: Math.max(0, Math.floor(limit)),
    resetsInSeconds: Math.max(0, Math.ceil(resetsInSeconds)),
  };
}

function readLimitMessage(data: unknown): string {
  const payload = unwrapQuotaPayload(data);
  if (!payload) return '';

  if (typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message.trim();
  }

  if (typeof payload.detail === 'string' && payload.detail.trim()) {
    return payload.detail.trim();
  }

  return '';
}

async function readJsonBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * POST { question, top_k? } to the Granules RAG /ask endpoint.
 *
 * Dev: defaults to `/api/ask` (Vite proxy → CHATBOT_API_TARGET/ask).
 * Prod: always calls https://api.techcitta-works.com/ask.
 *
 * Env:
 * - VITE_CHATBOT_API_URL  (ignored in production; local proxy uses CHATBOT_API_TARGET)
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

  if (apiUrl.includes('ngrok')) {
    headers['ngrok-skip-browser-warning'] = 'true';
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      question: message,
      top_k: topK,
    }),
  });

  if (response.status === 429) {
    const body = await readJsonBody(response);
    const quota = readQuota(body);
    const messageText = readLimitMessage(body) || 'Session full. Please try again later.';
    if (quota && quota.resetsInSeconds > 0) {
      throw new ChatbotSessionLimitError(messageText, quota);
    }

    throw new Error(messageText);
  }

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

  return {
    answer: formatChatbotAnswer(data.answer.trim()),
    sources: normalizeSources(data.sources),
    quota: readQuota(data),
  };
};
