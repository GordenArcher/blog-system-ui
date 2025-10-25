import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, GripVertical, Image as Img, Video as Vid, Maximize2, Minimize2 } from 'lucide-react';

interface ContentBlock {
    id: string;
    type: 'text' | 'image' | 'video';
    content: string;
    url?: string;
    width?: number;
    alt?: string;
}

interface RichMarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const MarkdownEditor: React.FC<RichMarkdownEditorProps> = ({
    value,
    onChange,
    placeholder = "Start writing your post... (Supports Markdown)"
}) => {
    const [blocks, setBlocks] = useState<ContentBlock[]>(() => parseMarkdownToBlocks(value));
    const [isDragging, setIsDragging] = useState(false);
    const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
    const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef(0);

    // Parse markdown string to content blocks
    function parseMarkdownToBlocks(markdown: string): ContentBlock[] {
        const blocks: ContentBlock[] = [];
        const lines = markdown.split('\n');
        let textBuffer: string[] = [];
        let blockId = 0;

        const flushTextBuffer = () => {
        if (textBuffer.length > 0) {
            blocks.push({
            id: `text-${blockId++}`,
            type: 'text',
            content: textBuffer.join('\n')
            });
            textBuffer = [];
        }
        };

        for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check for image: ![alt](url)
        const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imageMatch) {
            flushTextBuffer();
            blocks.push({
            id: `image-${blockId++}`,
            type: 'image',
            content: line,
            url: imageMatch[2],
            alt: imageMatch[1],
            width: 100
            });
            continue;
        }

        // Check for video: <video src="..." ...>
        const videoMatch = line.match(/<video[^>]+src=["']([^"']+)["'][^>]*>/);
        if (videoMatch) {
            flushTextBuffer();
            blocks.push({
            id: `video-${blockId++}`,
            type: 'video',
            content: line,
            url: videoMatch[1],
            width: 100
            });
            continue;
        }

        // Regular text line
        textBuffer.push(lines[i]);
        }

        flushTextBuffer();

        // If no blocks, add an empty text block
        if (blocks.length === 0) {
        blocks.push({
            id: 'text-0',
            type: 'text',
            content: ''
        });
        }

        return blocks;
    }

    // Convert blocks back to markdown string
    function blocksToMarkdown(blocks: ContentBlock[]): string {
        return blocks.map(block => {
        if (block.type === 'text') {
            return block.content;
        } else if (block.type === 'image') {
            return `![${block.alt || ''}](${block.url})`;
        } else if (block.type === 'video') {
            return `<video src="${block.url}" controls width="${block.width}%" style="max-width: 800px; border-radius: 8px;"></video>`;
        }
        return '';
        }).join('\n');
    }

    // Update blocks and sync with parent
    const updateBlocks = useCallback((newBlocks: ContentBlock[]) => {
        setBlocks(newBlocks);
        const markdown = blocksToMarkdown(newBlocks);
        onChange(markdown);
    }, [onChange]);

    // Handle text change in a block
    const handleTextChange = (blockId: string, newContent: string) => {
        const newBlocks = blocks.map(block =>
        block.id === blockId ? { ...block, content: newContent } : block
        );
        updateBlocks(newBlocks);
    };

    // Handle file upload
    const handleFileUpload = useCallback((files: FileList | null) => {
        if (!files) return;

        const newBlocks = [...blocks];
        let blockId = Date.now();

        Array.from(files).forEach((file) => {
        const fileType = file.type.startsWith('image/')
            ? 'image'
            : file.type.startsWith('video/')
            ? 'video'
            : null;

        if (!fileType) return;

        const url = URL.createObjectURL(file);

        if (fileType === 'image') {
            newBlocks.push({
            id: `image-${blockId++}`,
            type: 'image',
            content: `![${file.name}](${url})`,
            url: url,
            alt: file.name,
            width: 100
            });
        } else if (fileType === 'video') {
            newBlocks.push({
            id: `video-${blockId++}`,
            type: 'video',
            content: `<video src="${url}" controls>`,
            url: url,
            width: 100
            });
        }

        // Add empty text block after media
        newBlocks.push({
            id: `text-${blockId++}`,
            type: 'text',
            content: ''
        });
        });

        updateBlocks(newBlocks);
    }, [blocks, updateBlocks]);

    // Drag and drop for file upload
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
        setIsDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragCounter.current = 0;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
        handleFileUpload(files);
        }
    };

    // Block reordering
    const handleBlockDragStart = (blockId: string) => {
        setDraggedBlockId(blockId);
    };

    const handleBlockDragOver = (e: React.DragEvent, blockId: string) => {
        e.preventDefault();
        if (draggedBlockId && draggedBlockId !== blockId) {
        setDragOverBlockId(blockId);
        }
    };

    const handleBlockDrop = (e: React.DragEvent, targetBlockId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!draggedBlockId || draggedBlockId === targetBlockId) {
        setDraggedBlockId(null);
        setDragOverBlockId(null);
        return;
        }

        const draggedIndex = blocks.findIndex(b => b.id === draggedBlockId);
        const targetIndex = blocks.findIndex(b => b.id === targetBlockId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const newBlocks = [...blocks];
        const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
        newBlocks.splice(targetIndex, 0, draggedBlock);

        updateBlocks(newBlocks);
        setDraggedBlockId(null);
        setDragOverBlockId(null);
    };

    const handleBlockDragEnd = () => {
        setDraggedBlockId(null);
        setDragOverBlockId(null);
    };

    // Remove block
    const removeBlock = (blockId: string) => {
        const newBlocks = blocks.filter(b => b.id !== blockId);
        // Ensure at least one text block exists
        if (newBlocks.length === 0) {
        newBlocks.push({
            id: 'text-0',
            type: 'text',
            content: ''
        });
        }
        updateBlocks(newBlocks);
    };

    // Resize media
    const resizeMedia = (blockId: string, newWidth: number) => {
        const newBlocks = blocks.map(block =>
        block.id === blockId ? { ...block, width: Math.max(20, Math.min(100, newWidth)) } : block
        );
        updateBlocks(newBlocks);
    };

    return (
        <div
        className="rich-markdown-editor"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
        {/* Hidden file input */}
        <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: 'none' }}
        />

        {/* Toolbar */}
        <div className="toolbar">
            <button
            onClick={() => fileInputRef.current?.click()}
            className="toolbar-btn"
            title="Upload media"
            >
            <Upload size={18} />
            <span>Upload Media</span>
            </button>
            <div className="toolbar-hint">
            💡 Drag & drop images/videos, or paste them directly
            </div>
        </div>

        {/* Content blocks */}
        <div className="blocks-container">
            {blocks.map((block, index) => (
            <div
                key={block.id}
                className={`content-block ${draggedBlockId === block.id ? 'dragging' : ''} ${
                dragOverBlockId === block.id ? 'drag-over' : ''
                }`}
                draggable={block.type !== 'text'}
                onDragStart={() => handleBlockDragStart(block.id)}
                onDragOver={(e) => handleBlockDragOver(e, block.id)}
                onDrop={(e) => handleBlockDrop(e, block.id)}
                onDragEnd={handleBlockDragEnd}
            >
                {block.type === 'text' ? (
                <textarea
                    value={block.content}
                    onChange={(e) => handleTextChange(block.id, e.target.value)}
                    placeholder={index === 0 ? placeholder : "Continue writing..."}
                    className="text-block"
                    rows={Math.max(3, block.content.split('\n').length)}
                />
                ) : (
                <div className="media-block">
                    {/* Drag handle */}
                    <div className="media-controls">
                    <button className="drag-handle" title="Drag to reorder">
                        <GripVertical size={20} />
                    </button>
                    <div className="media-info">
                        {block.type === 'image' ? <Img size={16} /> : <Vid size={16} />}
                        <span>{block.alt || 'Media'}</span>
                    </div>
                    <div className="media-actions">
                        <button
                        onClick={() => resizeMedia(block.id, (block.width || 100) - 10)}
                        className="action-btn"
                        title="Decrease size"
                        >
                        <Minimize2 size={16} />
                        </button>
                        <span className="size-indicator">{block.width}%</span>
                        <button
                        onClick={() => resizeMedia(block.id, (block.width || 100) + 10)}
                        className="action-btn"
                        title="Increase size"
                        >
                        <Maximize2 size={16} />
                        </button>
                        <button
                        onClick={() => removeBlock(block.id)}
                        className="action-btn remove-btn"
                        title="Remove"
                        >
                        <X size={16} />
                        </button>
                    </div>
                    </div>

                    {/* Media preview */}
                    <div className="media-preview" style={{ width: `${block.width}%` }}>
                    {block.type === 'image' ? (
                        <img src={block.url} alt={block.alt || ''} />
                    ) : (
                        <video src={block.url} controls />
                    )}
                    </div>
                </div>
                )}
            </div>
            ))}
        </div>

        {/* Drop overlay */}
        {isDragging && (
            <div className="drop-overlay">
            <div className="drop-content">
                <Upload size={48} />
                <p className="drop-title">Drop files here</p>
                <p className="drop-subtitle">Images and videos supported</p>
            </div>
            </div>
        )}

        <style>{`
            .rich-markdown-editor {
            position: relative;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            background: #fff;
            overflow: hidden;
            }

            .toolbar {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem 1rem;
            background: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
            }

            .toolbar-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
            }

            .toolbar-btn:hover {
            background: #2563eb;
            }

            .toolbar-hint {
            color: #6b7280;
            font-size: 0.875rem;
            }

            .blocks-container {
            padding: 0;
            min-height: 400px;
            max-height: 600px;
            overflow-y: auto;
            }

            .content-block {
            position: relative;
            transition: opacity 0.2s, transform 0.2s;
            }

            .content-block.dragging {
            opacity: 0.5;
            }

            .content-block.drag-over {
            border-top: 3px solid #3b82f6;
            }

            .text-block {
            width: 100%;
            padding: 1.5rem;
            border: none;
            outline: none;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.875rem;
            line-height: 1.6;
            resize: none;
            background: transparent;
            color: #1f2937;
            }

            .text-block::placeholder {
            color: #9ca3af;
            }

            .text-block:focus {
            background: #f9fafb;
            }

            .media-block {
            padding: 1rem;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
            margin: 0.5rem 0;
            }

            .media-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem;
            background: white;
            border-radius: 8px;
            margin-bottom: 0.75rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .drag-handle {
            cursor: grab;
            padding: 0.25rem;
            border: none;
            background: transparent;
            color: #6b7280;
            display: flex;
            align-items: center;
            transition: color 0.2s;
            }

            .drag-handle:hover {
            color: #3b82f6;
            }

            .drag-handle:active {
            cursor: grabbing;
            }

            .media-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
            color: #374151;
            font-size: 0.875rem;
            font-weight: 500;
            }

            .media-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            }

            .action-btn {
            padding: 0.375rem;
            border: 1px solid #e5e7eb;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            color: #6b7280;
            transition: all 0.2s;
            }

            .action-btn:hover {
            background: #f3f4f6;
            color: #1f2937;
            border-color: #d1d5db;
            }

            .remove-btn:hover {
            background: #fee2e2;
            color: #dc2626;
            border-color: #fecaca;
            }

            .size-indicator {
            font-size: 0.75rem;
            color: #6b7280;
            font-weight: 600;
            min-width: 35px;
            text-align: center;
            }

            .media-preview {
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: width 0.3s ease;
            }

            .media-preview img,
            .media-preview video {
            width: 100%;
            height: auto;
            display: block;
            }

            .drop-overlay {
            position: absolute;
            inset: 0;
            background: rgba(59, 130, 246, 0.1);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px dashed #3b82f6;
            border-radius: 12px;
            z-index: 10;
            }

            .drop-content {
            text-align: center;
            color: #3b82f6;
            }

            .drop-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 0.5rem;
            }

            .drop-subtitle {
            font-size: 0.875rem;
            color: #60a5fa;
            margin-top: 0.25rem;
            }

            .blocks-container::-webkit-scrollbar {
            width: 8px;
            }

            .blocks-container::-webkit-scrollbar-track {
            background: #f1f5f9;
            }

            .blocks-container::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 4px;
            }

            .blocks-container::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
            }
        `}</style>
        </div>
    );
};

export default MarkdownEditor

// Demo
// const Demo = () => {
//   const [content, setContent] = useState(``);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Rich Markdown Editor
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Drag to reorder media • Click +/- to resize • Write text anywhere
//         </p>

//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <MarkdownEditor
//             value={content}
//             onChange={setContent}
//           />
//         </div>

//         <div className="mt-6 p-4 bg-gray-800 rounded-lg">
//           <p className="text-xs text-gray-400 mb-2">Generated Markdown:</p>
//           <pre className="text-xs text-gray-300 overflow-x-auto">
//             {content}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Demo;