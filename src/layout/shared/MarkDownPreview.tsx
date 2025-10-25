import React, { useMemo } from 'react';
import { MarkdownParser } from '../../utils/MarkDownParser';

interface MarkdownPreviewProps {
    content: string;
    className?: string;
    theme?: 'light' | 'dark' | 'auto';
    animated?: boolean;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
    content, 
    className = '',
    animated = true
    }) => {


    const html = useMemo(() => {
        const parser = new MarkdownParser(content);
        return parser.parse();
    }, [content]);

    return (
        <div 
            className={`markdown-preview-container ${className}`}
            style={{ 
                animation: animated ? 'fadeInUp 0.4s ease-out' : 'none'
            }}
        >
            <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .markdown-preview-container {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                    line-height: 1.6;
                    color: #374151;
                }

                .markdown-preview-container.dark {
                    color: #d1d5db;
                }

                .markdown-content p img,
                .markdown-content img {
                    display: block;
                    max-width: 700px; 
                    width: 100%;
                    height: 400px;
                    // object-fit: cover;
                    border-radius: 12px;
                    margin: 2rem auto;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }


                .markdown-content video {
                    max-width: 100%;
                    width: 100%;
                    height: 400px;
                    border-radius: 12px;
                    margin: 2rem auto;
                    display: block;
                    background: #000;
                }

                .markdown-content audio {
                    width: 100%;
                    max-width: 600px;
                    margin: 1.5rem auto;
                    display: block;
                    border-radius: 8px;
                }

                .markdown-content iframe {
                    max-width: 100%;
                    border-radius: 12px;
                    margin: 2rem auto;
                    display: block;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    border: none;
                }

                .dark .markdown-content iframe {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                }

                .markdown-content pre {
                    background: #f6f8fa;
                    border: 1px solid #e1e4e8;
                    border-radius: 8px;
                    padding: 1.25rem;
                    overflow-x: auto;
                    font-size: 0.875rem;
                    line-height: 1.6;
                    margin: 1.5rem 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                }

                .dark .markdown-content pre {
                    background: #1e1e1e;
                    border-color: #3e3e3e;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    color: #d4d4d4;
                }

                .markdown-content pre code {
                    background: transparent;
                    padding: 0;
                    border-radius: 0;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    color: inherit;
                }

                .markdown-content code {
                    background: #f3f4f6;
                    color: #e83e8c;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    font-size: 0.9em;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                }

                .dark .markdown-content code {
                    background: #2d2d2d;
                    color: #ff79c6;
                }

                .markdown-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                }

                .markdown-content th {
                    background: #f9fafb;
                    font-weight: 600;
                    text-align: left;
                    padding: 0.75rem 1rem;
                    border-bottom: 2px solid #e5e7eb;
                }

                .dark .markdown-content th {
                    background: #1f2937;
                    border-bottom-color: #374151;
                }

                .markdown-content td {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid #e5e7eb;
                }

                .dark .markdown-content td {
                    border-bottom-color: #374151;
                }

                .markdown-content tr:last-child td {
                    border-bottom: none;
                }

                .markdown-content tr:hover {
                    background: #f9fafb;
                }

                .dark .markdown-content tr:hover {
                background: #1f2937;
                }

                .markdown-content blockquote {
                    border-left: 4px solid #3b82f6;
                    background: #eff6ff;
                    padding: 1rem 1.5rem;
                    margin: 1.5rem 0;
                    border-radius: 0 8px 8px 0;
                    font-style: italic;
                }

                .dark .markdown-content blockquote {
                    background: #1e3a5f;
                    border-left-color: #60a5fa;
                }

                .markdown-content h1,
                .markdown-content h2,
                .markdown-content h3,
                .markdown-content h4,
                .markdown-content h5,
                .markdown-content h6 {
                    font-weight: 700;
                    line-height: 1.3;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #111827;
                }

                .dark .markdown-content h1,
                .dark .markdown-content h2,
                .dark .markdown-content h3,
                .dark .markdown-content h4,
                .dark .markdown-content h5,
                .dark .markdown-content h6 {
                    color: #f9fafb;
                }

                .markdown-content h1 {
                    font-size: 2.25rem;
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 0.5rem;
                }

                .dark .markdown-content h1 {
                    border-bottom-color: #374151;
                }

                .markdown-content h2 {
                    font-size: 1.875rem;
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 0.4rem;
                }

                .dark .markdown-content h2 {
                    border-bottom-color: #374151;
                }

                .markdown-content h3 {
                    font-size: 1.5rem;
                }

                .markdown-content h4 {
                    font-size: 1.25rem;
                }

                .markdown-content h5 {
                font-size: 1.125rem;
                }

                .markdown-content h6 {
                font-size: 1rem;
                }

                .markdown-content a {
                    color: #3b82f6;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s ease;
                }

                .markdown-content a:hover {
                    color: #2563eb;
                    text-decoration: underline;
                }

                .dark .markdown-content a {
                    color: #60a5fa;
                }

                .dark .markdown-content a:hover {
                    color: #93c5fd;
                }

                .markdown-content ul,
                .markdown-content ol {
                    padding-left: 1.5rem;
                    margin: 1rem 0;
                }

                .markdown-content li {
                    margin: 0.5rem 0;
                    line-height: 1.7;
                }

                .markdown-content hr {
                    border: none;
                    border-top: 2px solid #e5e7eb;
                    margin: 2rem 0;
                }

                .dark .markdown-content hr {
                    border-top-color: #374151;
                }

                .markdown-content p {
                    margin: 1rem 0;
                    line-height: 1.7;
                }

                .markdown-content del {
                    color: #9ca3af;
                }

                .dark .markdown-content del {
                    color: #6b7280;
                }

                .markdown-content strong {
                    font-weight: 600;
                    color: #1f2937;
                }

                .dark .markdown-content strong {
                    color: #f3f4f6;
                }

                .markdown-content em {
                    font-style: italic;
                }

                @media (max-width: 768px) {
                    .markdown-content img,
                    .markdown-content video,
                    .markdown-content iframe {
                        border-radius: 8px;
                    }

                    .markdown-content h1 {
                        font-size: 1.875rem;
                    }

                    .markdown-content h2 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default MarkdownPreview