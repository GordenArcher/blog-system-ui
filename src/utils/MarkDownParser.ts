export class MarkdownParser {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    private escapeHtml(text: string): string {
        const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    private parseInline(text: string): string {
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
        return `<img src="${this.escapeHtml(url)}" alt="${this.escapeHtml(alt)}" />`;
        });

        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
            return `<a href="${this.escapeHtml(url)}">${this.escapeHtml(text)}</a>`;
        });

        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');

        text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

        text = text.replace(/~~([^~]+)~~/g, '<del>$1</del>');

        return text;
    }

    parse(): string {
        const lines = this.content.split('\n');
        const html: string[] = [];
        let i = 0;

        while (i < lines.length) {
        const line = lines[i];

        if (line.trim() === '') {
            i++;
            continue;
        }

        
        const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const text = this.parseInline(headerMatch[2]);
            html.push(`<h${level}>${text}</h${level}>`);
            i++;
            continue;
        }

        if (line.match(/^(-{3,}|\*{3,})$/)) {
            html.push('<hr />');
            i++;
            continue;
        }

        if (line.startsWith('>')) {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i].startsWith('>')) {
                quoteLines.push(lines[i].substring(1).trim());
                i++;
            }
            const quoteContent = this.parseInline(quoteLines.join(' '));
            html.push(`<blockquote>${quoteContent}</blockquote>`);
            continue;
        }

        if (line.startsWith('```')) {
            const language = line.substring(3).trim();
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(this.escapeHtml(lines[i]));
                i++;
            }
            i++; 
            const code = codeLines.join('\n');
            html.push(`<pre><code class="language-${language}">${code}</code></pre>`);
            continue;
        }

        if (line.match(/^[-*+]\s+/)) {
            const listItems: string[] = [];
            while (i < lines.length && lines[i].match(/^[-*+]\s+/)) {
            const itemText = lines[i].replace(/^[-*+]\s+/, '');
            listItems.push(`<li>${this.parseInline(itemText)}</li>`);
            i++;
            }
            html.push(`<ul>${listItems.join('')}</ul>`);
            continue;
        }

        if (line.match(/^\d+\.\s+/)) {
            const listItems: string[] = [];
            while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
                const itemText = lines[i].replace(/^\d+\.\s+/, '');
                listItems.push(`<li>${this.parseInline(itemText)}</li>`);
                i++;
            }
            html.push(`<ol>${listItems.join('')}</ol>`);
            continue;
        }

        if (line.includes('|')) {
            const tableLines: string[] = [];
            while (i < lines.length && lines[i].includes('|')) {
                tableLines.push(lines[i]);
                i++;
            }
            
            if (tableLines.length >= 2) {
                const table = this.parseTable(tableLines);
                html.push(table);
                continue;
            }
        }

        if (line.trim().startsWith('<')) {
            const allowedTags = ['video', 'audio', 'iframe', 'img', 'div', 'span'];
            const tagMatch = line.match(/^<(\w+)/);
            if (tagMatch && allowedTags.includes(tagMatch[1])) {
            let htmlBlock = line;
            const tagName = tagMatch[1];
            
            if (!line.includes(`</${tagName}>`)) {
                i++;
                while (i < lines.length && !lines[i].includes(`</${tagName}>`)) {
                    htmlBlock += '\n' + lines[i];
                    i++;
                }
                if (i < lines.length) {
                    htmlBlock += '\n' + lines[i];
                    i++;
                }
            } else {
                i++;
            }
            
            html.push(htmlBlock);
                continue;
            }
        }

        const paragraphLines: string[] = [];
        while (i < lines.length && lines[i].trim() !== '' && 
                !lines[i].match(/^(#{1,6}|>|```|[-*+]|\d+\.)\s/) &&
                !lines[i].includes('|') &&
                !lines[i].startsWith('<')) {
            paragraphLines.push(lines[i]);
            i++;
        }
        
        if (paragraphLines.length > 0) {
            const paragraphText = this.parseInline(paragraphLines.join(' '));
            html.push(`<p>${paragraphText}</p>`);
        }
        }

        return html.join('\n');
    }

    private parseTable(lines: string[]): string {
        const rows = lines.map(line => 
        line.split('|')
            .map(cell => cell.trim())
            .filter(cell => cell !== '')
        );

        if (rows.length < 2) return '';

        const headers = rows[0];
        const alignmentRow = rows[1];
        const dataRows = rows.slice(2);

        const alignments = alignmentRow.map(cell => {
            if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
            if (cell.endsWith(':')) return 'right';
            return 'left';
        });

        let tableHtml = '<table><thead><tr>';
        
        headers.forEach((header, idx) => {
            const align = alignments[idx] || 'left';
            tableHtml += `<th style="text-align: ${align}">${this.parseInline(header)}</th>`;
        });
        
        tableHtml += '</tr></thead><tbody>';

        dataRows.forEach(row => {
            tableHtml += '<tr>';
            row.forEach((cell, idx) => {
                const align = alignments[idx] || 'left';
                tableHtml += `<td style="text-align: ${align}">${this.parseInline(cell)}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody></table>';
        return tableHtml;
    }
}