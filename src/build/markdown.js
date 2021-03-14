
import { css, html } from './build-util.js';

import hljs from 'highlight.js';

function markdownHighlightStyles() {
    return css`
        .hljs {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
            color: #abb2bf;
            background: #282c34;
        }
        .hljs-comment,
        .hljs-quote {
            color: #5c6370;
            font-style: italic;
        }
        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
            color: #c678dd;
        }
        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
            color: #e06c75;
        }
        .hljs-literal {
            color: #56b6c2;
        }
        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta-string {
            color: #98c379;
        }
        .hljs-built_in,
        .hljs-class .hljs-title {
            color: #e6c07b;
        }
        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
            color: #d19a66;
        }
        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
            color: #61aeee;
        }
        .hljs-emphasis {
            font-style: italic;
        }
        .hljs-strong {
            font-weight: bold;
        }
        .hljs-link {
            text-decoration: underline;
        }
    `;
}

export function markdownStyles() {
    return css`
        ${markdownHighlightStyles()}
        .markdown {
            font-family: OpenSans, Arial, Helvetica, sans-serif;
            font-size: 1rem;
            line-height: 150%;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }
        .md-header-1, .md-header-2 {
            padding-bottom: 0.1rem;
            border-bottom: 1px solid #00000015;
        }
        .md-header-1 {
            font-size: 2rem;
            padding-left: 0.25rem;
        }
        .md-header-2 {
            font-size: 1.5rem;
            padding-left: 0.15rem;
        }
        .md-header-3 {
            font-size: 1.25rem;
        }
        .md-header-4 {
            font-size: 1rem;
        }
        .md-header-5 {
            font-size: 0.85rem;
        }
        .md-header-6 {
            font-size: 0.65rem;
        }
        .md-header-1, .md-header-2, .md-header-3,
        .md-header-4, .md-header-5, .md-header-6 {
            margin: 0.5rem 0rem;
        }
        .md-code pre {
            padding: 1rem;
            margin: 0;
            font-family: 'Plex Mono', monospace;
            font-size: 0.9rem;
            width: max-content;
        }
        .md-code {
            padding: 0;
            margin: 0;
            border-radius: 4px;
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
        }
        .md-code .md-code-content {
            flex: 1 1 auto;
        }
        .md-code .md-lines {
            flex: 0 0 auto;
            display: flex;
            flex-flow: column;
            padding: 1rem 0.5rem;
            border-right: 1px solid #ffffff20;
            user-select: none;
            text-align: right;
        }
        .md-code .md-lines .md-line {
            font-family: 'Plex Mono', monospace;
            font-size: 0.9rem;
        }
        .md-inline-code  {
            background: #00000010;
            padding: 0.1rem 0.25rem;
            border-radius: 4px;
            font-family: 'Plex Mono', monospace;
            font-size: 0.9rem;
            display: inline-block;
        }
        .md-quote {
            border-left: 0.25rem solid #00000018;
            padding-left: 1.25rem;
        }
        .md-hrule {
            border: 0.125rem solid #00000018;
            height: 0;
        }
        .md-ordered-list, .md-unordered-list, .md-footnote {
            padding-left: 2.5rem; 
            margin: 0.5rem 0;
        }
        .md-todo-list {
            list-style: none;
            padding-left: 1rem; 
        }
        .md-todo-list > li {
            display: flex;
            align-items: center;
        }
        .md-todo-list > li > input {
            margin-right: 0.5rem;
        }
        .md-paragraph {
            margin: 1rem 0;
        }
        li > .md-paragraph {
            margin: 0.5rem 0;
        }
        li > span > .md-paragraph {
            margin: 0.5rem 0;
        }
        .md-link, .md-footnote-ref {
            text-decoration: none;
        }
        .md-footnote-ref {
            font-size: 0.85rem;
            vertical-align: top;
        }
        .md-align-left {
            text-align: left;
        }
        .md-align-right {
            text-align: right;
        }
        .md-align-center {
            text-align: center;
        }
        .md-table, .md-table-row, .md-table-data, .md-table-header {
            border-collapse: collapse;
            border: 1px solid #00000018;
        }
        .md-table-data, .md-table-header {
            padding: 0.125rem 0.5rem;
        }
        .md-table-header {
            font-weight: bold;
            background: #0000000a;
        }
        .md-table-row:nth-child(odd) {
            background: #00000005;
        }
        .md-info-wrap {
            display: flex;
            flex-flow: column;
            align-items: center;
            margin: 1rem 0.5rem;
        }
        .md-info-wrap > p {
            margin: 0;
        }
        .md-info {
            margin-top: 0.25rem;
            text-align: center;
        }
        .md-inline-info {
            display: inline-flex;
            vertical-align: middle;
        }
        .md-image {
            vertical-align: middle;
        }
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

function compileInlineConstructs(markdown, data) {
    let output = '';
    let offset = 0;
    let last_copy = 0;
    while (offset < markdown.length) {
        if (markdown[offset] === '\\') {
            output += markdown.substr(last_copy, offset - last_copy);
            offset++;
            output += markdown[offset];
            offset++;
            last_copy = offset;
        } else if (markdown.substr(offset, 2) === '![') {
            output += markdown.substr(last_copy, offset - last_copy);
            last_copy = offset;
            offset += 2;
            let depth = 0;
            const start = offset;
            while (offset < markdown.length && (markdown[offset] !== ']' || depth !== 0)) {
                if (markdown[offset] === '\\') {
                    offset++;
                } else if (markdown[offset] === '[') {
                    depth++;
                } else if (markdown[offset] === ']') {
                    depth--;
                }
                offset++;
            }
            const end = offset;
            offset++;
            while (markdown[offset] === ' ' || markdown[offset] === '\t') {
                offset++;
            }
            if (markdown[offset] === '(') {
                offset++;
                const link_start = offset;
                while (
                    offset < markdown.length
                    && markdown[offset] !== ')'
                    && markdown[offset] !== '='
                    && markdown[offset] !== '"'
                ) {
                    offset++;
                }
                const link_end = offset;
                let width;
                let height;
                if (markdown[offset] === '=') {
                    offset++;
                    const start_width = offset;
                    while (
                        markdown[offset] >= '0' && markdown[offset] <= '9'
                        || markdown[offset] === ' ' || markdown[offset] === '\t'
                    ) {
                        offset++;
                    }
                    if (offset != start_width) {
                        width = parseInt(markdown.substr(start_width, offset - start_width));
                    }
                    if (markdown[offset] === 'x') {
                        offset++;
                        const start_height = offset;
                        while (
                            markdown[offset] >= '0' && markdown[offset] <= '9'
                            || markdown[offset] === ' ' || markdown[offset] === '\t'
                        ) {
                            offset++;
                        }
                        if (offset != start_height) {
                            height = parseInt(markdown.substr(start_height, offset - start_height));
                        }
                    }
                }
                while (
                    offset < markdown.length
                    && markdown[offset] !== ')'
                    && markdown[offset] !== '"'
                ) {
                    offset++;
                }
                if (markdown[offset] === '"') {
                    offset++;
                    const title_start = offset;
                    while (offset < markdown.length && markdown[offset] !== ')' && markdown[offset] !== '"') {
                        offset++;
                    }
                    const title_end = offset;
                    if (markdown[offset] === '"') {
                        while (offset < markdown.length && markdown[offset] !== ')') {
                            offset++;
                        }
                    }
                    offset++;
                    output += html`<img
                        class="markdown md-image"
                        src="${markdown.substr(link_start, link_end - link_start).trim()}"
                        title="${markdown.substr(title_start, title_end - title_start)}"
                        alt="${markdown.substr(start, end - start)}"
                        ${width ? `width="${width}"` : ''}
                        ${height ? `height="${height}"` : ''}
                    />`;
                    last_copy = offset;
                } else {
                    offset++;
                    output += html`<img
                        class="markdown md-image"
                        src="${markdown.substr(link_start, link_end - link_start).trim()}"
                        alt="${markdown.substr(start, end - start)}"
                        ${width ? `width="${width}"` : ''}
                        ${height ? `height="${height}"` : ''}
                    />`;
                    last_copy = offset;
                }
            }
        } else if (markdown[offset] === '[') {
            output += markdown.substr(last_copy, offset - last_copy);
            last_copy = offset;
            offset++;
            let depth = 0;
            const start = offset;
            while (offset < markdown.length && (markdown[offset] !== ']' || depth !== 0)) {
                if (markdown[offset] === '\\') {
                    offset++;
                } else if (markdown[offset] === '[') {
                    depth++;
                } else if (markdown[offset] === ']') {
                    depth--;
                }
                offset++;
            }
            const end = offset;
            offset++;
            if (markdown[start] === '^') {
                const name = markdown.substr(start, end - start).toLowerCase();
                output += html`<a
                    class="markdown md-footnote-ref"
                    href="#fn:${name}"
                >${data[name]?.id}</a>`;
                last_copy = offset;
            } else {
                while (markdown[offset] === ' ' || markdown[offset] === '\t') {
                    offset++;
                }
                if (markdown[offset] === '(') {
                    offset++;
                    const link_start = offset;
                    while (offset < markdown.length && markdown[offset] !== ')' && markdown[offset] !== '"') {
                        offset++;
                    }
                    const link_end = offset;
                    if (markdown[offset] === '"') {
                        offset++;
                        const title_start = offset;
                        while (offset < markdown.length && markdown[offset] !== ')' && markdown[offset] !== '"') {
                            offset++;
                        }
                        const title_end = offset;
                        if (markdown[offset] === '"') {
                            while (offset < markdown.length && markdown[offset] !== ')') {
                                offset++;
                            }
                        }
                        offset++;
                        output += html`<a
                            class="markdown md-link"
                            href="${markdown.substr(link_start, link_end - link_start).trim()}"
                            title="${markdown.substr(title_start, title_end - title_start)}"
                        >${compileInlineConstructs(markdown.substr(start, end - start), data)}</a>`;
                        last_copy = offset;
                    } else {
                        offset++;
                        output += html`<a
                            class="markdown md-link"
                            href="${markdown.substr(link_start, link_end - link_start).trim()}"
                        >${compileInlineConstructs(markdown.substr(start, end - start), data)}</a>`;
                        last_copy = offset;
                    }
                } else if (markdown[offset] === '[') {
                    offset++;
                    const name_start = offset;
                    while (offset < markdown.length && markdown[offset] !== ']') {
                        offset++;
                    }
                    const name_end = offset;
                    if (markdown[offset] === ']') {
                        offset++;
                        const name = markdown.substr(name_start, name_end - name_start).toLowerCase();
                        output += html`<a
                            class="markdown md-link"
                            ${data[name]?.link ? `href="${data[name].link}"` : ''}
                            ${data[name]?.title ? `title="${data[name].title}"` : ''}
                        >${compileInlineConstructs(markdown.substr(start, end - start), data)}</a>`;
                        last_copy = offset;
                    }
                }
            }
        } else if (markdown.substr(offset, 2) === '~~') {
            output += markdown.substr(last_copy, offset - last_copy);
            offset += 2;
            const start = offset;
            while (offset < markdown.length && markdown.substr(offset, 2) !== '~~') {
                if (markdown[offset] === '\\') {
                    offset++;
                }
                offset++;
            }
            output += html`<del class="markdown md-strike">${compileInlineConstructs(markdown.substr(start, offset - start), data)}</del>`;
            offset += 2;
            last_copy = offset;
        } else if (markdown[offset] === '*') {
            output += markdown.substr(last_copy, offset - last_copy);
            if (markdown[offset + 1] === '*') {
                offset += 2;
                let single = false;
                const start = offset;
                while (offset < markdown.length && (markdown.substr(offset, 2) !== '**' || single)) {
                    if (markdown[offset] === '\\') {
                        offset++;
                    } else if (markdown[offset] === '*') {
                        single = !single;
                    }
                    offset++;
                }
                output += html`<strong class="markdown md-bold">${compileInlineConstructs(markdown.substr(start, offset - start), data)}</strong>`;
                offset += 2;
            } else {
                offset++;
                const start = offset;
                while (offset < markdown.length && markdown[offset] !== '*') {
                    if (markdown[offset] === '\\') {
                        offset++;
                    }
                    offset++;
                }
                output += html`<em class="markdown md-italic">${compileInlineConstructs(markdown.substr(start, offset - start), data)}</em>`;
                offset++;
            }
            last_copy = offset;
        } else if (markdown[offset] === '_') {
            output += markdown.substr(last_copy, offset - last_copy);
            if (markdown[offset + 1] === '_') {
                offset += 2;
                let single = false;
                const start = offset;
                while (offset < markdown.length && (markdown.substr(offset, 2) !== '__' || single)) {
                    if (markdown[offset] === '\\') {
                        offset++;
                    } else if (markdown[offset] === '_') {
                        single = !single;
                    }
                    offset++;
                }
                output += html`<strong class="markdown md-bold">${compileInlineConstructs(markdown.substr(start, offset - start), data)}</strong>`;
                offset += 2;
            } else {
                offset++;
                const start = offset;
                while (offset < markdown.length && markdown[offset] !== '_') {
                    if (markdown[offset] === '\\') {
                        offset++;
                    }
                    offset++;
                }
                output += html`<em class="markdown md-italic">${compileInlineConstructs(markdown.substr(start, offset - start), data)}</em>`;
                offset++;
            }
            last_copy = offset;
        } else if (markdown[offset] === '`') {
            output += markdown.substr(last_copy, offset - last_copy);
            if (markdown[offset + 1] === '`') {
                offset += 2;
                const start = offset;
                while (offset < markdown.length && markdown.substr(offset, 2) !== '``') {
                    if (markdown[offset] === '\\') {
                        offset++;
                    }
                    offset++;
                }
                output += html`<code class="markdown md-inline-code">${escapeHtml(markdown.substr(start, offset - start))}</code>`;
                offset += 2;
            } else {
                offset++;
                const start = offset;
                while (offset < markdown.length && markdown[offset] !== '`') {
                    if (markdown[offset] === '\\') {
                        offset++;
                    }
                    offset++;
                }
                output += html`<code class="markdown md-inline-code">${escapeHtml(markdown.substr(start, offset - start))}</code>`;
                offset++;
            }
            last_copy = offset;
        } else {
            offset++;
        }
    }
    output += markdown.substr(last_copy, offset - last_copy);
    return output;
}

function linesToParagraph(lines, paragrapgs, data) {
    if (lines.length !== 0 && lines.join(' ').trim().length !== 0) {
        paragrapgs.push(html`<p class="markdown md-paragraph">${compileInlineConstructs(lines.join(' '), data)}</p>`);
    }
    lines.splice(0);
}

function generateHighliting(code, language) {
    if (language) {
        return hljs.highlight(language, code, true).value;
    } else {
        return hljs.highlightAuto(code).value;
    }
}

function compileLines(lines, data) {
    const lines_to_convert = [];
    const converted_paragraphs = [];
    while (lines.length !== 0) {
        const line_orig = lines.shift();
        const line = line_orig.trim();
        if (line.length === 0) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
        } else if (line_orig.startsWith('    ') || line_orig.startsWith('\t')) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            let code = line_orig.substr(line_orig.startsWith('    ') ? 4 : 1) + '\n';
            let tmp_code = '';
            while (lines.length !== 0) {
                const next_line = lines.shift();
                const is_empty = next_line.trim().length === 0;
                if (next_line.startsWith('    ') || next_line.startsWith('\t')) {
                    code += tmp_code + next_line.substr(next_line.startsWith('    ') ? 4 : 1) + '\n';
                    tmp_code = '';
                } else {
                    if (!is_empty) {
                        lines.unshift(next_line);
                        break;
                    } else {
                        tmp_code += next_line + '\n';
                    }
                }
            }
            converted_paragraphs.push(html`<code class="markdown md-code hljs"><pre class="markdown ">${escapeHtml(code)}</pre></code>`);
        } else if (line.startsWith('<') && line.endsWith('>')) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            converted_paragraphs.push(line_orig);
        } else if (line.startsWith('#')) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            let header_num = 1;
            while (line[header_num] === '#') {
                header_num++;
            }
            if (line.endsWith('}')) {
                const match = line.match(/\{#([^}]*)\}$/);
                const text = compileInlineConstructs(line.substr(header_num, line.length - header_num - match[0].length).trim(), data);
                header_num = Math.min(header_num, 6);
                converted_paragraphs.push(`<h${header_num} id="${match[1]}" class="markdown md-header-${header_num}">${text}</h${header_num}>`);
            } else {
                const text = compileInlineConstructs(line.substr(header_num).trim(), data);
                header_num = Math.min(header_num, 6);
                converted_paragraphs.push(`<h${header_num} class="markdown md-header-${header_num}">${text}</h${header_num}>`);
            }
        } else if (line.startsWith('===') && !line.match(/[^=]/) && lines_to_convert.length !== 0) {
            converted_paragraphs.push(html`<h1 class="markdown md-header-1">${compileInlineConstructs(lines_to_convert.join(' '), data)}</h1>`);
            lines_to_convert.splice(0);
        } else if (line.startsWith('---') && !line.match(/[^-]/) && lines_to_convert.length !== 0) {
            converted_paragraphs.push(html`<h2 class="markdown md-header-2">${compileInlineConstructs(lines_to_convert.join(' '), data)}</h2>`);
            lines_to_convert.splice(0);
        } else if (
            line.startsWith('---') && !line.match(/[^-]/)
            || line.startsWith('***') && !line.match(/[^*]/)
            || line.startsWith('___') && !line.match(/[^_]/)
        ) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            converted_paragraphs.push(html`<hr class="markdown md-hrule"/>`);
        } else if (line.match(/^\|?(([^`]|`.*?`)*\|)+([^`]|`.*?`)*\|?$/)) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            const table = [ line.split('|') ];
            while (lines.length !== 0 && lines[0].match(/^\|?(([^`]|`.*?`)*\|)+([^`]|`.*?`)*\|?$/)) {
                const next_line = lines.shift().trim();
                table.push(next_line.split('|'));
            }
            let alignment;
            if (table[1]?.[0]?.trim().match(/^:?-{3,}:?$/)) {
                alignment = table[1]
                    .map(field => field.trim())
                    .map(field => (
                        field.endsWith(':')
                            ? field.startsWith(':')
                                ? 'md-align-center'
                                : 'md-align-right'
                            : 'md-align-left'
                    ));
            }
            converted_paragraphs.push(html`
                <table class="markdown md-table">${table.filter((_, i) => !alignment || i !== 1).map((row, i) => html`
                    <tr class="markdown md-table-row">${row
                        .filter((field, j) => field.length !== 0 || (j !== 0 && j !== row.length))
                        .map((field, j) => (
                            (i === 0 && alignment)
                                ? html`<th class="markdown md-table-header ${alignment?.[j] || ''}">${compileInlineConstructs(field, data)}</th>`
                                : html`<td class="markdown md-table-data ${alignment?.[j] || ''}">${compileInlineConstructs(field, data)}</td>`
                        ))
                    }</tr>
                `)}</table>
            `);
        } else if (line.match(/^\s*([0-9]+[.)]|-\s?\[[Xx ]?\]|[+*-] )/)) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            const regex = /^\s*([0-9]+[.)]|[+*-] )/;
            function listTypeAndOrder(line) {
                const match = line.match(/^\s*([0-9]+[.)]|-\s?\[[Xx ]?\]|[+*-] )/);
                if (match[0].includes(')')) {
                    return [ /^\s*[0-9]+[)]/, 1 ];
                } else if (match[0].includes('.')) {
                    return [ /^\s*[0-9]+[.]/, 1 ];
                } else if (match[0].includes('[')) {
                    return [ /^\s*-\s?\[[Xx ]?\]/, 2 ];
                } else if (match[0].includes('*')) {
                    return [ /^\s*[*] /, 0 ];
                } else if (match[0].includes('+')) {
                    return [ /^\s*[+] /, 0 ];
                } else if (match[0].includes('-')) {
                    return [ /^\s*[-] /, 0 ];
                }
            }
            function generateList() {
                if (ordered === 1) {
                    return html`<ol class="markdown md-ordered-list">${
                        items.map(item => html`<li>${compileLines(item, data)}</li>`)
                    }</ol>`;
                } else if (ordered === 0) {
                    return html`<ul class="markdown md-unordered-list">${
                        items.map(item => html`<li>${compileLines(item, data)}</li>`)
                    }</ul>`;
                } else if (ordered === 2) {
                    return html`<ul class="markdown md-todo-list">${
                        items.map(item => {
                            const match = item[0].match(/^\s?\[([Xx ]?)\]/);
                            const checked = match[1]?.toLowerCase() === 'x' ? 'checked' : '';
                            item[0] = item[0].replace(/^\s?\[([Xx ]?)\]/, '');
                            return [html`
                                <li>
                                    <input type="checkbox" name="_" disabled ${checked} /><span>${compileLines(item, data)}</span>
                                </li>`
                            ]
                        })
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
                const is_empty = next_line.trim().length === 0;
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
                    if (!is_empty && was_empty) {
                        lines.unshift(next_line);
                        break;
                    } else {
                        items[items.length - 1].push(next_line);
                    }
                }
                was_empty = is_empty;
            }
            while (nesting_stack.length !== 0) {
                let sub_list = generateList();
                [ items, type, last_indent, ordered ] = nesting_stack.pop();
                items[items.length - 1].push(sub_list);
            }
            converted_paragraphs.push(generateList());
        } else if (line.startsWith('```') || line.startsWith('~~~')) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            let code = '';
            while (lines.length !== 0 && lines[0].trim() !== line.substr(0, 3)) {
                const next_line = lines.shift();
                code += next_line + '\n';
            }
            code = code.substr(0, code.length - 1); // Remove the trailing newline
            lines.shift();
            const language = line.replace(line.substr(0, 3), '').trim();
            if (language) {
                code = generateHighliting(code, language);
            } else {
                code = escapeHtml(code);
            }
            converted_paragraphs.push(html`
                <code class="markdown md-code hljs">
                    <span class="markdown md-lines">${code.split('\n').map((_, i) => html`<span class="markdown md-line">${i + 1}</span>`)}</span>
                    <span class="markdown md-code-content hljs"><pre class="markdown ">${code}</pre></span>
                </code>
            `);
        } else if (line.startsWith('>')) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            let quote_lines = [ line.substr(1) ];
            while (lines.length !== 0 && lines[0].trim().length !== 0) {
                const next_line = lines.shift();
                if (next_line.trim().startsWith('>')) {
                    quote_lines.push(next_line.trim().substr(1));
                } else {
                    quote_lines.push(next_line);
                }
            }
            converted_paragraphs.push(html`<div class="markdown md-quote">${compileLines(quote_lines, data)}</div>`)
        } else if (line.match(/^\[(.*)\]:/)) {
            linesToParagraph(lines_to_convert, converted_paragraphs, data);
            const items = [];
            let start = -1;
            let next_line = line;
            while (next_line?.match(/^\[(\^.*)\]:(.*)/)) {
                const match = next_line.trim().match(/^\[(.*)\]:(.*)/);
                let fn_lines = [ match[2] ];
                while (lines.length !== 0) {
                    const next_line = lines.shift();
                    const is_empty = next_line.trim().length === 0;
                    if (next_line.startsWith('    ') || next_line.startsWith('\t')) {
                        fn_lines.push(next_line.substr(next_line.startsWith('    ') ? 4 : 1));
                    } else {
                        if (!is_empty) {
                            lines.unshift(next_line);
                            break;
                        } else {
                            fn_lines.push(next_line);
                        }
                    }
                }
                const name = match[1].toLowerCase();
                if (start < 0) {
                    start = data[name]?.id;
                }
                items.push(html`<li id="fn:${name}">${compileLines(fn_lines, data)}</li>`);
                next_line = lines.shift();
            }
            if (items.length > 0) {
                if (next_line) {
                    lines.unshift(next_line);
                }
                converted_paragraphs.push(html`
                    <ol class="markdown md-footnote" start="${start}">
                        ${items}
                    </ol>
                `);
            }
        } else if (line.startsWith('[') && line.endsWith(']')) {
            linesToParagraph(lines_to_convert, converted_paragraphs);
            let inline = false;
            if (line[1] === '^') {
                inline = true;
            }
            const to_wrap = converted_paragraphs.pop();
            converted_paragraphs.push(html`
                <figure class="markdown md-info-wrap ${inline ? 'md-inline-info' : ''}">
                    ${to_wrap}
                    <figcaption class="markdown md-info">${compileInlineConstructs(line.substr(inline ? 2 : 1, line.length - (inline ? 3 : 2)), data)}</figcaption>
                </figure>
            `);
        } else {
            let actual_line = line;
            if (line.endsWith('\\')) {
                actual_line = line.substr(0, line.length - 1) + html`<br />`;
            } else if (line_orig.endsWith('  ')) {
                actual_line += html`<br />`;
            }
            lines_to_convert.push(actual_line);
        }
    }
    linesToParagraph(lines_to_convert, converted_paragraphs, data);
    return converted_paragraphs;
}

function getFootnoteRefs(lines) {
    const data = {};
    let footnote_id = 1;
    for (const line_orig of lines) {
        const line = line_orig.trim();
        const match = line.match(/^\[(.*)\]:(.*)/);
        if (match) {
            if (match[1].startsWith('^')) {
                data[match[1].toLowerCase()] = {
                    id: footnote_id,
                };
                footnote_id++;
            } else {
                const link = match[2].match(/([^('"]*)([('"](.*)[)'"])?/);
                data[match[1].toLowerCase()] = {
                    link: link[1].trim(),
                    title: link[3],
                };
            }
        }
    }
    return data;
}

export function compileMarkdown(markdown) {
    const lines = markdown.split('\n');
    const data = getFootnoteRefs(lines);
    return compileLines(lines, data);
}
