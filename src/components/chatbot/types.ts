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

export type AskApiResponse = {
  question: string;
  answer: string;
  sources?: AskApiSource[];
};

export type ChatbotReply = {
  answer: string;
  sources: AskApiSource[];
};

export type ChatbotApiHandler = (payload: ChatbotRequest) => Promise<ChatbotReply>;
