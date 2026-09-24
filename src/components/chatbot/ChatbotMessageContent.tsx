import { Fragment, type ReactNode } from 'react';
import { formatChatbotAnswer } from './formatChatbotAnswer';

function parseInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return <strong key={index}>{boldMatch[1]}</strong>;
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function parseLabelledText(text: string): ReactNode {
  const labelMatch = text.match(/^([^:]+):\s(.+)$/);
  if (labelMatch && labelMatch[1].length <= 80) {
    return (
      <>
        <strong>{labelMatch[1]}</strong>
        {`: ${labelMatch[2]}`}
      </>
    );
  }

  return parseInline(text);
}

type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

function isLabelLine(line: string): boolean {
  return /^[^:\n]{2,80}:\s.+$/.test(line);
}

function toBlocks(content: string): Block[] {
  const lines = content.split('\n').map((line) => line.trim()).filter(Boolean);
  const blocks: Block[] = [];
  let listItems: string[] = [];
  let labelItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push({ type: 'list', items: [...listItems] });
    listItems = [];
  };

  const flushLabelList = () => {
    if (labelItems.length === 0) return;
    blocks.push({ type: 'list', items: [...labelItems] });
    labelItems = [];
  };

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      flushList();
      flushLabelList();
      blocks.push({ type: 'heading', text: headingMatch[1].trim() });
      continue;
    }

    if (line.startsWith('* ')) {
      flushLabelList();
      listItems.push(line.slice(2).trim());
      continue;
    }

    if (isLabelLine(line)) {
      flushList();
      labelItems.push(line);
      continue;
    }

    flushList();
    flushLabelList();
    blocks.push({ type: 'paragraph', text: line });
  }

  flushList();
  flushLabelList();
  return blocks;
}

function renderBlocks(blocks: Block[]): ReactNode[] {
  return blocks.map((block, index) => {
    if (block.type === 'heading') {
      return <h3 key={index}>{parseInline(block.text)}</h3>;
    }

    if (block.type === 'list') {
      return (
        <ul key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{parseLabelledText(item)}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{parseLabelledText(block.text)}</p>;
  });
}

type ChatbotMessageContentProps = {
  content: string;
  rich?: boolean;
};

export default function ChatbotMessageContent({ content, rich = false }: ChatbotMessageContentProps) {
  const formatted = formatChatbotAnswer(content);

  if (!rich) {
    return <>{formatted}</>;
  }

  return <div className="chatbot-rich">{renderBlocks(toBlocks(formatted))}</div>;
}
