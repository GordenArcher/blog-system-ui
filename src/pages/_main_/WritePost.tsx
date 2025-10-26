import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image, Video, Tag, Eye, EyeOff, Save, X, Loader } from 'lucide-react';
import MarkdownPreview from '../../layout/shared/MarkDownPreview';
import type { PostData } from '../../types/shared';
import { Post } from '../../services/api/api';
import { toast } from 'react-toastify';
import useCategories from '../../hooks/useCategory';



const WritePost: React.FC = () => {

    const { categories, loading } = useCategories()

    const [postData, setPostData] = useState<PostData>({
        title: '',
        content : 
        `
            # My Blog Post

            This is a sample post with **markdown** and media!

            ![Sample Image](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop)

            You can write text above and below images.

            ## More content

            Add videos too!
        `,
        content_markdown: true,
        excerpt: '',
        category: '',
        tags: [],
        cover_image: null,
        is_published: false,
        seo_title: '',
        seo_description: '',
        canonical_url: '',
    });

    const [tagInput, setTagInput] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setisSaving] = useState<boolean>(false);
    const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null);

    useEffect(() => {
        if (!postData.seo_title && postData.title) {
        setPostData(prev => ({
            ...prev,
            seo_title: postData.title,
            seo_description: postData.excerpt || postData.title
        }));
        }
    }, [postData.title, postData.excerpt, postData.seo_title]);

    const handleInputChange = (field: keyof PostData, value: any) => {
        setPostData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
        setPostData(prev => ({
            ...prev,
            tags: [...prev.tags, tagInput.trim()]
        }));
        setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setPostData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
        
            const mockImageUrl = URL.createObjectURL(file);
        
            const markdownImage = `![${file.name}](${mockImageUrl})`;
            setPostData(prev => ({
                ...prev,
                content: prev.content + `\n${markdownImage}\n`
            }));

        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
        } finally {
            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            toast.error('Please select a video file');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('video', file);
            
            const mockVideoUrl = URL.createObjectURL(file);
            console.log(mockVideoUrl)
            
            const videoHTML = `<video controls width="100%">\n  <source src="${mockVideoUrl}" type="${file.type}">\nYour browser does not support the video tag.\n</video>`;
            setPostData(prev => ({
                ...prev,
                content: prev.content + `\n${videoHTML}\n`
            }));
        } catch (error) {
            console.error('Error uploading video:', error);
            toast.error('Error uploading video');
        } finally {
            setUploading(false);

            if (videoInputRef.current) {
                videoInputRef.current.value = '';
            }
        }
    };

    const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
        return;
        }

        setUploading(true);
        
        try {
        
            setPostData(prev => ({ ...prev, cover_image: file }));
            setPreviewCoverImage(URL.createObjectURL(file))
        } catch (error) {
            console.error('Error uploading cover image:', error);
            alert('Error uploading cover image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!postData.title.trim()) {
            toast.error('Please enter a title');
            return;
        }

        if (!postData.content.trim()) {
            toast.error('Please enter content');
            return;
        }

        setisSaving(true)

        try {
        
            const response = await Post(postData)

            if (response) {
                toast.success(response?.message || 'Post saved successfully!');
                console.log('Saved post:', response);
            }

        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err) {
                const e = err as { response?: { data?: { message?: string } } };
                toast.error(e.response?.data?.message || 'Error saving post');
            } else {
                toast.error('Error saving post');
            }

            throw new Error('Failed to save post');
        }
finally{
            setisSaving(false)
        }
    };

    const insertMarkdown = (syntax: string) => {
        setPostData(prev => ({ ...prev, content: prev.content + syntax }));
    };


    console.log(postData)
    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Write New Post</h1>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg border ${
                                isPreview 
                                ? 'bg-[#7C4EE4] text-white border-[#7C4EE4]' 
                                : 'bg-white text-gray-700 border-gray-300'
                            }`}
                        >
                            {isPreview ? <EyeOff size={20} /> : <Eye size={20} />}
                            {isPreview ? 'Edit' : 'Preview'}
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="flex items-center disabled:cursor-not-allowed cursor-pointer gap-2 px-6 py-2 bg-[#7C4EE4] text-white rounded-lg hover:bg-[#6b3dd4] transition-colors"
                        >
                            {isSaving ? (
                                <>
                                    <Loader className='animate-spin' />
                                    {postData.is_published ? 'Publishing...' : 'Saving to drafts...'}
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    {postData.is_published ? 'Publish' : 'Save Draft'}
                                </>
                            )}
                            
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <input
                                type="text"
                                placeholder="Post Title..."
                                value={postData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full text-3xl font-bold placeholder-gray-400 outline-none"
                            />
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            {!isPreview ? (
                                <div className="min-h-[500px]">
                                    <div className="border-b border-gray-200 p-4 flex flex-wrap gap-2">
                                        <button
                                            onClick={() => insertMarkdown('**bold**')}
                                            className="px-3 cursor-pointer py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                        >
                                            <strong>B</strong>
                                        </button>

                                        <button
                                            onClick={() => insertMarkdown('*italic*')}
                                            className="px-3 py-1 border cursor-pointer border-gray-300 rounded text-sm hover:bg-gray-50"
                                        >
                                            <em>I</em>
                                        </button>

                                        <button
                                            onClick={() => insertMarkdown('# Heading 1\n')}
                                            className="px-3 py-1 border cursor-pointer border-gray-300 rounded text-sm hover:bg-gray-50"
                                        >
                                            H1
                                        </button>

                                        <button
                                            onClick={() => insertMarkdown('## Heading 2\n')}
                                            className="px-3 py-1 border cursor-pointer border-gray-300 rounded text-sm hover:bg-gray-50"
                                        >
                                            H2
                                        </button>

                                        <button
                                            onClick={() => insertMarkdown('- List item\n')}
                                            className="px-3 py-1 border cursor-pointer border-gray-300 rounded text-sm hover:bg-gray-50"
                                        >
                                            List
                                        </button>

                                        <button
                                            onClick={() => insertMarkdown('[Link](url)')}
                                            className="px-3 py-1 border cursor-pointer border-gray-300 rounded text-sm hover:bg-gray-50"
                                        >
                                            Link
                                        </button>

                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="flex items-center cursor-pointer gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <Image size={16} />
                                            Image
                                        </button>

                                        <button
                                            onClick={() => videoInputRef.current?.click()}
                                            disabled={uploading}
                                            className="flex items-center cursor-pointer gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <Video size={16} />
                                            Video
                                        </button>
                                    </div>

                                    {/* <MarkdownEditor value={postData.content} onChange={(e) => handleInputChange('content', e.target.value)} /> */}

                                    <textarea
                                        value={postData.content}
                                        onChange={(e) => handleInputChange('content', e.target.value)}
                                        placeholder="Start writing your post... (Supports Markdown)"
                                        className="w-full h-[400px] p-6 resize-none outline-none font-mono text-sm"
                                    />
                                </div>
                            ) : (
                                <div className="p-6 min-h-[500px]">
                                    <div className="prose max-w-none overflow-auto h-full overflow-y-auto">
                                        <MarkdownPreview content={postData.content} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt
                            </label>

                            <textarea
                                value={postData.excerpt}
                                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                placeholder="Brief description of your post..."
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-[#7C4EE4] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Status</span>

                                    <label htmlFor='check' className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            id='check'
                                            type="checkbox"
                                            checked={postData.is_published}
                                            onChange={(e) => handleInputChange('is_published', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7C4EE4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C4EE4]"></div>
                                    </label>

                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full cursor-pointer bg-[#7C4EE4] text-white py-2 rounded-lg hover:bg-[#6b3dd4] transition-colors"
                                >
                                    {postData.is_published ? 'Publish' : 'Save Draft'}
                                </button>

                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Image</h3>

                            {previewCoverImage ? (
                                <div className="space-y-3">
                                    <img
                                        src={previewCoverImage}
                                        alt="Cover"
                                        className="w-full h-32 object-cover rounded-lg"
                                    />

                                    <button
                                        title='remove'
                                        type='button'
                                        onClick={() => handleInputChange('cover_image', '')}
                                        className="w-full cursor-pointer text-red-600 text-sm hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#7C4EE4] transition-colors">
                                    <Upload size={24} className="text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Upload Cover Image</span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>

                            <select
                                title='select'
                                value={postData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#7C4EE4] focus:border-transparent"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                                {loading && <Loader className='animate-spin' />}
                            </select>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>

                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagInputKeyDown}
                                        placeholder="Add a tag..."
                                        className="flex-1 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#7C4EE4] focus:border-transparent"
                                    />

                                    <button
                                        title='add'
                                        onClick={handleAddTag}
                                        className="px-4 py-2 cursor-pointer bg-[#7C4EE4] text-white rounded-lg hover:bg-[#6b3dd4] transition-colors"
                                    >
                                        <Tag size={16} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {postData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex cursor-pointer items-center gap-1 px-3 py-1 bg-[#7C4EE4]/10 text-[#7C4EE4] rounded-full text-sm"
                                        >
                                            {tag}

                                            <button
                                                title='close'
                                                onClick={() => handleRemoveTag(tag)}
                                                className="hover:text-[#6b3dd4] cursor-pointer"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor='s-tit' className="block text-sm font-medium text-gray-700 mb-1">
                                        SEO Title
                                    </label>

                                    <input
                                        id='s-tit'
                                        type="text"
                                        value={postData.seo_title}
                                        onChange={(e) => handleInputChange('seo_title', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#7C4EE4] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor='s-des' className="block text-sm font-medium text-gray-700 mb-1">
                                        SEO Description
                                    </label>
                                    <textarea
                                        id='s-des'
                                        value={postData.seo_description}
                                        onChange={(e) => handleInputChange('seo_description', e.target.value)}
                                        rows={3}
                                        className="w-full p-2 border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-[#7C4EE4] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Canonical URL
                                    </label>
                                    <input
                                        type="url"
                                        value={postData.canonical_url}
                                        onChange={(e) => handleInputChange('canonical_url', e.target.value)}
                                        placeholder="https://example.com/post"
                                        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#7C4EE4] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />
            <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoUpload}
                accept="video/*"
                className="hidden"
            />
        </div>
    );
};

export default WritePost;