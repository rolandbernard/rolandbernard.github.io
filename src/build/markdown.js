
import { css, html } from './build-util.js';

import hljs from 'highlight.js';

function markdownHighlightStyle() {
    return css`
        .hljs {
            color: #c3d0dd;
            background: #1c1e20;
            display: block;
            overflow-x: auto;
            padding: 0.5em;
        }
        .hljs-number,
        .hljs-literal,
        .hljs-symbol,
        .hljs-bullet {
            color: #6897BB;
        }
        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-deletion {
            color: #cc7832;
        }
        .hljs-variable,
        .hljs-template-variable,
        .hljs-link {
            color: #629755;
        }
        .hljs-comment,
        .hljs-quote {
            color: #808080;
        }
        .hljs-meta {
            color: #bbb529;
        }
        .hljs-string,
        .hljs-attribute,
        .hljs-addition {
            color: #6A8759;
        }
        .hljs-section,
        .hljs-title,
        .hljs-type {
            color: #ffc66d;
        }
        .hljs-name,
        .hljs-selector-id,
        .hljs-selector-class {
            color: #e8bf6a;
        }
        .hljs-emphasis {
            font-style: italic;
        }
        .hljs-strong {
            font-weight: bold;
        }
    `;
}

export function markdownStyles() {
    return css `
        ${markdownHighlightStyle()}
    `;
}

function compileSimpleEmphasis(markdown) {
    return markdown
        .replace(/\*\*(.*)\*\*/g, html`<b class="md-bold">$1</b>`)
        .replace(/\*(.*)\*/g, html`<i class="md-italic">$1</i>`)
        .replace(/__(.*)__/g, html`<b class="md-bold">$1</b>`)
        .replace(/_(.*)_/g, html`<i class="md-italic">$1</i>`)
        .replace(/`(.*)`/g, html`<code class="md-inline-code">$1</code>`)
}

function escapeHtml(markdown) {
    return markdown
        .replace(/"/g, '&quot;')
        .replace(/&/g, '&amp;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function linesToParagraph(lines, paragrapgs) {
    if (lines.length !== 0) {
        paragrapgs.push(`<p class="md-paragraph">${lines.join(' ')}</p>`);
        lines.splice(0);
    }
}

function generateHighliting(code, language) {
    if (language) {
        return hljs.highlight(language, code, true).value;
    } else {
        return hljs.highlightAuto(code).value;
    }
}

export function compileMarkdown(markdown) {
    const lines = markdown.split('\n');
    const converted_lines = [];
    const converted_paragraphs = [];
    while (lines.length !== 0) {
        const line = lines.shift().trim();
        if (line === '') {
            linesToParagraph(converted_lines, converted_paragraphs);
        } else if (line.startsWith('#')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            let header_num = 1;
            while (line[header_num] === '#') {
                header_num++;
            }
            const text = compileSimpleEmphasis(line.substr(header_num).trim());
            header_num = Math.min(header_num, 6);
            converted_paragraphs.push(`<h${header_num} class="md-header-${header_num}">${text}</h${header_num}>`);
        } else if (line.startsWith('===') && !line.match(/[^=]/)) {
            converted_paragraphs.push(`<h1 class="md-header-1">${converted_lines.join(' ')}</h1>`);
            converted_lines.splice(0);
        } else if (line.endsWith('```')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            let code = '';
            while (lines.length !== 0 && lines[0].trim() !== '```') {
                const next_line = lines.shift();
                code += next_line + '\n';
            }
            lines.shift();
            code = generateHighliting(code, line.replace(/```/g, '').trim());
            converted_paragraphs.push(`<code class="md-code hljs"><pre>${code}</pre></code>`);
        } else if (line.startsWith('[') && line.endsWith(']')) {
            linesToParagraph(converted_lines, converted_paragraphs);
        } else if (line.includes('|')) {
            linesToParagraph(converted_lines, converted_paragraphs);
        } else {
            converted_lines.push(compileSimpleEmphasis(line));
        }
    }
    return converted_paragraphs.join('');
}
