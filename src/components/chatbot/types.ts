export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  sources?: AskApiSource[];
};

export type ChatbotRequest = {
  message: string;
  history: ChatMessage[];
};

export type AskApiSource = {
  title: string;
  url: string;
};

export type AskQuota = {
  used: number;
  limit: number;
  resetsInSeconds: number;
};

export type AskApiResponse = {
  question: string;
  answer: string;
  sources?: AskApiSource[];
  used?: number;
  limit?: number;
  resets_in_seconds?: number;
  message?: string;
};

export type ChatbotReply = {
  answer: string;
  sources: AskApiSource[];
  quota: AskQuota | null;
};

export type ChatbotApiHandler = (payload: ChatbotRequest) => Promise<ChatbotReply>;
