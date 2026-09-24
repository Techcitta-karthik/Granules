function splitInlineBullets(line: string): string[] {
  const headingMatch = line.match(/^(#{1,3}\s+[^*]+?)(?:\s+\*\s+|\s*$)(.*)$/);
  if (headingMatch) {
    const heading = headingMatch[1].trim();
    const rest = headingMatch[2].trim();
    if (!rest) return [heading];

    const items = rest.split(/\s+\*\s+/).filter(Boolean);
    return [heading, ...items.map((item) => `* ${item.trim()}`)];
  }

  if (!/^[*-]\s/.test(line) && line.includes(' * ')) {
    const parts = line.split(/\s+\*\s+/).filter(Boolean);
    if (parts.length > 1) {
      const [intro, ...items] = parts;
      return [
        ...(intro.trim() ? [intro.trim()] : []),
        ...items.map((item) => `* ${item.trim()}`),
      ];
    }
  }

  return [line];
}

function normalizeLines(text: string): string[] {
  return text
    .replace(/\r/g, '')
    .replace(/\s*(#{1,3}\s+)/g, '\n\n$1')
    .replace(/\s*---\s*/g, '\n\n')
    .split('\n')
    .flatMap((line) => splitInlineBullets(line.trim()))
    .map((line) => line.replace(/^[*-]\s+/, '* '))
    .filter((line) => line.length > 0 && line !== '---');
}

export function stripSourceCitations(text: string): string {
  return text
    .replace(/\s*\[Source[^\]]*\]/gi, '')
    .replace(/^Based on the provided context,?\s*/i, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/ +([.,;:!?])/g, '$1')
    .replace(/ {2,}/g, ' ')
    .trim();
}

export function formatChatbotAnswer(raw: string): string {
  const cleaned = stripSourceCitations(raw);
  const lines = normalizeLines(cleaned);

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
