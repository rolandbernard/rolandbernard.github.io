
import { css, html } from './build-util.js';

import hljs from 'highlight.js';

function markdownHighlightStyles() {
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
    return css`
        ${markdownHighlightStyles()}
    `;
}

function escapeHtml(markdown) {
    return markdown
        .replace(/"/g, html`&quot;`)
        .replace(/&/g, html`&amp;`)
        .replace(/'/g, html`&#39;`)
        .replace(/</g, html`&lt;`)
        .replace(/>/g, html`&gt;`);
}

function compileSimpleEmphasis(markdown) {
    return markdown
        .replace(/\*\*(.+?)\*\*/g, html`<strong class="md-bold">$1</strong>`)
        .replace(/\*(.+?)\*/g, html`<em class="md-italic">$1</em>`)
        .replace(/__(.+?)__/g, html`<strong class="md-bold">$1</strong>`)
        .replace(/_(.+?)_/g, html`<em class="md-italic">$1</em>`)
        .replace(/``(.+?)``|`(.+?)`/g, html`<code class="md-inline-code">$1</code>`);
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
            const text = compileLines([ line.substr(header_num).trim() ]);
            header_num = Math.min(header_num, 6);
            converted_paragraphs.push(`<h${header_num} class="md-header-${header_num}">${text}</h${header_num}>`);
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
        } else if (line.includes('|')) {
            linesToParagraph(converted_lines, converted_paragraphs);
        } else if (line.match(/^\s*([0-9]+[.)]|[+*-] )/)) {
            linesToParagraph(converted_lines, converted_paragraphs);
            const regex = /^\s*([0-9]+[.)]|[+*-] )/;
            function listTypeAndOrder(line) {
                const match = line.match(regex);
                if (match[0].includes(')')) {
                    return [ /^\s*[0-9]+[)]/, true ];
                } else if (match[0].includes('.')) {
                    return [ /^\s*[0-9]+[.]/, true ];
                } else if (match[0].includes('*')) {
                    return [ /^\s*[*] /, false ];
                } else if (match[0].includes('+')) {
                    return [ /^\s*[+] /, false ];
                } else if (match[0].includes('-')) {
                    return [ /^\s*[-] /, false ];
                }
            }
            function generateList() {
                if (ordered) {
                    return html`<ol class="md-ordered-list">${
                        items.map(item => html`<li>${compileLines(item)}</li>`)
                    }</ol>`;
                } else {
                    return html`<ul class="md-unordered-list">${
                        items.map(item => html`<li>${compileLines(item)}</li>`)
                    }</ul>`;
                }
            }
            const nesting_stack = [ ];
            let [ type, ordered ] = listTypeAndOrder(line);
            let items = [ [ line.replace(regex, '') ] ];
            let last_indent = 0;
            while (line_orig[last_indent] === ' ' || line_orig[last_indent] === '\t') {
                last_indent++;
            }
            let was_empty = false;
            while (lines.length !== 0) {
                const next_line = lines.shift();
                if (next_line.match(regex)) {
                    let indent = 0;
                    while (next_line[indent] === ' ' || next_line[indent] === '\t') {
                        indent++;
                    }
                    if (indent > last_indent) {
                        nesting_stack.push([ items, type, last_indent, ordered ]);
                        items = [];
                        [ type, ordered ] = listTypeAndOrder(next_line);
                    } else if (indent < last_indent && nesting_stack.length !== 0) {
                        while (nesting_stack.length !== 0 && indent < last_indent) {
                            let sub_list = generateList();
                            [ items, type, last_indent, ordered ] = nesting_stack.pop();
                            items[items.length - 1].push(sub_list);
                        }
                    }
                    if (!next_line.match(type)) {
                        if (nesting_stack.length !== 0) {
                            const sub_list = generateList();
                            [ items, type, last_indent, ordered ] = nesting_stack.pop();
                            items[items.length - 1].push(sub_list);
                            nesting_stack.push([ items, type, last_indent, ordered ]);
                            items = [];
                        } else {
                            converted_paragraphs.push(generateList());
                            items = [];
                        }
                        [ type, ordered ] = listTypeAndOrder(next_line);
                    }
                    items.push([ next_line.replace(regex, '') ]);
                    last_indent = indent;
                } else if (next_line.substr(last_indent).startsWith('    ') || next_line.substr(last_indent).startsWith('\t')) {
                    items[items.length - 1].push(next_line.substr(last_indent + (next_line.substr(last_indent).startsWith('    ') ? 4 : 1)));
                } else {
                    if (was_empty) {
                        lines.unshift(next_line);
                        break;
                    } else {
                        items[items.length - 1].push(next_line);
                    }
                }
                was_empty  = next_line.trim().length === 0;
            }
            while (nesting_stack.length !== 0) {
                let sub_list = generateList();
                [ items, type, last_indent, ordered ] = nesting_stack.pop();
                items[items.length - 1].push(sub_list);
            }
            converted_paragraphs.push(generateList());
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
            } else {
                code = escapeHtml(code);
            }
            converted_paragraphs.push(html`<code class="md-code hljs"><pre>${code}</pre></code>`);
        } else if (line_orig.startsWith('    ') || line_orig.startsWith('\t')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            let code = line_orig.substr(line_orig.startsWith('    ') ? 4 : 1) + '\n';
            while (lines.length !== 0 && (lines[0].startsWith('    ') || lines[0].startsWith('\t'))) {
                const next_line = lines.shift();
                code += next_line.substr(next_line.startsWith('    ') ? 4 : 1) + '\n';
            }
            converted_paragraphs.push(html`<code class="md-code hljs"><pre>${escapeHtml(code)}</pre></code>`);
        // } else if (line.startsWith('[')) {
            // linesToParagraph(converted_lines, converted_paragraphs);
            // const to_wrap = converted_paragraphs.pop();
            // converted_paragraphs.push(html`
            //     <div class="md-info-wrap">
            //         ${to_wrap}
            //         <p class="md-info">${compileLines([ line.substr(1, line.length - 2) ])}</p>
            //     </div>
            // `);
        } else if (line.startsWith('>')) {
            linesToParagraph(converted_lines, converted_paragraphs);
            let quote_lines = [ line.substr(1) ];
            while (lines.length !== 0 && lines[0].trim().length !== 0) {
                const next_line = lines.shift();
                if (next_line.trim().startsWith('>')) {
                    quote_lines.push(next_line.trim().substr(1));
                } else {
                    quote_lines.push(next_line);
                }
            }
            converted_paragraphs.push(html`<div class="md-quote">${compileLines(quote_lines)}</div>`)
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
    return converted_paragraphs;
}

export function compileMarkdown(markdown) {
    const lines = markdown.split('\n');
    return compileLines(lines);
}
