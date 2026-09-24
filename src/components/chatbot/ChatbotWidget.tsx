import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import ChatbotMessageContent from './ChatbotMessageContent';
import { defaultChatbotApiHandler } from './chatbotApi';
import type { ChatMessage, ChatbotApiHandler } from './types';
import './chatbot.css';

const WELCOME_MESSAGE =
  'Hi, I\'m the Granules assistant. Ask me anything about our company, products, careers, or sustainability.';

const SUGGESTED_QUESTIONS = [
  'What does Granules India do?',
  'Where are your manufacturing facilities?',
  'How can I apply for careers?',
];

type ChatbotWidgetProps = {
  onSend?: ChatbotApiHandler;
};

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

export default function ChatbotWidget({ onSend = defaultChatbotApiHandler }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage('assistant', WELCOME_MESSAGE),
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const visibleSuggestions = useMemo(
    () => (messages.length <= 1 ? SUGGESTED_QUESTIONS : []),
    [messages.length],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const submitQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const userMessage = createMessage('user', trimmed);
    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const answer = await onSend({
        message: trimmed,
        history: nextHistory,
      });

      setMessages((current) => [...current, createMessage('assistant', answer)]);
    } catch (err) {
      const detail = err instanceof Error ? err.message.trim() : '';
      setError(
        detail && !detail.toLowerCase().includes('failed to fetch')
          ? detail
          : 'Something went wrong while fetching an answer. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await submitQuestion(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void submitQuestion(input);
    }
  };

  return (
    <div className="chatbot-root" aria-live="polite">
      {isOpen && (
        <section className="chatbot-panel" aria-label="Granules Q&A chatbot">
          <header className="chatbot-header">
            <div className="chatbot-header-copy">
              <h2>Granules Assistant</h2>
              <p>Quick answers about Granules India</p>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="chatbot-messages" role="log" aria-relevant="additions">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message chatbot-message--${message.role}`}
              >
                <ChatbotMessageContent
                  content={message.content}
                  rich={message.role === 'assistant'}
                />
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {visibleSuggestions.length > 0 && (
            <div className="chatbot-suggestions" aria-label="Suggested questions">
              {visibleSuggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="chatbot-suggestion"
                  onClick={() => void submitQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {error && <p className="chatbot-error">{error}</p>}

          <form className="chatbot-composer" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              className="chatbot-input"
              rows={1}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask a question..."
              aria-label="Ask a question"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chatbot-send"
              aria-label="Send question"
              disabled={isLoading || !input.trim()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={`chatbot-toggle ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close Granules chatbot' : 'Open Granules chatbot'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 9h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
