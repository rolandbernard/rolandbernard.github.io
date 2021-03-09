
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
        .replace(/\*\*(.+?)\*\*/g, html`<strong class="md-bold">$1</strong>`)
        .replace(/\*(.+?)\*/g, html`<em class="md-italic">$1</em>`)
        .replace(/__(.+?)__/g, html`<strong class="md-bold">$1</strong>`)
        .replace(/_(.+?)_/g, html`<em class="md-italic">$1</em>`)
        .replace(/``(.+?)``|`(.+?)`/g, html`<code class="md-inline-code">$1</code>`);
}

function escapeHtml(markdown) {
    return markdown
        .replace(/"/g, html`&quot;`)
        .replace(/&/g, html`&amp;`)
        .replace(/'/g, html`&#39;`)
        .replace(/</g, html`&lt;`)
        .replace(/>/g, html`&gt;`);
}

function linesToParagraph(lines, paragrapgs) {
    if (lines.length !== 0) {
        paragrapgs.push(html`<p class="md-paragraph">${lines.join(' ')}</p>`);
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

function compileLines(lines) {
    const converted_lines = [];
    const converted_paragraphs = [];
    while (lines.length !== 0) {
        const line_orig = lines.shift();
        const line = line_orig.trim();
        if (line.length === 0) {
            linesToParagraph(converted_lines, converted_paragraphs);
        } else if (line.startsWith('#')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            let header_num = 1;
            while (line[header_num] === '#') {
                header_num++;
            }
            const text = compileSimpleEmphasis(line.substr(header_num).trim());
            header_num = Math.min(header_num, 6);
            converted_paragraphs.push(html`<h${header_num} class="md-header-${header_num}">${text}</h${header_num}>`);
        } else if (line.startsWith('===') && !line.match(/[^=]/) && converted_lines.length !== 0) {
            converted_paragraphs.push(html`<h1 class="md-header-1">${converted_lines.join(' ')}</h1>`);
            converted_lines.splice(0);
        } else if (line.startsWith('---') && !line.match(/[^-]/) && converted_lines.length !== 0) {
            converted_paragraphs.push(html`<h2 class="md-header-2">${converted_lines.join(' ')}</h2>`);
            converted_lines.splice(0);
        } else if (
            line.startsWith('---') && !line.match(/[^-]/)
            || line.startsWith('***') && !line.match(/[^*]/)
            || line.startsWith('___') && !line.match(/[^_]/)
        ) {
            linesToParagraph(converted_lines, converted_paragraphs);
            converted_paragraphs.push(html`<hr class="md-hrule"/>`);
        } else if (line.startsWith('```') || line.startsWith('~~~')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            let code = '';
            while (lines.length !== 0 && lines[0].trim() !== line.substr(0, 3)) {
                const next_line = lines.shift();
                code += next_line + '\n';
            }
            lines.shift();
            const language = line.replace(line.substr(0, 3), '').trim();
            if (language) {
                code = generateHighliting(code, language);
            }
            converted_paragraphs.push(html`<code class="md-code hljs"><pre>${code}</pre></code>`);
        } else if (line_orig.startsWith('    ') || line_orig.startsWith('\t')) {
            let code = line_orig.substr(line_orig.startsWith('    ') ? 4 : 1) + '\n';
            while (lines.length !== 0 && (lines[0].startsWith('    ') || lines[0].startsWith('\t'))) {
                const next_line = lines.shift();
                code += next_line.substr(next_line.startsWith('    ') ? 4 : 1) + '\n';
            }
            converted_paragraphs.push(html`<code class="md-code hljs"><pre>${code}</pre></code>`);
        } else if (line.startsWith('[') && line.endsWith(']')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            const to_wrap = converted_paragraphs.pop();
            converted_paragraphs.push(html`
                <div class="md-info-wrap">
                    ${to_wrap}
                    <p class="md-info">${compileSimpleEmphasis(line.substr(1, line.length - 2))}</p>
                </div>
            `);
        } else if (line.startsWith('>')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            let quote_lines = [ line.substr(1) ];
            while (lines.length !== 0 && lines[0].trim().startsWith('>')) {
                const next_line = lines.shift().trim();
                quote_lines.push(next_line.substr(1));
            }
            converted_paragraphs.push(html`<div class="md-quote">${compileLines(quote_lines)}</div>`)
        } else if (line.includes('|')) {
            linesToParagraph(converted_lines, converted_paragraphs);
        } else {
            let actual_line = line;
            if (line.endsWith('\\')) {
                actual_line = line.substr(0, line.length - 1) + html`<br />`;
            } else if (line_orig.endsWith('  ')) {
                actual_line += html`<br />`;
            }
            converted_lines.push(compileSimpleEmphasis(actual_line));
        }
    }
    linesToParagraph(converted_lines, converted_paragraphs);
    return converted_paragraphs.join('');
}

export function compileMarkdown(markdown) {
    const lines = markdown.split('\n');
    return compileLines(lines);
}
