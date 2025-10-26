import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, Heart, User, ArrowLeft, Clock } from 'lucide-react';
import { usePostStore } from '../../../stores/usePostStore';
import MarkdownPreview from '../../../layout/shared/MarkDownPreview';

const BlogDetails = () => {
    const { slug } = useParams();
    const [isLiked, setIsLiked] = useState(false);

    const { fetchPostBySlug, loading_slug_post, error_slug_post, Slugposts} = usePostStore()

    useEffect(() => {
        if(!slug) return

        fetchPostBySlug(slug)
    }, [slug, fetchPostBySlug]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        // Add your like API call here
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content?.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min read`;
    };

    if (loading_slug_post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C4EE4]"></div>
            </div>
        );
    }

    if (!Slugposts) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h2>
                <Link to="/blog" className="text-[#7C4EE4] hover:underline">
                    Return to blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <Link 
                        to="/blog" 
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7C4EE4] transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to blogs</span>
                    </Link>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 bg-[#7C4EE4]/10 text-[#7C4EE4] rounded-full text-sm font-medium">
                        {Slugposts?.category?.name}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {Slugposts?.title}
                </h1>

                {Slugposts.cover_image && (
                    <div className='p-3'>
                        <img src={Slugposts.cover_image} alt="" />
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
                    <div className="flex items-center gap-3">
                        {Slugposts?.author?.profile_image ? (
                            <img 
                                src={Slugposts.author.profile_image} 
                                alt={Slugposts.author.user.username}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-[#7C4EE4] flex items-center justify-center">
                                <User size={24} className="text-white" />
                            </div>
                        )}
                        <div>
                            <p className="font-medium text-gray-900">
                                {Slugposts?.author?.user?.username}
                            </p>
                            {Slugposts?.author?.is_verified && (
                                <p className="text-sm text-gray-500">Verified Author</p>
                            )}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={18} />
                        <span className="text-sm">{formatDate(Slugposts?.created_at)}</span>
                    </div>

                    {/* Read Time */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={18} />
                        <span className="text-sm">{calculateReadTime(Slugposts?.content)}</span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Eye size={18} />
                        <span className="text-sm">{Slugposts?.views} views</span>
                    </div>
                </div>

                {/* Cover Image */}
                {Slugposts.cover_image && (
                    <div className="mb-12 rounded-xl overflow-hidden">
                        <img 
                            src={Slugposts?.cover_image} 
                            alt={Slugposts?.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-12">
                    <MarkdownPreview content={Slugposts.content} />
                </div>

                {/* Tags */}
                {Slugposts.tags && Slugposts?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {Slugposts?.tags?.map((tag, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-8 border-t">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                            isLiked 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                        <span>{isLiked ? 'Liked' : 'Like'}</span>
                    </button>
                    <span className="text-gray-600">
                        {Slugposts?.total_likes + (isLiked ? 1 : 0)} likes
                    </span>
                </div>

                {Slugposts?.author?.bio && (
                    <div className="mt-12 p-6 bg-white rounded-xl border">
                        <h3 className="text-lg font-bold mb-3">About the Author</h3>
                        <div className="flex items-start gap-4">
                            {Slugposts?.author?.profile_image ? (
                                <img 
                                    src={Slugposts?.author?.profile_image} 
                                    alt={Slugposts?.author?.user?.username}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-[#7C4EE4] flex items-center justify-center flex-shrink-0">
                                    <User size={32} className="text-white" />
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-gray-900 mb-1">
                                    {Slugposts?.author?.user?.username}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {Slugposts?.author?.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default BlogDetails;