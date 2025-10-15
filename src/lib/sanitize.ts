import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Configure DOMPurify for blog content
purify.setConfig({
  ALLOWED_TAGS: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'p',
    'a',
    'ul',
    'ol',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'code',
    'hr',
    'br',
    'div',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'th',
    'td',
    'pre',
    'span',
    'img',
    'del',
    'ins',
    'sup',
    'sub',
  ],
  ALLOWED_ATTR: [
    'href',
    'src',
    'alt',
    'title',
    'class',
    'width',
    'height',
    'target',
    'rel',
  ],
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'style'],
});

export async function sanitizeMarkdown(markdown: string): Promise<string> {
  if (typeof markdown !== 'string') {
    return '';
  }

  // Remove null bytes and excessive newlines
  const cleaned = markdown.replace(/\0/g, '').trim();

  // Convert markdown to HTML
  const rawHtml = await marked.parse(cleaned);

  // Sanitize HTML
  return purify.sanitize(rawHtml);
}

export function sanitizePlainText(text: string): string {
  return purify.sanitize(text, { ALLOWED_TAGS: [] });
}
