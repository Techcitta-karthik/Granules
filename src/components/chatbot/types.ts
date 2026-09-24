export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

export type ChatbotRequest = {
  message: string;
  history: ChatMessage[];
};

export type AskApiSource = {
  score?: number;
  url?: string;
  title?: string;
  content_type?: string;
  source?: string;
  chunk_id?: string;
};

export type AskApiResponse = {
  question: string;
  answer: string;
  sources?: AskApiSource[];
  chat_model?: string;
  embed_model?: string;
  top_k?: number;
};

export type ChatbotApiHandler = (payload: ChatbotRequest) => Promise<string>;
