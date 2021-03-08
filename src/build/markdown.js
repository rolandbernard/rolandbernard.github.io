
export function markdownStyles() {

}

function compileSimpleEmphasis(markdown) {
    return markdown
        .replace(/\*\*(.*)\*\*/g, '<b class="md-bold">$1</b>')
        .replace(/\*(.*)\*/g, '<i class="md-italic">$1</i>')
        .replace(/__(.*)__/g, '<b class="md-bold">$1</b>')
        .replace(/_(.*)_/g, '<i class="md-italic">$1</i>')
        .replace(/`(.*)`/g, '<code class="md-inline-code">$1</code>')
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
        } else if (line === '```') {
            linesToParagraph(converted_lines, converted_paragraphs);
            let code = '';
            while (lines.length !== 0 && lines[0].trim() !== '```') {
                const next_line = lines.shift();
                code += next_line + '\n';
            }
            lines.shift();
            converted_paragraphs.push(`<code class="md-code"><pre>${escapeHtml(code)}</pre></code>`);
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
