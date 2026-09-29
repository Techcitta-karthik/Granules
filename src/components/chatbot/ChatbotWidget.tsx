import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import ChatbotMessageContent from './ChatbotMessageContent';
import { defaultChatbotApiHandler } from './chatbotApi';
import type { ChatMessage, ChatbotApiHandler } from './types';
import './chatbot.css';

const WELCOME_MESSAGE =
  "Hi, I'm the Granules assistant. Ask me anything about our company, products, careers, or sustainability.";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const showSuggestions = messages.length <= 1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Keep chatbot physically static and prevent magnification when users zoom with Ctrl+ / Ctrl-
  useEffect(() => {
    // Clear legacy session storage to avoid stale DPR calibration
    try {
      window.sessionStorage?.removeItem('granules_base_dpr');
    } catch {
      // ignore
    }

    const updateZoomScale = () => {
      // Check if viewport is mobile width
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      const root = document.querySelector('.chatbot-root') as HTMLElement | null;
      if (!root) return;

      if (isMobile) {
        root.style.setProperty('--chatbot-zoom-scale', '1');
        return;
      }

      // Determine browser zoom factor:
      // In desktop browsers, window.outerWidth / window.innerWidth gives the exact page zoom level
      let zoomFactor = 1;
      if (window.outerWidth && window.innerWidth) {
        const ratio = window.outerWidth / window.innerWidth;
        if (ratio >= 0.4 && ratio <= 4) {
          zoomFactor = ratio;
        }
      }

      // Strict sizing rules:
      // 1. When zoomed out (75%, 67%, etc.): NEVER scale up! Keep at fixed 1.0 size like reference image.
      // 2. When zoomed in (Ctrl+ above 100%): Counter-scale by 1 / zoomFactor so physical size stays constant.
      let scale = 1;
      if (zoomFactor > 1.02) {
        scale = 1 / zoomFactor;
      } else {
        scale = 1;
      }

      // Cap scale between 0.45 and 1.0 (never allow scale > 1.0)
      scale = Math.min(1, Math.max(0.45, scale));
      root.style.setProperty('--chatbot-zoom-scale', scale.toFixed(4));
    };

    updateZoomScale();
    window.addEventListener('resize', updateZoomScale, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateZoomScale, { passive: true });
    }

    const watchResolution = () => {
      try {
        const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
        mq.addEventListener(
          'change',
          () => {
            updateZoomScale();
            watchResolution();
          },
          { once: true },
        );
      } catch {
        // Ignored in unsupported browsers
      }
    };
    watchResolution();

    return () => {
      window.removeEventListener('resize', updateZoomScale);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateZoomScale);
      }
    };
  }, []);

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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void submitQuestion(input);
    }
  };

  return (
    <div className="chatbot-root" aria-live="polite">
      {isOpen && (
        <section className="chatbot-panel" aria-label="Granules Assistant">
          <header className="chatbot-header">
            <h3 className="chatbot-title">Granules Assistant</h3>
            <button
              type="button"
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
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

          {showSuggestions && (
            <div className="chatbot-suggestions" aria-label="Suggested questions">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="chatbot-suggestion"
                  onClick={() => void submitQuestion(question)}
                  disabled={isLoading}
                >
                  <span className="chatbot-suggestion-text">{question}</span>
                  <svg className="chatbot-suggestion-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {error && <div className="chatbot-error">{error}</div>}

          <form className="chatbot-composer" onSubmit={handleSubmit}>
            <div className="chatbot-composer-inner">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
